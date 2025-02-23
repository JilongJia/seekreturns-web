import { adminDb } from "./firebaseAdmin";

export async function getStaticParams(
  language: string,
  section: string,
): Promise<{ slug: string }[]> {
  const prefix = `/${language}/${section}/`;
  const pagesRef = adminDb.collection("pages");

  const pagesSnapshot = await pagesRef
    .where("path", ">=", prefix)
    .where("path", "<=", prefix + "\uf8ff")
    .get();

  return pagesSnapshot.docs.flatMap((doc) => {
    const path = doc.data().path;
    if (!path) return [];

    const slug = path.replace(prefix, "").replace(/\/$/, "");
    return [{ slug }];
  });
}
