"""Şık yamasını uygular: out_*.json (id + options[{key,en,tr}]) → content/L1/**/*.json.

Kullanım: python scripts/apply_options_patch.py <yama.json> [<yama2.json> ...]
Yalnızca şıkların en/tr metnini değiştirir (value, key, answer, açıklamalar dokunulmaz).
Güvenlik: key kümesi aynı olmalı; 'numeric' soruların şıkları atlanır.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main(paths: list[str]) -> int:
    patch: dict[str, list[dict]] = {}
    for p in paths:
        for item in json.loads(Path(p).read_text(encoding="utf-8")):
            patch[item["id"]] = item["options"]
    applied = skipped = 0
    seen: set[str] = set()
    for f in sorted((ROOT / "content" / "L1").rglob("*.json")):
        raw = f.read_text(encoding="utf-8")
        data = json.loads(raw)
        changed = False
        for q in data.get("questions", []):
            new = patch.get(q["id"])
            if not new:
                continue
            seen.add(q["id"])
            if q.get("numeric") or {o["key"] for o in new} != {o["key"] for o in q["options"]}:
                skipped += 1
                continue
            by = {o["key"]: o for o in new}
            for o in q["options"]:
                n = by[o["key"]]
                if n["en"].strip() and n["tr"].strip() and (o["en"] != n["en"] or o["tr"] != n["tr"]):
                    o["en"], o["tr"] = n["en"].strip(), n["tr"].strip()
                    changed = True
            applied += 1
        if changed:
            crlf = "\r\n" in raw
            out = json.dumps(data, ensure_ascii=False, indent=2)
            f.write_text(out.replace("\n", "\r\n") if crlf else out, encoding="utf-8", newline="")
    missing = set(patch) - seen
    print(f"uygulanan soru: {applied}, atlanan: {skipped}, bulunamayan id: {len(missing)}")
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main(sys.argv[1:]))
