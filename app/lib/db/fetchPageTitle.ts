import { adminDb } from "./firebaseAdmin";

export async function fetchPageTitle(pathname: string): Promise<string | null> {
  const pagesRef = adminDb.collection("informationalPages");

  const pagesSnapshot = await pagesRef
    .where("pathname", "==", pathname)
    .limit(1)
    .get();

  if (pagesSnapshot.empty) return null;

  const title = pagesSnapshot.docs[0].data().title;

  return title ? title : null;
}
