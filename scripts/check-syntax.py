#!/usr/bin/env python3
"""Will this TypeScript file parse at all?

There is no Node runtime here, so tsc is only available in CI, and three separate
breakages have reached it by this one route: a lesson string that stops parsing.

check-strings.py catches the apostrophe case and the open-at-newline case. It does
not check structure, and structure is how Big Idea 18 failed twice in a row:

  1. A Python heredoc rewrote a content: string and turned \\n into a real newline,
     splitting the literal across lines -- "Unterminated string literal", then ten
     "',' expected" on the following line.
  2. The repair script then swallowed the file's closing braces into the last
     content string, because that string ends the object and so has no trailing
     comma. The file stayed quote-balanced and every other checker passed, while
     tsc reported "Invalid character".

This walks the file once, string- and comment-aware, and reports a quoted string
left open at a newline or an unbalanced brace, bracket or paren. It is not a
parser and does not pretend to be: it answers the one question that has actually
broken the build.

Usage:  python3 scripts/check-syntax.py [path ...]      (default: changed files)
        python3 scripts/check-syntax.py --selftest
"""
import os
import subprocess
import sys

OPEN = {'{': '}', '(': ')', '[': ']'}
CLOSE = {'}': '{', ')': '(', ']': '['}


def changed():
    out = subprocess.run(['git', 'diff', '--name-only', 'origin/main...HEAD'],
                         capture_output=True, text=True).stdout
    out += subprocess.run(['git', 'diff', '--name-only'],
                          capture_output=True, text=True).stdout
    out += subprocess.run(['git', 'ls-files', '-o', '--exclude-standard'],
                          capture_output=True, text=True).stdout
    return sorted({f for f in out.split()
                   if f.endswith(('.ts', '.tsx')) and os.path.exists(f)})


def typescript_only(files):
    """This scanner knows TypeScript. Anything else is filtered by extension."""
    return [f for f in files if f.endswith(('.ts', '.tsx'))]


def scan(src):
    """Problems in one file's text, as a list of strings."""
    i, n, line = 0, len(src), 1
    depth = {'{': 0, '(': 0, '[': 0}
    problems = []
    while i < n:
        c = src[i]
        if c == '\n':
            line += 1
            i += 1
            continue
        if src.startswith('//', i):
            j = src.find('\n', i)
            i = n if j < 0 else j
            continue
        if src.startswith('/*', i):
            j = src.find('*/', i)
            if j < 0:
                problems.append('unclosed block comment from line %d' % line)
                break
            line += src.count('\n', i, j)
            i = j + 2
            continue
        if c == "'":
            # An apostrophe only opens a string where a value is expected. In JSX
            # text -- >Outstanding! You've mastered -- it follows a letter and is
            # ordinary punctuation, which is the same exclusion check-strings.py
            # makes, and it is why this scanner reads a CI-green repo as clean.
            prev = src[:i].rstrip()
            if prev and prev[-1] not in ':=(,[{?&|+;<>':
                i += 1
                continue
        if c in '"\'`':
            quote, start = c, line
            i += 1
            while i < n:
                if src[i] == '\\':
                    i += 2
                    continue
                if src[i] == '\n':
                    line += 1
                    if quote != '`':
                        problems.append('line %d: %s-quoted string still open at the '
                                        'newline' % (start, quote))
                        break
                elif src[i] == quote:
                    i += 1
                    break
                i += 1
            continue
        if c in OPEN:
            depth[c] += 1
        elif c in CLOSE:
            depth[CLOSE[c]] -= 1
            if depth[CLOSE[c]] < 0:
                problems.append('line %d: unexpected %s' % (line, c))
                depth[CLOSE[c]] = 0
        i += 1
    for opener, left in depth.items():
        if left:
            problems.append('%d unclosed %s at end of file' % (left, opener))
    return problems


def selftest():
    """Both real failures, plus the shapes that must stay quiet."""
    split_string = (
        'export const a = {\n'
        '    node: {\n'
        '        content: "first part and it\n'
        '\n'
        'second part",\n'
        '    }\n'
        '};\n')
    assert any('still open at the newline' in p for p in scan(split_string)), \
        'no longer catches a content string split by a real newline'

    swallowed_tail = (
        'export const a = {\n'
        '    node: {\n'
        '        content: "the prose\\n        }\\n    };\\n}\\n'
        '')
    assert scan(swallowed_tail), 'no longer catches a swallowed closing brace'

    # things that must NOT be reported
    fine = (
        "const t = `a template\n"
        "spanning lines ${x} fine`;\n"
        "const s = 'an apostrophe in prose is escaped: it\\'s fine';\n"
        "// a comment with an unbalanced { and a lone \" quote\n"
        "/* a block comment with ( and ' too */\n"
        "const u: 'plant' | 'puppy' = 'plant';\n"
        "const jsx = <p>You've mastered it</p>;\n")
    assert not scan(fine), \
        'reporting shapes that are perfectly legal: ' + repr(scan(fine))
    # the real line that made this necessary, from AssessmentShell.tsx
    jsx = ('{pct >= 80 && <p className="a">Outstanding! '
           "You've mastered this Big Idea!</p>}\n")
    assert not scan(jsx), 'JSX apostrophe read as a string opener'

    balanced = 'function f() { return [1, 2, {a: (3)}]; }\n'
    assert not scan(balanced), 'balanced code reported'
    # Only TypeScript reaches scan(). A hand-passed .py file once did, and every
    # docstring in it was reported as an unterminated string.
    assert typescript_only(['a.ts', 'b.tsx', 'c.py', 'd.md']) == ['a.ts', 'b.tsx'], \
        'the extension filter no longer keeps non-TypeScript out'
    print('selftest ok')
    return 0


def main():
    args = sys.argv[1:]
    if args[:1] == ['--selftest']:
        return selftest()
    files = args or changed()
    # Explicit paths get the same filter the default list has -- a .py file
    # passed by hand is not something this scanner can judge.
    files = typescript_only(files)
    if not files:
        print('no TypeScript files to scan')
        return 0
    total = 0
    for f in files:
        problems = scan(open(f, encoding='utf-8').read())
        if problems:
            total += len(problems)
            print('%s: %d problem(s)' % (f, len(problems)))
            for p in problems:
                print('    ' + p)
    print()
    print('%d file(s) scanned, %d problem(s)' % (len(files), total))
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
