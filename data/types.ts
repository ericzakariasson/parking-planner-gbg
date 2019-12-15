export type Price = number | null

export type HourPrice = {
  [key: string]: Price
}

export interface ParkingPrice {
  hour: HourPrice
  day: Price
  other: string
  debug?: string
}
