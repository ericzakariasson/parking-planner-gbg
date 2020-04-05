import * as React from "react"

import { Layout } from "../components/layout"

function parseTime(value: string) {
  const [hourStr, minuteStr] = value.split(":")
  const hour = parseInt(hourStr)
  const minute = parseInt(minuteStr)
  return hour + minute / 60
}

const inputStyle =
  "block shadow border rounded leading-tight py-3 px-4 w-full appearance-none focus:outline-none focus:shadow-outline"

const IndexPage = () => {
  const [startTime, setStartTime] = React.useState("")
  const [endTime, setEndTime] = React.useState("")

  const start = parseTime(startTime)
  const end = parseTime(endTime)

  const duration = end - start
  const minuteDuration = Math.round((duration % 1) * 60)
  const hourDuration = duration - (duration % 1)

  return (
    <Layout title="Home">
      <div className="mb-2">
        <p>Hur länge ska du parkera?</p>
      </div>
      <div className="flex">
        <div className="w-full w-1/2 mr-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="from-time"
          >
            Från
          </label>
          <input
            className={inputStyle}
            id="from-time"
            type="time"
            placeholder="08:00"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
        </div>
        <div className="w-full w-1/2">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="to-time"
          >
            Till
          </label>
          <input
            className={inputStyle}
            id="to-time"
            type="time"
            placeholder="17:00"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <h1>Hours: {hourDuration}</h1>
      <h1>minute: {minuteDuration}</h1>
    </Layout>
  )
}

export default IndexPage
