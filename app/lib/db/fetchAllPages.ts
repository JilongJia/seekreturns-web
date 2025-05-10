import { adminDb } from "./firebaseAdmin";

export type PageInfo = {
  title: string;
  pathname: string;
  modifiedDate: Date;
  language: string;
  section: string;
  slug: string;
};

export async function fetchAllPages(): Promise<PageInfo[]> {
  const pagesRef = adminDb.collection("informationalPages");
  const snapshot = await pagesRef.get();

  return snapshot.docs.flatMap((doc) => {
    const data = doc.data();

    if (
      !data.title ||
      !data.pathname ||
      !data.modifiedDate ||
      !data.language ||
      !data.section ||
      !data.slug
    ) {
      return [];
    }

    return [
      {
        title: data.title,
        pathname: data.pathname,
        modifiedDate: data.modifiedDate.toDate(),
        language: data.language,
        section: data.section,
        slug: data.slug,
      },
    ];
  });
}
