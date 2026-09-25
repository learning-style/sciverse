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

Usage:  python3 scripts/check-visual.py [LabFile.tsx ...]
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
    for m in re.finditer(r'outlineText\(\s*ctx\s*,\s*(`[^`]*`|\'[^\']*\'|"[^"]*")', src, re.S):
        txt = m.group(1)[1:-1]
        if words_of(txt):
            labels.append(txt)
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
        value_words = [w for w in words_of(lines[0]) if w.lower() not in STOP]
        if not value_words:
            probs.append('value line is bare numbers, naming nothing: ' + lines[0][:60])
        take = lines[1] if len(lines) > 1 else ''
        tw = words_of(take)
        # Count every fitText call, not only the ones with literal text. A row
        # built from a variable is still a row; reading only literals made twelve
        # labs that already had two rows look as though they had one.
        rows = len(re.findall(r'fitText\(', src)) + len(headline_via_outline(src))
        if rows < 2:
            probs.append('only one headline row: nothing says what the picture means')
        elif take and len(tw) < 4:
            probs.append('takeaway is not a sentence (' + str(len(tw)) + ' words): ' + take[:60])
        elif '=' in take and len(tw) < 6:
            probs.append('takeaway is a bare formula: ' + take[:60])

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
    return probs, len(labels), shapes


def main():
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
