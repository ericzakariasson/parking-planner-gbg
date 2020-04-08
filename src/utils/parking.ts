import { ParkingAreaWithPrice } from "../../data/types"

export interface SelectOption<TValue> {
  value: TValue
  label: string
}

export enum SortProperty {
  Price = "Price",
  Name = "Name",
  Distance = "Distance",
}

export enum SortDirection {
  Asc = "Asc",
  Desc = "Desc",
}

export const sortOptions: SelectOption<SortProperty>[] = [
  {
    value: SortProperty.Price,
    label: "Pris",
  },
  {
    value: SortProperty.Name,
    label: "Namn",
  },
  {
    value: SortProperty.Distance,
    label: "Avstånd",
  },
]

export const sortParking = (
  sortProperty: SortProperty,
  sortDirection: SortDirection
) => (x: ParkingAreaWithPrice, y: ParkingAreaWithPrice) => {
  const a = sortDirection === SortDirection.Desc ? y : x
  const b = sortDirection === SortDirection.Desc ? x : y
  switch (sortProperty) {
    case SortProperty.Price:
      return a.totalPrice - b.totalPrice
    case SortProperty.Name:
      return a.name.localeCompare(b.name)
    default:
      return 0
  }
}
