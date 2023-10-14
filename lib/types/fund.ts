export type FundInvestmentType =
  | "Income"
  | "Growth"
  | "Income & Growth"
  | "Capital Growth"

export type FundPerformanceHistory = {
  totalReturn: FundTotalReturn
  ytdHistory: FundHistory[]
  navHistory: FundHistory[]
}

export type FundTotalReturn = {
  oneMonth: number
  oneYear: number
  threeYears: number
  sinceInception: number
}

export type FundHistory = {
  date: string
  value: number
}
