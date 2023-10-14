import { FundInvestmentType } from "~/lib/types/fund"

export type FundsTable = {
  name: string
  description: string
  currentYtd: number
  currentNav: number
  navPercentageChange: string | number
  investmentType: FundInvestmentType
  isShariah: boolean
}
