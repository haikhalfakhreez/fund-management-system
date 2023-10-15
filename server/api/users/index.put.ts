import { updateUser } from "~/server/db/query/users"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const { name } = await readBody(event)

  return await updateUser({ name }, session.user.id)
})
