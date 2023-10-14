export default defineEventHandler(async (event) => {
  try {
    const funds = await useDb().query.funds.findMany()
    return funds
  } catch (error) {
    console.error(error)
    return null
  }
})
