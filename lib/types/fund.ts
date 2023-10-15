export type Fund = {
  id: string
  name: string
  description: string
  inceptionDate: Date
  currentYtd: number
  currentNav: number
  investmentType: FundInvestmentType
  isShariah: boolean
  ytdHistory: FundHistory[]
  navHistory: FundHistory[]
  launchPrice: number
  ticker: string
}

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

export type FundHistory = [string, number] // [date, value]
