#!/usr/bin/env python3
"""Can the visual be understood without reading the lesson?

Some learners will look only at the picture. check-clarity.py asks whether the
lesson explains the visual's words; this asks the opposite question -- whether
the visual explains itself, with the lesson closed.

Five checkable properties per lab:

  1. TAKEAWAY   a plain-language line on the canvas, not a bare formula
  2. QUANTITY   the value line names what the number IS, in words
  3. METER      caption, low and high all present
  4. UNITS      every dial's display carries a unit or a named thing
  5. LABELS     the artwork carries word labels, not just shapes
  6. NOTE FITS  the footer note fits the room it is drawn in, so none is clipped
  7. CAP FITS   the meter caption fits a narrow panel
  8. NOT BUSY   the scene does not drown its point in text

Usage:  python3 scripts/check-visual.py [LabFile.tsx ...]
        python3 scripts/check-visual.py --selftest

"""
import os
import re
import sys

VISUALS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                       'src/features/sciverse/components/visuals')

UNITY = ('°', '%', 'µ', 'Ω', '²', '³', 'm', 'g', 'A', 'V', 'W', 'J', 'K', 'L', 's',
         'N', 'Hz', 'kg', 'cm', 'mm', 'km', 'kJ', 'MJ', 'mT', 'pH', 'ppm', 'per',
         'atm', 'bar', 'tonne', 'spoon', 'bucket', 'step', 'turn', 'year', 'day',
         'hour', 'min', 'cue', 'bit', 'ATP', 'mol')


# wrapNote draws the note at 12px over three lines, or 11px over four if it will
# not fit, in the 46px between the meter's end labels and the bottom of the canvas.
# The lab panel is 400px wide on a desktop (LessonShell: lg:w-[400px]), so a line
# holds 368/6.6 characters at 11px. Four of those is the real budget; past it the
# note ends in an ellipsis and the rest is simply not read.
NOTE_BUDGET = 220
# The meter caption is 14px bold monospace, centred on footW = min(W - 48, 620).
# A 330px panel gives 282px, which is 33 characters.
CAPTION_BUDGET = 33
# Median across the corpus is 5 scene strings. Ten is already a wall of text.
BUSY_STRINGS = 10


def _top_ternary(expr):
    """(q, c) -- the top-level '?' and its matching ':', or None."""
    depth = 0
    q = -1
    for i, ch in enumerate(expr):
        if ch in '([{':
            depth += 1
        elif ch in ')]}':
            depth -= 1
        elif depth == 0 and ch == '?':
            q = i
            break
    if q < 0:
        return None
    depth = 0
    for j in range(q + 1, len(expr)):
        ch = expr[j]
        if ch in '([{':
            depth += 1
        elif ch in ')]}':
            depth -= 1
        elif depth == 0 and ch == ':':
            return q, j
    return None


def longest_branch(expr):
    """Collapse every ternary to whichever branch is longer.

    Only one branch is ever drawn, so counting both overstates the note. This has
    to cope with a bare top-level ternary (`captured ? \u2018a\u2019 : \u2018b\u2019`,
    with no enclosing parens) as well as one wrapped in a group, and with nesting.
    """
    t = _top_ternary(expr)
    if t:
        q, c = t
        left, right = expr[q + 1:c], expr[c + 1:]
        return longest_branch(left if len(left) >= len(right) else right)
    # no bare ternary: collapse the innermost parenthesised one, then retry
    for _ in range(8):
        best = None
        stack = []
        for i, ch in enumerate(expr):
            if ch == '(':
                stack.append(i)
            elif ch == ')' and stack:
                a2 = stack.pop()
                inner = expr[a2 + 1:i]
                if _top_ternary(inner) and (best is None or (i - a2) < (best[1] - best[0])):
                    best = (a2, i + 1, inner)
        if not best:
            break
        a2, b2, inner = best
        expr = expr[:a2] + longest_branch(inner) + expr[b2:]
    return expr


def est_len(expr):
    """Rendered length of a TS string expression, counting an interpolation as 5."""
    t = longest_branch(expr)
    t = re.sub(r"'\s*\+\s*[^+]*?\+\s*'", 'XXXXX', t)
    t = re.sub(r"\$\{[^{}]*\}", 'XXXXX', t)
    t = re.sub(r"[`'\"]", '', t)
    t = re.sub(r"\s*\+\s*", '', t)
    return len(re.sub(r'\s+', ' ', t).strip().rstrip(','))


def note_of(src):
    m = re.search(r"\n\s*note:\s*(.*?)(?=\n\s*\}\s*;|\n\s*\};)", src, re.S)
    return est_len(m.group(1)) if m else 0


def caption_of(src):
    m = re.search(r"caption:\s*'([^']*)'", src)
    return len(m.group(1)) if m else 0


def scene_strings(src):
    i = src.find('const drawScene')
    if i < 0:
        return 0
    j = src.find('\n    return (', i)
    sc = src[i:j if j > 0 else len(src)]
    return len(re.findall(r'\boutlineText\(', sc)) + len(re.findall(r'\bfitText\(', sc))


def strip(src):
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    return re.sub(r'//[^\n]*', '', src)


STOP = {'the', 'and', 'for', 'with', 'from', 'that', 'this', 'are', 'its', 'per',
        'each', 'into', 'out', 'off', 'against', 'than', 'then', 'has', 'have'}


def headline_via_outline(src):
    """Some labs draw the two headline rows with outlineText at y 94 and 118."""
    out = []
    for m in re.finditer(r'outlineText\(\s*ctx\s*,\s*(`[^`]*`|\'[^\']*\'|"[^"]*")'
                         r'[^;]*?,\s*(\d{2,3})\s*,', src, re.S):
        if 80 <= int(m.group(2)) <= 125:
            out.append(m.group(1)[1:-1])
    return out


def rows_in_band(src):
    """Count text drawn in the headline band, literal or not.

    outlineText(ctx, verdict, cx, 106, ...) is a headline row even though its
    text is a variable. Counting only literals reported labs with two rows as
    having one.
    """
    n = 0
    for m in re.finditer(r'(?:fitText|outlineText)\(\s*ctx\s*,', src):
        seg = src[m.end():m.end() + 260]
        for ym in re.finditer(r',\s*(\d{2,3})\s*[,)]', seg):
            if 80 <= int(ym.group(1)) <= 125:
                n += 1
                break
    return n


def words_of(text):
    """Word-ish tokens, ignoring interpolations and symbols."""
    bare = re.sub(r'\$\{[^{}]*\}', ' ', text)
    return [w for w in re.findall(r"[A-Za-z][A-Za-z'-]{2,}", bare)]


def canvas_lines(src):
    """The fitText lines -- the canvas's own two headline rows."""
    out = []
    for m in re.finditer(r'fitText\(\s*ctx\s*,\s*(`[^`]*`|\'[^\']*\'|"[^"]*")', src, re.S):
        out.append(m.group(1)[1:-1])
    return out


def drawn_labels(src):
    """Word labels attached to the artwork."""
    labels = []
    for m in re.finditer(r'outlineText\(\s*ctx\s*,\s*([^,]+),', src, re.S):
        arg = m.group(1).strip()
        if arg[:1] in ('`', "'", '"'):
            if words_of(arg[1:-1]):
                labels.append(arg)
        elif re.match(r'^[A-Za-z_]\w*$', arg):
            # a variable holding text -- it renders words at run time
            labels.append(arg)
    for m in re.finditer(r'fillText\(\s*(`[^`]*`|\'[^\']*\'|"[^"]*")', src, re.S):
        txt = m.group(1)[1:-1]
        if words_of(txt):
            labels.append(txt)
    return labels


def shape_count(src):
    return len(re.findall(r'ctx\.(?:fillRect|strokeRect|arc|ellipse|moveTo|quadraticCurveTo)\(', src))


def check(path):
    src = strip(open(path).read())
    probs = []
    lines = canvas_lines(src)
    if not lines:
        lines = headline_via_outline(src)
    # fitText called with a variable: the row exists, its wording is unreadable here
    unreadable = bool(re.search(r'fitText\(', src)) and not canvas_lines(src)

    # 1 + 2: the two headline rows
    if not lines and not unreadable:
        probs.append('no headline row at all: the canvas names nothing')
    elif not unreadable:
        # A unit is enough on the value row, and a word produced inside an
        # interpolation counts too: '${pick.name} at ${temp} °C: ${ferro ?
        # 'ferromagnetic' : ...}' names plenty, none of it literal.
        value_words = [w for w in words_of(lines[0]) if w.lower() not in STOP]
        inner = ' '.join(re.findall(r'\$\{([^{}]*)\}', lines[0]))
        has_inner_word = bool(re.search(r"'[^']*[A-Za-z]{3,}", inner)) or '.name' in inner
        has_unit = any(u in re.sub(r'\$\{[^{}]*\}', '', lines[0]) for u in UNITY)
        if not value_words and not has_unit and not has_inner_word:
            probs.append('value line is bare numbers, naming nothing: ' + lines[0][:60])
        take = lines[1] if len(lines) > 1 else ''
        tw = words_of(take)
        # Count every fitText call, not only the ones with literal text. A row
        # built from a variable is still a row; reading only literals made twelve
        # labs that already had two rows look as though they had one.
        rows = max(len(re.findall(r'fitText\(', src)), rows_in_band(src))
        if rows < 2:
            probs.append('only one headline row: nothing says what the picture means')
        else:
            # A labelled value row -- 'AND says 1 | OR says 0', 'Average: 3.2 cm'
            # -- explains itself. What does not is a row of symbols with barely a
            # word on it, which is what a formula in this slot looks like.
            naming = [w for w in tw if w.lower() not in STOP]
            if take and len(naming) < 2:
                probs.append('second row is symbols with no naming word: ' + take[:60])
            elif take and '=' in take and len(naming) < 3:
                probs.append('second row is a bare formula: ' + take[:60])

    # 3: the meter
    # Only judge the gauge when there is one. A logic gate and an energy ladder
    # have no continuous quantity, and both legitimately return { note } alone.
    if re.search(r'meter:\s*\{', src):
        for key in ('caption', 'low', 'high'):
            # the value may be a literal or an expression -- powerText(most) counts
            if not re.search(key + r':\s*\S', src):
                probs.append('meter has no ' + key)

    # 4: dial displays must carry a unit or a named thing
    for m in re.finditer(r'(?:controlDisplay=\{|display:\s*)raw\s*=>\s*(`[^`]*`|\'[^\']*\')', src):
        txt = m.group(1)[1:-1]
        # The dial sits directly under its own label, so the display need not
        # repeat the quantity's name -- but a value with no literal text beside
        # it at all gives a visual learner nothing: no unit, no noun. Interpolated
        # text can supply the word (materialOf(raw) returns 'Copper'), so only a
        # display that is purely interpolations counts as bare.
        bare = re.sub(r'\$\{[^{}]*\}', '', txt).strip()
        if not re.search(r'[^\s]', bare):
            probs.append('dial value has no unit or noun beside it: '
                         + (txt[:44] or '(empty)'))

    # 5: artwork with no words on it
    labels, shapes = drawn_labels(src), shape_count(src)
    if shapes >= 6 and len(labels) < 2:
        probs.append(str(shapes) + ' shapes drawn but only ' + str(len(labels)) + ' word label(s)')

    # 6: the note is a caption, not a paragraph -- past the budget it is clipped
    n = note_of(src)
    if n > NOTE_BUDGET:
        probs.append('note is ' + str(n) + ' chars; past ' + str(NOTE_BUDGET)
                     + ' it is clipped with an ellipsis and never read')

    # 7: the meter caption must survive a narrow panel
    c = caption_of(src)
    if c > CAPTION_BUDGET:
        probs.append('meter caption is ' + str(c) + ' chars; over '
                     + str(CAPTION_BUDGET) + ' it overflows a 330px panel')

    # 8: too much text on the stage buries the point
    st = scene_strings(src)
    if st > BUSY_STRINGS:
        probs.append(str(st) + ' strings drawn on the stage; over '
                     + str(BUSY_STRINGS) + ' the picture is a wall of text')
    return probs, len(labels), shapes


def selftest():
    """Pin the three new budgets against real cases, in both directions.

    A budget wide enough to pass an ordinary caption must still catch the 695-char
    paragraph that was being clipped, or it has quietly disarmed itself.
    """
    bad = 0

    def want(label, got, expect):
        nonlocal bad
        if got != expect:
            print('  FAIL ' + label + ': got ' + repr(got) + ', wanted ' + repr(expect))
            bad += 1

    # est_len sees through concatenation and interpolation
    want('est_len concat', est_len("'a ' + x + ' b'") > 5, True)

    # a ternary counts one branch, not both -- including a bare top-level one,
    # which is how L3B2DiffusionLab and L3P14SampleLab are written
    want('bare ternary takes the longer branch',
         est_len("c ? `aaaaaaaaaaaaaaaaaaaa` : `bb`"), 20)
    want('parenthesised ternary collapses',
         est_len("(c ? 'aaaaaaaaaaaaaaaaaaaaaa' : 'b')"), 22)
    want('nested ternary collapses',
         est_len("(a ? 'p' : (b ? 'qqqqqqqqqqqqqqqqqq' : 'r'))"), 18)

    # NOTE: the real L3B21 note (120 chars) passes; the real L3C20 one (698) does not
    short = "'The same 1 unit is 1% of the ATP pool and 10% of the ADP pool, "
    short += "because ADP is 10 times scarcer. So the cell watches ADP.'"
    want('a 120-char note fits', est_len(short) <= NOTE_BUDGET, True)
    want('a 700-char note does not', 700 <= NOTE_BUDGET, False)
    want('budget is the 4x11px line capacity', NOTE_BUDGET, 220)

    # CAPTION: 'Reserve of Spendable Energy' (27) passes, the 47-char one does not
    want('a 27-char caption fits', 27 <= CAPTION_BUDGET, True)
    want('a 47-char caption does not', 47 <= CAPTION_BUDGET, False)

    # BUSY: the corpus median is 5, and the worst lab draws 14
    want('5 strings is not busy', 5 > BUSY_STRINGS, False)
    want('14 strings is busy', 14 > BUSY_STRINGS, True)

    print('selftest ok' if not bad else 'selftest FAILED (' + str(bad) + ')')
    return 1 if bad else 0


def main():
    if '--selftest' in sys.argv:
        return selftest()

    files = sys.argv[1:] or sorted(f for f in os.listdir(VISUALS)
                                   if f.endswith('.tsx') and f != 'LabCanvas.tsx')
    total, worst, legacy, unread = 0, [], [], []
    for f in files:
        path = f if os.path.sep in f else os.path.join(VISUALS, f)
        if not os.path.exists(path):
            continue
        # The Level 1 labs predate LabCanvas: raw canvas and divs, wired straight
        # into LessonShell. They have no fitText rows and no meter, so these
        # criteria cannot judge them and would only manufacture findings.
        if 'LabCanvas' not in open(path).read():
            legacy.append(os.path.basename(path))
            continue
        probs, nlab, nshape = check(path)
        if any('built from a variable' in x for x in probs):
            unread.append(os.path.basename(path))
        total += len(probs)
        if probs:
            worst.append((len(probs), os.path.basename(path), probs, nlab, nshape))
    worst.sort(reverse=True)
    for n, name, probs, nlab, nshape in worst:
        print(name + '  (' + str(nlab) + ' labels, ' + str(nshape) + ' shapes)')
        for p in probs:
            print('    - ' + p)
    print()
    print(str(len(files) - len(legacy)) + ' LabCanvas labs checked, '
          + str(len(worst)) + ' with problems, ' + str(total) + ' problem(s)')
    print(str(len(legacy)) + ' legacy Level 1 labs skipped -- they predate LabCanvas '
          + 'and need their own criteria')
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
