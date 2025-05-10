import { adminDb } from "./firebaseAdmin";

export async function fetchStaticParams(
  language: string,
  section: string,
): Promise<{ slug: string }[]> {
  const prefix = `/${language}/${section}/`;
  const pagesRef = adminDb.collection("informationalPages");

  const pagesSnapshot = await pagesRef
    .where("pathname", ">=", prefix)
    .where("pathname", "<=", prefix + "\uf8ff")
    .get();

  return pagesSnapshot.docs.flatMap((doc) => {
    const pathname = doc.data().pathname;
    if (!pathname) return [];

    const slug = pathname.replace(prefix, "").replace(/\/$/, "");
    return [{ slug }];
  });
}
