import { graphql } from "gatsby"
import { ParkingArea } from "../../../data/types"

export type ParkingAreaQuery = {
  allParkingArea: { edges: { node: ParkingArea }[] }
}

export const parkingAreaQuery = graphql`
  query {
    allParkingArea {
      edges {
        node {
          id
          parkingId
          name
          url
        }
      }
    }
  }
`
