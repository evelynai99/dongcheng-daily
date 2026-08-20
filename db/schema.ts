import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const procurementRecords = sqliteTable("procurement_records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  district: text("district").notNull(),
  projectId: text("project_id"),
  title: text("title").notNull(),
  purchaser: text("purchaser"),
  noticeType: text("notice_type").notNull(),
  status: text("status").notNull(),
  amount: text("amount"),
  publishedAt: text("published_at").notNull(),
  sourceName: text("source_name").notNull(),
  sourceType: text("source_type").notNull(),
  sourceUrl: text("source_url").notNull(),
  collectedAt: text("collected_at").notNull(),
}, (table) => [uniqueIndex("procurement_source_url_idx").on(table.sourceUrl)]);

export const soeRecords = sqliteTable("soe_records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  district: text("district").notNull(),
  enterprise: text("enterprise"),
  ownershipLevel: text("ownership_level"),
  eventType: text("event_type").notNull(),
  title: text("title").notNull(),
  summary: text("summary"),
  publishedAt: text("published_at").notNull(),
  sourceName: text("source_name").notNull(),
  sourceType: text("source_type").notNull(),
  sourceUrl: text("source_url").notNull(),
  collectedAt: text("collected_at").notNull(),
}, (table) => [uniqueIndex("soe_source_url_idx").on(table.sourceUrl)]);
