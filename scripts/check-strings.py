#!/usr/bin/env python3
"""Find string literals that do not close before end of line.

Rewriting the contents of a single-quoted string with text containing an
apostrophe ends the string early: lens: 'A magnet's pull ...' is a syntax error,
and tsc reports a cascade of "',' expected" on that one line. No lesson checker
parses TypeScript, so a file that cannot compile passed all of them.

Usage:  python3 scripts/check-strings.py [file ...]
With no arguments it scans everything changed against origin/main.
"""
import os
import re
import subprocess
import sys


def changed():
    out = subprocess.run(['git', 'diff', '--name-only', 'origin/main...HEAD'],
                         capture_output=True, text=True).stdout
    out += subprocess.run(['git', 'diff', '--name-only'],
                          capture_output=True, text=True).stdout
    return sorted({f for f in out.split()
                   if f.endswith(('.ts', '.tsx')) and os.path.exists(f)})


def unterminated(path):
    """Lines where a ' or " string is still open at the newline."""
    bad = []
    in_block = False
    in_tick = False
    for no, line in enumerate(open(path), 1):
        i, quote = 0, None
        stripped = line
        while i < len(stripped):
            c = stripped[i]
            if in_block:
                if stripped.startswith('*/', i):
                    in_block = False
                    i += 2
                    continue
                i += 1
                continue
            if in_tick:
                if c == '\\':
                    i += 2
                    continue
                if c == '`':
                    in_tick = False
                i += 1
                continue
            if quote is None:
                if stripped.startswith('//', i):
                    break
                if stripped.startswith('/*', i):
                    in_block = True
                    i += 2
                    continue
                if c == '`':
                    in_tick = True
                elif c == '"':
                    quote = c
                elif c == "'":
                    # An apostrophe only opens a string where a value is
                    # expected. In JSX text -- >Outstanding! You've mastered --
                    # it follows a letter and is ordinary punctuation.
                    prev = stripped[:i].rstrip()
                    if not prev or prev[-1] in ':=(,[{?&|+;':
                        quote = c
                i += 1
                continue
            # inside a ' or " string
            if c == '\\':
                i += 2
                continue
            if c == quote:
                quote = None
            i += 1
        if quote is not None:
            bad.append((no, line.rstrip()[:120]))
    return bad


def bad_property_quotes(path):
    """key: 'value' where the value holds an unescaped apostrophe.

    This is the shape that actually broke: replacing the contents of a
    single-quoted property with prose containing an apostrophe closes the string
    early, leaves the rest of the line as bare text, and still looks
    quote-balanced at the newline -- so the unterminated check cannot see it.
    """
    out = []
    pat = re.compile(r"^\s*([A-Za-z_]\w*)\s*:\s*'(.*)'\s*,?\s*$")
    for no, line in enumerate(open(path), 1):
        m = pat.match(line.rstrip('\n'))
        if not m:
            continue
        value = m.group(2)
        # Split on unescaped apostrophes. A union type -- target: 'a' | 'b' --
        # leaves only whitespace and pipes between the quotes; prose does not.
        parts, buf, i = [], '', 0
        while i < len(value):
            if value[i] == '\\':
                buf += value[i:i + 2]
                i += 2
                continue
            if value[i] == "'":
                parts.append(buf)
                buf = ''
                i += 1
                continue
            buf += value[i]
            i += 1
        parts.append(buf)
        if len(parts) == 1:
            continue
        between = parts[1:-1] if len(parts) > 2 else [parts[1]]
        if all(re.fullmatch(r'[\s|]*', b) for b in between):
            continue
        out.append((no, m.group(1), line.strip()[:110]))
    return out


def main():
    files = sys.argv[1:] or changed()
    files = [f for f in files if f.endswith(('.ts', '.tsx'))]
    if not files:
        print('no changed TypeScript files to scan')
        return 0
    total = 0
    for f in files:
        bad = unterminated(f)
        props = bad_property_quotes(f)
        total += len(bad) + len(props)
        n = len(bad) + len(props)
        flag = '' if not n else '   <-- will not parse'
        print(f.split('/')[-1] + ': ' + str(n) + ' problem(s)' + flag)
        for no, txt in bad:
            print('    line ' + str(no) + ': unterminated: ' + txt)
        for no, key, txt in props:
            print('    line ' + str(no) + ": unescaped apostrophe in '" + key + "': " + txt)
    print()
    print(str(len(files)) + ' file(s) scanned, ' + str(total) + ' problem(s)')
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
