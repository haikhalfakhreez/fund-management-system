import { getFunds } from "~/server/db/query/funds"

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  return await getFunds()
})
