import * as React from "react"

import { ParkingArea } from "../../data/types"
import { formatPrice } from "../utils/format"

interface ParkingAreaItemProps extends ParkingArea {
  totalPrice: number
}

export const ParkingAreaItem: React.FC<ParkingAreaItemProps> = ({
  name,
  price,
  url,
  totalPrice,
}) => {
  return (
    <article
      className="bg-white shadow rounded mb-4 p-3 flex flex-col"
      onClick={() => console.log(price)}
    >
      <div className="flex justify-between mb-2">
        <h1 className="font-medium">{name}</h1>
        <h2 className="font-bold">{formatPrice(totalPrice)}</h2>
      </div>
      <div className="flex justify-between">
        <p>{formatPrice(price.hour._12 ?? 0)}/tim</p>
        <a className="underline text-gray-500" href={url} target="_blank">
          Läs mer
        </a>
      </div>
    </article>
  )
}
