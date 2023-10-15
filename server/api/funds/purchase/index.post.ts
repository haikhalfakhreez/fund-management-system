import { purchaseFund } from "~/server/db/query/purchase"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const { fundId, units } = await readBody(event)

  return await purchaseFund({
    userId: session.user.id,
    fundId,
    units,
  })
})
