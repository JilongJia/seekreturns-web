import clsx from "clsx";
import "katex/dist/katex.min.css";

import { type MainProps } from "@/app/components/en/content/page/main";
import { Article } from "@/app/components/en/content/page/main/article/Article";
import {
  BlockMath,
  InlineMath,
} from "@/app/components/en/content/page/main/article/Math";
import { H1 } from "@/app/components/en/content/page/main/header/H1";
import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { Header } from "@/app/components/en/content/page/main/header/Header";
import { ModifiedDate } from "@/app/components/en/content/page/main/header/ModifiedDate";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Calculator } from "./components/Calculator";
import styles from "./Main.module.css";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={clsx(styles.main, className)}>
      <Header className={styles.header}>
        <H1>Present Value Interest Factor of Annuity (PVIFA) Calculator</H1>
        <ModifiedDate pathname={pathname} />
      </Header>
      <Calculator className={styles.calculator} />
      <Article>
        <P>
          Understanding the Present Value Interest Factor of Annuity (PVIFA) is
          essential to understand financial transactions better. Our PVIFA
          Calculator simplifies this complex calculation, allowing you to
          quickly determine an annuity’s present value.
        </P>
        <P>
          In this article, we’ll explore what PVIFA is, how to calculate it, and
          provide a practical example. Let’s delve into the workings of the
          PVIFA Calculator and how it can benefit you.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is PVIFA?</H2>
          <P>
            PVIFA (short for “Present Value Interest Factor of Annuity”) helps
            to determine the present value of a series of annuity payments. It’s
            the sum of present values of all future annuity payments, discounted
            at a certain interest rate.
          </P>
          <P>
            Let’s break it down further. When you invest in an annuity, you
            expect to receive a series of payments in the future. However, the
            value of money changes over time due to inflation and other factors.
            PVIFA helps to understand what these future payments are worth in
            today’s dollars.
          </P>
          <P>
            In practical terms, PVIFA is vital in several financial scenarios.
            For instance, if you’re planning for retirement, you can use PVIFA
            to calculate the present value of your pension plan payouts.
            Similarly, it’s helpful in loan calculations, helping borrowers
            understand the total cost of the loan repayments in present value
            terms.
          </P>
        </Section>
        <Section ariaLabelledby="formula">
          <H2 id="formula">PVIFA formula</H2>
          <P>
            The formula for the Present Value Interest Factor of Annuity (PVIFA)
            is:
          </P>
          <BlockMath math="\text{PVIFA} = \frac{1 - (1 + r)^{-n}}{r}" />
          <P>
            In this formula, <InlineMath math="r" /> represents the interest
            rate per period, and <InlineMath math="n" /> is the number of
            periods.
          </P>
        </Section>
        <Section ariaLabelledby="example">
          <H2 id="example">PVIFA calculation example</H2>
          <P>
            Let’s illustrate how to calculate the PVIFA with a specific example.
          </P>
          <P>
            Suppose you’re considering an investment that promises to pay $1,000
            annually for the next 5 years. The annual interest rate is 4%. To
            determine the present value of these annuity payments, you’ll use
            our PVIFA calculator.
          </P>
          <P>
            Here, “r” (interest rate per period) is 4% or 0.04, and “n” (number
            of periods) is 5 years.
          </P>
          <P>Inputting these into our calculator, we will get PVIFA ≈ 4.45.</P>
          <P>
            Now that you have the PVIFA, you can determine the present value of
            the annuity. Multiply the PVIFA by the annual payment amount:
          </P>
          <P>Present Value = PVIFA × Annual Payment = 4.45 × $1,000 = $4,450</P>
          <P>
            This means the present value of receiving $1,000 annually for the
            next 5 years, discounted at 4%, is approximately $4,450.
          </P>
          <P>
            You can use this calculation to compare different investment or
            financing options. For instance, if you’re considering another
            investment offering a higher annuity but over a shorter period, or
            at a different interest rate, you can calculate its PVIFA for
            comparison.
          </P>
          <P>
            Similarly, if you’re evaluating loan options, our PVIFA calculator
            helps you understand the total cost of the loan repayments in
            present value terms, making it easier to choose the most
            cost-effective option.
          </P>
        </Section>
      </Article>
    </main>
  );
}
