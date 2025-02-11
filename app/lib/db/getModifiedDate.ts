import { adminDb } from "./firebaseAdmin";

export async function getModifiedDate(path: string): Promise<Date | null> {
  const pagesRef = adminDb.collection("pages");

  const snapshot = await pagesRef.where("path", "==", path).limit(1).get();

  if (snapshot.empty) return null;

  const modifiedDate = snapshot.docs[0].data().modifiedDate;

  return modifiedDate ? modifiedDate.toDate() : null;
}
