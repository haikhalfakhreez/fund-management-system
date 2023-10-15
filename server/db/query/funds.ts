import { eq } from "drizzle-orm"
import { funds } from "../schema"

export async function getFunds() {
  return await useDb().query.funds.findMany()
}

export async function getFund(id: string) {
  return await useDb().query.funds.findFirst({
    where: eq(funds.id, id),
  })
}
