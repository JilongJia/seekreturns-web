import Link from "next/link";
import clsx from "clsx";

import { Header as PageHeader } from "@/app/components/zh/section/page/Header";
import { Footer } from "@/app/components/zh/section/page/Footer";

import styles from "./page.module.css";

async function Page() {
  const modifiedDate = new Date("2025-04-20");
  return (
    <>
      <PageHeader
        pathname="/zh/privacy-policy"
        className={clsx(styles.pageHeader, "layoutContainer")}
      />
      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1 className={styles.h1}>隐私政策</h1>
          <span className={styles.modifiedDate}>
            更新于{" "}
            <time dateTime={modifiedDate.toISOString()}>
              {modifiedDate.toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
        </header>
        <p className={styles.p}>
          本隐私政策说明了我们在您使用我们的服务时，如何收集、使用和分享您的信息，以及您享有的隐私权利。
        </p>
        <p className={styles.p}>
          我们会使用您的个人信息来提供和改进我们的服务。当您使用我们的服务时，即表示您同意我们按照本隐私政策收集和使用您的信息。
        </p>
        <section aria-labelledby="definitions">
          <h2 id="definitions" className={styles.h2}>
            名词解释
          </h2>
          <p className={styles.p}>
            为了让您更好地理解本隐私政策，以下是我们使用的一些术语及其含义：
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>账户</strong>
                ：您创建的用于访问我们服务或部分服务的唯一账户。
              </p>
            </li>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>公司</strong>：指Seek
                Returns（在本文中也可能称为“我们”或“我们的”）。
              </p>
            </li>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>Cookies</strong>
                ：网站存储在您的电脑或移动设备上的小型文件，用于记录您的浏览历史等信息。
              </p>
            </li>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>设备</strong>
                ：可访问我们服务的任何设备，例如电脑、手机或平板电脑。
              </p>
            </li>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>个人信息</strong>：与可识别的个人相关的任何信息。
              </p>
            </li>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>服务</strong>：指我们的网站。
              </p>
            </li>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>网站</strong>：指Seek Returns，访问地址为{" "}
                <Link href="/zh" className={styles.link}>
                  https://seekreturns.com
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
        <section aria-labelledby="data-collection">
          <h2 id="data-collection" className={styles.h2}>
            我们如何收集和使用您的信息
          </h2>
          <h3 className={styles.h3}>我们收集的信息类型</h3>
          <h4 className={styles.h4}>个人信息</h4>
          <p className={styles.p}>
            在您使用我们的服务时，我们可能会要求您提供一些可用于联系或识别您的个人信息。
          </p>
          <h4 className={styles.h4}>使用数据</h4>
          <p className={styles.p}>
            当您使用我们的服务时，我们会自动收集一些数据，例如您的IP地址、浏览器类型、访问的页面、访问时间以及设备标识符等。
          </p>
          <p className={styles.p}>
            如果您通过移动设备访问我们的服务，我们可能会收集设备的类型、唯一标识符、操作系统和浏览器类型等信息。
          </p>
          <h4 className={styles.h4}>Cookies和跟踪技术</h4>
          <p className={styles.p}>
            我们使用Cookies和其他跟踪技术来跟踪您在我们服务上的活动并存储某些信息。这些技术包括：
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <strong>Cookies</strong>
              ：您可以设置浏览器拒绝Cookies，但这可能会影响您使用我们服务的某些功能。
            </li>
            <li className={styles.li}>
              <strong>网络信标</strong>
              ：用于统计访问量和验证系统完整性的小型电子文件。
            </li>
          </ul>
          <p className={styles.p}>我们使用的Cookies包括：</p>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>必要Cookies</strong>：用于提供基本服务，例如用户认证。
              </p>
            </li>
            <li className={styles.li}>
              <p className={styles.p}>
                <strong>功能Cookies</strong>
                ：用于记住您的偏好设置，例如语言选择。
              </p>
            </li>
          </ul>
          <h3 className={styles.h3}>我们如何使用您的信息</h3>
          <p className={styles.p}>我们可能将您的信息用于以下目的：</p>
          <ul className={styles.ul}>
            <li className={styles.li}>
              提供和维护我们的服务，监控服务使用情况。
            </li>
            <li className={styles.li}>管理您的账户，提供注册用户专属功能。</li>
            <li className={styles.li}>
              履行合同，例如处理您购买的产品或服务。
            </li>
            <li className={styles.li}>
              通过电子邮件或推送通知与您联系，发送更新或促销信息。
            </li>
            <li className={styles.li}>处理您的请求，回答您的问题。</li>
            <li className={styles.li}>
              进行数据分析，优化我们的服务和营销活动。
            </li>
          </ul>
          <h3 className={styles.h3}>我们可能与谁分享您的信息</h3>
          <p className={styles.p}>在以下情况下，我们可能会分享您的个人信息：</p>
          <ul className={styles.ul}>
            <li className={styles.li}>
              与服务提供商分享，以分析服务使用情况或与您联系。
            </li>
            <li className={styles.li}>在公司合并、收购等业务交易中分享。</li>
            <li className={styles.li}>在得到您同意的情况下，用于其他目的。</li>
          </ul>
          <h3 className={styles.h3}>信息保留</h3>
          <p className={styles.p}>
            我们只会将您的个人信息保留到实现本隐私政策所述目的所需的期限，或满足法律义务所需的时间。
          </p>
          <h3 className={styles.h3}>信息传输</h3>
          <p className={styles.p}>
            您的信息可能会被传输到您所在国家以外的地方进行处理。我们会采取合理措施确保您的数据安全。
          </p>
          <h3 className={styles.h3}>删除您的信息</h3>
          <p className={styles.p}>
            您可以随时登录您的账户，访问账户设置来更新、修改或删除您的个人信息。您也可以联系我们请求删除您的信息，但请注意，我们可能需要保留某些信息以履行法律义务。
          </p>
          <h3 className={styles.h3}>信息披露</h3>
          <p className={styles.p}>
            在以下情况下，我们可能需要披露您的个人信息：
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>遵守法律或政府机构的要求。</li>
            <li className={styles.li}>保护公司权利或财产。</li>
            <li className={styles.li}>防止或调查与服务相关的潜在不当行为。</li>
          </ul>
          <h3 className={styles.h3}>信息安全</h3>
          <p className={styles.p}>
            我们非常重视您的信息安全，但请注意，互联网传输和电子存储并非100%安全，我们无法保证绝对安全。
          </p>
        </section>
        <section aria-labelledby="childrens-privacy">
          <h2 id="childrens-privacy" className={styles.h2}>
            儿童隐私
          </h2>
          <p className={styles.p}>
            我们的服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。如果您是家长并发现您的孩子向我们提供了个人信息，请联系我们，我们会尽快删除相关信息。
          </p>
        </section>
        <section aria-labelledby="third-party-links">
          <h2 id="third-party-links" className={styles.h2}>
            第三方网站链接
          </h2>
          <p className={styles.p}>
            我们的服务可能包含指向第三方网站的链接。我们对这些网站的隐私政策或内容不承担责任，建议您仔细阅读其隐私政策。
          </p>
        </section>
        <section aria-labelledby="policy-updates">
          <h2 id="policy-updates" className={styles.h2}>
            隐私政策更新
          </h2>
          <p className={styles.p}>
            我们可能会不时更新本隐私政策。更新后，我们会在本页面发布新版本，并通过电子邮件或服务内通知告知您。
          </p>
          <p className={styles.p}>建议您定期查看本隐私政策，以了解任何更改。</p>
        </section>
        <section aria-labelledby="contact-us">
          <h2 id="contact-us" className={styles.h2}>
            联系我们
          </h2>
          <p className={styles.p}>
            如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>电子邮件：contact@seekreturns.com</li>
          </ul>
        </section>
      </main>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
    </>
  );
}

export default Page;
