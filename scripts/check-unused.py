#!/usr/bin/env python3
"""Find unused symbols in changed TypeScript, before CI does.

Three CI runs have been lost to this: a raw2 in a readout, a module-level const
declared for the top of a range, and a function parameter left behind when the
string that used it was rewritten. tsc runs with noUnusedLocals and
noUnusedParameters, and there is no Node on this machine, so this stands in.

Usage:  python3 scripts/check-unused.py [file ...]
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
    return problems


def main():
    files = sys.argv[1:] or changed_files()
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
