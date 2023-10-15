import { eq, desc } from "drizzle-orm"
import { accountBalance, balanceHistory } from "../schema"

export async function getAccountBalance(userId: string) {
  return await useDb()
    .select({
      balance: accountBalance.balance,
    })
    .from(accountBalance)
    .where(eq(accountBalance.userId, userId))
    .get()
}

export async function addMoneyToBalance({
  userId,
  amount,
}: {
  userId: string
  amount: number
}) {
  await useDb().transaction(async (tx) => {
    const balance = await getAccountBalance(userId)
    const currentBalance = balance ? balance.balance : 0

    await tx.insert(balanceHistory).values({
      id: nanoid(),
      userId,
      balance: currentBalance,
      change: amount,
      changeType: "Deposit",
      createdAt: new Date(),
    })

    await tx
      .insert(accountBalance)
      .values({
        id: nanoid(),
        userId,
        balance: currentBalance + amount,
      })
      .onConflictDoUpdate({
        target: accountBalance.userId,
        set: {
          balance: currentBalance + amount,
        },
      })
  })
}

export async function getAccountBalanceHistory(userId: string) {
  return await useDb()
    .select({
      balance: balanceHistory.balance,
      change: balanceHistory.change,
      changeType: balanceHistory.changeType,
      createdAt: balanceHistory.createdAt,
    })
    .from(balanceHistory)
    .where(eq(balanceHistory.userId, userId))
    .orderBy(desc(balanceHistory.createdAt))
}
