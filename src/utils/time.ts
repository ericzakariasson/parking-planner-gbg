import { ParkingArea, Hours } from "../../data/types"

export interface Time {
  total: number
  hour: number
  minute: number
}

export function parseInputTypeTime(value: string): Time {
  const [hourStr, minuteStr] = value.split(":")
  const hour = parseInt(hourStr)
  const minute = parseInt(minuteStr) ?? 0 / 60
  return { total: hour + minute, hour, minute }
}

export function calculateAreaPriceInTimespan(
  start: Time,
  end: Time,
  area: ParkingArea
) {
  let total = 0
  for (let i = start.hour; i < end.hour; i++) {
    const hourPrice = area.price.hour[`_${i}` as Hours] ?? 0
    total += hourPrice
  }
  return total
}

export function getDuration(start: Time, end: Time) {
  const duration = end.total - start.total
  const minuteDuration = Math.round((duration % 1) * 60)
  const hourDuration = duration - (duration % 1)

  return {
    duration,
    hourDuration,
    minuteDuration,
  }
}
