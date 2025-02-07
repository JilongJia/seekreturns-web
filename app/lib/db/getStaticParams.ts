import { prisma } from "./prisma";

export async function getStaticParams(language: string, section: string) {
  const prefix = `/${language}/${section}/`;

  const pages = await prisma.page.findMany({
    where: {
      path: {
        startsWith: prefix,
      },
    },
    select: {
      path: true,
    },
  });

  return pages.map((page) => {
    const slug = page.path.replace(prefix, "").replace(/\/$/, ""); // Remove prefix and trailing slash
    return { slug };
  });
}
