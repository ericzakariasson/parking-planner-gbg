export interface SelectOption<TValue> {
  value: TValue
  label: string
}

export enum SortProperty {
  Name = "Name",
  Price = "Price",
  Distance = "Distance",
}

export enum SortDirection {
  Asc = "Asc",
  Desc = "Desc",
}

export const sortOptions: SelectOption<SortProperty>[] = [
  {
    value: SortProperty.Name,
    label: "Namn",
  },
  {
    value: SortProperty.Price,
    label: "Pris",
  },
  {
    value: SortProperty.Distance,
    label: "Avstånd",
  },
]
