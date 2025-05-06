import { adminDb } from "./firebaseAdmin";

type AlternateLanguageUrls = {
  "x-default": string;
  en?: string;
  ja?: string;
  zh?: string;
};

export async function getPageInfo(pathname: string): Promise<{
  title: string;
  pathname: string;
  description: string;
  publishedDate: Date;
  modifiedDate: Date;
  alternateLanguageUrls: AlternateLanguageUrls;
} | null> {
  const pagesRef = adminDb.collection("informationalPages");

  const pageSnapshot = await pagesRef
    .where("pathname", "==", pathname)
    .limit(1)
    .get();

  if (pageSnapshot.empty) {
    return null;
  }

  const pageData = pageSnapshot.docs[0].data();
  const hreflangGroupId = pageData.hreflangGroupId;

  const hreflangGroupSnapshot = await pagesRef
    .where("hreflangGroupId", "==", hreflangGroupId)
    .get();

  const alternateLanguageUrlMap = hreflangGroupSnapshot.docs.reduce(
    (map, doc) => {
      const pathname = doc.data().pathname;
      const [, language] = pathname.split("/");
      if (language) {
        map[language] = pathname;
      }
      return map;
    },
    {} as Record<string, string>,
  );

  const xDefaultPathname =
    alternateLanguageUrlMap.en ??
    alternateLanguageUrlMap.ja ??
    alternateLanguageUrlMap.zh ??
    pageData.pathname;

  const alternateLanguageUrls: AlternateLanguageUrls = {
    "x-default": xDefaultPathname,
  };

  for (const lang of ["en", "zh", "ja"] as const) {
    if (alternateLanguageUrlMap[lang]) {
      alternateLanguageUrls[lang] = alternateLanguageUrlMap[lang];
    }
  }

  return {
    title: pageData.title,
    pathname: pageData.pathname,
    description: pageData.description,
    publishedDate: pageData.publishedDate.toDate(),
    modifiedDate: pageData.modifiedDate.toDate(),
    alternateLanguageUrls,
  };
}
