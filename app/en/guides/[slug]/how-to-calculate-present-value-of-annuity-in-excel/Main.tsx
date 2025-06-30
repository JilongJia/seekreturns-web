import "katex/dist/katex.min.css";

import { Article } from "@/app/components/en/content/page/main/article/Article";
import { BlockMath } from "@/app/components/en/content/page/main/article/Math";
import { Code } from "@/app/components/en/content/page/main/article/Code";
import { Dl } from "@/app/components/en/content/page/main/article/Dl";
import { H1 } from "@/components/en/ui/H1";
import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { Header } from "@/components/en/ui/Header";
import { ImageFigure } from "@/app/components/en/content/page/main/article/ImageFigure";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
import { Ol } from "@/app/components/en/content/page/main/article/Ol";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Strong } from "@/app/components/en/content/page/main/article/Strong";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";

import styles from "./Main.module.css";
import type { MainProps } from "@/components/en/ui/Main";

import exampleForCalculatingPresentValueOfOrdinaryAnnuityInExcel from "./images/example-for-calculating-present-value-of-ordinary-annuity-in-excel.png";
import exampleForCalculatingPresentValueOfGrowingAnnuityInExcel from "./images/example-for-calculating-present-value-of-growing-annuity-in-excel.png";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>How to Calculate Present Value of Annuity in Excel</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Imagine you’re offered a choice: receive $1,000 every year for the
          next decade or take a lump sum today. Which is worth more? You can
          answer this using the present value of an annuity, a calculation that
          compares future cash flows to their current worth in today’s dollars.
          In this article, you’ll learn how to calculate the present value of
          both ordinary and growing annuities using Excel.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is the present value of an annuity?</H2>
          <P>
            The present value of an annuity shows what a series of future
            payments is worth right now. It’s based on the concept that money
            today is worth more than money tomorrow due to its potential to earn
            interest.
          </P>
          <P>
            You might use the present value calculation in scenarios like
            evaluating investments, comparing loan options, or assessing
            retirement plans with regular payments. For instance, if you’re
            promised $5,000 annually for 5 years, calculating the present value
            helps you understand what this stream of payments would be worth if
            converted into a single lump-sum amount today. The calculation
            considers a discount rate, which could represent interest rates or
            inflation, to reflect the current worth accurately.
          </P>
        </Section>
        <Section ariaLabelledby="types">
          <H2 id="types">Types of annuities</H2>
          <P>
            There are two common types of annuities you’ll encounter when
            performing present value calculations:
          </P>
          <Dl>
            <Dl.Dt>Ordinary annuity</Dl.Dt>
            <Dl.Dd>
              Pays out at the end of each period. An example is receiving an
              annual pension check each December 31st.
            </Dl.Dd>
            <Dl.Dt>Growing annuity</Dl.Dt>
            <Dl.Dd>
              Payments increase each period, typically to keep pace with
              inflation or other growth factors. A common example is a salary
              that increases by 3% every year.
            </Dl.Dd>
          </Dl>
          <P>
            Clearly distinguishing these annuities ensures you choose the
            correct formula and set up your Excel sheet accurately.
          </P>
        </Section>
        <Section ariaLabelledby="ordinary-annuity">
          <H2 id="ordinary-annuity">
            How to calculate the present value of an ordinary annuity in Excel?
          </H2>
          <P>
            To find the present value of an ordinary annuity, you’ll need three
            inputs:
          </P>
          <Ul>
            <Ul.Li>
              <Strong>Payment amount</Strong>: The amount received each period
              (e.g., $1,000 per year).
            </Ul.Li>
            <Ul.Li>
              <Strong>Discount rate</Strong>: The rate used to discount future
              payments to today’s value (e.g., 5% or 0.05).
            </Ul.Li>
            <Ul.Li>
              <Strong>Number of periods</Strong>: The total number of payments
              (e.g., 5 years).
            </Ul.Li>
          </Ul>
          <P>
            As a quick reminder, an ordinary annuity means payments occur at the
            end of each period. Before using Excel, let’s briefly look at the
            formula behind the calculation:
          </P>
          <BlockMath math="PV = P \times \frac{1 - (1 + r)^{-n}}{r}" />
          <P>Where:</P>
          <Ul>
            <Ul.Li>
              <Strong>P</Strong> is the payment per period (e.g., $1,000 each
              year).
            </Ul.Li>
            <Ul.Li>
              <Strong>r</Strong> is the discount rate per period (e.g., 5% or
              0.05).
            </Ul.Li>
            <Ul.Li>
              <Strong>n</Strong> is the number of periods (e.g., 5 years).
            </Ul.Li>
          </Ul>
          <P>
            Using our example of $1,000 annual payments for 5 years with a 5%
            discount rate, the formula looks like this:
          </P>
          <BlockMath math="PV = 1000 \times \frac{1 - (1 + 0.05)^{-5}}{0.05}" />
          <P>
            After calculation, the present value is approximately $4,329.48.
            Excel simplifies this calculation with the built-in PV function,
            eliminating the need for manual computation.
          </P>
          <H3>Calculating it in Excel</H3>
          <Ol>
            <Ol.Li>
              <Strong>Enter your data</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>A1</Strong>, type <Code>Payment</Code>; in{" "}
                  <Strong>A2</Strong>, enter <Code>1000</Code>.
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>B1</Strong>, type <Code>Discount Rate</Code>;
                  in <Strong>B2</Strong>, enter <Code>0.05</Code>.
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>C1</Strong>, type <Code>Periods</Code>; in{" "}
                  <Strong>C2</Strong>, enter <Code>5</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
            <Ol.Li>
              <Strong>Calculate the present value</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>D1</Strong>, type <Code>Present Value</Code>;
                  in <Strong>D2</Strong>, type <Code>=PV(B2, C2, -A2)</Code>.
                </Ol.Li>
                <Ol.Li>
                  Press <Strong>Enter</Strong>, and you’ll get the present value
                  of the ordinary annuity, which is approximately{" "}
                  <Code>$4,329.48</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
          </Ol>
          <ImageFigure>
            <ImageFigure.Image
              src={exampleForCalculatingPresentValueOfOrdinaryAnnuityInExcel}
              alt="Example for calculating present value of ordinary annuity in Excel"
            />
            <ImageFigure.Figcaption>
              Example for calculating present value of ordinary annuity in Excel
            </ImageFigure.Figcaption>
          </ImageFigure>
          <H3>Why the negative payment?</H3>
          <P>
            Excel’s PV function treats payments you receive as negative values
            (cash inflows). Entering the payment as negative (-A2) ensures the
            final present value is positive, clearly reflecting money coming to
            you.
          </P>
        </Section>
        <Section ariaLabelledby="growing-annuity">
          <H2 id="growing-annuity">
            How to calculate the present value of a growing annuity in Excel?
          </H2>
          <P>
            Calculating the present value of a growing annuity is slightly more
            complex since payments increase each period—for example, rent
            payments that rise 3% each year. You’ll need the following
            information:
          </P>
          <Ul>
            <Ul.Li>
              <Strong>First payment</Strong>: The initial payment you receive
              (e.g., $1,000).
            </Ul.Li>
            <Ul.Li>
              <Strong>Discount rate</Strong>: The rate used to discount future
              payments to today’s dollars (e.g., 5% or 0.05).
            </Ul.Li>
            <Ul.Li>
              <Strong>Growth rate</Strong>: The rate at which payments grow each
              period (e.g., 3% or 0.03).
            </Ul.Li>
            <Ul.Li>
              <Strong>Number of periods</Strong>: Total number of payments
              (e.g., 5 years).
            </Ul.Li>
          </Ul>
          <P>
            Excel doesn’t have a built-in function specifically for growing
            annuities, so you’ll input the formula directly into a cell.
          </P>
          <P>The formula for the present value of a growing annuity is:</P>
          <BlockMath math="PV = P \times \frac{1 - \left(\frac{1 + g}{1 + r}\right)^n}{r - g}" />
          <P>Where:</P>
          <Ul>
            <Ul.Li>
              <Strong>P</Strong> is the first payment (e.g., $1,000).
            </Ul.Li>
            <Ul.Li>
              <Strong>g</Strong> is the growth rate per period (e.g., 3% or
              0.03).
            </Ul.Li>
            <Ul.Li>
              <Strong>r</Strong> is the discount rate per period (e.g., 5% or
              0.05).
            </Ul.Li>
            <Ul.Li>
              <Strong>n</Strong> is the number of periods (e.g., 5 years).
            </Ul.Li>
          </Ul>
          <P>
            If your initial payment is $1,000, growing by 3% each year for 5
            years, with a discount rate of 5%, the formula becomes:
          </P>
          <BlockMath math="PV = 1000 \times \frac{1 - \left(\frac{1 + 0.03}{1 + 0.05}\right)^5}{0.05 - 0.03}" />
          <P>
            This calculates to approximately $4583.92. Notice that because
            payments grow each year, this value is higher than an ordinary
            annuity with the same initial payment.
          </P>
          <H3>Calculating it in Excel</H3>
          <Ol>
            <Ol.Li>
              <Strong>Enter your data</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>A1</Strong>, type <Code>First Payment</Code>;
                  in <Strong>A2</Strong>, enter <Code>1000</Code>.
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>B1</Strong>, type <Code>Discount Rate</Code>;
                  in <Strong>B2</Strong>, enter <Code>0.05</Code>.
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>C1</Strong>, type <Code>Growth Rate</Code>; in{" "}
                  <Strong>C2</Strong>, enter <Code>0.03</Code>.
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>D1</Strong>, type <Code>Periods</Code>; in{" "}
                  <Strong>D2</Strong>, enter <Code>5</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
            <Ol.Li>
              <Strong>Calculate the present value</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>E1</Strong>, type <Code>Present Value</Code>;
                  in <Strong>E2</Strong>, type{" "}
                  <Code>=A2*((1-((1+C2)/(1+B2))^D2)/(B2-C2))</Code>.
                </Ol.Li>
                <Ol.Li>
                  Press <Strong>Enter</Strong>, and you’ll get the present value
                  of the growing annuity, which is approximately{" "}
                  <Code>$4,583.92</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
          </Ol>
          <ImageFigure>
            <ImageFigure.Image
              src={exampleForCalculatingPresentValueOfGrowingAnnuityInExcel}
              alt="Example for calculating present value of growing annuity in Excel"
            />
            <ImageFigure.Figcaption>
              Example for calculating present value of growing annuity in Excel
            </ImageFigure.Figcaption>
          </ImageFigure>
          <H3>Important note:</H3>
          <P>
            If your discount rate equals the growth rate (r = g), the standard
            growing annuity formula won’t work due to division by zero. In this
            rare case, calculate the present value simply by multiplying the
            first payment by the number of periods:
          </P>
          <BlockMath math="PV = P \times n" />
        </Section>
      </Article>
    </main>
  );
}
