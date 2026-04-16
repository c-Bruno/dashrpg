#!/usr/bin/env python3
"""
Modernize React imports in TypeScript/TSX files.

1. Remove React.FC<T> and FC<T> annotations (move T to inline prop types).
2. Replace React.* namespace usages with named imports.
3. Consolidate / update the react import statement.

Usage: python3 modernize_react.py <file1> <file2> ...
"""

import re
import sys
from pathlib import Path

# ─── React.* → named import mappings ────────────────────────────────────────
# MouseEvent deliberately excluded: when used as React.MouseEvent<T, MouseEvent>
# importing MouseEvent from react would shadow the DOM MouseEvent used as the
# second type argument, creating a type error.
REACT_NS_MAP = {
    "useState": "useState",
    "useMemo": "useMemo",
    "useEffect": "useEffect",
    "useCallback": "useCallback",
    "useRef": "useRef",
    "useContext": "useContext",
    "useReducer": "useReducer",
    "memo": "memo",
    "ReactNode": "ReactNode",
    "ReactElement": "ReactElement",
    "KeyboardEvent": "KeyboardEvent",
    "ChangeEvent": "ChangeEvent",
    "CSSProperties": "CSSProperties",
}

# ─── Step 1: Remove React.FC / FC type annotations ─────────────────────────

# single-line: const Name: React.FC<Props> = ({ a, b }) =>
_SINGLE = re.compile(
    r"^(\s*const\s+\w+): (?:React\.)?FC(?:<([^>]+)>)? = \(([^)]*)\)(\s*=>)",
)
# multi-line start: const Name: React.FC<Props> = ({
_MULTI_START = re.compile(
    r"^(\s*const\s+\w+): (?:React\.)?FC(?:<([^>]+)>)? = \(\{",
)
# multi-line end: }) =>
_MULTI_END = re.compile(r"^(\s*\})\)\s*(=>.*)")


def _remove_fc(content: str) -> str:
    lines = content.split("\n")
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]

        # — single-line —
        m = _SINGLE.match(line)
        if m:
            name, typ, params, arrow = m.group(1), m.group(2), m.group(3).strip(), m.group(4)
            suffix = line[m.end():]
            if typ and params:
                out.append(f"{name} = ({params}: {typ}){arrow}{suffix}")
            else:
                out.append(f"{name} = ({params}){arrow}{suffix}")
            i += 1
            continue

        # — multi-line start —
        m = _MULTI_START.match(line)
        if m:
            name, typ = m.group(1), m.group(2)
            rest_of_line = line[m.end():]
            out.append(f"{name} = ({{{rest_of_line}")
            i += 1
            if typ:
                while i < len(lines):
                    end = _MULTI_END.match(lines[i])
                    if end:
                        brace, arrow_rest = end.group(1), lines[i][end.end():]
                        out.append(f"{brace}: {typ}) {end.group(2)}{arrow_rest}")
                        i += 1
                        break
                    out.append(lines[i])
                    i += 1
            continue

        out.append(line)
        i += 1

    return "\n".join(out)


# ─── Step 2: Replace React.* usages with named refs ─────────────────────────


def _replace_namespace(content: str) -> tuple[str, set[str]]:
    """Return (modified_content, set_of_names_pulled_from_react_ns)."""
    added: set[str] = set()

    # JSX fragments
    content = re.sub(r"<React\.Fragment>", "<>", content)
    content = re.sub(r"</React\.Fragment>", "</>", content)

    def _sub(m: re.Match) -> str:
        name = m.group(1)
        if name in REACT_NS_MAP:
            added.add(REACT_NS_MAP[name])
            return REACT_NS_MAP[name]
        return m.group(0)  # leave React.MouseEvent etc. intact

    content = re.sub(r"React\.(\w+)", _sub, content)
    return content, added


# ─── Step 3: Rebuild react import statement ──────────────────────────────────

_IMPORT_RE = re.compile(
    r"^import\s+(.*?)\s+from\s+'react';\n?",
    re.MULTILINE,
)


def _update_imports(content: str, additionally_needed: set[str]) -> str:
    matches = list(_IMPORT_RE.finditer(content))
    if not matches:
        return content

    existing_named: set[str] = set()

    for m in matches:
        spec = m.group(1).strip()

        if spec in ("React", "* as React"):
            pass  # default/namespace — handled via react_still_used
        elif spec.startswith("{") and spec.endswith("}"):
            for n in spec[1:-1].split(","):
                n = n.strip()
                if n:
                    existing_named.add(n)
        elif "," in spec:
            # React, { a, b }
            _, named_part = spec.split(",", 1)
            named_part = named_part.strip()
            if named_part.startswith("{") and named_part.endswith("}"):
                for n in named_part[1:-1].split(","):
                    n = n.strip()
                    if n:
                        existing_named.add(n)

    # FC has been removed — drop it
    existing_named.discard("FC")

    # Merge all named imports
    existing_named.update(additionally_needed)

    # Remove all old react imports from the content (back-to-front to keep positions)
    new_content = content
    for m in reversed(matches):
        new_content = new_content[: m.start()] + new_content[m.end():]

    # Check if `React` namespace is still needed (e.g. React.MouseEvent remained)
    react_still_used = bool(re.search(r"\bReact\b", new_content))

    # Build updated import line
    if existing_named:
        named_str = ", ".join(sorted(existing_named))
        if react_still_used:
            new_import = f"import React, {{ {named_str} }} from 'react';\n"
        else:
            new_import = f"import {{ {named_str} }} from 'react';\n"
    else:
        new_import = "import React from 'react';\n" if react_still_used else ""

    # Re-insert at the position of the first original import
    first_pos = matches[0].start()
    new_content = new_content[:first_pos] + new_import + new_content[first_pos:]

    return new_content


# ─── Main pipeline ───────────────────────────────────────────────────────────


def transform(content: str) -> str:
    content = _remove_fc(content)
    content, added = _replace_namespace(content)
    content = _update_imports(content, added)
    return content


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 modernize_react.py <file> [<file> ...]")
        sys.exit(1)

    for path_str in sys.argv[1:]:
        p = Path(path_str)
        original = p.read_text()
        modified = transform(original)
        if modified != original:
            p.write_text(modified)
            print(f"  modified: {path_str}")
        else:
            print(f"  unchanged: {path_str}")
