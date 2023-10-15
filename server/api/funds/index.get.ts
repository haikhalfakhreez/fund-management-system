export default defineEventHandler(async (event) => {
  try {
    await getSession(event)

    const funds = await useDb().query.funds.findMany()
    return funds
  } catch (error) {
    console.error(error)
    return null
  }
})
