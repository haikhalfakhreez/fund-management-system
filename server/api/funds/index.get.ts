import { prisma } from "~/prisma/db"

export default defineEventHandler(async (event) => {
  try {
    const funds = await prisma.fund.findMany()
    return funds
  } catch (error) {
    console.log(error)
  }
})
