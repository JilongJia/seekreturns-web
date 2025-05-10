import { adminDb } from "./firebaseAdmin";

export async function fetchPageModifiedDate(
  pathname: string,
): Promise<Date | null> {
  const pagesRef = adminDb.collection("informationalPages");

  const pagesSnapshot = await pagesRef
    .where("pathname", "==", pathname)
    .limit(1)
    .get();

  if (pagesSnapshot.empty) return null;

  const modifiedDate = pagesSnapshot.docs[0].data().modifiedDate;

  return modifiedDate ? modifiedDate.toDate() : null;
}
