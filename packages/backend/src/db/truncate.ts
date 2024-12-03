import { sql } from 'drizzle-orm'
import { db } from '../db'

const clearDb = async (): Promise<void> => {
  await db.execute(sql.raw(`TRUNCATE TABLE "business" CASCADE;`))
  await db.execute(sql.raw(`TRUNCATE TABLE "user" CASCADE;`))

  console.log('Database cleared')

  process.exit()
}

clearDb()
