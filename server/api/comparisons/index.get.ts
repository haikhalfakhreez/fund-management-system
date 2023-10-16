import { getComparisons } from "~/server/db/query/comparisons"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return await getComparisons(session.user.id)
})
