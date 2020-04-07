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
  const hasSamePriceEveryHour =
    [...new Set(Object.values(price.hour))].length === 1

  return (
    <article
      className="bg-white shadow rounded mb-4 p-3 flex flex-col"
      onClick={() => console.log(price)}
    >
      <div className="flex justify-between mb-2">
        <h1 className="font-medium text-gray-900">{name}</h1>
        <h2 className="font-bold text-gray-900">{formatPrice(totalPrice)}</h2>
      </div>
      <div className="flex justify-between">
        {hasSamePriceEveryHour ? (
          <p className="text-gray-700">
            {formatPrice(price.hour._12 ?? 0)}/tim
          </p>
        ) : (
          <p className="text-gray-700">Varierande pris</p>
        )}
        <a className="underline text-gray-500" href={url} target="_blank">
          Läs mer
        </a>
      </div>
    </article>
  )
}
