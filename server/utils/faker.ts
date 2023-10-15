import { FundHistory } from "~/lib/types/fund"

function calculateNewPrice(oldPrice: number, volatility: number): number {
  const changePercent = 2 * volatility * Math.random() - volatility
  const changeAmount = oldPrice * changePercent
  const newPrice = oldPrice + changeAmount
  return parseFloat((Math.round(newPrice * 100) / 100).toFixed(2))
}

export interface GenerateFakeNavPriceParams {
  startDate: string
  endDate: string
  startingPrice: number
  volatility: number
}

// https://stackoverflow.com/questions/8597731/are-there-known-techniques-to-generate-realistic-looking-fake-stock-data
export function generateFakeNavPrice({
  startDate,
  endDate,
  startingPrice,
  volatility,
}: GenerateFakeNavPriceParams): FundHistory[] {
  const data: [string, number][] = []
  let currentDate = new Date(startDate)
  const end = new Date(endDate)

  let currentPrice = startingPrice

  while (currentDate <= end) {
    data.push([currentDate.toISOString().slice(0, 10), currentPrice])
    currentPrice = calculateNewPrice(currentPrice, volatility)
    currentDate.setDate(currentDate.getDate() + 5) // Increment the date by 5 days
  }

  return data
}

// Mirror the navHistory volatility, based on a starting point
export function generateYtdHistory(
  data: FundHistory[],
  starting: number,
): FundHistory[] {
  if (data.length === 0) {
    return []
  }

  const newData: FundHistory[] = []
  let currentPrice = starting
  newData.push([data[0][0], starting]) // Start with the same date as the first data point, but the new starting price

  for (let i = 1; i < data.length; i++) {
    const prevPrice = data[i - 1][1]
    const currentOriginalPrice = data[i][1]
    const percentChange = (currentOriginalPrice - prevPrice) / prevPrice
    currentPrice = currentPrice * (1 + percentChange)
    newData.push([data[i][0], parseFloat(currentPrice.toFixed(2))]) // Use the same date as the original data
  }

  return newData
}

export function getCurrentYtd(ytdHistory: FundHistory[]): number {
  const current = ytdHistory[ytdHistory.length - 1][1]
  let startOfYear = getStartOfYearPrice(ytdHistory)

  if (!startOfYear) {
    startOfYear = ytdHistory[0][1]
  }

  return parseFloat(((current - startOfYear) / startOfYear).toFixed(2))
}

function getStartOfYearPrice(data: FundHistory[]): number | null {
  const currentYear = new Date().getFullYear()
  const startOfYearString = `${currentYear}-01-01`

  for (let i = 0; i < data.length; i++) {
    const [dateString, price] = data[i]
    const date = new Date(dateString)

    if (date >= new Date(startOfYearString)) {
      // Return the price of the first date that is on or after the start of the current year
      return price
    }
  }
  return null
}
