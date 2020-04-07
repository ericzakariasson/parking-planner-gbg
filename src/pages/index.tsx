import * as React from "react"
import { Input } from "../components/input"
import { Layout } from "../components/layout"
import { ParkingAreaItem } from "../components/parking-area-item"
import { parkingAreaQuery } from "../graphql/queries/parking-area.query"
import { useFilteredParkingAreas } from "../hooks/useFilteredParkingAreas"
import { ParkingArea, ParkingAreaWithPrice } from "../../data/types"

interface SelectOption<TValue> {
  value: TValue
  label: string
}

enum SortProperty {
  Name = "Name",
  Price = "Price",
  Distance = "Distance",
}

enum SortDirection {
  Asc = "Asc",
  Desc = "Desc",
}

const sortOptions: SelectOption<SortProperty>[] = [
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

const IndexPage = () => {
  const [startTime, setStartTime] = React.useState("08:00")
  const [endTime, setEndTime] = React.useState("17:00")
  const [searchTerm, setSearchTerm] = React.useState("")

  const [sortProperty, setSortProperty] = React.useState(SortProperty.Price)
  const [sortDirection, setSortDirection] = React.useState(SortDirection.Asc)

  const { filtered } = useFilteredParkingAreas(startTime, endTime, {
    searchTerm,
  })

  return (
    <Layout title="Parkering GBG">
      <div className="mb-2">
        <p>Hur länge ska du parkera?</p>
      </div>
      <div className="flex mb-4">
        <div className="w-full w-1/2 mr-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="from-time"
          >
            Från
          </label>
          <Input
            id="from-time"
            type="time"
            placeholder="08:00"
            value={startTime}
            onChange={value => setStartTime(value)}
          />
        </div>
        <div className="w-full w-1/2">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="to-time"
          >
            Till
          </label>
          <Input
            id="to-time"
            type="time"
            placeholder="17:00"
            value={endTime}
            onChange={value => setEndTime(value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="search-term-input"
        >
          Sök parkering
        </label>
        <Input
          value={searchTerm}
          onChange={value => setSearchTerm(value)}
          id="search-term-input"
        />
      </div>
      <div>
        <select
          value={sortProperty}
          onChange={e => setSortProperty(e.target.value as SortProperty)}
        >
          {sortOptions.map(o => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <section>
        {filtered.sort(sortParking(sortProperty, sortDirection)).map(item => (
          <ParkingAreaItem key={item.id} {...item} />
        ))}
      </section>
    </Layout>
  )
}

const sortParking = (
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

export default IndexPage
