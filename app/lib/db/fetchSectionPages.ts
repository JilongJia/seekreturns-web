import { adminDb } from "./firebaseAdmin";

export async function fetchSectionPages(
  language: string,
  section: string,
): Promise<{ title: string; pathname: string }[]> {
  const prefix = `/${language}/${section}/`;
  const pagesRef = adminDb.collection("informationalPages");

  const snapshot = await pagesRef
    .where("pathname", ">=", prefix)
    .where("pathname", "<=", prefix + "\uf8ff")
    .get();

  return snapshot.docs.flatMap((doc) => {
    const data = doc.data();
    const { title, pathname } = data;
    if (!title || !pathname) return [];
    return [{ title, pathname }];
  });
}
