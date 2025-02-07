import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

type ModifiedDateResult = { modifiedDate: Date };

export async function getModifiedDate(path: string): Promise<Date | null> {
  const result = await sql<ModifiedDateResult[]>`
    SELECT "modifiedDate" FROM "Page" WHERE path = ${path} LIMIT 1
  `;

  return result.length > 0 ? result[0].modifiedDate : null;
}
