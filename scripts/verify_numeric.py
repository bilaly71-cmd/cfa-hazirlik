"""Sayısal soruların cevaplarını Python ile yeniden hesaplar.

Kullanım:
    python scripts/verify_numeric.py                 # content/ altındaki tüm modül paketleri
    python scripts/verify_numeric.py <dosya|klasör>  # belirli dosya/klasör
    python scripts/verify_numeric.py --json reports/numeric_report.json

Her `numeric` alanlı soruda:
  * `numeric.expr` hesaplanır,
  * doğru şıkkın `value` değeri ile göreli tolerans (varsayılan %0,5) içinde eşleşmeli,
  * diğer şıkların değerleri tolerans DIŞINDA olmalı (tek doğru şık).
Çıkış kodu: hata varsa 1.
"""
from __future__ import annotations

import json
import math
import statistics
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_TOL = 0.005


# ---- finans yardımcıları (Excel / BA II Plus işaret kuralı) ----
def fv(rate, n, pmt, pv=0.0, when=0):
    if rate == 0:
        return -(pv + pmt * n)
    f = (1 + rate) ** n
    return -(pv * f + pmt * (1 + rate * when) * (f - 1) / rate)


def pv(rate, n, pmt, fv=0.0, when=0):
    if rate == 0:
        return -(fv + pmt * n)
    f = (1 + rate) ** n
    return -(fv + pmt * (1 + rate * when) * (f - 1) / rate) / f


def pmt(rate, n, pv, fv=0.0, when=0):
    if rate == 0:
        return -(pv + fv) / n
    f = (1 + rate) ** n
    return -(pv * f + fv) * rate / ((1 + rate * when) * (f - 1))


def npv(rate, cfs):
    """cfs[0] t=0 nakit akışıdır (BA II Plus CF0 gibi)."""
    return sum(cf / (1 + rate) ** t for t, cf in enumerate(cfs))


def irr(cfs, lo=-0.99, hi=10.0, tol=1e-12):
    f_lo, f_hi = npv(lo, cfs), npv(hi, cfs)
    if f_lo * f_hi > 0:
        raise ValueError("IRR bulunamadı (işaret değişimi yok)")
    for _ in range(500):
        mid = (lo + hi) / 2
        f_mid = npv(mid, cfs)
        if abs(f_mid) < tol:
            return mid
        if f_lo * f_mid < 0:
            hi, f_hi = mid, f_mid
        else:
            lo, f_lo = mid, f_mid
    return (lo + hi) / 2


def mean(xs):
    return statistics.fmean(xs)


def stdev_s(xs):
    return statistics.stdev(xs)


def stdev_p(xs):
    return statistics.pstdev(xs)


def var_s(xs):
    return statistics.variance(xs)


def var_p(xs):
    return statistics.pvariance(xs)


def cov_s(xs, ys):
    mx, my = mean(xs), mean(ys)
    return sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / (len(xs) - 1)


def corr(xs, ys):
    return cov_s(xs, ys) / (stdev_s(xs) * stdev_s(ys))


def geomean_return(rs):
    p = 1.0
    for r in rs:
        p *= 1 + r
    return p ** (1 / len(rs)) - 1


def ear(apr, m):
    """Yıllık nominal orandan efektif yıllık orana (m = yıllık bileşik sayısı; m=inf sürekli)."""
    if m == math.inf:
        return math.exp(apr) - 1
    return (1 + apr / m) ** m - 1


def bond_price(coupon_rate, ytm, n, face=100.0, freq=1):
    c = face * coupon_rate / freq
    r = ytm / freq
    periods = int(round(n * freq))
    return sum(c / (1 + r) ** t for t in range(1, periods + 1)) + face / (1 + r) ** periods


def macaulay(coupon_rate, ytm, n, freq=1, face=100.0):
    """Yıl cinsinden Macaulay durasyonu."""
    c = face * coupon_rate / freq
    r = ytm / freq
    periods = int(round(n * freq))
    price = bond_price(coupon_rate, ytm, n, face, freq)
    w = sum(t * c / (1 + r) ** t for t in range(1, periods + 1)) + periods * face / (1 + r) ** periods
    return w / price / freq


def mod_duration(coupon_rate, ytm, n, freq=1, face=100.0):
    return macaulay(coupon_rate, ytm, n, freq, face) / (1 + ytm / freq)


SAFE = {
    "math": math, "abs": abs, "min": min, "max": max, "sum": sum, "round": round, "len": len,
    "pow": pow, "range": range, "sorted": sorted, "zip": zip, "list": list, "enumerate": enumerate,
    "exp": math.exp, "log": math.log, "sqrt": math.sqrt, "inf": math.inf, "e": math.e,
    "fv": fv, "pv": pv, "pmt": pmt, "npv": npv, "irr": irr, "mean": mean, "stdev_s": stdev_s,
    "stdev_p": stdev_p, "var_s": var_s, "var_p": var_p, "cov_s": cov_s, "corr": corr,
    "geomean_return": geomean_return, "ear": ear, "bond_price": bond_price, "macaulay": macaulay,
    "mod_duration": mod_duration,
}


def evaluate(expr: str) -> float:
    return float(eval(expr, {"__builtins__": {}}, dict(SAFE)))  # noqa: S307 - yalnızca proje içeriği


def close(a: float, b: float, tol: float) -> bool:
    scale = max(abs(a), abs(b), 1e-9)
    return abs(a - b) / scale <= tol or abs(a - b) <= 1e-9


def check_question(q: dict) -> list[str]:
    num = q.get("numeric")
    if not num:
        return []
    errs: list[str] = []
    tol = num.get("tol", DEFAULT_TOL)
    try:
        val = evaluate(num["expr"])
    except Exception as exc:  # noqa: BLE001
        return [f"ifade hesaplanamadı: {exc}"]
    opts = {o["key"]: o for o in q.get("options", [])}
    ans = opts.get(q.get("answer"))
    if ans is None or "value" not in ans:
        return ["doğru şıkta value yok"]
    if not close(val, ans["value"], tol):
        errs.append(f"hesap {val:.6g} ≠ doğru şık {q['answer']}={ans['value']} (tol {tol})")
    for k, o in opts.items():
        if k == q["answer"] or "value" not in o:
            continue
        if close(val, o["value"], tol):
            errs.append(f"yanlış şık {k}={o['value']} de hesapla eşleşiyor (birden fazla doğru)")
    return errs


def iter_files(args: list[str]):
    targets = [Path(a).resolve() for a in args] or [ROOT / "content"]
    for t in targets:
        if t.is_dir():
            yield from sorted(p for p in t.rglob("*.json") if "syllabus" not in p.parts)
        elif t.suffix == ".json":
            yield t


def questions_in(data):
    if isinstance(data, dict) and isinstance(data.get("questions"), list):
        return data["questions"]
    if isinstance(data, list) and data and isinstance(data[0], dict) and "stem_en" in data[0]:
        return data
    return []


def main(argv: list[str]) -> int:
    json_out = None
    if "--json" in argv:
        i = argv.index("--json")
        json_out = Path(argv[i + 1])
        argv = argv[:i] + argv[i + 2:]
    checked = failed = 0
    report = []
    for path in iter_files(argv):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception as exc:  # noqa: BLE001
            print(f"[JSON] {path}: {exc}")
            failed += 1
            continue
        for q in questions_in(data):
            if not q.get("numeric"):
                continue
            checked += 1
            errs = check_question(q)
            if errs:
                failed += 1
                for e in errs:
                    print(f"[HATA] {q.get('id')}: {e}")
            report.append({"id": q.get("id"), "file": str(path.relative_to(ROOT)), "ok": not errs, "errors": errs})
    print(f"Sayısal kontrol: {checked} soru, {failed} hatalı")
    if json_out:
        json_out.parent.mkdir(parents=True, exist_ok=True)
        json_out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main(sys.argv[1:]))
