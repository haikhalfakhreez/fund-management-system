import { Fund, FundHistory, FundTotalReturn } from "~/lib/types/fund"

export function getFundTotalReturn(fund: Fund): FundTotalReturn {
  const history: FundHistory[] = fund.navHistory

  const oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1)
  const oneYearAgo = new Date().setFullYear(new Date().getFullYear() - 1)
  const threeYearsAgo = new Date().setFullYear(new Date().getFullYear() - 3)

  const initial = history[0][1]
  const closestOneMonthValue =
    getClosestDate(oneMonthAgo, history)?.[1] ?? initial
  const closestOneYearValue =
    getClosestDate(oneYearAgo, history)?.[1] ?? initial
  const closestThreeYearsValue =
    getClosestDate(threeYearsAgo, history)?.[1] ?? initial

  return {
    oneMonth: getPercentageChange(closestOneMonthValue, fund.currentNav),
    oneYear: getPercentageChange(closestOneYearValue, fund.currentNav),
    threeYears: getPercentageChange(closestThreeYearsValue, fund.currentNav),
    sinceInception: getPercentageChange(initial, fund.currentNav),
  }
}

function getClosestDate(
  date: string | number,
  data: FundHistory[],
): FundHistory | null {
  const targetDate = new Date(date)

  for (let i = 0; i < data.length; i++) {
    const [currentDateString] = data[i]
    const currentDate = new Date(currentDateString)

    if (currentDate >= targetDate) {
      return data[i] // Return the first date that is on or after the target date
    }
  }

  return null
}

function getPercentageChange(initial: number, current: number) {
  return parseFloat((((current - initial) / initial) * 100).toFixed(2))
}

type FormatDateOptions = {
  time?: boolean
}

// Format date to dd MMM yyyy
// Format time to HH:MM:SS
export function formatDate(date: string | Date, options?: FormatDateOptions) {
  const d = typeof date === "string" ? new Date(date) : date
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d)
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d)
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d)

  if (options?.time) {
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")
    const seconds = String(d.getSeconds()).padStart(2, "0")

    return `${da} ${mo} ${ye} ${hours}:${minutes}:${seconds}`
  }

  return `${da} ${mo} ${ye}`
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
