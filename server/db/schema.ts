import {
  sqliteTable,
  text,
  integer,
  real,
  primaryKey,
} from "drizzle-orm/sqlite-core"
import { FundHistory } from "~/lib/types/fund"
import type { AdapterAccount } from "@auth/core/adapters"

// Auth Data
export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
})

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
)

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
)

// App Data
export const portfolios = sqliteTable("portfolio", {
  id: text("id").primaryKey(),
  userId: integer("userId").references(() => users.id),
})

export const investments = sqliteTable("investment", {
  id: text("id").primaryKey(),
  portfolioId: text("portfolioId").references(() => portfolios.id),
  fundId: text("fundId"),
  units: real("units"),
  amount: real("amount"),
})

export const funds = sqliteTable("fund", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  inceptionDate: integer("inceptionDate", { mode: "timestamp" }).notNull(),
  currentYtd: real("currentYtd").notNull(),
  currentNav: real("currentNav").notNull(),
  investmentType: text("investmentType", {
    enum: ["Income", "Growth", "Income & Growth", "Capital Growth"],
  }).notNull(),
  isShariah: integer("isShariah", { mode: "boolean" }).default(false),
  ytdHistory: text("ytdHistory", { mode: "json" })
    .$type<FundHistory[]>()
    .notNull(),
  navHistory: text("navHistory", { mode: "json" })
    .$type<FundHistory[]>()
    .notNull(),
  launchPrice: real("launchPrice").notNull(),
})

export const transactionHistory = sqliteTable("transactionHistory", {
  id: text("id").primaryKey(),
  portfolioId: text("portfolioId").references(() => portfolios.id),
  fundId: text("fundId").references(() => funds.id),
  transactionType: text("transactionType", {
    enum: ["Purchase", "Sale"],
  }).notNull(),
  units: real("units").notNull(),
  amount: real("amount").notNull(),
  transactionDate: integer("transactionDate", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
})

export const accountBalance = sqliteTable("accountBalance", {
  id: text("id").primaryKey(),
  portfolioId: text("portfolioId").references(() => portfolios.id),
  balance: real("balance").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
})

export const balanceHistory = sqliteTable("balanceHistory", {
  id: text("id").primaryKey(),
  portfolioId: text("portfolioId").references(() => portfolios.id),
  balance: real("balance").notNull(),
  change: real("change").notNull(),
  changeType: text("changeType", {
    enum: ["Deposit", "Withdrawal", "Investment", "Divestment"],
  }).notNull(),
  changeDate: integer("changeDate", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
})
