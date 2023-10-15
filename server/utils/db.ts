import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import * as schema from "~/server/db/schema"

export * as tables from "~/server/db/schema"

let _db: BetterSQLite3Database<typeof schema> | null = null

export const useDb = () => {
  if (!_db) {
    const sqlite = new Database("server/db/sqlite.db")
    _db = drizzle(sqlite, { schema })
  }
  return _db
}
