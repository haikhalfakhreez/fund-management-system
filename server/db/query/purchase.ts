import { eq, and } from "drizzle-orm"
import {
  funds,
  investments,
  transactions,
  accountBalance,
  balanceHistory,
} from "../schema"

export async function purchaseFund({
  fundId,
  userId,
  units,
}: {
  fundId: string
  userId: string
  units: number
}) {
  await useDb().transaction(async (tx) => {
    const fund = await tx.select().from(funds).where(eq(funds.id, fundId)).get()

    if (!fund) {
      throw new Error("Fund not found")
    }

    let currentBalance = 0
    const accBalance = await tx
      .select()
      .from(accountBalance)
      .where(eq(accountBalance.userId, userId))
      .get()

    if (accBalance) {
      currentBalance = accBalance.balance
    }

    const amount = integerToTwoDecimal(units * fund.currentNav)

    if (currentBalance < amount) {
      throw new Error("Insufficient funds")
    }

    // Add new transaction
    await tx.insert(transactions).values({
      id: nanoid(),
      userId,
      fundId,
      transactionType: "Purchase",
      units,
      amount,
      createdAt: new Date(),
    })

    // Add new investment
    const currentInvestment = await tx
      .select()
      .from(investments)
      .where(
        and(eq(investments.userId, userId), eq(investments.fundId, fundId)),
      )
      .get()

    const currentUnits = currentInvestment?.units || 0
    const currentAmount = currentInvestment?.amount || 0

    await tx
      .insert(investments)
      .values({
        id: nanoid(),
        userId,
        fundId,
        units,
        amount,
      })
      .onConflictDoUpdate({
        target: [investments.fundId, investments.userId],
        set: {
          units: currentUnits + units,
          amount: integerToTwoDecimal(currentAmount + amount),
        },
      })

    const balance = currentBalance - amount

    await tx
      .insert(accountBalance)
      .values({
        id: nanoid(),
        userId,
        balance,
      })
      .onConflictDoUpdate({
        target: accountBalance.userId,
        set: {
          balance,
        },
      })

    await tx.insert(balanceHistory).values({
      id: nanoid(),
      userId,
      balance,
      change: amount,
      changeType: "Investment",
      createdAt: new Date(),
    })
  })
}
