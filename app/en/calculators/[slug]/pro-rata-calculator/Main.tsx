import clsx from "clsx";
import "katex/dist/katex.min.css";

import { Article } from "@/app/components/en/content/page/main/article/Article";
import { BlockMath } from "@/app/components/en/content/page/main/article/Math";
import { H1 } from "@/app/components/en/content/page/main/header/H1";
import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { Header } from "@/components/en/ui/Header";
import { ModifiedDate } from "@/app/components/en/content/page/main/header/ModifiedDate";
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
        <H1>Pro Rata Calculator</H1>
        <ModifiedDate pathname={pathname} />
      </Header>
      <Calculator className={styles.calculator} />
      <Article>
        <P>
          Ever wondered how to fairly divide a cost or value when contributions
          vary? A pro rata calculator simplifies this task by splitting amounts
          based on proportional shares. It’s useful for situations like
          distributing dividends among shareholders or dividing rent among
          roommates.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is pro rata?</H2>
          <P>
            Pro rata is a method of dividing something—such as money, time, or
            resources—according to each person’s proportional share. The term
            comes from Latin, meaning “in proportion,” and it’s widely used in
            finance, business, and daily life to ensure fairness. This approach
            helps split costs or benefits accurately without complicated
            calculations.
          </P>
          <P>
            For example, imagine three friends sharing a $60 pizza bill. If one
            friend ate half the pizza, another ate a third, and the third friend
            ate a sixth, pro rata would split the bill as $30, $20, and $10.
            It’s a straightforward way to align payments with actual
            consumption.
          </P>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to calculate pro rata?</H2>
          <P>
            Calculating a pro rata share is straightforward. You need three
            numbers:
          </P>
          <Ul>
            <Ul.Li>
              <Strong>Total units</Strong> (the whole amount, such as hours or
              shares)
            </Ul.Li>
            <Ul.Li>
              <Strong>Portion units</Strong> (one person’s share of that total)
            </Ul.Li>
            <Ul.Li>
              <Strong>Total amount</Strong> (what you’re dividing, such as money
              or resources)
            </Ul.Li>
          </Ul>
          <P>The formula is:</P>
          <BlockMath math="\text{Pro rata amount} = \frac{\text{Portion Units}}{\text{Total Units}} \times \text{Total Amount}" />
          <P>
            For example, imagine splitting a $600 internet bill among four
            roommates based on their data usage. If the total data used is 100
            GB and one roommate used 40 GB, you’d have:
          </P>
          <Ul>
            <Ul.Li>
              <Strong>Total units</Strong>: 100 GB
            </Ul.Li>
            <Ul.Li>
              <Strong>Portion units</Strong>: 40 GB
            </Ul.Li>
            <Ul.Li>
              <Strong>Total amount</Strong>: $600
            </Ul.Li>
          </Ul>
          <P>The calculation would be:</P>
          <BlockMath math="\frac{40}{100} \times \$600 = \$240.00" />
          <P>
            Alternatively, entering these numbers into a pro rata calculator
            provides the same result instantly.
          </P>
          <P>
            This method works for various situations, including dividing profits
            according to ownership stakes or allocating rent based on room
            sizes.
          </P>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">Frequently asked questions</H2>
          <H3>What does pro rata mean in simple terms?</H3>
          <P>
            It’s a way of splitting something fairly, based on each person’s
            proportional share. For example, if you contribute 25% to something,
            you receive 25% of the reward or pay 25% of the cost.
          </P>
          <H3>Can I use the pro rata calculator for anything besides money?</H3>
          <P>
            Yes. It works for any measurable resource, such as time (e.g., hours
            spent on a project) or quantities (e.g., supplies used). You just
            need three numbers: total units, portion units, and the total amount
            you’re dividing.
          </P>
        </Section>
      </Article>
    </main>
  );
}
