import { drizzle as drizzleD1, DrizzleD1Database } from "drizzle-orm/d1"
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"

let _db: DrizzleD1Database | BetterSQLite3Database | null = null

export const useDb = () => {
  if (!_db) {
    if (process.env.DB) {
      _db = drizzleD1(process.env.DB)
    } else if (process.dev) {
      const sqlite = new Database("server/db/sqlite.db")
      _db = drizzle(sqlite)
    } else {
      throw new Error("No database configured for production")
    }
  }

  return _db
}
