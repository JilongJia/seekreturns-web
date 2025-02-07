import clsx from "clsx";

import { Footer } from "@/app/components/en-US/root/layout/footer/Footer";
import { Logo } from "@/app/components/en-US/root/layout/footer/Logo";
import { CopyRight } from "@/app/components/en-US/root/layout/footer/CopyRight";
import { Navbar } from "@/app/components/en-US/root/layout/footer/Navbar";
import { SocialIcons } from "@/app/components/en-US/root/layout/footer/SocialIcons";
import styles from "./Default.module.css";

function Default() {
  return (
    <Footer className={clsx(styles.footer, "layoutContainer")}>
      <Logo className={styles.logo} />
      <SocialIcons className={styles.socialIcons} />
      <Navbar className={styles.navbar} />
      <CopyRight className={styles.copyRight} />
    </Footer>
  );
}

export default Default;
