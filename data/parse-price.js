const normalPricePerHourRegex = /(\d{1,2})\s?kr\/?\s?(tim|timma|timme) alla dagar (\d{1,2})-(\d{1,2})/
const otherPricePerHourRegex = /övrig tid (\d{1,2})\s?kr\s?\/\s?tim/
const dayPriceRegex = /(\d{1,2})\s?kr\/\s?dygn|dag/

const shortPricePerHourRegex = /(\d{1,2})\s?kr\/?\s?tim./

const parkingLicenseRequiredRegex = /P-till\s?stånd erfordras/

exports.parsePrice = rawPriceStr => {
  const price = { hour: {}, day: null, other: "" }

  if (!rawPriceStr || rawPriceStr === null) {
    return price
  }

  // Replace multiple whitespaces
  const priceStr = rawPriceStr.replace(/\s\s+/g, " ")

  if (parkingLicenseRequiredRegex.test(priceStr)) {
    price.other = priceStr
    return price
  }

  const shortMatch = priceStr.match(shortPricePerHourRegex)

  if (shortMatch) {
    const [, shortPricePerHourMatch] = shortMatch
    for (let hour = 0; hour < 24; hour++) {
      price.hour[hour] = parseInt(shortPricePerHourMatch)
    }
  }

  const normalMatch = priceStr.match(normalPricePerHourRegex)
  const otherMatch = priceStr.match(otherPricePerHourRegex)

  if (normalMatch) {
    let otherPricePerHour = null
    const [
      ,
      normalPricePerHourMatch,
      ,
      normalPricePerHourStartMatch,
      normalPricePerHourEndMatch,
    ] = normalMatch

    const normal = {
      perHour: parseInt(normalPricePerHourMatch),
      startHour: parseInt(normalPricePerHourStartMatch),
      endHour: parseInt(normalPricePerHourEndMatch),
    }

    if (otherMatch) {
      const [, otherPricePerHourMatch] = otherMatch

      otherPricePerHour = parseInt(otherPricePerHourMatch)
    }

    for (let hour = 0; hour < 24; hour++) {
      const isAllHours = normal.startHour === 0 && normal.endHour === 24

      const isNormalPrice =
        isAllHours || (normal.endHour - 1 >= hour && hour >= normal.startHour)

      price.hour[hour] = isNormalPrice ? normal.perHour : otherPricePerHour
    }
  }

  const dayMatch = priceStr.match(dayPriceRegex)

  if (dayMatch) {
    const [, dayPriceMatch] = dayMatch
    price.day = parseInt(dayPriceMatch)
  }

  price.debug = priceStr

  return price
}
