require("dotenv").config()
const fetch = require("node-fetch")
const { parsePrice } = require("./data/parse-price")

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  try {
    const response = await fetch(process.env.API_URL)
    const data = await response.json()

    const areas = data.map(parkingArea => ({
      parkingId: parkingArea.id,
      name: parkingArea.title,
      location: {
        lat: parkingArea.lat,
        lng: parkingArea.lng,
      },
      price: parsePrice(parkingArea.regularPrice),
      url: parkingArea.url,
    }))

    areas.forEach(a => {
      const parkingNode = {
        ...a,
        id: createNodeId(a.parkingId),
        parent: undefined,
        children: [],
        internal: {
          type: `ParkingArea`,
          mediaType: `text/html`,
          content: JSON.stringify(a),
          contentDigest: createContentDigest(a),
        },
      }

      actions.createNode(parkingNode)
    })

    const areasWithIncompleteData = areas.filter(
      a =>
        a.price.day !== null ||
        Object.values(a.price.hour).filter(Boolean).length > 0
    )

    const coverage = areasWithIncompleteData.length / data.length

    const coverageNode = {
      id: createNodeId("coverage"),
      coverage,
      parent: undefined,
      children: [],
      internal: {
        type: `ParkingAreaCoverage`,
        mediaType: `text/html`,
        contentDigest: createContentDigest(coverage.toString()),
      },
    }

    actions.createNode(coverageNode)
  } catch (e) {
    console.log(e)
  }
}
