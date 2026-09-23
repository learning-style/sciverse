#!/usr/bin/env python3
"""Check that every term the visual shows is EXPLAINED, not merely present.

check-lessons.py already verifies that each word the canvas prints appears
somewhere in the lesson. That is a weaker test than it looks: a control label
passes just by being echoed once. This checker asks two harder questions.

  1. Is the term DEFINED at all -- bolded, or followed by a defining verb?
  2. Is it defined BEFORE the learner first sees it? The visual is on screen
     from the root node onward, so a term first explained in `defining` has
     already been read off a slider by then. That is the L2P16 dip-angle
     defect: explained eventually, unexplained when it mattered.

Usage:  python3 scripts/check-clarity.py [lessonId ...]
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LESSONS = os.path.join(ROOT, 'src/features/sciverse/content/lessons')
VISUALS = os.path.join(ROOT, 'src/features/sciverse/components/visuals')

# Words that need no gloss: ordinary English, and units already spelled out.
STOP = set("""a an and are as at be been before below but by can could did do does
for from get gets give given goes had has have how if in into is it its just left
like made make makes many may more most much must no not now of off on once one
only or other our out over own per put same see set she so some still such take
takes than that the their them then there these they this those through to too
two up use used uses using was way we were what when where which while who why
will with you your every each both all any about after again against between
down during few further here him his i itself me my myself nor once ought ourselves
out same shan she'd should t than theirs themselves too under until very what's
whom yours yourself yourselves also would rather without within across along
among around because been being came come comes different does doing done each
either enough even ever first follow following found four given gives good great
half high higher hold holds keep keeps kept know known large larger last later
least less let little long longer look looks lose loses lost low lower need needs
never new next often old order part pass past place put quite reach reaches read
real really right run runs said say says second seen sees several shape short
show shows side since sit sits size small smaller start starts stay stays step
steps stop stops sure tell tells things think three time times together top
total try turn turns under until upon want wants watch way well went where
whether whole why work works year years yet""".split())

# Everyday words a grade-3 reader already owns. A label is exempt only when
# EVERY content word is on this list, so "Drop Height" and "Number of Children"
# are exempt while "Dip Angle" and "Number of Cues" are not.
ORDINARY = set("""mass volume temperature material distance height length width
thickness depth weight time speed area size number years days water salt air soil
light heat energy pressure force load density humidity loudness level moisture
children layers cameras sample samples second hot cold side full drop lift leaf
starting added blade branches body climbed ground arrival furnace orbit satellite
wave drink saltiness germs available picture detail sand virus healing watching
space sunlight marking lynx conveyor made released cycle reaction contact
territory stiffness efficiency plants animals food chain steps sky rain wind
colour color sound smell taste touch grams litres metres seconds minutes hours
amount rate count depth spread hole holes bulb wire battery spring ramp angle
safe dangerous ears eyes nose skin expected close far near loud quiet
slope weightlifter runner swimmer bird tree plant seed root stem flower""".split())


def ordinary_label(term):
    words = [w for w in re.findall(r"[a-z]+", term.lower()) if w not in STOP and len(w) > 2]
    return bool(words) and all(w in ORDINARY for w in words)


def strip_comments(src):
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    return re.sub(r'//[^\n]*', '', src)

def lab_map():
    """lessonId -> lab component file, read from extendedLabs.ts."""
    src = strip_comments(open(os.path.join(VISUALS, 'extendedLabs.ts')).read())
    comp_to_file = dict(re.findall(r"import \{ (\w+) \} from '\./(\w+)'", src))
    out = {}
    for lesson, comp in re.findall(r"^\s+(\w+):\s*(\w+),", src, re.M):
        if comp in comp_to_file:
            out[lesson] = comp_to_file[comp] + '.tsx'
    return out

def lesson_files():
    """lessonId -> lesson source file, read from lessons/index.ts."""
    src = strip_comments(open(os.path.join(LESSONS, 'index.ts')).read())
    fn_to_file = dict(re.findall(r"import \{ (get\w+Script) \} from '\./([\w-]+)'", src))
    out = {}
    for lesson, fn in re.findall(r"'([\w]+)':\s*(get\w+Script),", src):
        if fn in fn_to_file:
            out[lesson] = fn_to_file[fn] + '.ts'
    return out

def visual_terms(lab_src):
    """The phrases the visual puts on screen, most prominent first."""
    s = strip_comments(lab_src)
    terms = []
    for m in re.finditer(r'controlLabel="([^"]+)"', s):
        terms.append(('control', m.group(1)))
    for m in re.finditer(r"label:\s*'([^']+)'", s):
        terms.append(('control', m.group(1)))
    for m in re.finditer(r"caption:\s*'([^']+)'", s):
        terms.append(('meter', m.group(1)))
    for key in ('low', 'high'):
        for m in re.finditer(key + r":\s*'([^']+)'", s):
            terms.append(('endpoint', m.group(1)))
    seen, out = set(), []
    for kind, t in terms:
        if t.lower() not in seen:
            seen.add(t.lower())
            out.append((kind, t))
    return out

def nodes_of(lesson_src):
    """[(nodeId, contentText)] in file order."""
    s = lesson_src
    pos = [(m.group(1), m.start()) for m in re.finditer(r"^\s+id: '([a-z_]+)',?\s*$", s, re.M)]
    out = []
    for i, (n, st) in enumerate(pos):
        end = pos[i + 1][1] if i + 1 < len(pos) else len(s)
        out.append((n, s[st:end]))
    return out

DEFINING = (' is ', ' are ', ' means ', ' measured ', ' measures ', ' says how',
            ' tells you', ' is called', ' called the', ' the number of',
            ' stated as', ' written as', ' counts ', ' the share of', ' the angle',
            ' the amount of', ' per ')

def bolded(text, term):
    """Does the lesson itself mark this as a term worth defining?"""
    low = text.lower()
    t = term.lower()
    if ('**' + t) in low or (t + '**') in low:
        return True
    for m in re.finditer(r'\*\*([^*]{1,60})\*\*', low):
        inner = m.group(1).strip(' .,:;()')
        if inner == t or (len(t) > 3 and t in inner) or (len(inner) > 3 and inner in t):
            return True
    return False


def explains(text, term):
    """Does this text DEFINE the term, not merely mention it?"""
    low = text.lower()
    t = term.lower()
    if t not in low:
        return False
    # bolded anywhere is the project's own convention for introducing a term
    if ('**' + t) in low or (t + '**') in low:
        return True
    for m in re.finditer(re.escape(t), low):
        window = low[m.end():m.end() + 160]
        if any(v in window for v in DEFINING):
            return True
    return False

def head_words(term):
    """The content words of a label, for a looser 'is this idea present' test."""
    return [w for w in re.findall(r"[a-z]+", term.lower())
            if w not in STOP and len(w) > 2]

def main():
    labs = lab_map()
    files = lesson_files()
    wanted = sys.argv[1:]
    ids = [i for i in sorted(labs) if not wanted or i in wanted]
    if wanted:
        missing = [w for w in wanted if w not in labs]
        for w in missing:
            print('  no lab paired with ' + w)

    undefined_total = 0
    late_total = 0
    checked = 0
    rows = []
    for lid in ids:
        if lid not in files:
            continue
        lab_path = os.path.join(VISUALS, labs[lid])
        les_path = os.path.join(LESSONS, files[lid])
        if not (os.path.exists(lab_path) and os.path.exists(les_path)):
            continue
        checked += 1
        lab_src = open(lab_path).read()
        les_src = open(les_path).read()
        nodes = nodes_of(les_src)
        whole = les_src
        root_text = next((t for n, t in nodes if n == 'root'), '')
        # the visual is on screen from whichever node first sets it
        first_visual = None
        for n, t in nodes:
            if 'SET_VISUAL' in t:
                first_visual = n
                break
        pre_visual = []
        for n, t in nodes:
            pre_visual.append(t)
            if n == first_visual:
                break
        pre_text = '\n'.join(pre_visual)

        undefined, late = [], []
        for kind, term in visual_terms(lab_src):
            words = head_words(term)
            if not words:
                continue
            # a gauge's end labels are qualitative by design ('Almost none', 'Full')
            if kind == 'endpoint':
                continue
            # everyday vocabulary needs no gloss before a learner reads it
            if ordinary_label(term):
                continue
            if not explains(whole, term):
                # try the head noun alone, e.g. "Dip Angle" -> "dip"
                if not any(explains(whole, w) for w in words):
                    undefined.append((kind, term))
                    continue
            if kind != 'control':
                continue
            # only terms the lesson itself treats as technical, by bolding them
            if not (bolded(whole, term) or any(bolded(whole, w) for w in words)):
                continue
            if not (explains(pre_text, term) or any(explains(pre_text, w) for w in words)):
                where = next((n for n, t in nodes
                              if explains(t, term) or any(explains(t, w) for w in words)), '?')
                late.append((term, where))
        undefined_total += len(undefined)
        late_total += len(late)
        if undefined or late:
            rows.append((lid, undefined, late))

    def level_of(lid):
        m = re.match(r'l([23])', lid)
        return int(m.group(1)) if m else 1

    by_level = {1: [], 2: [], 3: []}
    for row in rows:
        by_level[level_of(row[0])].append(row)

    for lvl in (1, 2, 3):
        if not by_level[lvl]:
            continue
        nu = sum(len(r[1]) for r in by_level[lvl])
        nl = sum(len(r[2]) for r in by_level[lvl])
        print('===== Level ' + str(lvl) + ': ' + str(nu) + ' never defined, '
              + str(nl) + ' defined late, in ' + str(len(by_level[lvl])) + ' lesson(s)')
        for lid, undefined, late in by_level[lvl]:
            print(lid)
            for kind, term in undefined:
                print('    NEVER DEFINED   ' + kind + ' "' + term + '"')
            for term, where in late:
                print('    DEFINED LATE    control "' + term + '" -- first explained in ' + where
                      + ', but the visual is already on screen')
    print()
    print(str(checked) + ' lesson/lab pairs checked')
    print('  ' + str(undefined_total) + ' visual term(s) never defined in their lesson')
    print('  ' + str(late_total) + ' control label(s) explained only after the learner sees them')
    return 1 if (undefined_total or late_total) else 0

if __name__ == '__main__':
    sys.exit(main())
