#!/usr/bin/env python3
"""Find the type errors CI would catch in changed TypeScript, before CI does.

Unused symbols first. Three CI runs have been lost to those: a raw2 in a readout,
a module-level const declared for the top of a range, and a function parameter
left behind when the string that used it was rewritten. tsc runs with
noUnusedLocals and noUnusedParameters, and there is no Node on this machine, so
this stands in.

And since a fourth run was lost to something this script could not see, it now
also catches DEAD LITERAL COMPARISONS. `const puffs = warmer ? 5 : 2` is inferred
as the literal union `5 | 2`, so `puffs === 1` is TS2367 -- a comparison whose two
sides have no overlap -- and tsc treats it as an error rather than dead code. The
guard reads as defensive and is a build failure.

Usage:  python3 scripts/check-unused.py [file ...]
        python3 scripts/check-unused.py --selftest
With no arguments it scans everything changed against origin/main.
"""
import os
import re
import subprocess
import sys


def changed_files():
    try:
        out = subprocess.run(['git', 'diff', '--name-only', 'origin/main...HEAD'],
                             capture_output=True, text=True).stdout
        out += subprocess.run(['git', 'diff', '--name-only'],
                              capture_output=True, text=True).stdout
    except Exception:
        return []
    return sorted({f for f in out.split()
                   if f.endswith(('.ts', '.tsx')) and os.path.exists(f)})


def strip(src):
    """Remove comments, and the prose inside string literals -- but keep the
    ${...} interpolations of template literals, because that is where variables
    are actually used.

    Lesson prose is full of English that reads as code: 'let go of the rope',
    'let us count'. Scanning raw source matched every one of those. Blanking
    template literals wholesale was worse: it hid the real uses and produced 227
    phantom findings. Keep the interpolations, drop the words.

    Invariant: CI is green on this repo, so this scan must report zero here. Any
    finding on untouched files is a bug in this function, not in the codebase.
    """
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    src = re.sub(r'//[^\n]*', '', src)

    def keep_interps(m):
        inner = m.group(0)[1:-1]
        parts = re.findall(r'\$\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}', inner)
        return '`' + ''.join('${' + x + '}' for x in parts) + '`'

    src = re.sub(r'`(?:\\.|[^`\\])*`', keep_interps, src, flags=re.S)
    src = re.sub(r"'(?:\\.|[^'\\\n])*'", "''", src)
    src = re.sub(r'"(?:\\.|[^"\\\n])*"', '""', src)
    return src


def body_after(text, open_index):
    depth, i = 1, open_index
    while i < len(text) and depth:
        if text[i] == '{':
            depth += 1
        elif text[i] == '}':
            depth -= 1
        i += 1
    return text[open_index:i]


def check(path):
    raw = open(path).read()
    t = strip(raw)
    problems = []

    # module-level and nested const/let, skipping anything exported
    for m in re.finditer(r'(?<!export )\b(?:const|let)\s+([A-Za-z_]\w*)', t):
        nm, st, en = m.group(1), m.start(), m.end()
        others = [x for x in re.finditer(r'\b' + re.escape(nm) + r'\b', t)
                  if not (st <= x.start() < en)]
        if not others:
            problems.append("'" + nm + "' declared but never read (line "
                            + str(t[:st].count('\n') + 1) + ')')

    # function parameters, both `function f(...)` and `const f = (...) =>`
    for m in re.finditer(r'function\s+(\w+)\s*\(([^)]*)\)[^{;]*\{', t):
        fname, params, body = m.group(1), m.group(2), body_after(t, m.end())
        for prm in params.split(','):
            nm = prm.split(':')[0].split('=')[0].strip()
            if not nm.startswith('_') and re.match(r'^[A-Za-z]\w*$', nm):
                if not re.search(r'\b' + re.escape(nm) + r'\b', body):
                    problems.append("parameter '" + nm + "' unused in " + fname + '()')

    # destructured scene params kept but never referenced
    for m in re.finditer(r'drawScene\s*=\s*\(\{([^}]+)\}', t):
        body = t[m.end():]
        for prm in m.group(1).split(','):
            nm = prm.strip()
            if nm and not re.search(r'\b' + re.escape(nm) + r'\b', body):
                problems.append("scene field '" + nm + "' destructured but unused")

    # imports never referenced (matched on raw source, which keeps the path)
    for m in re.finditer(r"import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+'[^']+';", raw):
        for tok in m.group(1).split(','):
            nm = tok.strip().split(' as ')[-1]
            # search raw, not the stripped copy: stripping shifts every offset
            if nm and not re.search(r'\b' + re.escape(nm) + r'\b', raw[m.end():]):
                problems.append("imports '" + nm + "' but never uses it")

    # a const assigned one of two numeric literals, then compared with a third:
    # tsc infers the literal union and rejects the comparison as TS2367
    for m in re.finditer(r'\b(?:const|let)\s+([A-Za-z_]\w*)\s*=\s*[^;?]*\?\s*'
                         r'(-?\d+(?:\.\d+)?)\s*:\s*(-?\d+(?:\.\d+)?)\s*;', t):
        nm, lo, hi = m.group(1), m.group(2), m.group(3)
        allowed = {lo, hi}
        for cmp_m in re.finditer(r'\b' + re.escape(nm) + r'\s*(?:===|!==)\s*'
                                 r'(-?\d+(?:\.\d+)?)\b', t):
            if cmp_m.group(1) not in allowed:
                problems.append("'" + nm + "' is " + lo + '|' + hi + ' but is compared with '
                                + cmp_m.group(1) + ' (line '
                                + str(t[:cmp_m.start()].count('\n') + 1)
                                + '): tsc rejects that comparison')
    return problems


SELFTEST = [
    # the real failure: puffs is 5|2 and the guard tests for 1
    ('const puffs = warmer ? 5 : 2;\nconst f = puffs === 1 ? 0 : i / (puffs - 1);', 1),
    # comparing against one of its own two values is fine
    ('const puffs = warmer ? 5 : 2;\nif (puffs === 5) { go(); }\nuse(puffs);', 0),
    ('const dir = warmer ? -1 : 1;\nif (dir === -1) { up(); }\nuse(dir);', 0),
    # a plain number is not a literal union, so any comparison is legal
    ('const n: number = warmer ? 5 : 2;\nif (n === 1) { go(); }\nuse(n);', 0),
    # arithmetic use, never compared
    ('const dir = warmer ? -1 : 1;\nconst y = base + dir * 10;\nuse(y);', 0),
]


def selftest():
    import tempfile
    bad = 0
    for src, want in SELFTEST:
        with tempfile.NamedTemporaryFile('w', suffix='.ts', delete=False) as fh:
            fh.write(src)
            path = fh.name
        got = [p for p in check(path) if 'compared with' in p]
        os.unlink(path)
        if len(got) != want:
            bad += 1
            print('selftest FAILED: wanted ' + str(want) + ', got ' + str(len(got))
                  + ' for ' + repr(src[:60]))
    print('selftest ok' if not bad else str(bad) + ' selftest case(s) failed')
    return 1 if bad else 0


def main():
    if '--selftest' in sys.argv:
        return selftest()
    files = [a for a in sys.argv[1:] if not a.startswith('--')] or changed_files()
    files = [f for f in files if f.endswith(('.ts', '.tsx'))]
    if not files:
        print('no changed TypeScript files to scan')
        return 0
    total = 0
    for f in files:
        probs = check(f)
        total += len(probs)
        flag = '' if not probs else '   <-- would fail CI'
        print(f.split('/')[-1] + ': ' + str(len(probs)) + ' problem(s)' + flag)
        for p in probs:
            print('    - ' + p)
    print()
    print(str(len(files)) + ' file(s) scanned, ' + str(total) + ' problem(s)')
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
