import { getComparisonFunds } from "~/server/db/query/comparisons"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return await getComparisonFunds(session.user.id)
})
