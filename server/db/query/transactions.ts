import { eq, desc } from "drizzle-orm"
import { funds, transactions, investments } from "../schema"

export async function getTransactions(userId: string) {
  return await useDb()
    .select()
    .from(transactions)
    .leftJoin(funds, eq(transactions.fundId, funds.id))
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt))
}

export async function getInvestment(userId: string) {
  return await useDb()
    .select()
    .from(investments)
    .leftJoin(funds, eq(investments.fundId, funds.id))
    .where(eq(investments.userId, userId))
}
