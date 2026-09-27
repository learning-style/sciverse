#!/usr/bin/env python3
"""Does every word a legacy Level 1 lab prints appear in its lesson?

check-lessons.py pairs a lesson to its lab through extendedLabs.ts, which only
lists the LabCanvas labs. The 96 Level 1 labs that predate LabCanvas are paired
in a different place entirely -- a chain of ternaries in LessonShell.tsx -- so no
checker has ever looked at them. Real gaps were sitting there: P15's canvas
printed "Off resonance: weak response" using four words its lesson never said,
and B29's printed "Disinfection Kinetics", which is not a phrase a nine-year-old
can read at all.

This reads that ternary chain, pairs each lesson with its lab, and asks the same
question check-lessons asks of the modern ones.

Usage:  python3 scripts/check-legacy-visuals.py [lessonId ...]
        python3 scripts/check-legacy-visuals.py --selftest
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LESSONS = os.path.join(ROOT, 'src/features/sciverse/content/lessons')
VISUALS = os.path.join(ROOT, 'src/features/sciverse/components/visuals')
SHELL = os.path.join(ROOT, 'src/features/sciverse/modules/LessonShell.tsx')

# The project's own stop list, imported rather than copied: check-lessons.py asks
# this same question of the modern labs, and two hand-kept lists would drift
# apart until the two checkers disagreed about the same word.
def _project_stop_list():
    """Read STOP straight out of check-lessons.py, without importing it."""
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        'check-lessons.py')
    src = open(path).read()
    m = re.search(r'STOP = set\("""(.*?)"""\.split\(\)\)', src, re.S)
    if not m:
        raise SystemExit('check-lessons.py no longer exposes a STOP list; '
                         'these two checkers must agree, so fix this first')
    return set(m.group(1).split())


SKIP = _project_stop_list() | set("""
lesson level step steps big idea sim visual lab panel meter note caption
title label value complete completed watch try click drag slide move total
""".split())

COMP = re.compile(r"lessonId\s*===\s*'([a-z0-9]+)'\s*\?\s*\(\s*<([A-Za-z0-9_]+)")
TEXT = (re.compile(r"fillText\(\s*'((?:[^'\\]|\\.)*)'"),
        re.compile(r'fillText\(\s*"((?:[^"\\]|\\.)*)"'),
        re.compile(r'fillText\(\s*`((?:[^`\\]|\\.)*)`'))
CONTENT = re.compile(r'content:\s*(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'
                     r'\'(?:[^\'\\]|\\.)*\')', re.S)


def pairs():
    """lessonId -> component name, from the LessonShell ternary chain."""
    src = open(SHELL).read()
    return dict(COMP.findall(src))


def lesson_text(lid):
    for f in os.listdir(LESSONS):
        if re.match(r'^' + re.escape(lid) + r'-', f) and f.endswith('.ts'):
            raw = open(os.path.join(LESSONS, f)).read()
            out = []
            for m in CONTENT.finditer(raw):
                out.append(m.group(1)[1:-1])
            # option labels are read by the learner too
            out += re.findall(r"label:\s*\"((?:[^\"\\]|\\.)*)\"", raw)
            out += re.findall(r"label:\s*'((?:[^'\\]|\\.)*)'", raw)
            return f, '\n'.join(out).lower()
    return None, None


def printed(component):
    path = os.path.join(VISUALS, component + '.tsx')
    if not os.path.exists(path):
        return None, []
    src = open(path).read()
    out = []
    for pat in TEXT:
        out += pat.findall(src)
    return path, out


INTERP = re.compile(r'\$\{[^}]*\}')


def words(s):
    """The words a viewer actually reads.

    A template literal's ${...} holds code, not text: `${val} cm` prints a
    number and the word cm, and reporting "val" as an unexplained word is a bug
    in the scan rather than a defect in the lesson.
    """
    return re.findall(r"[A-Za-z][A-Za-z'-]*", INTERP.sub(' ', s))


def check(lid, component):
    labpath, strings = printed(component)
    if labpath is None:
        return ['lab component %s not found' % component]
    lfile, text = lesson_text(lid)
    if text is None:
        return ['no lesson file for %s' % lid]
    missing = {}
    for s in strings:
        for w in words(s):
            lw = w.lower()
            if lw.endswith("'s"):
                lw = lw[:-2]
            if lw in SKIP or len(lw) <= 3:
                continue
            if lw not in text:
                missing.setdefault(lw, s)
    return ['%-18s printed in: %s' % (w, s[:56]) for w, s in sorted(missing.items())]


def selftest():
    """The two real gaps this checker was built for, plus a false-positive guard."""
    assert words("Off resonance: weak response") == ['Off', 'resonance', 'weak', 'response']
    assert words('${val} cm') == ['cm'], 'interpolated code read as printed text'
    # a word the lesson does not contain must be reported
    fake_lesson = 'the pendulum swings and swings'
    assert 'resonance' not in fake_lesson
    # SKIP must not be so wide that it hides a real term
    for term in ('resonance', 'kinetics', 'disinfection', 'aberration', 'homeostasis'):
        assert term not in SKIP, term + ' is exempt, which would hide a real gap'
    # ... and must be wide enough to hide ordinary glue
    for term in ('the', 'watch', 'step', 'complete'):
        assert term in SKIP, term + ' should be exempt'
    assert pairs(), 'the LessonShell ternary chain no longer parses'
    print('selftest ok')
    return 0


def main():
    want = sys.argv[1:]
    if want[:1] == ['--selftest']:
        return selftest()
    mapping = pairs()
    total, shown = 0, 0
    for lid in sorted(mapping):
        if want and lid not in want:
            continue
        rows = check(lid, mapping[lid])
        total += len(rows)
        if rows:
            shown += 1
            print('%-5s %2d word(s) the canvas prints but the lesson never uses'
                  % (lid, len(rows)))
            for r in rows:
                print('        ' + r)
    print()
    print('%d legacy pair(s) checked, %d with gaps, %d word(s) in total'
          % (len(mapping) if not want else len(want), shown, total))
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
