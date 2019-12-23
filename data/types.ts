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

export interface ParkingArea {
  parkingId: string
  name: string
  location: Location
  price: ParkingPrice
  url: string
}

export interface ParkingAreaRaw {
  id: string
  title: string
  lat: number
  lng: number
  type: "P-hus/tomt"
  regularPrice: string
  placecode: string
  url: string
}
