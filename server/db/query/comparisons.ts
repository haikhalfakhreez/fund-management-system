import { eq, or } from "drizzle-orm"
import { funds, comparisons } from "../schema"

export async function getComparisons(userId: string) {
  return await useDb()
    .select()
    .from(comparisons)
    .where(eq(comparisons.userId, userId))
    .get()
}

export async function getComparisonFunds(userId: string) {
  const comparisons = await getComparisons(userId)

  if (!comparisons) return []

  const fundIds = comparisons.fundIds ?? []
  const fundsArr = []

  for (const fundId of fundIds) {
    const fund = await useDb()
      .select()
      .from(funds)
      .where(eq(funds.id, fundId))
      .get()

    if (fund) {
      fundsArr.push(fund)
    }
  }

  return fundsArr
}

export async function updateComparison(fundIds: string[], userId: string) {
  return await useDb()
    .insert(comparisons)
    .values({
      id: nanoid(),
      userId,
      fundIds,
    })
    .onConflictDoUpdate({
      target: comparisons.userId,
      set: {
        fundIds,
      },
    })
}
