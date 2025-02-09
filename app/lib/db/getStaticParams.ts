import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

type PagePath = { path: string };

export async function getStaticParams(
  language: string,
  section: string,
): Promise<{ slug: string }[]> {
  const prefix = `/${language}/${section}/`;

  const pages = await sql<PagePath[]>`
    SELECT "path" FROM "Page" WHERE "path" LIKE ${prefix || ""} || '%'
  `;

  return pages.map((page) => {
    const slug = page.path.replace(prefix, "").replace(/\/$/, "");
    return { slug };
  });
}
