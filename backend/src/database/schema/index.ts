import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const preOrderStatusEnum = pgEnum('pre_order_status', [
  'pending',
  'confirmed',
  'cancelled',
  'fulfilled',
]);

export const admins = pgTable('admins', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  priceCents: integer('price_cents').notNull(),
  imageUrl: text('image_url'),
  tag: text('tag'),
  stock: integer('stock').default(0).notNull(),
  isPreOrderEnabled: boolean('is_pre_order_enabled').default(false).notNull(),
  preOrderExpectedAt: timestamp('pre_order_expected_at', {
    withTimezone: true,
  }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const preOrders = pgTable('pre_orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'restrict' }),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone'),
  instagramHandle: text('instagram_handle'),
  quantity: integer('quantity').default(1).notNull(),
  notes: text('notes'),
  status: preOrderStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
  preOrders: many(preOrders),
}));

export const preOrdersRelations = relations(preOrders, ({ one }) => ({
  product: one(products, {
    fields: [preOrders.productId],
    references: [products.id],
  }),
}));

export const customOrders = pgTable('custom_orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone'),
  instagramHandle: text('instagram_handle'),
  description: text('description').notNull(),
  referenceImageUrl: text('reference_image_url'),
  status: preOrderStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Product = typeof products.$inferSelect;
export type PreOrder = typeof preOrders.$inferSelect;
export type CustomOrder = typeof customOrders.$inferSelect;
