import { getAccountBalance } from "~/server/db/query/account"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const balance = await getAccountBalance(session.user.id)
  return balance ? integerToTwoDecimal((balance.balance * 100) / 100) : 0
})
