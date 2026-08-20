import { and, desc, eq, gte, like } from "drizzle-orm";
import { getDb } from "../../../db";
import { procurementRecords } from "../../../db/schema";
import { ensureLedgerSeeded } from "../../../db/seed";

export async function GET(request: Request) {
  await ensureLedgerSeeded();
  const url = new URL(request.url);
  const district = url.searchParams.get("district");
  const type = url.searchParams.get("type");
  const status = url.searchParams.get("status");
  const query = url.searchParams.get("q");
  const since = url.searchParams.get("since") ?? new Date(Date.now()-90*86400000).toISOString().slice(0,10);
  const filters = [gte(procurementRecords.publishedAt, since)];
  if (district) filters.push(eq(procurementRecords.district, district));
  if (type) filters.push(eq(procurementRecords.noticeType, type));
  if (status) filters.push(eq(procurementRecords.status, status));
  if (query) filters.push(like(procurementRecords.title, `%${query}%`));
  const rows = await getDb().select().from(procurementRecords).where(and(...filters)).orderBy(desc(procurementRecords.publishedAt)).limit(1000);
  return Response.json({ rows, since, coverage: "rolling_90_days" });
}
