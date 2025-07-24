import { adminDb } from "./admin";

type HreflangPage = { pathname: string };

export async function fetchHreflangPages(
  pathname: string,
): Promise<HreflangPage[]> {
  const pagesRef = adminDb.collection("informationalPages");

  const pagesSnapshot = await pagesRef
    .where("pathname", "==", pathname)
    .limit(1)
    .get();

  if (pagesSnapshot.empty) return [];

  const hreflangGroupId = pagesSnapshot.docs[0].data().hreflangGroupId;

  const hreflangPagesSnapshot = await pagesRef
    .where("hreflangGroupId", "==", hreflangGroupId)
    .get();

  return hreflangPagesSnapshot.docs.map((doc) => ({
    pathname: doc.data().pathname,
  }));
}
