export function laceToAdaString(lace: string) {
  return `${(parseInt(lace) / 1000000)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₳DA`;
}
