import "katex/dist/katex.min.css";

import { Article } from "@/app/components/en/content/page/main/article/Article";
import { BlockMath } from "@/app/components/en/content/page/main/article/Math";
import { Code } from "@/app/components/en/content/page/main/article/Code";
import { H1 } from "@/app/components/en/content/page/main/article/H1";
import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { Header } from "@/components/en/ui/Header";
import { ImageFigure } from "@/app/components/en/content/page/main/article/ImageFigure";
import { ModifiedDate } from "@/app/components/en/content/page/main/article/ModifiedDate";
import { Ol } from "@/app/components/en/content/page/main/article/Ol";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Strong } from "@/app/components/en/content/page/main/article/Strong";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";

import styles from "./Main.module.css";
import type { MainProps } from "@/components/en/ui/Main";

import exampleForCalculatingProRataInExcel from "./images/example-for-calculating-pro-rata-in-excel.png";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>How to Calculate Pro Rata in Excel</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Calculating pro rata in Excel can save you time and effort when
          splitting costs, allocating resources, or determining fair shares
          based on proportions. Tasks like dividing a budget across departments
          or calculating salaries for part-time employees become
          straightforward—without complicated math.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is pro rata?</H2>
          <P>
            Pro rata is a Latin term meaning “in proportion.” It refers to
            dividing something—such as costs, resources, or payments—according
            to each participant’s proportional share. Imagine splitting a pie:
            each person’s slice size depends on factors like their contribution
            or duration of involvement.
          </P>
          <P>A straightforward formula for calculating pro rata is:</P>
          <BlockMath math="\text{Pro rata amount} = \frac{\text{Portion Units}}{\text{Total Units}} \times \text{Total Amount}" />
          <P>Where:</P>
          <Ul>
            <Ul.Li>
              <Strong>Total Amount</Strong>: the full quantity you’re dividing,
              like a budget or expense.
            </Ul.Li>
            <Ul.Li>
              <Strong>Total Units</Strong>: the entire period or quantity (e.g.,
              total number of days, hours, or shares).
            </Ul.Li>
            <Ul.Li>
              <Strong>Portion Units</Strong>: the specific part of the total you
              are calculating.
            </Ul.Li>
          </Ul>
          <P>
            For instance, if you share monthly rent and one roommate moves in
            mid-month, you’d use pro rata to calculate precisely how much they
            owe for their portion of the month. Businesses similarly use pro
            rata for allocating budgets, splitting project fees, or distributing
            payments.
          </P>
          <P>
            Unlike fixed allocation methods, pro rata dynamically adapts to
            varying proportions, making it especially useful in situations where
            fairness and accuracy matter. Excel simplifies this calculation, as
            you’ll see in the next section.
          </P>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to calculate pro rata in Excel</H2>
          <Ol>
            <Ol.Li>
              <Strong>Enter your data</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>A1</Strong>, type <Code>Total Amount</Code>;
                  in cell <Strong>A2</Strong>, enter the total amount you want
                  to divide. For example, if you’re dividing a budget of
                  $10,000, enter <Code>10000</Code>.
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>B1</Strong>, type <Code>Total Units</Code>; in
                  cell <Strong>B2</Strong>, enter the total number of units that
                  your total amount covers. Units could represent days, hours,
                  or any measurable quantity. For example, if the total period
                  is 30 days, enter <Code>30</Code>.
                </Ol.Li>
                <Ol.Li>
                  In cell <Strong>C1</Strong>, type <Code>Portion Units</Code>;
                  in cell <Strong>C2</Strong>, enter the number of units for
                  which you want to calculate the pro rata amount. For example,
                  if you need the portion for 10 days, enter <Code>10</Code>.
                </Ol.Li>
              </Ol>
            </Ol.Li>
            <Ol.Li>
              <Strong>Calculate the pro rata amount</Strong>:
              <Ol className={styles.secondaryList}>
                <Ol.Li>
                  In cell <Strong>D1</Strong>, type <Code>Pro Rata Amount</Code>
                  ; in cell <Strong>D2</Strong>, enter the formula:{" "}
                  <Code>=(C2/B2)*A2</Code>.
                </Ol.Li>
                <Ol.Li>
                  Press <Strong>Enter</Strong>, and Excel calculates the pro
                  rata amount immediately. For example, with the data above,
                  Excel displays <Code>$3,333.33</Code>, indicating the
                  proportional share corresponding to 10 out of 30 days.
                </Ol.Li>
              </Ol>
            </Ol.Li>
          </Ol>
          <ImageFigure>
            <ImageFigure.Image
              src={exampleForCalculatingProRataInExcel}
              alt="Example for calculating pro rata in Excel"
            />
            <ImageFigure.Figcaption>
              Example for calculating pro rata in Excel
            </ImageFigure.Figcaption>
          </ImageFigure>
        </Section>
      </Article>
    </main>
  );
}
