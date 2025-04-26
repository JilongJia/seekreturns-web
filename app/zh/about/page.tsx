import clsx from "clsx";
import Image from "next/image";

import { Header as PageHeader } from "@/app/components/zh/utility/page/Header";
import { Footer } from "@/app/components/zh/utility/page/Footer";
import styles from "./page.module.css";

import jilongAndSunica from "./images/jilong-and-sunica.png";

async function Page() {
  return (
    <>
      <PageHeader
        pathname="/zh/about"
        className={clsx(styles.pageHeader, "layoutContainer")}
      />
      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1 className={styles.h1}>关于我们</h1>
        </header>
        <p className={clsx(styles.p, styles.introduction)}>
          Seek Returns
          致力于为投资者和交易者提供实用的工具和市场分析，帮助大家更轻松地参与金融市场。
        </p>
        <Image
          src={jilongAndSunica}
          alt="Jilong 和 Sunica"
          className={styles.image}
        />
        <section aria-labelledby="goal" className={styles.section}>
          <h2 id="goal" className={styles.h2}>
            我们的目标
          </h2>
          <p className={styles.p}>
            Seek Returns
            是我（Jilong）创办的一个个人项目。我有多年金融分析经验，专注于市场研究和投资策略。
          </p>
          <p className={styles.p}>
            在和一些交易社区的交流中，我发现很多人对金融市场的基本概念感到困惑，或者缺少好用的工具来帮助他们分析市场。
          </p>
          <p className={styles.p}>
            因为这个原因，我创建了 Seek
            Returns，希望通过提供易用的工具和清晰的信息，帮助大家更好地理解市场，做出更明智的投资选择。
          </p>
        </section>
        <section aria-labelledby="content" className={styles.section}>
          <h2 id="content" className={styles.h2}>
            我们提供的内容
          </h2>
          <p className={styles.p}>Seek Returns 为您提供以下资源：</p>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <strong>金融知识</strong>
              ：用通俗的语言解释重要的金融概念和分析方法。
            </li>
            <li className={styles.li}>
              <strong>实用工具</strong>
              ：包括股票图表、期权计算器等，帮助您更方便地研究市场。
            </li>
            <li className={styles.li}>
              <strong>市场分析</strong>
              ：提供市场数据和趋势观察，助您形成自己的投资观点。
            </li>
          </ul>
          <p className={styles.p}>
            不管您是刚接触金融的新手，还是有经验的投资者，我们都希望这些资源能帮您提升金融知识和分析能力。
          </p>
        </section>
        <section aria-labelledby="disclaimer" className={styles.section}>
          <h2 id="disclaimer" className={styles.h2}>
            重要声明
          </h2>
          <p className={styles.p}>
            需要说明的是，我不是持牌金融顾问，Seek Returns
            是一个独立的个人项目，与任何金融机构无关。
          </p>
          <p className={styles.p}>
            本网站的所有内容、工具和分析仅用于学习和参考，不构成投资建议或金融产品的推荐。
          </p>
          <p className={styles.p}>
            投资和交易可能会有风险，可能会导致资金损失。建议您在投资前自行研究，并咨询专业金融顾问，获取适合您的建议。
          </p>
          <p className={styles.p}>
            感谢您访问 Seek Returns，期待我们的内容能帮您更好地了解金融！
          </p>
        </section>
      </main>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
    </>
  );
}

export default Page;
