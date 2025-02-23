import { adminDb } from "./firebaseAdmin";

export async function getModifiedDate(path: string): Promise<Date | null> {
  const pagesRef = adminDb.collection("pages");

  const pagesSnapshot = await pagesRef.where("path", "==", path).limit(1).get();

  if (pagesSnapshot.empty) return null;

  const modifiedDate = pagesSnapshot.docs[0].data().modifiedDate;

  return modifiedDate ? modifiedDate.toDate() : null;
}
