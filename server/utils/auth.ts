import { H3Event } from "h3"
import { getServerSession } from "#auth"
import { authOptions } from "~/lib/auth"

export async function getSession(event: H3Event) {
  const session = await getServerSession(event, authOptions)

  if (!session) {
    throw createError({
      status: 401,
      message: "Unauthorized",
    })
  }

  return session
}
