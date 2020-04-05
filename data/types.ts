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

interface Location {
  lat: number
  lng: number
}

interface Spots {
  total: number
}

export interface ParkingArea {
  parkingId: string
  name: string
  location: Location
  price: ParkingPrice
  spots: Spots
  url: string
}

export interface ParkingAreaRaw {
  id: string
  title: string
  amountOfSpots: string
  lat: number
  lng: number
  type: "P-hus/tomt"
  regularPrice: string
  placecode: string
  url: string
}
