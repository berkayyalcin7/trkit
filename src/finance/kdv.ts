export interface KDVBreakdown {
  net: number
  kdv: number
  gross: number
}

function round2(value: number): number {
  return Math.round(value * 100) / 100
}

function isValidInput(amount: number, rate: number): boolean {
  return Number.isFinite(amount) && Number.isFinite(rate) && rate >= 0
}

/**
 * Adds VAT to a net amount; rate is a percentage (e.g. 20 for 20%).
 * Net tutara KDV ekler; oran her zaman parametredir, pakete gömülü oran yoktur.
 *
 * @example
 * addKDV(100, 20) // 120
 */
export function addKDV(netAmount: number, rate: number): number | null {
  if (!isValidInput(netAmount, rate)) return null
  return round2(netAmount * (1 + rate / 100))
}

/**
 * Extracts the net amount from a VAT-inclusive gross amount.
 * KDV dahil tutardan net tutarı çıkarır.
 *
 * @example
 * removeKDV(120, 20) // 100
 */
export function removeKDV(grossAmount: number, rate: number): number | null {
  if (!isValidInput(grossAmount, rate)) return null
  return round2(grossAmount / (1 + rate / 100))
}

/**
 * Splits a gross amount into net, VAT and gross parts.
 * KDV dahil tutarı net / KDV / brüt olarak ayrıştırır.
 *
 * @example
 * splitKDV(120, 20) // { net: 100, kdv: 20, gross: 120 }
 */
export function splitKDV(grossAmount: number, rate: number): KDVBreakdown | null {
  const net = removeKDV(grossAmount, rate)
  if (net === null) return null
  return { net, kdv: round2(grossAmount - net), gross: round2(grossAmount) }
}
