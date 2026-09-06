#!/usr/bin/env python3
"""Static checks for Sciverse lessons and their canvas labs.

There is no Node runtime on the authoring machine, so `tsc` cannot be run
locally. These checks stand in for the mechanical half of it, and each one is
here because it caught a real defect that had already reached CI or the live
site. They verify MECHANICS, not MEANING -- every genuine content problem found
so far (a boot where a bat belonged, an undefined term, "in" with no referent)
passed all of them.

Usage:
    python3 scripts/check-lessons.py                 # every lesson
    python3 scripts/check-lessons.py p47 c47 l2p1    # only these
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LESSONS = os.path.join(ROOT, 'src/features/sciverse/content/lessons')
VISUALS = os.path.join(ROOT, 'src/features/sciverse/components/visuals')

SCENE = {'ctx', 'W', 'H', 'safeRight', 't', 'v', 'raw', 'v2', 'raw2', 'stageTop', 'stageBottom'}
HELPERS = {'LabCanvas', 'fitText', 'outlineText', 'meterBar', 'chip'}
ACCENTS = {'indigo', 'emerald', 'rose'}
REQUIRED_NODES = ['root', 'checkpoint', 'discovery', 'complete']
ALIGN_WORDS = {'center', 'left', 'right', 'start', 'end', 'round', 'butt', 'square'}

STOP = set("""
a an the and or but so if is are was were be been being of in on at to for from with by as it its this that these
those you your they them their we our us i not no yes do does did done have has had can could will would should may
might must one two three four five six seven eight nine ten each every all any some many much more most few less
least than then there here what when where which who how why very just only also too now new old big small large
long short high low up down out over under again once into about after before between other same different while
because own off through during above below year years time times way ways thing things kind kinds part parts place
places number numbers see saw seen look looks looking find finds found tell tells told say says said know knows knew
make makes made take takes took get gets got give gives gave go goes went come comes came put puts use uses used
need needs needed want wants keep keeps still even ever never always often sometimes almost nearly quite rather
really truly simply merely mostly enough far near next last first second third such per like unlike add adds added
start starts starting turn turns turning clear clearly deal great good bad best worst better worse fewest fewer rare
rarer rarest none name names show shows shown trust jump jumps jumping line lines dot dots left right top bottom side
sides begin begins bigger biggest smaller smallest whole half full empty change changes changed changing little
since amount amounts higher highest lower lowest sharper sharpest
""".split())


def words(text):
    out = set()
    for w in re.findall(r"[A-Za-z']{2,}", text):
        w = w.lower()
        if w.endswith("'s"):
            w = w[:-2]
        out.add(w)
    return out


def split_args(src):
    """Quote- and bracket-aware argument split."""
    out, depth, cur, quote, i = [], 0, '', None, 0
    while i < len(src):
        ch = src[i]
        if quote:
            if ch == '\\':
                cur += src[i:i + 2]
                i += 2
                continue
            if ch == quote:
                quote = None
            cur += ch
        elif ch in '\'"`':
            quote = ch
            cur += ch
        elif ch in '([{':
            depth += 1
            cur += ch
        elif ch in ')]}':
            depth -= 1
            cur += ch
        elif ch == ',' and depth == 0:
            out.append(cur.strip())
            cur = ''
        else:
            cur += ch
        i += 1
    if cur.strip():
        out.append(cur.strip())
    return out


def brace_body(text, open_brace_idx):
    """Text between a `{` and its matching `}`, so a scene body stops at its own
    end rather than running on into the component's JSX props."""
    depth = 0
    for i in range(open_brace_idx, len(text)):
        if text[i] == '{':
            depth += 1
        elif text[i] == '}':
            depth -= 1
            if depth == 0:
                return text[open_brace_idx + 1:i]
    return text[open_brace_idx + 1:]


def top_level_positions(body):
    """Offsets in `body` that sit at brace depth 0, so a name declared inside a
    loop or callback is not confused with one declared in the scene itself."""
    depth, flags = 0, []
    for ch in body:
        if ch in '([{':
            depth += 1
        elif ch in ')]}':
            depth -= 1
        flags.append(depth <= 0)
    return flags


def paren_span(text, open_idx):
    depth = 0
    for i in range(open_idx, len(text)):
        if text[i] == '(':
            depth += 1
        elif text[i] == ')':
            depth -= 1
            if depth == 0:
                return text[open_idx + 1:i]
    return ''


def printed_literals(fragment):
    out = set()
    for m in re.finditer(r"'([^'\n]*)'|\"([^\"\n]*)\"|`([^`\n]*)`", fragment):
        s = m.group(1) or m.group(2) or m.group(3) or ''
        if not s or 'px ' in s or s.startswith('#') or s.startswith('rgb'):
            continue
        if s in ALIGN_WORDS:
            continue
        out |= words(re.sub(r'\$\{[^}]*\}', ' ', s))
    return out


def check(lesson_id, lab_file):
    errs = []
    lab = open(os.path.join(VISUALS, lab_file), encoding='utf-8').read()
    matches = [f for f in os.listdir(LESSONS) if f.startswith(lesson_id + '-')]
    if not matches:
        return [f'no lesson file starting with "{lesson_id}-"'], [], 0.0
    lesson = open(os.path.join(LESSONS, matches[0]), encoding='utf-8').read()

    for name, text in ((lab_file, lab), (matches[0], lesson)):
        for o, c in [('(', ')'), ('{', '}'), ('[', ']')]:
            if text.count(o) != text.count(c):
                errs.append(f'{name}: {o}{c} unbalanced')

    unused = []
    m = re.search(r'drawScene\s*=\s*\(\{([^}]*)\}\s*:\s*LabScene\)\s*=>\s*\{', lab)
    if not m:
        errs.append('no drawScene destructure found')
        body = ''
    else:
        got = {x.strip() for x in m.group(1).split(',') if x.strip()}
        body = brace_body(lab, lab.rindex('{', m.start(), m.end()))
        for field in sorted(SCENE - got):
            if re.search(r'(?<![\w.])' + field + r'(?![\w])', body):
                errs.append(f'"{field}" used but NOT destructured (build error)')
        unused = sorted(f for f in got if not re.search(r'(?<![\w.])' + f + r'(?![\w])', body))
        for f in unused:
            errs.append(f'"{f}" destructured but unused (fails noUnusedLocals)')

    imp = re.search(r"import \{([^}]*)\} from '\./LabCanvas'", lab)
    imported = {x.strip() for x in imp.group(1).split(',') if x.strip()} if imp else set()
    after = lab[imp.end():] if imp else lab
    # Stripped of comments, so a helper's name in prose is not read as a call.
    code = re.sub(r'//[^\n]*', '', re.sub(r'/\*.*?\*/', '', after, flags=re.S))
    for h in sorted(HELPERS):
        called = bool(re.search(r'(?<![\w.])' + h + r'\s*[(<]', code))
        used = bool(re.search(r'(?<![\w.])' + h + r'(?![\w])', code))
        if called and h not in imported:
            errs.append(f'"{h}" called but NOT imported')
        if h in imported and not used:
            errs.append(f'"{h}" imported but unused (fails noUnusedLocals)')

    for mm in re.finditer(r'(?:const \w+|function \w+)\s*=?\s*\(([^)]*)\)\s*(?::\s*[\w<>\[\]|. ]+\s*)?=>', lab):
        group = mm.group(1).strip()
        if group and ':' not in group:
            errs.append(f'implicit any params "({group})" (fails strict)')

    # A name used before its const/let declaration in the same scope is a build
    # error. This cost two failed deploys before it was checked for.
    if body:
        at_top = top_level_positions(body)
        decl = {}
        for mm in re.finditer(r'\b(?:const|let)\s+([a-zA-Z_]\w*)', body):
            if at_top[mm.start()]:
                decl.setdefault(mm.group(1), mm.start())
        seen = set()
        for mm in re.finditer(r'(?<![\w.])(?:outlineText|fitText)\s*\(', body):
            if not at_top[mm.start()]:
                continue
            for arg in split_args(paren_span(body, mm.end() - 1)):
                for nm in set(re.findall(r'(?<![\w.])([a-zA-Z_]\w*)', arg)):
                    if nm in decl and decl[nm] > mm.start() and nm not in seen:
                        seen.add(nm)
                        errs.append(f'"{nm}" used before its declaration (build error)')

    am = re.search(r'accent="(\w+)"', lab)
    if am and am.group(1) not in ACCENTS:
        errs.append(f'accent "{am.group(1)}" is not in the Accent union {sorted(ACCENTS)}')

    for node in REQUIRED_NODES:
        if f"id: '{node}'" not in lesson:
            errs.append(f'missing dialog node "{node}"')
    if 'Summary Table' not in lesson:
        errs.append('no summary table in the complete node')

    for cl in re.findall(r'controlLabel="([^"]+)"', lab) + re.findall(r"label: '([^']+)',\s*\n\s*key:", lab):
        if f'**{cl}**' not in lesson:
            errs.append(f'control "{cl}" is never named in the lesson as **{cl}**')

    printed = set()
    for fn in ('fillText', 'outlineText', 'fitText'):
        for mm in re.finditer(r'(?<![\w.])' + fn + r'\s*\(', lab):
            printed |= printed_literals(paren_span(lab, mm.end() - 1))
    for key in ('note', 'caption', 'low', 'high', 'completeNote', 'completeSubtitle', 'completeTitle', 'title', 'display'):
        for mm in re.finditer(r'(?<![\w])' + key + r'\s*[:=]([^;\n]*(?:\n[^;\n]*){0,4}?)[;\n]', lab):
            printed |= printed_literals(mm.group(1))
    unexplained = sorted(w for w in printed - words(lesson) - STOP if len(w) > 3)
    if unexplained:
        errs.append('canvas prints words the lesson never uses: ' + ', '.join(unexplained))

    prose = ' '.join(re.findall(r'content: "((?:[^"\\]|\\.)*)"', lesson))
    prose = re.sub(r'\\n|\*|\|', '  ', prose)
    sentences = [s for s in re.split(r'[.!?]+', prose) if len(s.split()) > 3]
    avg = sum(len(s.split()) for s in sentences) / max(1, len(sentences))
    return errs, unused, avg


def discover():
    """Pair every lesson id with its lab, via the extendedLabs map."""
    src = open(os.path.join(VISUALS, 'extendedLabs.ts'), encoding='utf-8').read()
    comp_to_file = dict(re.findall(r"import \{ (\w+) \} from '\./(\w+)'", src))
    pairs = []
    for lesson_id, comp in re.findall(r'^\s+(\w+):\s*(\w+),', src, re.M):
        if comp in comp_to_file:
            pairs.append((lesson_id, comp_to_file[comp] + '.tsx'))
    return pairs


def main():
    wanted = set(a.lower() for a in sys.argv[1:])
    pairs = [p for p in discover() if not wanted or p[0] in wanted]
    if not pairs:
        print('no matching lessons found')
        return 1
    total = 0
    for lesson_id, lab_file in pairs:
        errs, unused, avg = check(lesson_id, lab_file)
        flag = 'OK  ' if not errs else 'FAIL'
        print(f'  {flag} {lesson_id:7} unused={",".join(unused) or "-":10} avg_sentence={avg:.1f}')
        for e in errs:
            print(f'         !! {e}')
        total += len(errs)
    print(f'\n  {len(pairs)} checked, {total} problem(s)')
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
