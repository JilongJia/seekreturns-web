import clsx from "clsx";
import Image from "next/image";

import { generateWebsiteMetadata } from "@/app/lib/en/utility/generateMetadata";
import { generateJsonLd } from "./lib/generateJsonLd";

import { Header as PageHeader } from "@/app/components/en/utility/page/Header";
import { Footer } from "@/app/components/en/utility/page/Footer";
import styles from "./page.module.css";

import { pageInfo } from "./data/info";
import jilongAndSunica from "./images/jilong-and-sunica.png";

export function generateMetadata() {
  const metadata = generateWebsiteMetadata(pageInfo);

  return metadata;
}

function Page() {
  const {
    title: pageTitle,
    pathname: pagePathname,
    description: pageDescription,
    publishedDate: pagePublishedDate,
    modifiedDate: pageModifiedDate,
  } = pageInfo;

  const jsonLd = generateJsonLd({
    pageTitle,
    pagePathname,
    pageDescription,
    pagePublishedDate,
    pageModifiedDate,
  });

  return (
    <>
      <PageHeader
        pathname="/en/about"
        className={clsx(styles.pageHeader, "layoutContainer")}
      />
      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1 className={styles.h1}>About</h1>
        </header>
        <p className={clsx(styles.p, styles.introduction)}>
          Seek Returns is dedicated to providing sophisticated tools and
          authoritative insights to empower investors and traders in navigating
          financial markets.
        </p>
        <Image
          src={jilongAndSunica}
          alt="Jilong and Sunica"
          className={styles.image}
        />
        <section aria-labelledby="mission" className={styles.section}>
          <h2 id="mission" className={styles.h2}>
            Our Mission
          </h2>
          <p className={styles.p}>
            Welcome to Seek Returns, a personal project founded by me, Jilong.
            With a background in quantitative finance, I’ve spent considerable
            time analyzing markets and financial strategies.
          </p>
          <p className={styles.p}>
            During my engagement with online trading forums and communities, I
            frequently observed a gap – many individuals, while eager to
            participate in the markets, often grappled with core financial
            concepts or lacked accessible tools, hindering their ability to make
            sound investment decisions.
          </p>
          <p className={styles.p}>
            This realization, combined with my interest in developing practical
            resources for my own analysis and for others navigating the
            complexities of trading, led to the creation of this website.
          </p>
          <p className={styles.p}>
            The core mission of Seek Returns is to provide accessible tools and
            clear information designed to enhance your understanding of
            financial markets and support your decision-making process in
            trading and investing.
          </p>
        </section>
        <section aria-labelledby="offerings" className={styles.section}>
          <h2 id="offerings" className={styles.h2}>
            Our Offerings
          </h2>
          <p className={styles.p}>The platform offers:</p>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <strong>Educational Content</strong>: Clear explanations of key
              financial concepts, important metrics, and various methodologies,
              presented in an understandable format.
            </li>
            <li className={styles.li}>
              <strong>Analytical Tools</strong>: A suite of practical resources,
              including stock charting capabilities, option calculators, and
              comparative analysis features to aid your research.
            </li>
            <li className={styles.li}>
              <strong>Data & Market Insights</strong>: Access to relevant market
              data and analytical perspectives on market trends and specific
              assets to help you form your own views.
            </li>
            <p className={styles.p}>
              This platform is intended for anyone seeking to build their
              financial knowledge base, utilize practical tools for analysis, or
              gain insights into market dynamics, regardless of their current
              experience level.
            </p>
          </ul>
        </section>
        <section aria-labelledby="disclaimer" className={styles.section}>
          <h2 id="disclaimer" className={styles.h2}>
            Disclaimer: Important Notice
          </h2>
          <p className={styles.p}>
            It is crucial to understand that I am not a licensed financial
            advisor, and this website is an independent, personal initiative not
            affiliated with any financial institution.
          </p>
          <p className={styles.p}>
            All information, tools, analysis, and content provided on Seek
            Returns are strictly for informational and educational purposes
            only. They should not be interpreted as financial advice, investment
            recommendations, or solicitation for any financial product.
          </p>
          <p className={styles.p}>
            Engaging in trading and investment activities carries inherent
            risks, potentially leading to the loss of invested capital. Users
            are strongly encouraged to perform their own comprehensive research
            and consult with a certified financial professional to obtain advice
            suitable for their individual financial circumstances before making
            any investment decisions.
          </p>
          <p className={styles.p}>
            We appreciate you visiting Seek Returns and hope the resources
            available contribute positively to your understanding of finance.
          </p>
        </section>
      </main>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export default Page;
