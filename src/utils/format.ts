export function formatPrice(value: number) {
  return Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(value)
}
