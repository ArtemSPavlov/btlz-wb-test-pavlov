export function wbCoefToFloat(coef: string): number | null {
  return coef === '-' ? null : Number.parseFloat(coef.replace(',', '.'));
}