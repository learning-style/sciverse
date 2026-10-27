#!/usr/bin/env python3
"""Does a biology lesson contain any biology?

A reader reviewing the Level 3 biology lessons said they were too mathematical and
that biology students would be lost. Measuring it showed the complaint was righter
than it sounded: L3B is NOT more arithmetic-dense than L3P (194 digits per 1k words
against 211), but it is nearly empty of biology. Nineteen of twenty-seven L3B
lessons carried fewer than five structural or functional biology words per thousand,
and four carried none at all -- so the same arithmetic a physics student reads as
the point lands on a biology student as the whole lesson.

So this checks the thing that was missing rather than the thing that was blamed:

  STRUCTURE  how often the lesson names a structure, a shape, or what something is
             FOR -- the floor is 10 per 1,000 words, which is where l3b22, l3b23
             and l3b2 already sit, and those are the three that read as biology
  FORMULAS   at most 2 printed '=' relations; the Level 3 rule is Mechanism first,
             and a third formula means the lesson has become a derivation

Level 3 biology only. Level 2's verb is Calculate, so its formulas are the point.

It deliberately does NOT cap digits. Numbers are fine in biology; numbers with no
biology around them are the defect.
"""
import os
import re
import sys

L = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                 '..', 'src', 'features', 'sciverse', 'content', 'lessons')

# Words that name a structure, a shape, or a function. Deliberately concrete: these
# are what a biology lesson says when it is explaining a thing rather than counting it.
STRUCTURE = (
    'structure', 'shape', 'shaped', 'fold', 'folded', 'folding', 'protein', 'membrane',
    'cell wall', 'organelle', 'active site', 'enzyme', 'receptor', 'tissue', 'organ',
    'fibre', 'fiber', 'capillary', 'vessel wall', 'pocket', 'binds', 'binding', 'bound',
    'anchored', 'embedded', 'lining', 'surface of', 'villi', 'villus', 'microvilli',
    'brush border', 'evolv', 'adapt', 'selection', 'species', 'gland', 'hormone',
    'muscle', 'nerve', 'stalk', 'pore', 'channel', 'transporter', 'strand', 'chain of',
)
FLOOR = 10.0          # structural words per 1,000 words
MAX_FORMULAS = 2

LESSON_FILE = re.compile(r'^(l[23])?[pcb]\d+-')


def prose(path):
    """Only what a learner reads: the content of the dialog nodes."""
    src = open(path).read()
    cut = src.index('export function') if 'export function' in src else 0
    return ' '.join(re.findall(r"content: [\"'](.*?)[\"'],\n", src[cut:], re.S))


def score(text):
    low = text.lower()
    words = len(re.findall(r"[A-Za-z']+", text))
    hits = sum(low.count(k) for k in STRUCTURE)
    # a printed relation, not an inline 'x = 5' aside: both sides carry something
    formulas = len(re.findall(r'\*\*[^*]{0,80}=[^*]{0,80}\*\*', text))
    per_k = hits / max(1, words) * 1000
    return words, hits, round(per_k, 1), formulas


def selftest():
    bad = 0

    def want(label, got, expect):
        nonlocal bad
        if got != expect:
            bad += 1
            print('  FAIL %s: got %r, wanted %r' % (label, got, expect))

    # a lesson that counts biological nouns without explaining any biology
    counting = ('content: "The gut moves 600 cm of food at 0.04 cm/s, so the time is '
                '15,000 s. The rate is 10 a minute, so the total is 2,500. '
                '**contacts = time x rate**",\n')
    w, h, perk, f = score(counting)
    want('arithmetic-only lesson is under the floor', perk < FLOOR, True)

    # the same subject, explained
    explained = ('content: "The enzyme is a protein embedded in the membrane, with its '
                 'active site facing out. Its pocket is shaped to fit one bond, so a '
                 'join facing sideways does not bind. Anchored in the brush border, it '
                 'sits beside the transporter that carries the sugar in.",\n')
    w2, h2, perk2, f2 = score(explained)
    want('explained lesson clears the floor', perk2 >= FLOOR, True)
    want('explained lesson has no formulas', f2, 0)

    # formulas are counted only when printed as a relation
    want('one printed relation counts',
         score('content: "so **rate = mass / time** and that is all",\n')[3], 1)
    want('an inline aside does not count',
         score('content: "the value a=5 appears in passing",\n')[3], 0)

    # the file filter must still see every level
    for seen in ('b27-digestion-biology.ts', 'l3b27-anything.ts', 'l2c28-x.ts'):
        want('scanned: ' + seen, bool(LESSON_FILE.match(seen)), True)
    want('index.ts not scanned', bool(LESSON_FILE.match('index.ts')), False)
    # and the scan itself must take only the Level 3 biology slot
    l3b = re.compile(r'^l3b\d+-')
    want('l3b taken', bool(l3b.match('l3b27-x.ts')), True)
    want('l2b left alone', bool(l3b.match('l2b27-x.ts')), False)
    want('l3c left alone', bool(l3b.match('l3c27-x.ts')), False)

    print('selftest ok' if not bad else 'selftest FAILED (%d)' % bad)
    return 1 if bad else 0


def main():
    want = sys.argv[1:]
    if want[:1] == ['--selftest']:
        return selftest()
    files = sorted(f for f in os.listdir(L)
                   if f.endswith('.ts') and LESSON_FILE.match(f))
    rows, scanned = [], []
    for f in files:
        lid = f.split('-')[0]
        if want and lid not in want:
            continue
        # Level 3 biology only. Level 2's verb is Calculate, so a dozen printed
        # formulas there is correct rather than a defect -- L2B27 has fifteen and
        # should. The slot with the problem is the one whose rule is Model.
        if not re.match(r'^l3b\d+-', f):
            continue
        scanned.append(lid)
        text = prose(os.path.join(L, f))
        if not text:
            continue
        w, hits, per_k, formulas = score(text)
        if per_k < FLOOR or formulas > MAX_FORMULAS:
            rows.append((per_k, lid, w, hits, per_k, formulas))
    rows.sort()
    for _, lid, w, hits, per_k, formulas in rows:
        notes = []
        if per_k < FLOOR:
            notes.append('%.1f structural words per 1k, floor is %.0f' % (per_k, FLOOR))
        if formulas > MAX_FORMULAS:
            notes.append('%d printed formulas, at most %d' % (formulas, MAX_FORMULAS))
        print('%-7s %5d words, %2d structural -- %s' % (lid, w, hits, '; '.join(notes)))
    print()
    print('%d of %d biology lesson(s) scanned need more biology or less algebra'
          % (len(rows), len(scanned)))
    missed = [x for x in want if x not in scanned]
    if missed:
        print('!! matched no biology lesson: ' + ', '.join(missed))
        return 1
    if not scanned:
        print('!! nothing was scanned')
        return 1
    return 1 if rows else 0


if __name__ == '__main__':
    sys.exit(main())
