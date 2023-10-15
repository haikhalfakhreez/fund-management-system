import { eq, desc } from "drizzle-orm"
import { funds, transactions } from "../schema"

export async function getTransactions(userId: string) {
  return await useDb()
    .select()
    .from(transactions)
    .leftJoin(funds, eq(transactions.fundId, funds.id))
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt))
}
