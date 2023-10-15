import { getAccountBalanceHistory } from "~/server/db/query/account"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return await getAccountBalanceHistory(session.user.id)
})
