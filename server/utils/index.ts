export function integerToTwoDecimal(number: number) {
  return parseFloat((Math.round(number * 100) / 100).toFixed(2))
}
