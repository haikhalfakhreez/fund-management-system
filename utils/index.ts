import type { Fund } from "@prisma/client"
import { FundHistory, FundTotalReturn } from "~/lib/types/fund"

export function getNavPercentageChange(
  current: number,
  history: FundHistory[],
) {
  const initial = history[0].value
  const change = current - initial
  const percentage = (change / initial) * 100

  if (typeof percentage === "number" && !isNaN(percentage)) {
    return Number((Math.round(percentage * 100) / 100).toFixed(2))
  } else {
    return "N/A"
  }
}

export function getFundTotalReturn(fund: Fund): FundTotalReturn {
  const ytdHistory: FundHistory[] = JSON.parse(fund.ytdHistory)
  const currentYtd = fund.currentYtd
  let closestOneMonth = 0
  let closestOneYear = 0
  let closestThreeYears = 0
  let oldest = Infinity
  let oneMonth = 0
  let oneYear = 0
  let threeYears = 0
  let sinceInception = 0

  const oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1)
  const oneYearAgo = new Date().setFullYear(new Date().getFullYear() - 1)
  const threeYearsAgo = new Date().setFullYear(new Date().getFullYear() - 3)

  for (let i = 0; i < ytdHistory.length; i++) {
    const ytd = ytdHistory[i]
    const current = new Date(ytd.date).getTime()

    if (current <= oneMonthAgo && current > closestOneMonth) {
      closestOneMonth = current
      oneMonth = currentYtd - ytd.value
    }

    if (current <= oneYearAgo && current > closestOneYear) {
      closestOneYear = current
      oneYear = currentYtd - ytd.value
    }

    if (current <= threeYearsAgo && current > closestThreeYears) {
      closestThreeYears = current
      threeYears = currentYtd - ytd.value
    }

    if (current < oldest) {
      oldest = current
      sinceInception = currentYtd - ytd.value
    }
  }

  return {
    oneMonth,
    oneYear,
    threeYears,
    sinceInception,
  }
}
