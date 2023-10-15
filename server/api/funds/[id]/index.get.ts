import { getFund } from "~/server/db/query/funds"

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = getRouterParam(event, "id")

  if (!id) {
    throw new Error("Missing id")
  }

  return await getFund(id)
})
