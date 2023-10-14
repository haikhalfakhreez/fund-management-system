import { prisma } from "~/prisma/db"

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id")

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID is required",
      })
    }

    const fund = await prisma.fund.findUnique({
      where: {
        id: id as string,
      },
    })

    if (!fund) {
      throw createError({
        statusCode: 404,
        statusMessage: `Fund not found (ID: ${id}).`,
      })
    }

    return fund
  } catch (error) {
    console.log(error)
  }
})
