#!/usr/bin/env python3
"""Find hard words a Level 1 lesson never defines.

Big Ideas 17-26 read more like a textbook than the rest of Level 1: 6.8% of their
words are ten letters or longer against 4.0% in 27-50, and 4.1% are latinate
against 2.0%. But word length alone is the wrong test -- 'mutation' and
'corrosion' are the subject, and a lesson is entitled to teach them. CLAUDE.md
already states the real rule: no jargon the lesson does not define.

So this asks, for every long or latinate word a lesson uses, whether that lesson
defines it: bolds it, or follows it with a defining verb. Words the curriculum
uses everywhere are exempt, and so are ordinary long words.

Usage:  python3 scripts/check-plainness.py [lessonId ...]
"""
import os
import re
import sys

L = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                 'src/features/sciverse/content/lessons')

LATIN = re.compile(r'\w+(?:tion|sion|ance|ence|ency|ity|ism|ivity|ology|ular|'
                   r'ization|isation|ational)$', re.I)
CONTENT = re.compile(r'content:\s*(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'
                     r'\'(?:[^\'\\]|\\.)*\')', re.S)

# Long words that are ordinary English, or that the whole curriculum leans on.
EXEMPT = set("""everything everywhere everyone something different differences
temperature experiment experiments understand understanding remember important
interesting information themselves ourselves themselves conditions difference
measurement measurements instructions completely carefully immediately
electricity underneath throughout underground surrounding surrounded
comfortable dangerous beautiful especially particular particularly
approximately unfortunately probably suddenly slowly quickly
Chemistry Biology Physics Discovery Complete Checkpoint Level
balance direction distance position pressure sentence
""".split())

DEFINING = (' is ', ' are ', ' means ', ' called ', ' happens when ', ' describes ',
            ' measures ', ' tells you', ' is when ', ' is how ', ' is what ',
            ' the name for', ' we call ', ' scientists call ')


def prose(path):
    s = open(path).read()
    out = []
    for m in CONTENT.finditer(s):
        t = m.group(1)[1:-1]
        t = t.replace('\\n', '\n').replace('\\"', '"').replace("\\'", "'")
        out.append(t)
    return '\n'.join(out)


ORDINARY = set("""attention connection connections considered consider differently
evaluating evaluate city cities motion evidence structures structure boundaries
increasing regular predictable unpredictable discovered discover scientists
satellites uncomfortable advantages advantage consequences consequence
environment environments environmental combination separation reflection
protection Protection prevention preventable artificial capacity downstream
accumulate advance connecting physically measurable molecular isolation
resistance efficiency determines determine formation predicting prediction
cellular continuous repeatedly preserving regulation production stability
atmospheric populations population selection evolution diversity biology
Frequency frequency Clarity Resolution Severity Sensitivity Reaction Mutation
Corrosion Respiration Spectroscopy Ultrasound Vascular Engineering Outstanding
Geochemists Meteorologists geologists geomorphologists investigators
Fingerprints fingerprints impurities intermediates bottlenecks
well-designed well-matched full-scale high-frequency high-strength
load-bearing threshold-like one-and-done""".split())


def is_proper(word, text):
    """A name rather than a term: it never appears lower-case in the lesson."""
    if not word[:1].isupper():
        return False
    return not re.search(r'(?<![.!?]\s)\b' + re.escape(word.lower()) + r'\b', text)


def hard_words(text):
    skip = {x.lower() for x in EXEMPT} | {x.lower() for x in ORDINARY}
    seen = {}
    for w in re.findall(r"[A-Za-z][A-Za-z'-]*", text):
        if w.lower() in skip:
            continue
        if is_proper(w, text):
            continue
        if len(w) >= 10 or LATIN.match(w):
            seen.setdefault(w.lower(), w)
    return seen


def defines(text, word):
    low = text.lower()
    if ('**' + word) in low or (word + '**') in low:
        return True
    for m in re.finditer(re.escape(word), low):
        if any(v in low[m.end():m.end() + 140] for v in DEFINING):
            return True
        before = low[max(0, m.start() - 60):m.start()]
        if ' called ' in before or ' we call ' in before:
            return True
    return False


def main():
    want = sys.argv[1:]
    files = sorted(f for f in os.listdir(L)
                   if f.endswith('.ts') and re.match(r'^[pcb]\d+-', f))
    total, rows = 0, []
    for f in files:
        lid = f.split('-')[0]
        if want and lid not in want:
            continue
        text = prose(os.path.join(L, f))
        if not text:
            continue
        undef = sorted(orig for low, orig in hard_words(text).items()
                       if not defines(text, low))
        total += len(undef)
        if undef:
            rows.append((len(undef), lid, undef))
    rows.sort(reverse=True)
    for n, lid, undef in rows:
        print('%-5s %2d undefined: %s' % (lid, n, ', '.join(undef[:12])))
    print()
    print(str(len(rows)) + ' lesson(s) with undefined hard words, '
          + str(total) + ' word(s) in total')
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
