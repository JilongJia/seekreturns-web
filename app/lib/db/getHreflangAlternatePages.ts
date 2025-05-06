import { adminDb } from "./firebaseAdmin";

type HreflangAlternate = { pathname: string };

export async function getHreflangAlternatePages(
  pathname: string,
): Promise<HreflangAlternate[]> {
  const pagesRef = adminDb.collection("informationalPages");

  const pagesSnapshot = await pagesRef
    .where("pathname", "==", pathname)
    .limit(1)
    .get();

  if (pagesSnapshot.empty) return [];

  const hreflangGroupId = pagesSnapshot.docs[0].data().hreflangGroupId;

  const hreflangAlternatePagesSnapshot = await pagesRef
    .where("hreflangGroupId", "==", hreflangGroupId)
    .get();

  return hreflangAlternatePagesSnapshot.docs.map((doc) => ({
    pathname: doc.data().pathname,
  }));
}
