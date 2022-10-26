export function laceToAdaString(lace: string) {
  return `${(parseInt(lace) / 1000000)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₳DA`;
}

export function formatNumber(str: string) {
  return parseInt(str)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function shortenStakeAddr(addr: string) {
  let start = addr.substring(0, 9);
  let end = addr.substring(addr.length - 4, addr.length);
  return start + "..." + end;
}
