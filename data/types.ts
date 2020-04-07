import { number } from "prop-types"

export type Price = number | null

export type Hours =
  | "_0"
  | "_1"
  | "_2"
  | "_3"
  | "_4"
  | "_5"
  | "_6"
  | "_7"
  | "_8"
  | "_9"
  | "_10"
  | "_11"
  | "_12"
  | "_13"
  | "_14"
  | "_15"
  | "_16"
  | "_17"
  | "_18"
  | "_19"
  | "_20"
  | "_21"
  | "_22"
  | "_23"

export type HourPrice = {
  [key in Hours]: Price
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
  id: string
  parkingId: string
  name: string
  location: Location
  price: ParkingPrice
  spots: Spots
  url: string
}

export interface ParkingAreaWithPrice extends ParkingArea {
  totalPrice: number
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
