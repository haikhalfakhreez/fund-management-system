import { eq } from "drizzle-orm"
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
    const fund = await tx.query.funds.findFirst({
      where: eq(funds.id, fundId),
    })

    if (!fund) {
      throw new Error("Fund not found")
    }

    const amount = integerToTwoDecimal(units * fund.currentNav)

    await tx.insert(transactions).values({
      id: nanoid(),
      userId,
      fundId,
      transactionType: "Purchase",
      units,
      amount,
      createdAt: new Date(),
    })

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
        target: investments.userId,
        set: {
          units,
          amount,
        },
      })

    let accBalance = await tx.query.accountBalance.findFirst({
      where: eq(accountBalance.userId, userId),
    })

    if (!accBalance) {
      accBalance = await tx
        .insert(accountBalance)
        .values({
          id: nanoid(),
          userId,
          balance: 0,
        })
        .returning()
        .get()
    }

    const currentBalance = accBalance.balance

    if (currentBalance < amount) {
      throw new Error("Insufficient funds")
    }

    const balance = currentBalance - amount

    await tx.update(accountBalance).set({ balance })

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
