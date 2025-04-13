import clsx from "clsx";

import { Header } from "@/app/components/en/content/page/Header";
import { Footer } from "@/app/components/en/content/page/Footer";
import styles from "./page.module.css";

async function Page() {
  return (
    <>
      <Header
        pathname={`/`}
        className={clsx(styles.header, "layoutContainer")}
      />
      <div className={clsx(styles.contentContainer, "layoutContainer")}></div>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
    </>
  );
}

export default Page;
