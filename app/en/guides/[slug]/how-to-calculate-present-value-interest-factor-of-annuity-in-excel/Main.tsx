import "katex/dist/katex.min.css";

import { Article } from "@/components/en/ui/Article";
import { BlockMath } from "@/components/en/ui/Math";
import { Code } from "@/components/en/ui/Code";
import { Em } from "@/components/en/ui/Em";
import { H1 } from "@/components/en/ui/H1";
import { H2 } from "@/components/en/ui/H2";
import { Header } from "@/components/en/ui/Header";
import { ImageFigure } from "@/components/en/ui/Figure";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
import { Ol } from "@/components/en/ui/Ol";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Strong } from "@/components/en/ui/Strong";

import styles from "./Main.module.css";
import type { MainProps } from "@/components/en/ui/Main";

import exampleForCalculatingPVIFAInExcel from "./images/example-for-calculating-pvifa-in-excel.png";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>How to Calculate PVIFA in Excel</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Calculating the present value of a series of future payments is
          crucial in financial analysis. The present value interest factor of an
          annuity (PVIFA) provides a quick way to find what those payments are
          worth today.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is PVIFA?</H2>
          <P>
            The present value interest factor of an annuity (PVIFA) is a tool
            that calculates the value today of a set of equal future payments,
            taking into account the “time value of money.” The “time value of
            money” means that a dollar available now is more valuable than a
            dollar received later, because you can invest it and potentially
            earn interest. For instance, suppose you’re set to receive $1,000
            per year for 5 years at a 4% interest rate. PVIFA tells you the
            total value of that income stream in today’s terms. It’s often used
            when evaluating annuities, such as loan repayments or retirement
            income plans.
          </P>
          <P>Here’s the formula:</P>
          <BlockMath math="\text{PVIFA} = \frac{1 - (1 + r)^{-n}}{r}" />
          <P>
            In this equation, <Strong>r</Strong> is the interest rate per
            period, and <Strong>n</Strong> is the number of periods. PVIFA shows
            how future cash flows are discounted back to the present, so you
            don’t have to calculate each year’s discounted payment separately.
            By using Excel, you can quickly apply this calculation, making PVIFA
            a convenient way to assess different financial options.
          </P>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to calculate PVIFA in Excel</H2>
          <Ol>
            <Ol.Li>
              <Strong>Enter your data</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>A1</Strong>, type <Code>Interest Rate</Code>;
                  in cell <Strong>A2</Strong>, enter <Code>0.04</Code>{" "}
                  (representing 4%).
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>B1</Strong>, type <Code>Periods</Code>; in
                  cell <Strong>B2</Strong>, enter <Code>5</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
            <Ol.Li>
              <Strong>Calculate PVIFA</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>C1</Strong>, type <Code>PVIFA</Code>; in cell{" "}
                  <Strong>C2</Strong>, enter the formula:{" "}
                  <Code>=(1-(1+A2)^-B2)/A2</Code>.
                </Ol.Li>
                <Ol.Li>
                  Press <Strong>Enter</Strong>. Excel calculates the PVIFA,
                  approximately <Code>4.4518</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
            <Ol.Li>
              <Strong>Calculate the present value</Strong> <Em>(optional)</Em>:
              <P className={styles.firstElementInListItem}>
                If you have annual payments, calculate their present value by
                multiplying the annual payment by your PVIFA.
              </P>
              <P>
                For example, to find the present value of annual payments of
                $1,000:
              </P>
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>D1</Strong>, type <Code>Annual Payment</Code>;
                  in cell <Strong>D2</Strong>, type <Code>1000</Code>.
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>E1</Strong>, type <Code>Present Value</Code>;
                  in cell <Strong>E2</Strong>, enter <Code>=D2*C2</Code>.
                </Ol.Li>
                <Ol.Li>
                  Press <Strong>Enter</Strong>. Excel returns approximately{" "}
                  <Code>$4,451.82</Code>, the present value of receiving $1,000
                  annually for 5 years at a 4% interest rate.
                </Ol.Li>
              </Ol>
            </Ol.Li>
          </Ol>
          <ImageFigure>
            <ImageFigure.Image
              src={exampleForCalculatingPVIFAInExcel}
              alt="Example for calculating PVIFA in Excel"
            />
            <ImageFigure.Figcaption>
              Example for calculating PVIFA in Excel
            </ImageFigure.Figcaption>
          </ImageFigure>
        </Section>
      </Article>
    </main>
  );
}
