import { drizzle as drizzleD1, DrizzleD1Database } from "drizzle-orm/d1"
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import * as schema from "~/server/db/schema"

let _db:
  | DrizzleD1Database<typeof schema>
  | BetterSQLite3Database<typeof schema>
  | null = null

export const useDb = () => {
  if (!_db) {
    if (process.env.DB) {
      _db = drizzleD1(process.env.DB, { schema })
    } else {
      const sqlite = new Database("server/db/sqlite.db")
      _db = drizzle(sqlite, { schema })
    }
  }

  return _db
}
