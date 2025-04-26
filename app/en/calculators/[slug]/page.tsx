import dynamic from "next/dynamic";
import clsx from "clsx";

import { getInfo } from "@/app/lib/db/getInfo";
import { generateArticleMetadata } from "@/app/en/lib/generateMetadata";
import { getStaticParams } from "@/app/lib/db/getStaticParams";

import { type MainProps } from "@/app/components/en/content/page/main";
import { Header } from "@/app/components/en/content/page/Header";
import { TableOfContentsSidebar } from "@/app/components/en/content/page/TableOfContentsSidebar";
import { Footer } from "@/app/components/en/content/page/Footer";
import styles from "./page.module.css";

type generateMetadataProps = { params: Promise<{ slug: string }> };
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: generateMetadataProps) {
  const slug = (await params).slug;
  const pageInfo = await getInfo(`/en/calculators/${slug}`);

  if (!pageInfo) {
    return {};
  }
  const {
    title,
    pathname,
    description,
    publishedDate,
    modifiedDate,
    alternateLanguageUrls,
  } = pageInfo;
  return generateArticleMetadata(
    title,
    pathname,
    description,
    publishedDate,
    modifiedDate,
    alternateLanguageUrls,
  );
}

async function Page({ params }: PageProps) {
  const slug = (await params).slug;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://seekreturns.com/en/calculators/pvifa",
        url: "https://seekreturns.com/en/calculators/pvifa",
        name: "PVIFA calculator | SeekReturns",
        description:
          "Calculate the present value interest factor of an annuity for any interest rate and number of periods.",
        inLanguage: "en-US",
        isAccessibleForFree: true,
        datePublished: "2025-04-26",
        dateModified: "2025-04-26",
        breadcrumb: {
          "@id": "https://seekreturns.com/en/calculators/pvifa#breadcrumb",
        },
        potentialAction: {
          "@type": "ComputeAction",
          name: "Calculate PVIFA",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://seekreturns.com/en/calculators/pvifa?rate={rate}&periods={periods}",
          },
          result: {
            "@type": "PropertyValue",
            name: "PVIFA",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://seekreturns.com/en/calculators/pvifa#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://seekreturns.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculators",
            item: "https://seekreturns.com/en/calculators",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "PVIFA calculator",
            item: "https://seekreturns.com/en/calculators/pvifa",
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://seekreturns.com/en/calculators/pvifa#software",
        name: "PVIFA Calculator",
        applicationCategory: "FinanceApplication",
        description:
          "Web-based tool for computing the present value interest factor of an annuity.",
        url: "https://seekreturns.com/en/calculators/pvifa",
        operatingSystem: "All",
        isAccessibleForFree: true,
        publisher: {
          "@type": "Organization",
          name: "SeekReturns",
          url: "https://seekreturns.com",
        },
      },
    ],
  };

  const { tableOfContentsData } = await import(`./${slug}/tableOfContents`);
  const Main = dynamic<MainProps>(() =>
    import(`./${slug}/Main`).then((mod) => mod.Main),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        pathname={`/en/calculators/${slug}`}
        className={clsx(styles.header, "layoutContainer")}
      />
      <div className={clsx(styles.contentContainer, "layoutContainer")}>
        <TableOfContentsSidebar
          tableOfContentsData={tableOfContentsData}
          className={styles.tableOfContentsSidebar}
        />
        <Main pathname={`/en/calculators/${slug}`} className={styles.main} />
      </div>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
    </>
  );
}

export async function generateStaticParams() {
  const language = "en";
  const section = "calculators";
  const staticParams = await getStaticParams(language, section);
  return staticParams;
}

export const dynamicParams = false;

export default Page;
