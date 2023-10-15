import { funds } from "./schema"
import { useDb } from "../utils/db"
import { nanoid } from "../utils/nanoid"
import {
  generateFakeNavPrice,
  type GenerateFakeNavPriceParams,
  generateYtdHistory,
  getCurrentYtd,
} from "~/server/utils/faker"

type Fund = typeof funds.$inferInsert

type GenerateDataParams = Omit<
  Fund,
  | "ytdHistory"
  | "navHistory"
  | "currentYtd"
  | "currentNav"
  | "inceptionDate"
  | "launchPrice"
> &
  Omit<GenerateFakeNavPriceParams, "startingPrice" | "volatility">

function generateData({
  startDate,
  endDate,
  ...rest
}: GenerateDataParams): Fund {
  const navHistory = generateFakeNavPrice({
    startDate,
    endDate,
    startingPrice: 0.5,
    volatility: 0.06,
  })
  const ytdHistory = generateYtdHistory(navHistory, 100)
  const currentYtd = getCurrentYtd(ytdHistory)
  const currentNav = navHistory[navHistory.length - 1][1]

  return {
    ...rest,
    ytdHistory,
    navHistory,
    currentYtd,
    currentNav,
    launchPrice: 0.5,
    inceptionDate: new Date(startDate),
  }
}

const data: Fund[] = [
  generateData({
    startDate: "2020-07-01",
    endDate: "2023-10-15",
    id: nanoid(),
    name: "Gotham Absolute Return Fund",
    ticker: "GOTARF",
    description:
      "Founded by Bruce Wayne, Gotham Absolute Return Fund is a long/short equity fund that aims to generate positive returns in all market conditions.",
    investmentType: "Growth",
    isShariah: true,
  }),
  generateData({
    startDate: "2018-12-30",
    endDate: "2023-10-15",
    id: nanoid(),
    name: "BlackRock Global Funds - World Technology Fund A2 USD",
    ticker: "BLRKGF",
    description:
      "BlackRock Global Funds - World Technology Fund A2 USD is an open-end fund incorporated in Luxembourg. The Fund's objective is to maximize total return. The Fund invests globally at least 70% of its total assets in the equity securities of companies whose predominant economic activity is in the technology sector.",
    investmentType: "Income",
    isShariah: false,
  }),
  generateData({
    startDate: "2019-01-01",
    endDate: "2023-10-15",
    id: nanoid(),
    name: "Maybank Islamic Asia Pacific REITs Fund",
    ticker: "MBIAPR",
    description:
      "Maybank Islamic Asia Pacific REITs Fund is an Islamic income and growth fund that aims to provide regular income and medium to long-term capital growth by investing in Shariah-compliant real estate investment trusts (REITs) and Islamic real estate investment trusts (I-REITs) listed on stock exchanges in the Asia Pacific region.",
    investmentType: "Income & Growth",
    isShariah: true,
  }),
  generateData({
    startDate: "2019-12-15",
    endDate: "2023-10-15",
    id: nanoid(),
    name: "Joker Profit Fund",
    ticker: "JOKRPF",
    description:
      "Joker Profit Fund is an income and growth fund that aims to provide regular income and medium to long-term capital growth by investing in real estate investment trusts (REITs) listed on stock exchanges in the Asia Pacific region.",
    investmentType: "Income & Growth",
    isShariah: false,
  }),
  generateData({
    startDate: "2020-02-04",
    endDate: "2023-10-15",
    id: nanoid(),
    name: "Wayne Enterprises Fund",
    ticker: "WYNTPF",
    description:
      "Wayne Enterprises Fund focuses on investing in companies that are involved in the development, manufacture, distribution, supply, or sale of medical devices and related technologies. The Fund invests in companies that are involved in the development, manufacture, distribution, supply, or sale of medical devices and related technologies.",
    investmentType: "Income & Growth",
    isShariah: true,
  }),
  generateData({
    startDate: "2018-08-28",
    endDate: "2023-10-15",
    id: nanoid(),
    name: "Asset Growth Fund",
    ticker: "ASSTGF",
    description:
      "Asset Growth Fund is a conventional growth fund that aims to achieve medium to long-term capital growth by investing in a diversified portfolio of equity-related securities.",
    investmentType: "Growth",
    isShariah: false,
  }),
  generateData({
    startDate: "2020-03-11",
    endDate: "2023-10-15",
    id: nanoid(),
    name: "Global Sukuk Fund",
    ticker: "GLBSKF",
    description:
      "Global Sukuk Fund is an Islamic income fund that aims to provide regular income by investing in a diversified portfolio of Shariah-compliant sukuk and Islamic debt securities.",
    investmentType: "Income",
    isShariah: true,
  }),
  generateData({
    startDate: "2019-05-01",
    endDate: "2023-10-15",
    id: nanoid(),
    name: "	Advantage Global Equity Volatility Focused AUD Hedged Class",
    ticker: "ADVGLO",
    description:
      "The Fund aims to provide long term total return from a combination of income and capital growth by investing in a portfolio of global equities. The Fund seeks to achieve its investment objective by investing a minimum of 95% of its NAV will be invested in the HSBC Global Investment Funds - Global Equity Volatility Focused (Target Fund) at all times. This implies that the Fund has a passive strategy. Up to 5% of the Fund's NAV will be invested in Cash and/or liquid assets.",
    investmentType: "Income",
    isShariah: true,
  }),
]

async function main() {
  await useDb().delete(funds)

  const storedFunds = await useDb().insert(funds).values(data).returning().all()

  console.log("Inserted ", storedFunds.length, " funds!")

  process.exit(0)
}

main()
