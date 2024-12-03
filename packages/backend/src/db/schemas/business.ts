import { pgTable, boolean, text, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user'

export const business = pgTable('business', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .references(() => user.id)
    .notNull(),
  name: varchar('name', { length: 255 }),
  slug: varchar('slug', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  priceRange: varchar('priceRange', { length: 5 }),
  addressLine1: varchar('addressLine1', { length: 255 }),
  addressLine2: varchar('addressLine2', { length: 255 }),
  city: varchar('city', { length: 255 }),
  state: varchar('state', { length: 255 }),
  country: varchar('country', { length: 255 }),
  zipCode: varchar('zipCode', { length: 20 }),
  googleMapsUrl: text('googleMapsUrl'),
  currency: varchar('currency', { length: 10 }).default('USD'),
  active: boolean('active').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export type Business = typeof business
export type BusinessFields = typeof business.$inferSelect