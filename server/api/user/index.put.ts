import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  try {
    const session = await getSession(event)

    const { name, email } = await readBody(event)

    const user = await useDb()
      .update(tables.users)
      .set({ name: name })
      .where(eq(tables.users.email, session.user?.email ?? email))
      .returning({ updatedId: tables.users.id })

    return user
  } catch (error) {
    console.error(error)
    return null
  }
})
