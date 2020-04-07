import { parseInputTypeTime, calculateAreaPriceInTimespan } from "../utils/time"
import { useStaticQuery, graphql } from "gatsby"
import { ParkingArea, ParkingAreaWithPrice } from "../../data/types"

type ParkingAreaQueryData = {
  allParkingArea: {
    nodes: ParkingArea[]
  }
}

interface ParkingFilter {
  searchTerm: string
}

export function useFilteredParkingAreas(
  startTime: string,
  endTime: string,
  filter: ParkingFilter
) {
  const data = useStaticQuery<ParkingAreaQueryData>(graphql`
    query {
      allParkingArea {
        nodes {
          id
          name
          parkingId
          url
          price {
            day
            other
            debug
            hour {
              _0
              _1
              _12
              _11
              _10
              _13
              _14
              _15
              _16
              _17
              _19
              _18
              _2
              _20
              _21
              _22
              _23
              _3
              _4
              _5
              _6
              _9
              _7
              _8
            }
          }
          spots {
            total
          }
          location {
            lat
            lng
          }
        }
      }
    }
  `)

  const start = parseInputTypeTime(startTime)
  const end = parseInputTypeTime(endTime)

  const filteredParkingAreaItems: ParkingAreaWithPrice[] = data.allParkingArea.nodes
    .map(node => ({
      ...node,
      totalPrice: calculateAreaPriceInTimespan(start, end, node),
    }))
    .filter(
      x =>
        x.totalPrice > 0 &&
        x.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
    )

  return { filtered: filteredParkingAreaItems }
}
