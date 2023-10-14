import Prisma from "@prisma/client"
const { PrismaClient } = Prisma

const prisma = new PrismaClient()

async function main() {
  await prisma.fund.create({
    data: {
      name: "Gotham Absolute Return Fund",
      description:
        "Founded by Bruce Wayne, Gotham Absolute Return Fund is a long/short equity fund that aims to generate positive returns in all market conditions.",
      inceptionDate: new Date("2020-01-01"),
      currentYtd: 138,
      currentNav: 0.7,
      investmentType: "Growth",
      isShariah: true,
      ytdHistory: JSON.stringify([
        { date: "2020-01-01", value: 100.0 },
        { date: "2021-01-01", value: 110.0 },
        { date: "2022-01-01", value: 120.0 },
        { date: "2023-01-01", value: 130.0 },
        { date: "2023-09-01", value: 135.0 },
      ]),
      navHistory: JSON.stringify([
        { date: "2020-01-01", value: 0.5 },
        { date: "2021-01-01", value: 0.55 },
        { date: "2022-01-01", value: 0.6 },
        { date: "2023-01-01", value: 0.65 },
        { date: "2023-09-01", value: 0.68 },
      ]),
    },
  })
  await prisma.fund.create({
    data: {
      name: "BlackRock Global Funds - World Technology Fund A2 USD",
      description:
        "BlackRock Global Funds - World Technology Fund A2 USD is an open-end fund incorporated in Luxembourg. The Fund's objective is to maximize total return. The Fund invests globally at least 70% of its total assets in the equity securities of companies whose predominant economic activity is in the technology sector.",
      inceptionDate: new Date("2020-01-01"),
      currentYtd: 108,
      currentNav: 1.075,
      investmentType: "Income",
      isShariah: false,
      ytdHistory: JSON.stringify([
        { date: "2020-01-01", value: 100.0 },
        { date: "2021-01-01", value: 102.0 },
        { date: "2022-01-01", value: 104.0 },
        { date: "2023-01-01", value: 106.0 },
        { date: "2023-09-01", value: 107.0 },
      ]),
      navHistory: JSON.stringify([
        { date: "2020-01-01", value: 1.0 },
        { date: "2021-01-01", value: 1.02 },
        { date: "2022-01-01", value: 1.04 },
        { date: "2023-01-01", value: 1.06 },
        { date: "2023-09-01", value: 1.07 },
      ]),
    },
  })
  await prisma.fund.create({
    data: {
      name: "Maybank Islamic Asia Pacific REITs Fund",
      description:
        "Maybank Islamic Asia Pacific REITs Fund is an Islamic income and growth fund that aims to provide regular income and medium to long-term capital growth by investing in Shariah-compliant real estate investment trusts (REITs) and Islamic real estate investment trusts (I-REITs) listed on stock exchanges in the Asia Pacific region.",
      inceptionDate: new Date("2020-01-01"),
      currentYtd: 200,
      currentNav: 1.01,
      investmentType: "Income & Growth",
      isShariah: true,
      ytdHistory: JSON.stringify([
        { date: "2020-01-01", value: 100.0 },
        { date: "2021-01-01", value: 125.0 },
        { date: "2022-01-01", value: 150.0 },
        { date: "2023-01-01", value: 175.0 },
        { date: "2023-09-01", value: 190.0 },
      ]),
      navHistory: JSON.stringify([
        { date: "2020-01-01", value: 0.5 },
        { date: "2021-01-01", value: 0.625 },
        { date: "2022-01-01", value: 0.75 },
        { date: "2023-01-01", value: 0.875 },
        { date: "2023-09-01", value: 0.95 },
      ]),
    },
  })
  await prisma.fund.create({
    data: {
      name: "Joker Profit Fund",
      description:
        "Joker Profit Fund is an Islamic income and growth fund that aims to provide regular income and medium to long-term capital growth by investing in Shariah-compliant real estate investment trusts (REITs) and Islamic real estate investment trusts (I-REITs) listed on stock exchanges in the Asia Pacific region.",
      inceptionDate: new Date("2020-01-01"),
      currentYtd: 45,
      currentNav: 0.45,
      investmentType: "Income & Growth",
      isShariah: true,
      ytdHistory: JSON.stringify([
        { date: "2020-01-01", value: 100.0 },
        { date: "2021-01-01", value: 90.0 },
        { date: "2022-01-01", value: 120.0 },
        { date: "2023-01-01", value: 60.0 },
        { date: "2023-09-01", value: 50.0 },
      ]),
      navHistory: JSON.stringify([
        { date: "2020-01-01", value: 1.0 },
        { date: "2021-01-01", value: 0.9 },
        { date: "2022-01-01", value: 1.2 },
        { date: "2023-01-01", value: 0.6 },
        { date: "2023-09-01", value: 0.5 },
      ]),
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
