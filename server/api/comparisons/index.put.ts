import { updateComparison } from "~/server/db/query/comparisons"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const { fundIds } = await readBody(event)

  if (fundIds.length > 3) {
    throw new Error("You can only compare up to 3 funds")
  }

  return await updateComparison(fundIds, session.user.id)
})
