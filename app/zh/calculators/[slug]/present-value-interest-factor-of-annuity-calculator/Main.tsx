import clsx from "clsx";
import "katex/dist/katex.min.css";

import { type MainProps } from "@/app/components/zh/content/page/main";
import { Article } from "@/app/components/zh/content/page/main/article/Article";
import {
  BlockMath,
  InlineMath,
} from "@/app/components/zh/content/page/main/article/Math";
import { Dl } from "@/app/components/zh/content/page/main/article/Dl";
import { H1 } from "@/app/components/zh/content/page/main/header/H1";
import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { Header } from "@/app/components/zh/content/page/main/header/Header";
import { ModifiedDate } from "@/app/components/zh/content/page/main/header/ModifiedDate";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Calculator } from "./components/Calculator";
import styles from "./Main.module.css";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={clsx(styles.main, className)}>
      <Header className={styles.header}>
        <H1>年金现值系数计算器（附公式）</H1>
        <ModifiedDate pathname={pathname} />
      </Header>
      <Calculator className={styles.calculator} />
      <Article>
        <P>
          这篇文章有需要修改的东西！！！！！！！添加引言！！！！！！！，缺少链接！！！！！！
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">什么是年金现值系数？</H2>
          <P>
            年金现值系数（Present Value Interest Factor of Annuity，
            简称PVIFA）帮助我们计算未来一系列款项在今天的价值。它基于一个简单原理：由于通货膨胀和资金的时间价值，未来的钱不如今天的钱值钱。
          </P>
          <P>
            举个例子，假设老李买了退休保险，退休后每月收入有1000元，保险公司会持续10年支付这笔钱，已知通货膨胀率为5%，那么，现在，这笔10年的资金流总共应该值多少钱？
          </P>
          <P>
            要计算这个问题，我们首先要知道不能简单地将1000元乘以12个月再乘以总年数来算出资金的现值。因为通货膨胀和资金的时间价值的存在，未来的1000元并不等于现在的1000元，我们需要折现到现在的价值来考虑。这就是为什么我们需要用到年金现值系数。年金现值系数考虑了复利和折旧，用每个月收入的钱乘以这个系数，就可以快速得到这笔资金流的现值。
          </P>
          <P>年金现值系数是可以通过表格或者公式来查询的。</P>
          <P>通过表格查询</P>
          <P>
            我们可以查阅年金现值系数表，根据利率和年数，找到对应的年金现值系数。
          </P>
          <P>
            在本例中，现值为1000元，利率为5%，年数为10年，对应的年金现值系数为7.72。
          </P>
          <P>所以，老李可以得到的10年年金的现值为1000 × 7.72 = 7720元。</P>
        </Section>
        <Section ariaLabelledby="formula">
          <H2 id="formula">年金现值系数计算公式</H2>
          <P>
            除了查询表格，我们还可以通过年金现值系数公式来直接计算。我们的年金现值系数计算器也是通过这个公式来计算的：
          </P>
          <BlockMath math="\text{PVIFA} = \frac{1 - (1 + r)^{-n}}{r}" />
          <P>其中：</P>
          <Dl className={styles.dl}>
            <Dl.Dt>
              <InlineMath math="\text{PVIFA}" />
            </Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>年金现值系数</Dl.Dd.P>
            </Dl.Dd>
            <Dl.Dt>
              <InlineMath math="r" />
            </Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                利率，不一定是年化利率，也可以是月化利率、半年化利率等，以年金的实际支付频率来定。如果是每月一支付，那么就应该用月化利率计算；如果是每年一支付，那么就应该用年化利率计算；如果是半年一支付，那么就用半年化的利率。
              </Dl.Dd.P>
            </Dl.Dd>
            <Dl.Dt>
              <InlineMath math="n" />
            </Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                期数，可以是年数，也可以是月数、半年的个数等，与利率相对应。利率是月化利率，就用月数；利率是年化利率，就用年数。
              </Dl.Dd.P>
            </Dl.Dd>
          </Dl>
        </Section>
        <Section ariaLabelledby="example">
          <H2 id="example">年金现值系数计算例子</H2>
          <P>
            还是以上面的例子来计算，每年一支付，年化利率为5%，年数为10年，那么年金现值系数为：
          </P>
          <BlockMath math="\frac{1 - (1 + r)^{-n}}{r} = \frac{1 - (1 + 5\%)^{-10}}{5\%} \approx 7.72" />
          <P>
            所以，在每年支付1000元的条件下，老李的10年年金保险的现值为：1000 ×
            7.72 = 7720元
          </P>
          <P>
            除了计算年金保险的现值之外，年金现值系数还在其他金融领域有着广泛的应用，比如计算退休储蓄计划的现值，计算一个稳定收入现金流的投资现值等。
          </P>
          <P>希望以上解释能够帮助您更好地使用我们的年金现值系数计算器。</P>
        </Section>
      </Article>
    </main>
  );
}
