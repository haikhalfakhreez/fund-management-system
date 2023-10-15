export default defineEventHandler(async (event) => {
  try {
    await getSession(event)
    const id = getRouterParam(event, "id")

    if (!id) {
      return null
    }

    const fund = await useDb().query.funds.findFirst({
      where: (funds, { eq }) => eq(funds.id, id),
    })

    if (!fund) {
      return null
    }

    return fund
  } catch (error) {
    console.error(error)
    return null
  }
})
