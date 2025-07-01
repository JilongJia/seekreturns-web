import clsx from "clsx";
import "katex/dist/katex.min.css";

import { Article } from "@/components/en/ui/Article";
import { BlockMath } from "@/components/en/ui/Math";
import { H1 } from "@/components/en/ui/H1";
import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { Header } from "@/components/en/ui/Header";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Calculator } from "./components/Calculator";

import styles from "./Main.module.css";
import type { MainProps } from "@/components/en/ui/Main";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={clsx(styles.main, className)}>
      <Header className={styles.header}>
        <H1>Future Value Interest Factor (FVIF) Calculator</H1>
        <ModifiedDate pathname={pathname} />
      </Header>
      <Calculator className={styles.calculator} />
      <Article>
        <P>
          Understanding how your money grows over time is an essential aspect of
          financial planning. The future value interest factor (FVIF) calculator
          offers a simple way to calculate this growth based on compound
          interest, using only an interest rate and a time period.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is the future value interest factor?</H2>
          <P>
            The future value interest factor (FVIF) is a financial tool that
            shows how much a sum of money will grow over time when earning
            compound interest. It’s based on two key variables: the interest
            rate and the number of time periods. Unlike simple interest, which
            only applies to the initial amount, FVIF accounts for interest
            earned on both the principal and the interest that accumulates.
          </P>
          <P>
            You can use FVIF to streamline calculations in investing or saving.
            For instance, if you want to know what $1,000 will be worth in 10
            years at a 5% annual rate, FVIF gives you a multiplier—such as
            1.6289—to quickly calculate the result: $1,628.90.
          </P>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to calculate the future value interest factor?</H2>
          <P>
            Calculating FVIF manually is straightforward with a simple formula:
          </P>
          <BlockMath math="\text{FVIF} = (1 + r)^n" />
          <P>
            In this formula, “r” represents the interest rate in decimal form
            (e.g., 5% becomes 0.05), and “n” stands for the number of time
            periods. To ensure accuracy, the result is usually rounded to four
            decimal places. This formula reflects the compounding effect by
            raising the base (1 plus the interest rate) to the power of the
            number of periods.
          </P>
          <P>
            For example, with a 5% interest rate over 3 years, you’d calculate:
          </P>
          <BlockMath math="\text{FVIF} = (1 + 0.05)^3 = 1.1576" />
          <P>
            This means that $1 today would grow to $1.1576 after three years at
            a 5% rate.
          </P>
        </Section>
        <Section ariaLabelledby="usage">
          <H2 id="usage">Using the FVIF calculator</H2>
          <P>
            The FVIF calculator provides the future value interest factor
            instantly as you adjust its two inputs. Simply enter the interest
            rate (e.g., 6 for 6%) and the number of periods (e.g., 5 for 5
            years), and the result—such as 1.3382—will automatically update,
            rounded to four decimal places.
          </P>
          <P>
            To apply the factor, multiply it by your starting amount. For
            example, $1,000 × 1.3382 = $1,338.20. This shows you what your money
            will grow to over that time at the given rate.
          </P>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">Frequently asked questions</H2>
          <H3>What’s the difference between FVIF and future value?</H3>
          <P>
            FVIF is the growth factor that shows how much $1 will increase over
            time with compound interest, while future value represents the
            actual dollar amount after applying that factor to your initial sum.
            For example, an FVIF of 1.2100 means $1 grows to $1.21, but the
            future value tells you that $500 will become $605.
          </P>
          <H3>Is FVIF useful for variable rates?</H3>
          <P>
            No, FVIF assumes a fixed rate. For variable rates, you’d need to
            calculate period-by-period growth manually or use a more advanced
            tool, as compounding effects change with each rate adjustment.
          </P>
          <H3>Does FVIF account for inflation?</H3>
          <P>
            No, FVIF assumes a nominal interest rate and doesn’t adjust for
            inflation. To account for real growth, subtract the inflation rate
            from your interest rate before calculating. For example, use 3%
            instead of 5% if inflation is 2%.
          </P>
        </Section>
      </Article>
    </main>
  );
}
