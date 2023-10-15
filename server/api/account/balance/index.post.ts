import { addMoneyToBalance } from "~/server/db/query/account"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const { amount } = await readBody(event)

  return await addMoneyToBalance({
    userId: session.user.id,
    amount,
  })
})
