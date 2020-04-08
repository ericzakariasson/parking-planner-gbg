import * as React from "react"
import { ArrowIcon } from "../components/icon"
import { Input } from "../components/input"
import { Layout } from "../components/layout"
import { ParkingAreaItem } from "../components/parking-area-item"
import { useFilteredParkingAreas } from "../hooks/useFilteredParkingAreas"
import { SortDirection, sortOptions, SortProperty } from "../utils/parking"

const IndexPage = () => {
  const [startTime, setStartTime] = React.useState("08:00")
  const [endTime, setEndTime] = React.useState("17:00")
  const [searchTerm, setSearchTerm] = React.useState("")

  const [sortProperty, setSortProperty] = React.useState(SortProperty.Price)
  const [sortDirection, setSortDirection] = React.useState(SortDirection.Asc)

  const { filtered } = useFilteredParkingAreas(
    startTime,
    endTime,
    {
      searchTerm,
    },
    { sortDirection, sortProperty }
  )

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
      <div className="w-1/2 inline-flex bg-gray-200 mb-4 rounded items-center overflow-hidden">
        <select
          value={sortProperty}
          onChange={e => setSortProperty(e.target.value as SortProperty)}
          className="text-gray-700 block flex-grow appearance-none bg-transparent leading-tight py-3 pl-4 pr-2"
        >
          {sortOptions.map(o => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="py-3 px-3 bg-gray-300">
          <ArrowIcon
            className="text-gray-700"
            size={18}
            onClick={() =>
              setSortDirection(direction =>
                direction === SortDirection.Asc
                  ? SortDirection.Desc
                  : SortDirection.Asc
              )
            }
            direction={sortDirection === SortDirection.Asc ? "up" : "down"}
          />
        </div>
      </div>
      <section>
        {filtered.map(item => (
          <ParkingAreaItem key={item.id} {...item} />
        ))}
      </section>
    </Layout>
  )
}

export default IndexPage
