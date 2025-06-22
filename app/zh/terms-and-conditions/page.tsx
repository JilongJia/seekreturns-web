import Link from "next/link";
import clsx from "clsx";

import { generateWebsiteMetadata } from "@/app/lib/zh/utility/generateMetadata";
import { generateJsonLd } from "./lib/generateJsonLd";

import { Header as PageHeader } from "@/components/zh/layout/Header";
import { Footer } from "@/components/zh/layout/Footer";
import styles from "./page.module.css";

import { pageInfo } from "./data/info";

export function generateMetadata() {
  const metadata = generateWebsiteMetadata(pageInfo);

  return metadata;
}

function Page() {
  const { modifiedDate } = pageInfo;

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
        pathname="/zh/terms-and-conditions"
        className={clsx(styles.pageHeader, "layoutContainer")}
      />
      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1 className={styles.h1}>服务条款</h1>
          <span className={styles.modifiedDate}>
            更新于
            <time dateTime={modifiedDate.toISOString()}>
              {modifiedDate.toLocaleDateString("zh", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
        </header>
        <p className={styles.p}>在使用我们的服务前，请仔细阅读以下服务条款。</p>
        <section aria-labelledby="definitions">
          <h2 id="definitions" className={styles.h2}>
            名词解释
          </h2>
          <p className={styles.p}>
            为了便于您理解，以下是我们使用的一些术语及其含义：
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>公司</strong>：指 Seek
                Returns（在本文中也可能称为“我们”或“我们的”）。
              </p>
            </li>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>服务</strong>：指我们的网站。
              </p>
            </li>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>网站</strong>：指 Seek Returns，访问地址为{" "}
                <Link href="/zh" className={styles.link}>
                  https://seekreturns.com/zh
                </Link>
                。
              </p>
            </li>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>您</strong>
                ：指使用我们服务的个人或其代表的公司或其他法律实体。
              </p>
            </li>
          </ul>
        </section>
        <section aria-labelledby="acknowledgment">
          <h2 id="acknowledgment" className={styles.h2}>
            条款确认
          </h2>
          <p className={styles.p}>
            本服务条款规定了您与公司之间使用服务时的权利和义务，适用于所有访问或使用我们服务的用户。
          </p>
          <p className={styles.p}>
            您使用我们的服务即表示您同意并遵守本服务条款。如果您不同意本条款的任何部分，请勿使用我们的服务。
          </p>
          <p className={styles.p}>
            您确认您已年满18岁，我们的服务不面向18岁以下的用户。
          </p>
          <p className={styles.p}>
            使用我们的服务还需遵守我们的隐私政策，隐私政策说明了我们如何收集、使用和保护您的个人信息。请在使用服务前仔细阅读。
          </p>
        </section>
        <section aria-labelledby="third-party-links">
          <h2 id="third-party-links" className={styles.h2}>
            第三方网站链接
          </h2>
          <p className={styles.p}>
            我们的服务可能包含指向第三方网站的链接，我们对这些网站的内容、隐私政策或做法不承担责任。
          </p>
          <p className={styles.p}>
            建议您在使用第三方网站前，仔细阅读其服务条款和隐私政策。
          </p>
        </section>
        <section aria-labelledby="termination">
          <h2 id="termination" className={styles.h2}>
            服务终止
          </h2>
          <p className={styles.p}>
            如果您违反本服务条款，我们可能随时终止或暂停您的服务访问权限，且无需提前通知。
          </p>
          <p className={styles.p}>服务终止后，您将立即失去使用服务的权利。</p>
        </section>
        <section aria-labelledby="limitation-of-liability">
          <h2 id="limitation-of-liability" className={styles.h2}>
            责任限制
          </h2>
          <p className={styles.p}>
            在法律允许的范围内，我们对您因使用服务可能遭受的任何损失（包括但不限于利润损失、数据丢失或业务中断）的责任，最高不超过您通过服务支付的金额，或100美元（如果您未通过服务购买任何内容）。
          </p>
          <p className={styles.p}>
            我们不对因服务使用或无法使用服务、第三方软件或硬件等引起的任何间接或附带损害承担责任。
          </p>
        </section>
        <section aria-labelledby="as-is-disclaimer">
          <h2 id="as-is-disclaimer" className={styles.h2}>
            “按现状”服务声明
          </h2>
          <p className={styles.p}>
            我们的服务按“现状”和“现有”提供，不提供任何明示或暗示的保证，包括但不限于适销性、特定用途适用性或无错误的保证。
          </p>
          <p className={styles.p}>
            我们不保证服务将满足您的需求、不会中断、完全无错误，也不保证服务内容或电子邮件无病毒或其他有害组件。
          </p>
        </section>
        <section aria-labelledby="governing-law">
          <h2 id="governing-law" className={styles.h2}>
            适用法律
          </h2>
          <p className={styles.p}>
            本服务条款及您对服务的使用受日本法律管辖（不包括其冲突法规则）。您使用服务还可能受其他地区法律的约束。
          </p>
        </section>
        <section aria-labelledby="disputes-resolution">
          <h2 id="disputes-resolution" className={styles.h2}>
            争议解决
          </h2>
          <p className={styles.p}>
            如果您对服务有任何疑问或争议，请首先通过联系我们尝试非正式解决。
          </p>
        </section>
        <section aria-labelledby="severability">
          <h2 id="severability" className={styles.h2}>
            可分割性
          </h2>
          <p className={styles.p}>
            如果本条款的任何条款被认定为不可执行或无效，该条款将在法律允许的范围内进行调整，以实现其目标，其余条款继续有效。
          </p>
        </section>
        <section aria-labelledby="changes-to-terms">
          <h2 id="changes-to-terms" className={styles.h2}>
            条款变更
          </h2>
          <p className={styles.p}>
            我们有权随时修改或替换本服务条款。如果变更重大，我们将至少提前30天通知您。
          </p>
          <p className={styles.p}>
            在变更生效后继续使用我们的服务，即表示您同意受修订后的条款约束。如果您不同意新条款，请停止使用服务。
          </p>
        </section>
        <section aria-labelledby="contact-us">
          <h2 id="contact-us" className={styles.h2}>
            联系我们
          </h2>
          <p className={styles.p}>
            如果您对本服务条款有任何疑问，请通过以下方式联系我们：
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>电子邮件：contact@seekreturns.com</li>
          </ul>
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
