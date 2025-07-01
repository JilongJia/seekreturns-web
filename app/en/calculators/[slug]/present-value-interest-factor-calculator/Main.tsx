import clsx from "clsx";
import "katex/dist/katex.min.css";

import { Article } from "@/components/en/ui/Article";
import { BlockMath } from "@/app/components/en/content/page/main/article/Math";
import { H1 } from "@/components/en/ui/H1";
import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { Header } from "@/components/en/ui/Header";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
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
        <H1>Present Value Interest Factor (PVIF) Calculator</H1>
        <ModifiedDate pathname={pathname} />
      </Header>
      <Calculator className={styles.calculator} />
      <Article>
        <P>
          What if you could figure out exactly what a dollar tomorrow is worth
          today? That’s the power of the present value interest factor (PVIF)—a
          straightforward but essential tool for evaluating investments, loans,
          or financial planning decisions. Understanding PVIF can be the
          difference between overpaying for a future payout or securing a smart
          deal today.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is the present value interest factor?</H2>
          <P>
            The present value interest factor (PVIF) is a financial calculation
            that shows you how much a future sum of money is worth today, based
            on a given interest rate and period of time. Think of it as a
            discount factor—it removes the effects of interest, revealing the
            actual value of cash you’ll receive later.
          </P>
          <P>
            PVIF is fundamental to the concept known as the time value of money,
            which states that money available today is worth more than the same
            amount in the future because of its potential to earn interest or
            returns.
          </P>
          <P>
            This tool is especially useful when evaluating investment returns,
            comparing different loan options, or deciding whether to accept a
            lump sum today versus periodic payments in the future. For example,
            if you’re offered $1,000 payable five years from now, PVIF can help
            you calculate exactly how much that $1,000 is worth today if
            discounted at, say, a 5% annual interest rate.
          </P>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">
            How to calculate the present value interest factor?
          </H2>
          <P>
            Calculating the present value interest factor (PVIF) is
            straightforward. Use this formula:
          </P>
          <BlockMath math="\text{PVIF} = \frac{1}{(1 + r)^n}" />
          <P>Where:</P>
          <Ul>
            <Ul.Li>
              <Strong>r</Strong> is the interest rate (expressed as a decimal,
              e.g., 0.05 for 5%).
            </Ul.Li>
            <Ul.Li>
              <Strong>n</Strong> is the number of periods (e.g., years or
              months).
            </Ul.Li>
          </Ul>
          <P>
            The result tells you the present worth of one dollar you’ll receive
            in the future.
          </P>
          <P>
            For example, let’s say the interest rate is 5% (0.05) and the time
            period is 3 years. Applying the formula:
          </P>
          <BlockMath math="\text{PVIF} = \frac{1}{(1 + 0.05)^3} = 0.8638" />
          <P>
            This means one dollar received three years from now is worth about
            $0.86 today.
          </P>
        </Section>
        <Section ariaLabelledby="usage">
          <H2 id="usage">Using the PVIF calculator</H2>
          <P>
            The PVIF calculator quickly computes the present value interest
            factor. Simply enter:
          </P>
          <Ul>
            <Ul.Li>Interest rate as a percentage (e.g., 5 for 5%)</Ul.Li>
            <Ul.Li>Number of periods (e.g., 3 for three years)</Ul.Li>
          </Ul>
          <P>
            The calculator will provide the PVIF rounded to four decimal places,
            such as 0.8638. To find the current value of any future sum,
            multiply that amount by the PVIF. For example:
          </P>
          <BlockMath math="\$1,000 \times 0.8638 = \$863.80" />
          <P>
            This means $1,000 received in three years is worth $863.80 today.
          </P>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">Frequently asked questions</H2>
          <H3>What’s the difference between PVIF and FVIF?</H3>
          <Ul>
            <Ul.Li>
              PVIF (present value interest factor) discounts future sums of
              money to determine their current value.
            </Ul.Li>
            <Ul.Li>
              FVIF (future value interest factor) does the opposite—it shows how
              much money invested today will grow over time.
            </Ul.Li>
          </Ul>
          <P>
            Use PVIF when evaluating future cash flows you’d receive, and use
            FVIF for calculating the future value of current investments.
          </P>
          <H3>What does a PVIF value less than 1 mean?</H3>
          <P>
            A PVIF less than 1 indicates that future money is worth less than
            today’s money because of the time value of money. For example, a
            PVIF of 0.8638 means that $1 received in the future is valued at
            about $0.86 today. This is normal since interest rates and the
            passage of time reduce money’s present worth.
          </P>
        </Section>
      </Article>
    </main>
  );
}
