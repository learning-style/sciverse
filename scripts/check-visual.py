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
  9. UNITS      a printed multiplication's units can give the stated result
 10. GAUGE ENDS the meter's ends say what they MEAN, not just how big they are
 11. RESULT UNIT a printed '= value' carries a unit or a naming word

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

# outlineText paints a near-black halo behind any colour brighter than 0.6, so that a
# pale fill shows up on a light background, and the halo is 2-4px wide. A MID-TONE is
# caught between the two: bright enough to be given the dark halo, too dark for the fill
# to show through it, so at 11-13px the halo meets in the middle of every stem and the
# glyphs render as hollow outlines. A reader sent a screenshot of exactly this -- slate
# #94a3b8, brightness 0.631, used as the text colour in five labs. White is unaffected
# because the fill is maximally contrasting against the halo, which is what the dark
# halo is for.
HALO_DARK = 0.6       # outlineText's own threshold
HALO_SHOWS = 0.78     # above this the fill is bright enough to survive the halo


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


# A formula line on the canvas is exempt from the naming rule, because its symbols
# name themselves -- which is how "depth = 0.77 mm x 245 us = 189 mm" reached the
# screen. Millimetres times microseconds cannot be millimetres. The 0.77 was a RATE,
# mm per us, with the factor of 2 folded in, and printing it as a plain multiplier
# was both dimensionally wrong and hid the halving the lesson is about.
UNIT = (r"(?:mm|cm|m|km|nm|s|ms|\u00b5s|us|min|h|g|kg|t|N|J|kJ|W|K|Hz|MHz|eV|GtC|L|mL)")


# "Reflects 99.90%" tells a visual-only learner nothing about whether that is
# success or failure. Where a quantity has a direction that matters, the gauge's
# ends should say which end helps -- L3B22 reads "faint: you see deeper" against
# "total: no scan". Where it has no good direction, they should at least say what
# the extremes ARE: "at the skin" against "25 cm deep". A bare '0' and '7,500'
# says neither.
UNIT_WORDS = re.compile(r"\b(?:eV|nm|mm|cm|m|km|s|ms|us|min|h|g|kg|t|N|J|kJ|W|K|Hz|MHz"
                        r"|GtC|L|mL|litres?|years?|days?|hours?|seconds?|minutes?)\b")


def gauge_ends(src):
    """The meter's low and high as written, or None when there is no gauge."""
    m = re.search(r"meter:\s*\{(.*?)\n            \}", src, re.S)
    if not m:
        return None
    blk = m.group(1)

    def one(key):
        mm = re.search(key + r":\s*((?:'[^']*')|[^,\n]+)", blk)
        return mm.group(1).strip() if mm else None
    return one('low'), one('high')


def says_what_it_means(end):
    """True if this end carries a word, beyond a bare number and its unit."""
    if not end:
        return False
    lits = re.findall(r"'([^']*)'", end)
    txt = ' '.join(lits) if lits else end
    return bool(re.search(r"[A-Za-z]{3,}", UNIT_WORDS.sub('', txt)))


def canvas_literals(src):
    """The text each outlineText/fitText draws, with interpolated values as ' N '."""
    out = []
    for m in re.finditer(r"(?:outlineText|fitText)\(\s*ctx\s*,\s*"
                         r"((?:'[^']*'|\s*\+\s*|[A-Za-z_$][\w$.()]*|\d+)+)", src):
        frag = re.sub(r"\+\s*[A-Za-z_$][\w$.()]*", " N ", m.group(1))
        parts = re.findall(r"'([^']*)'", frag)
        if parts:
            out.append(' N '.join(parts) if len(parts) > 1 else parts[0])
    return out


def bad_multiplication(text):
    """'A unitX x B unitY = C unitX' with unitY different -- unless A is a rate."""
    m = re.search(r"(?P<a>(?:per\s+)?" + UNIT + r")\s*(?:N\s*)?x\s*(?:N\s*)?"
                  r"(?P<b>" + UNIT + r")\s*=\s*(?:N\s*)?(?P<c>" + UNIT + r")", text)
    if not m:
        return None
    a, b, c = m.group('a'), m.group('b'), m.group('c')
    if a.startswith('per') or 'per' in text.split('x')[0]:
        return None                      # "1.54 mm per us x 245 us = 377 mm" is right
    if a == c and b != c:
        return a + ' x ' + b + ' cannot give ' + c
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


def top_level_parts(t):
    """The operands of a '+' chain, quote- and bracket-aware."""
    parts, depth, cur, quote, i = [], 0, '', None, 0
    while i < len(t):
        c = t[i]
        if quote:
            cur += c
            if c == '\\':
                cur += t[i + 1:i + 2]
                i += 2
                continue
            if c == quote:
                quote = None
        elif c in '\'"`':
            quote, cur = c, cur + c
        elif c in '([{':
            depth, cur = depth + 1, cur + c
        elif c in ')]}':
            depth, cur = depth - 1, cur + c
        elif c == '+' and depth == 0:
            parts.append(cur)
            cur = ''
        else:
            cur += c
        i += 1
    parts.append(cur)
    return parts


def est_len(expr, _depth=0):
    """Rendered length of a TS string expression, counting an interpolation as 5.

    The operands are split on top-level '+' and each one is measured as its literal
    text or, if it is an expression, as five characters. The earlier version matched
    the pattern ' + expr + ' instead, so an interpolation with no literal AFTER it --
    `'best at ' + Math.round(r)` -- kept its source text and was counted as twenty
    characters rather than five. That over-reported real labs once this estimator was
    used for the 11px width check as well as for the note budget.
    """
    t = longest_branch(expr)
    if _depth and t.strip() == expr.strip() and '+' not in t:
        return 5
    t = re.sub(r"\$\{[^{}]*\}", "'XXXXX'", t)
    total = 0
    for raw in top_level_parts(t):
        piece = raw.strip().rstrip(',')
        # a parenthesised operand is a sub-expression, not a value: recurse into it,
        # or `'opener ' + (cond ? 'a' : 'b')` counts the whole branch as five
        while len(piece) > 1 and piece[0] == '(' and piece[-1] == ')':
            inner = piece[1:-1]
            depth = 0
            for ch in inner:
                if ch in '([{':
                    depth += 1
                elif ch in ')]}':
                    depth -= 1
                    if depth < 0:
                        break
            if depth != 0:
                break
            piece = inner.strip()
        if not piece:
            continue
        lit = LITERAL.fullmatch(piece)
        if lit:
            total += len(re.sub(r'\s+', ' ', ''.join(lit.groups(''))))
        elif _depth < 3 and LITERAL.search(piece):
            # a sub-expression with literals in it: measure its longest branch, with a
            # hard depth bound so a self-similar expression cannot recurse for ever
            total += est_len(piece, _depth + 1)
        else:
            total += 5
    return total


def note_of(src):
    m = NOTE_EXPR.search(src)
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


def first_arg(src, start):
    """The whole first argument after `outlineText(ctx,` -- not just up to the next
    comma. `[^,]+` stopped inside `mean.toFixed(1)`, so every label built with a
    toFixed went uncounted, and a label behind a ternary went uncounted too. Both are
    ordinary ways to write one, which made this check report labs whose artwork is
    fully labelled."""
    depth, i, n = 0, start, len(src)
    while i < n:
        c = src[i]
        if c in '\'"`':
            quote, i = c, i + 1
            while i < n and src[i] != quote:
                i += 2 if src[i] == '\\' else 1
            i += 1          # consume the closing quote, or it reopens on it
        elif c in '([{':
            depth, i = depth + 1, i + 1
        elif c in ')]}':
            if depth == 0:
                return src[start:i]
            depth, i = depth - 1, i + 1
        elif c == ',' and depth == 0:
            return src[start:i]
        else:
            i += 1
    return src[start:]


def nth_arg(src, start, n):
    """The nth argument (0-based) of a call whose arguments begin at `start`."""
    i = start
    for _ in range(n):
        i += len(first_arg(src, i))
        if i >= len(src) or src[i] != ',':
            return ''
        i += 1
    return first_arg(src, i)


def brightness(col):
    """Perceived brightness 0..1, or None if it is not a plain hex colour."""
    h = col.strip().lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    if not re.fullmatch(r'[0-9a-fA-F]{6}', h):
        return None
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255


def text_colours(src):
    """(colour, text) for every colour outlineText is asked to paint words in.

    The colour is the 5th argument after ctx, and it is often a ternary over named
    constants, so both literals and resolvable const names are collected.
    """
    consts = dict(re.findall(r"const\s+([A-Za-z_]\w*)\s*=\s*'(#[0-9a-fA-F]{3,6})'", src))
    out = []
    for m in re.finditer(r'outlineText\(\s*ctx\s*,', src):
        txt = nth_arg(src, m.end(), 0).strip()
        col = nth_arg(src, m.end(), 4)
        for lit in re.findall(r"'(#[0-9a-fA-F]{3,6})'", col):
            out.append((lit, txt))
        for name in re.findall(r'\b([A-Za-z_]\w*)\b', col):
            if name in consts:
                out.append((consts[name], txt))
    return out


LITERAL = re.compile(r"'([^'\\]*(?:\\.[^'\\]*)*)'|\"([^\"\\]*(?:\\.[^\"\\]*)*)\"|`([^`]*)`")


def drawn_labels(src):
    """Word labels attached to the artwork."""
    labels = []
    for m in re.finditer(r'outlineText\(\s*ctx\s*,', src):
        arg = first_arg(src, m.end()).strip()
        if not arg:
            continue
        if re.match(r'^[A-Za-z_]\w*$', arg):
            # a variable holding text -- it renders words at run time
            labels.append(arg)
            continue
        # any string inside the expression that carries words makes this one label,
        # ternary branches included: it draws one string, so it counts once
        for parts in LITERAL.findall(arg):
            if words_of(''.join(parts)):
                labels.append(arg)
                break
    for m in re.finditer(r'fillText\(\s*(`[^`]*`|\'[^\']*\'|"[^"]*")', src, re.S):
        txt = m.group(1)[1:-1]
        if words_of(txt):
            labels.append(txt)
    return labels


def shape_count(src):
    return len(re.findall(r'ctx\.(?:fillRect|strokeRect|arc|ellipse|moveTo|quadraticCurveTo)\(', src))


# ---------------------------------------------------------------------------
# 11: a printed result must carry its unit.
#
# A reader read L3B6's footer -- `sac = 100 / 6.5 = 15.4` -- and asked what 15.4
# was 15.4 OF. Nothing on the canvas said. A number with no unit beside it is not
# a smaller finding than a number with no name: it is the same finding, because
# the unit IS the name for most of what these labs draw.
#
# The rule is narrow on purpose, so it reports results rather than formulas:
#   - the string must print a VALUE, not only symbols. `Q = m x c x dT` and
#     `echo = (difference / sum)²` name themselves and are exempt.
#   - only the tail after the LAST '=' is judged, which is the result.
#   - a unit, a superscript, '%', 'x'/'times'/'per', or any naming word of three
#     letters or more all satisfy it: '2,500 presses' and '8.6x' are both fine.
#
# Two traps cost a rewrite each. `str.isalnum()` is true for the superscript
# digits, so Python's \b broke `\bmm\b` inside `mm` + superscript four, and
# every mm4/cm3 result reported as unitless. And the tail is often a
# parenthesised ternary -- `(done ? ', all 20 cut' : ' of 20')` -- whose words a
# placeholder collapse throws away, so every branch's literals are read.
SUPERS = '\u00b2\u00b3\u00b9\u2070\u2074\u2075\u2076\u2077\u2078\u2079'
UNITISH = re.compile(r"(?:%|\u00b0|\u00b5|[" + SUPERS + r"]|\bx\b|\btimes\b|\bper\b|"
                     r"\b(?:mm|cm|m|km|nm|s|ms|us|min|h|hr|g|kg|t|N|J|kJ|W|K|V|A|L|mL|Hz"
                     r"|MHz|eV|atm|bar|Pa|hPa|kPa|mol|cal|kcal|ppm|dB|rpm|yr)\b)")

# Quantities that are dimensionless BY DEFINITION and already named on the canvas.
# Giving one of these a unit would be a lie, so each is listed with its reason
# rather than reworded. A new entry needs a reason of the same kind.
UNITLESS_OK = {
    'L2C22SpectrumLab.tsx': 'resolving power is nm / nm -- the units cancel, which is'
                            ' the whole point of the lesson',
    'L3B24MurrayLab.tsx': 'friction / upkeep is a ratio of two costs in the same units',
    'L3B25BufferLab.tsx': 'g is genes broken per gene; the meter caption names it',
    'L3C18ExponentLab.tsx': 'b is an exponent',
    'L3C22LadderLab.tsx': 'n numbers the rungs',
    'L3P25MapLab.tsx': 'a slope of one quantity against itself',
}


def literals_in(expr):
    """Every string literal in an expression, including a ternary's branches."""
    return ' '.join(''.join(g or '' for g in m.groups())
                    for m in LITERAL.finditer(expr))


def rendered(expr):
    """Literal text kept; anything interpolated becomes a value placeholder."""
    out = ''
    for raw in top_level_parts(expr):
        piece = raw.strip().rstrip(',')
        while len(piece) > 1 and piece[0] == '(' and piece[-1] == ')':
            piece = piece[1:-1].strip()
        lit = LITERAL.fullmatch(piece)
        if lit:
            out += ''.join(g or '' for g in lit.groups())
        else:
            inner = literals_in(piece)
            out += '\u00a7' + (inner if inner else '')
    return out


def printed_rows(src):
    """Every string the canvas prints, as its source expression."""
    for fn in ('outlineText', 'fitText'):
        for args in call_args(src, fn):
            parts = arg_parts(args)
            if len(parts) > 1:
                yield parts[1]
    for key in ('note', 'caption', 'low', 'high', 'display', 'readout'):
        for m in re.finditer(r"\b" + key + r":\s*((?:'(?:[^'\\]|\\.)*'"
                             r"|\"(?:[^\"\\]|\\.)*\")"
                             r"(?:\s*\+\s*(?:[^,\n]|\([^()]*\))+)*)", src):
            yield m.group(1)


def call_args(src, fn):
    """The argument list of every fn(...) call, bracket- and string-aware."""
    for m in re.finditer(r"\b" + fn + r"\(", src):
        i, depth, q, buf = m.end(), 1, None, ''
        while i < len(src) and depth:
            c = src[i]
            if q:
                buf += c
                if c == '\\':
                    buf += src[i + 1]
                    i += 2
                    continue
                if c == q:
                    q = None
                i += 1
                continue
            if c in '\'"`':
                q = c
                buf += c
                i += 1
                continue
            if c == '(':
                depth += 1
            elif c == ')':
                depth -= 1
                if not depth:
                    break
            buf += c
            i += 1
        yield buf


def arg_parts(buf):
    """Top-level comma split of an argument list."""
    parts, depth, q, cur, i = [], 0, None, '', 0
    while i < len(buf):
        c = buf[i]
        if q:
            cur += c
            if c == '\\':
                cur += buf[i + 1]
                i += 2
                continue
            if c == q:
                q = None
            i += 1
            continue
        if c in '\'"`':
            q = c
            cur += c
            i += 1
            continue
        if c in '([{':
            depth += 1
        if c in ')]}':
            depth -= 1
        if c == ',' and depth == 0:
            parts.append(cur)
            cur = ''
            i += 1
            continue
        cur += c
        i += 1
    parts.append(cur)
    return parts


def unitless_results(src):
    """Printed '= <value>' rows whose result carries neither a unit nor a name."""
    out = []
    for expr in printed_rows(src):
        txt = rendered(expr)
        if '=' not in txt or '\u00a7' not in txt:
            continue                    # a symbolic formula prints no value
        tail = txt.rsplit('=', 1)[1]
        if '\u00a7' not in tail:
            continue                    # the result is a word, not a number
        if UNITISH.search(tail) or re.search(r'[A-Za-z]{3,}', tail):
            continue
        out.append(re.sub(r'\s+', ' ', txt)[:60])
    return out

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

    # 11: a printed result must carry its unit
    if os.path.basename(path) not in UNITLESS_OK:
        for row in unitless_results(src):
            probs.append('printed result has no unit: ' + row)

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

    # 9: the units of a printed multiplication must give the printed result
    for lit in canvas_literals(src):
        why = bad_multiplication(lit)
        if why:
            probs.append('units do not work: ' + why + ' -- ' + lit[:60])
            break

    # 11: a mid-tone is unreadable as text, because outlineText haloes it in near-black
    for col, txt in text_colours(src):
        br = brightness(col)
        if br is not None and HALO_DARK < br <= HALO_SHOWS:
            probs.append('text in ' + col + ' (brightness ' + ('%.2f' % br)
                         + ') gets a near-black halo that swallows the fill: '
                         + (txt[:46] if txt else '?'))
            break

    # 10: the gauge's ends must say what they mean
    ends = gauge_ends(src)
    if ends and not says_what_it_means(ends[0]) and not says_what_it_means(ends[1]):
        probs.append('gauge ends say only how big, not what they mean: '
                     + str(ends[0]) + ' .. ' + str(ends[1]))
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

    # the real units failure, and the corrected line that must stay quiet
    want('mm x us cannot be mm',
         bool(bad_multiplication('depth = 0.77 mm x  N  \u00b5s =  N  mm')), True)
    want('mm per us x us = mm is fine',
         bool(bad_multiplication('1.54 mm per \u00b5s x  N  \u00b5s =  N  mm there and back')), False)
    want('a rate stated before the x is fine',
         bool(bad_multiplication('speed  N  mm per \u00b5s x time  N  \u00b5s =  N  mm')), False)
    want('same unit throughout is fine',
         bool(bad_multiplication('area  N  m x  N  m =  N  m')), False)

    # a gauge end must carry a word, not just a number and its unit
    want('bare zero says nothing', says_what_it_means("'0'"), False)
    want('a number with a unit says nothing', says_what_it_means("'2,900 km'"), False)
    want('an expression with a unit says nothing',
         says_what_it_means("MAX_CM + ' cm'"), False)
    want('a worded end counts', says_what_it_means("'faint: you see deeper'"), True)
    want('a worded end with a unit counts', says_what_it_means("'25 cm deep'"), True)

    # The label counter used `[^,]+` for the first argument, so it stopped inside
    # `toFixed(1)` and saw nothing behind a ternary -- both ordinary ways to write a
    # label, which made it report labs whose artwork is fully labelled.
    want('a toFixed label counts',
         len(drawn_labels("outlineText(ctx, mean.toFixed(1) + ' a day', x, y);")), 1)
    want('a ternary label counts once',
         len(drawn_labels("outlineText(ctx, hot ? 'warm here' : 'cold here', x, y);")), 1)
    want('a bare variable counts',
         len(drawn_labels("outlineText(ctx, caption, x, y);")), 1)
    want('a wordless number does not count',
         len(drawn_labels("outlineText(ctx, total.toFixed(1), x, y);")), 0)
    # a comma inside the string must not end the argument, and the closing quote must
    # be consumed or the scanner reopens on it and runs to the end of the file
    want('a comma inside the string is not the end',
         first_arg("outlineText(ctx, 'a, b' + x, 9)", len("outlineText(ctx,")).strip(),
         "'a, b' + x")

    # The real wiring failure: a physics lesson in biology's colour, which is a legal
    # member of the Accent union and so compiles cleanly. Both directions, because a
    # row-shape change that silently stops matching would disarm the scan entirely.
    wrong = ("{ id: 'l2p27', title: 'x', subtitle: 'y', discipline: 'physics', "
             "bigIdea: 27, bigIdeaTitle: 'z', icon: 'a', accentColor: 'rose', "
             "crossLinks: ['p27'], level: 2 },")
    want('a registry row still parses', accent_rows(wrong),
         [('l2p27', 'physics', 'rose')])
    want('physics in rose is caught',
         ACCENT_FOR[accent_rows(wrong)[0][1]] == accent_rows(wrong)[0][2], False)
    right = wrong.replace("accentColor: 'rose'", "accentColor: 'indigo'")
    want('physics in indigo is quiet',
         ACCENT_FOR[accent_rows(right)[0][1]] == accent_rows(right)[0][2], True)
    want('the corpus agrees with its disciplines', accent_scan(), [])

    # The meter's two end labels share one 13px line across a 272px bar on a phone.
    # The real failure is L3P28's pair, which needed 400px; its replacement fits.
    def ends_px(lo, hi):
        return round((len(lo) + len(hi)) * END_PX + END_GAP)
    want('L3P28 overlapped on a phone',
         ends_px('too fast: beats half empty', 'every beat full of blood') > METER_W, True)
    want('its replacement fits', ends_px('beats half empty', 'beats full') <= METER_W, True)
    want('a 33-char pair is the practical ceiling',
         ends_px('sweat as liquid', 'sweat as vapour') <= METER_W, True)
    want('the corpus has no overlapping meter ends', meter_ends_scan(), [])

    # 11: a printed result carries its unit. The real failure is L3B6's footer, which a
    # reader asked about -- 15.4 OF WHAT -- and the fix that answers it.
    # `bad` is this selftest's failure counter, which want() closes over -- naming a
    # fixture after it silently broke the whole run rather than failing a check.
    unnamed = "outlineText(ctx, 'sac = ' + gas + ' / ' + trim(atm) + ' = ' + trim(sac), x, y);"
    want('the real failure is caught', unitless_results(unnamed),
         ['sac = \u00a7 / \u00a7 = \u00a7'])
    named = "outlineText(ctx, 'sac size = ' + trim(sac) + ' cm\u00b3', x, y);"
    want('naming it and giving it a unit is quiet', unitless_results(named), [])
    # a symbolic formula names itself through its symbols and prints no value
    want('a symbolic formula is exempt',
         unitless_results("outlineText(ctx, 'Q = m x c x dT', x, y);"), [])
    # str.isalnum() is true for the superscript digits, so a naive \b broke here
    want('a superscript unit counts as a unit',
         unitless_results("outlineText(ctx, 'I = \u03c0 r / 4 = ' + i + ' mm\u2074', x, y);"), [])
    # the tail is often a ternary, whose branch words a placeholder collapse loses
    want("a ternary's branches supply the words",
         unitless_results("outlineText(ctx, n + ' x ' + p + ' = ' + t"
                          " + (done ? ', all 20 cut' : ' of 20'), x, y);"), [])
    # a count's noun is its unit
    want('a count named by its noun is quiet',
         unitless_results("outlineText(ctx, 'presses = ' + n + ' presses', x, y);"), [])
    for name in UNITLESS_OK:
        src = strip(open(os.path.join(VISUALS, name)).read())
        want(name + ' is on the allowlist for a reason',
             bool(unitless_results(src)), True)

    # The shrink has an 8px floor, so a long string goes illegible rather than failing.
    # Both directions: a line that fits must stay quiet, or 223 labs would report.
    want('a 12px line of 29 chars still renders at 12', shrunk_to(29, 12, PANEL - 30), 12)
    want('L3B22 constant footer was illegible', shrunk_to(47, 12, PANEL - 30), 8)
    want('its replacement is readable', shrunk_to(23, 12, PANEL - 30), 12)
    want('maxWidth parses safeRight - 24', max_width('safeRight - 24'), PANEL - 24)
    want('maxWidth leaves fullW alone', max_width('fullW - 8'), None)
    lab = ("outlineText(ctx, 'equal on both sides and there is no echo at all', "
           "x, y, 'bold 12px monospace', C, 'center', safeRight - 30);")
    want('the real failure is caught', [r[2] for r in tiny_strings(lab)], [8])
    ok = lab.replace('equal on both sides and there is no echo at all', 'equal sides, so no echo')
    want('the fix is quiet', tiny_strings(ok), [])

    # The note must open by saying what the picture is, not by reading a dial.
    reads = ("\n            note: 'There is ' + fill.toFixed(2) + ' s to fill, more than"
             " the 0.15 s a full beat needs.',\n        };")
    want('a note opening on a value is caught', orients(reads), False)
    says = ("\n            note: 'One second of a beating heart: each beat is a fixed"
            " squeeze, then whatever time is left to fill with blood. ' + x,\n        };")
    want('a note opening on a statement is quiet', orients(says), True)
    want('too short to orient anyone is caught',
         orients("\n            note: 'Try it. ' + x,\n        };"), False)
    # an apostrophe in the prose must not read as a string delimiter
    want('an apostrophe in the opener is fine',
         orients("\n            note: \"A fox's leg, with warm blood going down and cold"
                 " blood coming back beside it. \" + (x),\n        };"), True)
    want('a lab with no note is not judged', orients('const x = 1;'), True)

    # The reported failure: slate as a text colour, haloed in near-black and unreadable.
    # Both directions, because a band wide enough to pass white-on-dark must still catch
    # the mid-tone, and a band that caught white would flag 9 labs that are correct.
    lab = ("const GREY = '#94a3b8';\n"
           "outlineText(ctx, 'none switch on', x, y, 'bold 12px monospace', GREY, 'c', w);")
    want('a const colour is resolved', text_colours(lab), [('#94a3b8', "'none switch on'")])
    want('slate as text is caught', HALO_DARK < brightness('#94a3b8') <= HALO_SHOWS, True)
    want('white on a dark object is quiet', HALO_DARK < brightness('#ffffff') <= HALO_SHOWS, False)
    want('near-black ink is quiet', HALO_DARK < brightness('#0f172a') <= HALO_SHOWS, False)
    want('pale yellow on space is quiet', HALO_DARK < brightness('#fde68a') <= HALO_SHOWS, False)
    want('the replacement reads', HALO_DARK < brightness('#475569') <= HALO_SHOWS, False)
    want('a ternary gives both sides',
         sorted(c for c, _ in text_colours(
             "const A = '#be123c';\nconst B = '#94a3b8';\n"
             "outlineText(ctx, 'x y', a, b, 'f', ok ? A : B, 'c', w);")),
         ['#94a3b8', '#be123c'])

    print('selftest ok' if not bad else 'selftest FAILED (' + str(bad) + ')')
    return 1 if bad else 0


# Physics is indigo, chemistry emerald, biology rose. Every one of the three is a legal
# member of the Accent union, so a lesson wired in the wrong discipline's colour
# compiles perfectly: L2P27 shipped as physics-in-rose, in the lab AND in the registry
# row. The discipline is written in that same row, so the pair is checkable.
ACCENT_FOR = {'physics': 'indigo', 'chemistry': 'emerald', 'biology': 'rose'}
LESSON_INDEX = os.path.join(os.path.dirname(VISUALS), '..', 'content', 'lessons', 'index.ts')
EXTENDED = os.path.join(VISUALS, 'extendedLabs.ts')


# outlineText and fitText shrink a string until it fits, and they stop at 8px. So an
# over-long string does not fail loudly -- it quietly becomes illegible, which is how
# L3B22 came to print five lines at 8-10px on a common panel while every checker passed.
# The readable floor is 11px, and monospace advance is about 0.6 x the size.
PANEL = 240           # safeRight at the common 400px desktop panel AND on a phone
READABLE = 11


def shrunk_to(chars, nominal, maxw):
    """The size outlineText will actually render at, given its 8px floor."""
    size = nominal
    while size > 8 and chars * 0.6 * size > maxw:
        size -= 1
    return size


def max_width(expr):
    """The maxWidth argument, where it can be resolved against a 240px panel."""
    e = expr.strip()
    m = re.fullmatch(r'safeRight\s*-\s*(\d+)', e)
    if m:
        return PANEL - int(m.group(1))
    if e == 'safeRight':
        return PANEL
    if re.fullmatch(r'\d+', e):
        return int(e)
    return None          # fullW, half and friends depend on the lab's own layout


def tiny_strings(src):
    """(chars, nominal, rendered, text) for each string that cannot reach 11px."""
    out = []
    for m in re.finditer(r'\b(outlineText|fitText)\(\s*ctx\s*,', src):
        args = [nth_arg(src, m.end(), i) for i in range(7)]
        if m.group(1) == 'outlineText':
            font, mw = args[3], args[6]
            fm = re.search(r'(\d+)px', font)
        else:                      # fitText(ctx, text, x, y, maxWidth, size)
            font, mw = args[5], args[4]
            fm = re.fullmatch(r'\s*(\d+)\s*', font)
        if not fm:
            continue
        w = max_width(mw)
        if w is None:
            continue
        chars = est_len(args[0])
        if chars < 4:
            continue
        size = shrunk_to(chars, int(fm.group(1)), w)
        if size < READABLE:
            out.append((chars, int(fm.group(1)), size, longest_branch(args[0])[:48]))
    return out


def tiny_scan():
    """Every lab's unreadable strings, worst first."""
    hits = []
    for name in sorted(os.listdir(VISUALS)):
        if not name.endswith('.tsx') or name == 'LabCanvas.tsx':
            continue
        for row in tiny_strings(open(os.path.join(VISUALS, name)).read()):
            hits.append((name,) + row)
    return hits


# A reader said a lab's title was catchy but told them nothing: "The Beat That Cannot
# Fill -- filling with WHAT?" The canvas has to answer that without the lesson beside it,
# and the only slot with room for a sentence is the note, which wrapNote lays out across
# the WHOLE canvas width in three lines. So the note's first sentence must be a standing
# statement of what the picture is, before any dialled value -- "One second of a beating
# heart: each beat is a fixed squeeze, then whatever time is left to fill with blood."
# On the first run 161 of 165 notes opened with a reading instead.
#
# This is a floor and not a guarantee: a value-free sentence can still say nothing. It
# catches the notes that open with a number, which is the common case.
ORIENT_MIN = 25          # characters, so a stub like 'Try the dials.' does not pass


def opening_sentence(expr):
    """The note's first sentence, with every dialled value marked.

    Split on top-level '+' and walk the operands, rather than matching quote
    patterns: an apostrophe inside the prose -- a fox's leg, potassium's voltage --
    reads as a string delimiter to any regex that counts quotes, which had four
    correctly-written notes reporting as though they opened on a reading.
    """
    t = longest_branch(expr)
    out = ''
    for raw in top_level_parts(t):
        piece = raw.strip().rstrip(',')
        while len(piece) > 1 and piece[0] == '(' and piece[-1] == ')':
            piece = piece[1:-1].strip()
        lit = LITERAL.fullmatch(piece)
        if lit:
            out += re.sub(r"\$\{[^{}]*\}", ' @ ', ''.join(lit.groups('')))
        else:
            out += ' @ '
        if re.search(r'[.:]\s', re.sub(r'\s+', ' ', out)):
            break
    out = re.sub(r'\s+', ' ', out).strip()
    m = re.search(r'[.:]\s', out)
    return out[:m.start()] if m else out


NOTE_EXPR = re.compile(r"\n\s*note:\s*(.*?)(?=\n\s*\}\s*;|\n\s*\};)", re.S)


def orients(src):
    """True when the note opens by saying what the picture is."""
    m = NOTE_EXPR.search(src)
    if not m:
        return True
    head = opening_sentence(m.group(1))
    return '@' not in head and len(head) >= ORIENT_MIN


def orientation_scan():
    """Labs whose note opens with a reading rather than with what the picture is."""
    out = []
    for name in sorted(os.listdir(VISUALS)):
        if not name.endswith('.tsx') or name == 'LabCanvas.tsx':
            continue
        src = open(os.path.join(VISUALS, name)).read()
        if NOTE_EXPR.search(src) and not orients(src):
            out.append(name)
    return out


# ---------------------------------------------------------------------------
# The meter's two end labels share one line: `low` is drawn left-aligned at the
# bar's left edge and `high` right-aligned at its right edge, both in bold 13px
# monospace, across a bar `Math.min(W - 48, 620)` wide. On a 320px phone that is
# 272px, so a pair whose two strings together need more than that overlaps --
# exactly the way L2B23's two captions printed on top of one another, and
# invisible to the stage-bounds check because the footer band is not the stage.
#
# A reader hit the wording half of this first: L3B5 read 'none: the sweat stays'
# against 'dry: the water leaves', which is two different subjects and two
# different sentence shapes at the two ends of one quantity. The wording rule is
# a judgement and stays in CLAUDE.md; this is the half that can be measured.
METER_W = 272         # Math.min(W - 48, 620) at a 320px phone canvas
END_PX = 13 * 0.6     # bold 13px monospace advance
END_GAP = 10          # the smallest gap that still reads as two labels


def meter_ends_scan():
    """Meter pairs whose two end labels collide on a 320px phone canvas."""
    probs = []
    for name in sorted(os.listdir(VISUALS)):
        if not name.endswith('.tsx') or name == 'LabCanvas.tsx':
            continue
        src = open(os.path.join(VISUALS, name)).read()
        for m in re.finditer(r'meter:\s*\{(.*?)\n\s*\},', src, re.S):
            body = m.group(1)
            lo = re.search(r"low:\s*'((?:[^'\\]|\\.)*)'", body)
            hi = re.search(r"high:\s*'((?:[^'\\]|\\.)*)'", body)
            if not (lo and hi):
                continue       # built from an expression; est_len cannot place it
            need = (len(lo.group(1)) + len(hi.group(1))) * END_PX + END_GAP
            if need > METER_W:
                probs.append(name + ": meter ends need " + str(round(need))
                             + "px of " + str(METER_W) + " on a phone, so '"
                             + lo.group(1) + "' and '" + hi.group(1)
                             + "' overlap")
    return probs


def accent_rows(index_src):
    """(id, discipline, accentColor) for every registry row that carries all three."""
    return re.findall(r"\{ id: '([a-z0-9]+)',[^}]*?discipline: '(\w+)',"
                      r"[^}]*?accentColor: '(\w+)'", index_src)


def accent_scan():
    """Does each lesson's colour -- in the registry and in its lab -- match its subject?"""
    probs = []
    try:
        index_src = open(os.path.normpath(LESSON_INDEX)).read()
        ext_src = open(EXTENDED).read()
    except OSError:
        return probs
    disc = {}
    for lid, d, acc in accent_rows(index_src):
        disc[lid] = d
        want = ACCENT_FOR.get(d)
        if want and acc != want:
            probs.append(lid + ': registry accentColor is ' + acc
                         + ' but the lesson is ' + d + ', which is ' + want)
    for lid, comp in re.findall(r'^\s*(l[23]?[pcb]\d+): (\w+),', ext_src, re.M):
        want = ACCENT_FOR.get(disc.get(lid, ''))
        lab = os.path.join(VISUALS, comp + '.tsx')
        if not want or not os.path.exists(lab):
            continue
        m = re.search(r'accent="(\w+)"', open(lab).read())
        if m and m.group(1) != want:
            probs.append(comp + '.tsx: accent is ' + m.group(1) + ' but ' + lid
                         + ' is ' + disc[lid] + ', which is ' + want)
    return probs


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
    mism = accent_scan()
    for m in mism:
        print('!! ' + m)
    print(str(len(mism)) + ' accent(s) disagreeing with their lesson\'s discipline')
    ends = meter_ends_scan()
    for e in ends:
        print('!! ' + e)
    print(str(len(ends)) + ' meter end-label pair(s) that overlap on a phone')
    tiny = tiny_scan()
    orient = orientation_scan()
    print(str(len(orient)) + ' note(s) open with a reading rather than with what the'
          + ' picture is -- a backlog; this number should only ever go down')
    print(str(len(tiny)) + ' string(s) cannot reach 11px at a ' + str(PANEL)
          + 'px panel, in ' + str(len({t[0] for t in tiny})) + ' lab(s)'
          + ' -- a backlog; this number should only ever go down')
    return 1 if total or mism or ends else 0


if __name__ == '__main__':
    sys.exit(main())
