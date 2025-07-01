import clsx from "clsx";
import "katex/dist/katex.min.css";

import { Article } from "@/components/en/ui/Article";
import { BlockMath } from "@/app/components/en/content/page/main/article/Math";
import { H1 } from "@/components/en/ui/H1";
import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { Header } from "@/components/en/ui/Header";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
import { Ol } from "@/app/components/en/content/page/main/article/Ol";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Strong } from "@/app/components/en/content/page/main/article/Strong";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";
import { Calculator } from "./components/Calculator";

import styles from "./Main.module.css";
import type { MainProps } from "@/components/en/ui/Main";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={clsx(styles.main, className)}>
      <Header className={styles.header}>
        <H1>Future Value Interest Factor of Annuity (FVIFA) Calculator</H1>
        <ModifiedDate pathname={pathname} />
      </Header>
      <Calculator className={styles.calculator} />
      <Article>
        <P>
          What if you could predict how much your regular investments will grow
          over time? The future value interest factor of annuity (FVIFA) helps
          you do just that—whether you’re saving for a big goal or comparing
          financial options. In 2023, U.S. annuity sales reached a record high
          of $385.4 billion, highlighting the growing popularity of these
          steady-growth financial tools.
        </P>
        <P>
          Use this article to understand FVIFA and unlock its power with a
          simple calculator. We’ll break down what it is, how to calculate it,
          and how to apply it to your financial decisions—all without the fluff.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is FVIFA?</H2>
          <P>
            The future value interest factor of annuity (FVIFA) is a tool that
            shows how much a series of regular payments will grow over time,
            factoring in compound interest. Think of it as a multiplier: it
            calculates the combined future worth of your payments—like monthly
            deposits into a savings account—after earning interest for a set
            number of periods. It’s essential when planning investments,
            retirement savings, or loan repayments.
          </P>
          <P>
            An annuity refers to equal payments made at regular intervals, such
            as depositing $500 every month for 10 years. FVIFA calculates what
            those payments will be worth in the future, assuming a steady
            interest rate. Unlike one-time investment formulas, FVIFA
            specifically deals with repeated contributions, reflecting realistic
            financial situations like building wealth gradually.
          </P>
          <P>
            FVIFA also helps you compare options clearly. For example, will a 5%
            interest rate grow your savings significantly faster than a 3% rate
            over 20 years? FVIFA provides precise answers to these types of
            questions, eliminating guesswork and helping you make informed
            decisions.
          </P>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to calculate FVIFA?</H2>
          <P>
            Calculating the future value interest factor of annuity (FVIFA) is
            straightforward once you know the formula. It requires two inputs:
          </P>
          <Ul>
            <Ul.Li>Interest rate per period (expressed as a decimal)</Ul.Li>
            <Ul.Li>Number of periods</Ul.Li>
          </Ul>
          <P>The formula is:</P>
          <BlockMath math="\text{FVIFA} = \frac{(1 + r)^n - 1}{r}" />
          <P>Where:</P>
          <Ul>
            <Ul.Li>
              <Strong>r</Strong> is the interest rate per period (for example,
              5% becomes 0.05)
            </Ul.Li>
            <Ul.Li>
              <Strong>n</Strong> is the number of periods (years, months, etc.)
            </Ul.Li>
          </Ul>
          <P>If the interest rate is 0, the formula simplifies to:</P>
          <BlockMath math="\text{FVIFA} = n" />
          <P>
            In this case, since there’s no interest compounding, your future
            value is simply the sum of all your payments.
          </P>
        </Section>
        <Section ariaLabelledby="usage">
          <H2 id="usage">Using the FVIFA calculator</H2>
          <P>
            Calculating FVIFA manually can be tedious, especially with larger
            numbers. A calculator simplifies the process significantly, allowing
            you to quickly plan your savings or compare investment options.
          </P>
          <P>Here’s how to use it:</P>
          <Ol>
            <Ol.Li>
              Enter the interest rate per period as a percentage (e.g., enter 5
              for 5%).
            </Ol.Li>
            <Ol.Li>
              Input the number of periods, matching your payment schedule.
            </Ol.Li>
          </Ol>
          <P>
            The calculator automatically provides the FVIFA, rounded to four
            decimal places.
          </P>
          <P>
            For example, entering an interest rate of 5% and 3 periods gives an
            FVIFA of 3.1525. Multiplying this by your periodic payment amount
            (e.g., $100) shows your future value would be $315.25.
          </P>
          <P>
            If your interest rate is 0%, the calculator simply returns the
            number of periods. For instance, 3 periods at 0% yields an FVIFA of
            exactly 3.0000, meaning your future value would be the total amount
            of all payments made without any interest.
          </P>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">Frequently asked questions</H2>
          <H3>What’s the difference between FVIFA and FVIF?</H3>
          <P>
            FVIFA is used for annuities—regular payments made over time. FVIF
            (future value interest factor) is for a single lump-sum payment.
            Choose FVIFA when you’re making regular contributions, such as
            monthly deposits.
          </P>
          <H3>Can FVIFA be negative?</H3>
          <P>
            No, FVIFA cannot be negative. The formula assumes positive growth
            due to compound interest. If you see a negative result, recheck your
            inputs for accuracy.
          </P>
          <H3>What if my interest rate changes?</H3>
          <P>
            FVIFA assumes a fixed interest rate throughout the period. For
            variable rates, you’d have to calculate FVIFA separately for each
            period at its specific rate, then combine the results.
          </P>
          <H3>How do I use FVIFA in real life?</H3>
          <P>
            Multiply FVIFA by your payment amount to find the annuity’s future
            value. For example, if your monthly payment is $200 and your FVIFA
            is 3.1525 (5%, 3 periods), your savings after three periods will be
            $630.50.
          </P>
          <H3>Why does zero interest just give me the number of periods?</H3>
          <P>
            With no interest, no compounding occurs, so your future value is
            simply the total amount of your payments. FVIFA directly reflects
            this as the total number of periods.
          </P>
        </Section>
      </Article>
    </main>
  );
}
