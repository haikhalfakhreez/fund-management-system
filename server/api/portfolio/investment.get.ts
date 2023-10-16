import { getInvestment } from "~/server/db/query/transactions"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return await getInvestment(session.user.id)
})
