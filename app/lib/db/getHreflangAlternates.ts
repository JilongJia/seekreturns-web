import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

type HreflangAlternate = { path: string };

export async function getHreflangAlternates(
  path: string,
): Promise<HreflangAlternate[]> {
  const results = await sql<{ path: string }[]>`
    SELECT "path" FROM "Page" WHERE "hreflangGroupId" = (
      SELECT "hreflangGroupId" FROM "Page" WHERE "path" = ${path} LIMIT 1
    )
  `;

  return results;
}
