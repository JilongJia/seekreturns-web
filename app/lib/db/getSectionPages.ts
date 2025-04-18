import { adminDb } from "./firebaseAdmin";

export async function getSectionPages(
  language: string,
  section: string,
): Promise<{ path: string; title: string }[]> {
  const prefix = `/${language}/${section}/`;
  const pagesRef = adminDb.collection("pages");

  const snapshot = await pagesRef
    .where("path", ">=", prefix)
    .where("path", "<=", prefix + "\uf8ff")
    .get();

  return snapshot.docs.flatMap((doc) => {
    const data = doc.data();
    const { title, path } = data;
    if (!title || !path) return [];
    return [{ title, path }];
  });
}
