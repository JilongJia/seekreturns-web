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

import exampleForCalculatingPVIFInExcel from "./images/example-for-calculating-pvif-in-excel.png";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>How to Calculate PVIF in Excel</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Determining the present value of future money is important for
          effective financial planning. The present value interest factor (PVIF)
          simplifies this calculation by clearly showing the current worth of
          future payments or cash flows. In this guide, you’ll learn how to
          efficiently calculate PVIF using Excel, turning a basic financial
          concept into a useful, practical tool.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is PVIF?</H2>
          <P>
            The present value interest factor (PVIF) calculates how much a
            future sum of money is worth today, adjusting for interest and the
            passage of time. For example, suppose you expect to receive $1,000
            in two years, and the interest rate is 5%. PVIF helps you determine
            today’s value of that future $1,000, considering that money received
            later is generally worth less than money in your hand now. It’s an
            essential concept for analyzing investments, loans, or any financial
            situation involving future cash flows.
          </P>
          <P>The formula for PVIF is simple:</P>
          <BlockMath math="\text{PVIF} = \frac{1}{(1 + r)^n}" />
          <P>
            Here, <Strong>r</Strong> represents the interest rate per period,
            and <Strong>n</Strong> stands for the number of periods. This
            formula shows clearly how interest reduces the future amount when
            converting it back into today’s dollars—known as the “time value of
            money.” Using Excel, you can easily calculate PVIF, making it a
            practical tool for everyday financial decisions.
          </P>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to calculate PVIF in Excel</H2>
          <Ol>
            <Ol.Li>
              <Strong>Enter your data</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>A1</Strong>, type <Code>Interest Rate</Code>;
                  in <Strong>A2</Strong>, enter <Code>0.05</Code> (representing
                  5%).
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>B1</Strong>, type <Code>Periods</Code>; in{" "}
                  <Strong>B2</Strong>, enter <Code>2</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
            <Ol.Li>
              <Strong>Calculate PVIF</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>C1</Strong>, type <Code>PVIF</Code>; in{" "}
                  <Strong>C2</Strong>, type <Code>=1/(1+A2)^B2</Code>.
                </Ol.Li>
                <Ol.Li>
                  Press <Strong>Enter</Strong>. Excel calculates the PVIF,
                  approximately <Code>0.9070</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
            <Ol.Li>
              <Strong>Calculate the present value</Strong> <Em>(optional)</Em>:
              <P className={styles.firstElementInListItem}>
                If you have a specific future amount, calculate its present
                value by multiplying it by your PVIF. For example, to find the
                present value of $1,000:
              </P>
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>D1</Strong>, type <Code>Present Value</Code>;
                  in <Strong>D2</Strong>, type <Code>=C2*1000</Code>.
                </Ol.Li>
                <Ol.Li>
                  Press <Strong>Enter</Strong>. Excel returns approximately{" "}
                  <Code>$907.03</Code>, the present value of $1,000 in two
                  periods at 5% interest.
                </Ol.Li>
              </Ol>
            </Ol.Li>
          </Ol>
          <ImageFigure>
            <ImageFigure.Image
              src={exampleForCalculatingPVIFInExcel}
              alt="Example for calculating PVIF in Excel"
            />
            <ImageFigure.Figcaption>
              Example for calculating PVIF in Excel
            </ImageFigure.Figcaption>
          </ImageFigure>
        </Section>
      </Article>
    </main>
  );
}
