// TVM çözücü (BA II Plus işaret kuralı: PV + PMT·a + FV·v = 0 biçiminde nakit akışı; para çıkışı negatif).
// r: dönem faizi (ondalık), n: dönem sayısı, when: 0 = dönem sonu (END), 1 = dönem başı (BGN).

export type Tvm = { n: number; r: number; pv: number; pmt: number; fv: number; when: 0 | 1 };

/** PV·(1+r)^n + PMT·(1+r·when)·((1+r)^n − 1)/r + FV = 0 denkleminin sol tarafı. */
function f({ n, r, pv, pmt, fv, when }: Tvm) {
  if (Math.abs(r) < 1e-12) return pv + pmt * n + fv;
  const g = Math.pow(1 + r, n);
  return pv * g + pmt * (1 + r * when) * ((g - 1) / r) + fv;
}

export function solvePv(t: Omit<Tvm, 'pv'>) {
  const base = f({ ...t, pv: 0 });
  return -base / (Math.abs(t.r) < 1e-12 ? 1 : Math.pow(1 + t.r, t.n));
}
export function solveFv(t: Omit<Tvm, 'fv'>) {
  return -f({ ...t, fv: 0 });
}
export function solvePmt(t: Omit<Tvm, 'pmt'>) {
  const one = f({ ...t, pmt: 1 }) - f({ ...t, pmt: 0 });
  return -f({ ...t, pmt: 0 }) / one;
}
/** Bisection ile r (ondalık dönem faizi) bul; çözüm yoksa NaN. */
export function solveRate(t: Omit<Tvm, 'r'>) {
  let lo = -0.99;
  let hi = 10;
  let flo = f({ ...t, r: lo });
  const fhi = f({ ...t, r: hi });
  if (!isFinite(flo) || !isFinite(fhi) || flo * fhi > 0) return NaN;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const fm = f({ ...t, r: mid });
    if (flo * fm <= 0) hi = mid;
    else {
      lo = mid;
      flo = fm;
    }
  }
  return (lo + hi) / 2;
}
/** Dönem sayısı N (r ≠ 0 için kapalı form, r = 0 için doğrusal). */
export function solveN(t: Omit<Tvm, 'n'>) {
  const { r, pv, pmt, fv, when } = t;
  if (Math.abs(r) < 1e-12) return -(pv + fv) / pmt;
  const k = pmt * (1 + r * when) / r;
  const num = k - fv;
  const den = k + pv;
  if (num / den <= 0) return NaN;
  return Math.log(num / den) / Math.log(1 + r);
}
