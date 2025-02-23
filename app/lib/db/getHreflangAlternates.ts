import { adminDb } from "./firebaseAdmin";

type HreflangAlternate = { path: string };

export async function getHreflangAlternates(
  path: string,
): Promise<HreflangAlternate[]> {
  const pagesRef = adminDb.collection("pages");

  const pagesSnapshot = await pagesRef.where("path", "==", path).limit(1).get();

  if (pagesSnapshot.empty) return [];

  const hreflangGroupId = pagesSnapshot.docs[0].data().hreflangGroupId;

  const hreflangAlternatesSnapshot = await pagesRef
    .where("hreflangGroupId", "==", hreflangGroupId)
    .get();

  return hreflangAlternatesSnapshot.docs.map((doc) => ({
    path: doc.data().path,
  }));
}
