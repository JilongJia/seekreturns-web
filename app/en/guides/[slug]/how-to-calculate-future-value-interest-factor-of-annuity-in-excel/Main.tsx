import "katex/dist/katex.min.css";

import { type MainProps } from "@/app/components/en/content/page/main";
import { Article } from "@/app/components/en/content/page/main/article/Article";
import { BlockMath } from "@/app/components/en/content/page/main/article/Math";
import { Code } from "@/app/components/en/content/page/main/article/Code";
import { Em } from "@/app/components/en/content/page/main/article/Em";
import { H1 } from "@/app/components/en/content/page/main/article/H1";
import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { Header } from "@/app/components/en/content/page/main/article/Header";
import { ImageFigure } from "@/app/components/en/content/page/main/article/ImageFigure";
import { ModifiedDate } from "@/app/components/en/content/page/main/article/ModifiedDate";
import { Ol } from "@/app/components/en/content/page/main/article/Ol";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Strong } from "@/app/components/en/content/page/main/article/Strong";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";
import styles from "./Main.module.css";

import exampleForCalculatingFVIFAInExcel from "./images/example-for-calculating-fvifa-in-excel.png";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>How to Calculate FVIFA in Excel</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Understanding the future value of your money is crucial for anyone
          planning investments, loans, or retirement savings. One tool that
          makes this easier is the future value interest factor of an annuity
          (FVIFA), which helps calculate how much a series of regular payments
          will grow over time with compound interest.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is FVIFA?</H2>
          <P>
            The future value interest factor of an annuity (FVIFA) is a
            financial tool used to calculate the future value of a series of $1
            payments—such as monthly deposits or loan installments—when they
            grow with a consistent interest rate over time. It’s all about
            leveraging the power of compound interest. Whether you’re saving for
            a major goal like retirement or calculating the total cost of a
            loan, FVIFA simplifies the process by reducing the need for complex
            math.
          </P>
          <P>
            By using $1 as the base amount, FVIFA is a flexible factor that can
            be applied to any payment size. For example, if you’re dealing with
            $1,000 payments, you simply multiply the FVIFA by 1,000 to get the
            total future value.
          </P>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to calculate FVIFA in Excel</H2>
          <P>
            Calculating FVIFA in Excel is simple once you understand the formula
            and how to input it. The FVIFA formula is:
          </P>
          <BlockMath math="\text{FVIFA} = \frac{(1 + r)^n - 1}{r}" />
          <P>Where:</P>
          <Ul>
            <Ul.Li>
              <Strong>r</Strong> is the interest rate per period (e.g., 5% as
              0.05)
            </Ul.Li>
            <Ul.Li>
              <Strong>n</Strong> is the number of periods (e.g., months or
              years)
            </Ul.Li>
          </Ul>
          <H3>Calculating it in Excel</H3>
          <Ol>
            <Ol.Li>
              <Strong>Enter your data</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>A1</Strong>, type <Code>Interest Rate</Code>;
                  in <Strong>A2</Strong>, enter <Code>0.05</Code>.
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>B1</Strong>, type <Code>Periods</Code>; in{" "}
                  <Strong>B2</Strong>, enter <Code>10</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
            <Ol.Li>
              <Strong>Calculate FVIFA</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>C1</Strong>, type <Code>FVIFA</Code>; in{" "}
                  <Strong>C2</Strong>, type <Code>=((1+A2)^B2-1)/A2</Code>.
                </Ol.Li>
                <Ol.Li>
                  Press <Strong>Enter</Strong>, and you’ll get FVIFA, which is{" "}
                  <Code>12.5779</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
            <Ol.Li>
              <Strong>Calculate the future value</Strong> <Em>(optional)</Em>:
              <P className={styles.firstElementInListItem}>
                If you’re saving a fixed amount, like $1,000 per year, and want
                to know the future value of these savings over the course of 10
                years with the given interest rate, you can calculate it by
                multiplying the FVIFA by your payment amount.
              </P>
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>D1</Strong>, type <Code>Future Value</Code>;
                  in <Strong>D2</Strong>, type <Code>=C2*1000</Code>.
                </Ol.Li>
                <Ol.Li>
                  Press <Strong>Enter</Strong>, and Excel will return the future
                  value, which is approximately <Code>$12,577.89</Code> in this
                  case. This value represents the total amount you would have at
                  the end of the 10 years, considering both the compound
                  interest and the annual payments.
                </Ol.Li>
              </Ol>
            </Ol.Li>
          </Ol>
          <ImageFigure>
            <ImageFigure.Image
              src={exampleForCalculatingFVIFAInExcel}
              alt="Example for calculating FVIFA in Excel"
            />
            <ImageFigure.Figcaption>
              Example for calculating FVIFA in Excel
            </ImageFigure.Figcaption>
          </ImageFigure>
        </Section>
      </Article>
    </main>
  );
}
