import { and, desc, eq, gte, like } from "drizzle-orm";
import { getDb } from "../../../db";
import { soeRecords } from "../../../db/schema";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const district = url.searchParams.get("district");
  const type = url.searchParams.get("type");
  const query = url.searchParams.get("q");
  const since = url.searchParams.get("since") ?? new Date(Date.now()-90*86400000).toISOString().slice(0,10);
  const filters = [gte(soeRecords.publishedAt, since)];
  if (district) filters.push(eq(soeRecords.district, district));
  if (type) filters.push(eq(soeRecords.eventType, type));
  if (query) filters.push(like(soeRecords.title, `%${query}%`));
  const rows = await getDb().select().from(soeRecords).where(and(...filters)).orderBy(desc(soeRecords.publishedAt)).limit(1000);
  return Response.json({ rows, since, coverage: "rolling_90_days" });
}
