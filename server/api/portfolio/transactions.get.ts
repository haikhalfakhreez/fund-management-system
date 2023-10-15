import { getTransactions } from "~/server/db/query/transactions"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return await getTransactions(session.user.id)
})
