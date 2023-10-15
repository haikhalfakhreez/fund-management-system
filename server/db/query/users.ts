import { eq } from "drizzle-orm"
import { users } from "../schema"

export async function updateUser(data: any, userId: string) {
  const updatedUser = await useDb()
    .update(users)
    .set(data)
    .where(eq(users.id, userId))
  return updatedUser
}
