import clsx from "clsx";
import "katex/dist/katex.min.css";

import type { MainProps } from "@/app/components/zh/content/page/main";
import { Article } from "@/app/components/zh/content/page/main/article/Article";
import {
  BlockMath,
  InlineMath,
} from "@/app/components/zh/content/page/main/article/Math";
import { H1 } from "@/app/components/zh/content/page/main/header/H1";
import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { H3 } from "@/app/components/zh/content/page/main/article/H3";
import { Header } from "@/app/components/zh/content/page/main/header/Header";
import { ModifiedDate } from "@/app/components/zh/content/page/main/header/ModifiedDate";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Strong } from "@/app/components/zh/content/page/main/article/Strong";
import { Ul } from "@/app/components/zh/content/page/main/article/Ul";
import { Calculator } from "./components/Calculator";
import styles from "./Main.module.css";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={clsx(styles.main, className)}>
      <Header className={styles.header}>
        <H1>年金现值系数计算器</H1>
        <ModifiedDate pathname={pathname} />
      </Header>
      <Calculator className={styles.calculator} />
      <Article>
        <P>
          年金现值系数（Present Value Interest Factor of an Annuity，简称
          PVIFA）是金融领域中用于评估未来一系列等额现金流现值的重要工具，广泛应用于投资决策、贷款分析和退休规划。本文将深入讲解
          PVIFA
          的概念、计算方法、使用场景及注意事项，帮助读者更好地理解和应用这一工具。
        </P>
        <Section ariaLabelledby="what-is-present-value-interest-factor-of-annuity">
          <H2 id="what-is-present-value-interest-factor-of-annuity">
            什么是年金现值系数 (PVIFA)？
          </H2>
          <P>要理解年金现值系数，我们首先需要明确两个基本概念：</P>
          <Ul>
            <Ul.Li>
              <Strong>年金 (Annuity)</Strong>
              ：指在特定时期内，以相等时间间隔定期收到或支付的一系列等额款项。常见的例子有每月的租金、每年的养老金或分期贷款的还款。
            </Ul.Li>
            <Ul.Li>
              <Strong>现值 (Present Value)</Strong>
              ：指未来一笔或一系列现金流在今天的价值。由于货币具有时间价值——今天的1元钱比未来的1元钱更有价值，因为它能用于投资并产生回报——未来的现金流需要折算回当前时点（即“折现”），才能进行有意义的比较和决策。
            </Ul.Li>
          </Ul>
          <P>
            年金现值系数 (PVIFA)
            本身不是金额，而是一个系数或乘数。它用于便捷地计算一系列等额未来付款（即普通年金）在今天的总价值。具体来说，PVIFA
            是指在给定的折现率（利率）和支付期数下，未来每期支付1单位货币（例如1元）所对应的普通年金的现值总和。
          </P>
          <P>
            投资者和分析师可以利用 PVIFA
            来简化对一系列现金流的复杂现值计算。例如，如果您预计未来每年将收到一笔固定金额的款项，并确定了一个合适的折现率，便可以使用
            PVIFA
            快速计算出这笔未来收入流的今日价值。这对于评估债券价值、判断贷款的合理性或规划退休储蓄等都非常有帮助。
          </P>
        </Section>
        <Section ariaLabelledby="how-to-calculate-pvifa">
          <H2 id="how-to-calculate-pvifa">如何计算年金现值系数？</H2>
          <P>
            年金现值系数的计算基于货币时间价值原理，核心是将每一期未来支付的1单位货币，按照给定的利率折算回今天的价值，然后将所有这些折算后的单期现值加总。
          </P>
          <P>
            可以理解为，PVIFA是将未来每一期收到的1单位货币分别用对应期数的单期复利现值系数
            (Present Value Interest Factor, PVIF)
            折现后，再加总得到的累积现值系数。
          </P>
          <P>计算 PVIFA 的标准公式如下：</P>
          <BlockMath math="\text{PVIFA} = \frac{1 - (1 + r)^{-n}}{r}" />
          <P>其中：</P>
          <Ul>
            <Ul.Li>
              <Strong>r = 每期利率 (Interest rate per period)。</Strong>
              请注意，这个利率必须与支付频率相匹配。例如，若年金按年支付，则 r
              是年利率；若年金按月支付，则 r 是月利率 (年利率/12)。
            </Ul.Li>
            <Ul.Li>
              <Strong>n = 总期数 (Total number of periods)。</Strong>
              同样，这也必须与支付频率相匹配。
            </Ul.Li>
          </Ul>
          <P>
            <Strong>特殊情况</Strong>：
          </P>
          <P>
            值得注意的是，当利率 r
            为零时，上述公式在数学上是无定义的（因分母为零）。在这种情况下，PVIFA
            的计算逻辑变得非常简单：由于没有利息或折现，未来每期收到的1单位货币在今天的价值仍然是1单位货币。因此，若
            r=0，则：
          </P>
          <BlockMath math="\text{PVIFA} = n" />
          <P>
            这意味着，在零利率环境下，年金的现值就是每期支付金额乘以总期数。
          </P>
          <P>理解 PVIFA 如何随利率和期数变化也很重要：</P>
          <Ul>
            <Ul.Li>
              <Strong>利率 (r)</Strong>：利率越高，PVIFA
              越小。这是因为在更高的折现率下，未来现金流的现值会打更大的折扣。
            </Ul.Li>
            <Ul.Li>
              <Strong>期数 (n)</Strong>：期数越多，PVIFA
              越大（在利率为正的情况下）。这是因为有更多笔未来付款被纳入现值计算。但随着期数增加，PVIFA
              的增长会放缓，因为更远期付款对现值的贡献会越来越小。
            </Ul.Li>
          </Ul>
        </Section>
        <Section ariaLabelledby="using-pvifa-calculator">
          <H2 id="using-pvifa-calculator">使用年金现值系数计算器</H2>
          <P>
            虽然可以手动运用公式计算 PVIFA，但使用专门的 PVIFA
            计算器或电子表格软件（如Excel中的PV函数）可以显著提高效率并减少计算错误。在电子计算器和电子表格软件普及之前，人们通常通过查阅预先印制的PVIFA表格来获取系数值。如今，虽然这些表格仍可见，但直接计算更为普遍和便捷。
          </P>
          <P>PVIFA 计算器通常要求输入：</P>
          <Ul>
            <Ul.Li>
              <Strong>利率</Strong>
              ：通常以百分比形式输入，代表每期的折现率。
            </Ul.Li>
            <Ul.Li>
              <Strong>期数</Strong>
              ：代表年金支付的总期数。
            </Ul.Li>
          </Ul>
          <P>操作步骤：</P>
          <Ul>
            <Ul.Li>输入折现率和期数，例如 5% 和 5 期。</Ul.Li>
            <Ul.Li>
              计算器根据 PVIFA 公式（或 r = 0 时的特殊逻辑）计算结果。
            </Ul.Li>
            <Ul.Li>输出 PVIFA 值，通常保留 4 位小数，例如 4.3295。</Ul.Li>
          </Ul>
          <P>
            <Strong>如何应用计算出的 PVIFA 值？</Strong>
          </P>
          <P>
            得到的 PVIFA 值本身并不是最终的年金现值。要计算年金的总现值 (PV of
            Annuity)，您需要将 PVIFA 乘以每期的固定支付金额：
          </P>
          <BlockMath math="\text{年金现值} = \text{每期支付金额} \times \text{PVIFA}" />
          <P>
            例如，若您计算出 PVIFA 为 7.2036，而您的年金每年支付 1,000
            元，那么该年金的现值就是{" "}
            <InlineMath math="1,000 \times 7.2036 = 7,203.60 \text{ 元}" />。
          </P>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">常见问题</H2>
          <H3>PVIFA 和 PVAF 有什么区别？</H3>
          <P>
            PVIFA (Present Value Interest Factor of an Annuity) 和 PVAF (Present
            Value Annuity Factor)
            实质上是同一概念，均指年金现值系数，两者可以互换使用。
          </P>
          <H3>PVIFA 适用于期初年金还是期末年金？</H3>
          <P>
            标准的 PVIFA 公式是为期末年金 (Ordinary Annuity)
            设计的，即假定每期支付发生在期末。若处理的是期初年金 (Annuity
            Due)（即每期支付发生在期初），其现值会略高，因为每笔款项都提前一个周期收到。期初年金的现值系数可以通过将期末年金的
            PVIFA 乘以 (1+r) 来计算：
          </P>
          <BlockMath math="\text{PVIFA}_{\text{Due}} = \text{PVIFA} \times (1+r)" />
        </Section>
      </Article>
    </main>
  );
}
