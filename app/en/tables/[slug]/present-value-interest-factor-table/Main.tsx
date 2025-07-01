import "katex/dist/katex.min.css";

import { Article } from "@/components/en/ui/Article";
import { BlockMath } from "@/components/en/ui/Math";
import { H1 } from "@/components/en/ui/H1";
import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { Header } from "@/components/en/ui/Header";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
import { Ol } from "@/components/en/ui/Ol";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Strong } from "@/components/en/ui/Strong";
import { Table } from "@/components/en/ui/Table";
import { Ul } from "@/components/en/ui/Ul";

import styles from "./Main.module.css";
import type { MainProps } from "@/components/en/ui/Main";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>Present Value Interest Factor (PVIF) Table</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Understanding how money changes value over time is essential for
          making informed financial decisions. The present value interest factor
          (PVIF) table simplifies evaluating investments, planning loans, or
          determining what a future dollar is worth today.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">
            What is the present value interest factor (PVIF)?
          </H2>
          <P>
            The present value interest factor (PVIF) is a tool used to calculate
            the current value of a future sum of money, given a specific
            interest rate and time period. It’s grounded in the principle of the
            time value of money: a dollar today is worth more than a dollar in
            the future due to its earning potential.
          </P>
          <P>
            PVIF serves as a multiplier, discounting future amounts back to
            present value. To save you from performing complex calculations
            manually, PVIF values are typically pre-calculated and arranged
            conveniently in tables. Each PVIF value relies on two variables:
          </P>
          <Ul>
            <Ul.Li>The interest rate (for example, 5% or 10%)</Ul.Li>
            <Ul.Li>
              The number of time periods (for example, 1 year or 5 years)
            </Ul.Li>
          </Ul>
          <P>
            This makes the PVIF table a valuable resource for scenarios
            involving loans, investments, or evaluating any situation where
            future cash flows need to be analyzed in present terms.
          </P>
        </Section>
        <Section ariaLabelledby="table">
          <H2 id="table">PVIF table</H2>
          <div className={styles.tableContainer}>
            <Table>
              <Table.Thead>
                <Table.Thead.Tr>
                  <Table.Thead.Tr.Th scope="col">Periods (n)</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">1%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">2%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">3%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">4%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">5%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">6%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">7%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">8%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">9%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">10%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">11%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">12%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">13%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">14%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">15%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">16%</Table.Thead.Tr.Th>
                  <Table.Thead.Tr.Th scope="col">20%</Table.Thead.Tr.Th>
                </Table.Thead.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">1</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.9901</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9804</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9709</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9615</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9524</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9434</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9346</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9259</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9174</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9091</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9009</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8929</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8850</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8772</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8696</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8621</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8333</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">2</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.9803</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9612</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9426</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9246</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9070</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8900</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8734</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8573</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8417</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8264</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8116</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7972</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7831</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7695</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7561</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7432</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6944</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">3</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.9706</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9423</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9151</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8890</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8638</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8396</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8163</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7938</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7722</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7513</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7312</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7118</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6931</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6750</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6575</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6407</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5787</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">4</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.9610</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9238</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8885</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8548</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8227</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7921</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7629</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7350</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7084</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6830</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6587</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6355</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6133</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5921</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5718</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5523</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4823</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">5</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.9515</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.9057</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8626</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8219</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7835</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7473</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7130</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6806</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6499</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6209</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5935</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5674</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5428</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5194</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4972</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4761</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4019</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">6</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.9420</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8880</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8375</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7903</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7462</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7050</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6663</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6302</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5963</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5645</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5346</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5066</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4803</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4556</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4323</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4104</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3349</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">7</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.9327</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8706</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8131</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7599</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7107</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6651</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6227</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5835</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5470</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5132</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4817</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4523</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4251</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3996</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3759</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3538</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2791</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">8</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.9235</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8535</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7894</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7307</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6768</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6274</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5820</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5403</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5019</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4665</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4339</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4039</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3762</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3506</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3269</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3050</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2326</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">9</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.9143</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8368</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7664</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7026</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6446</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5919</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5439</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5002</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4604</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4241</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3909</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3606</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3329</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3075</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2843</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2630</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1938</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">10</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.9053</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8203</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7441</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6756</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6139</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5584</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5083</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4632</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4224</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3855</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3522</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3220</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2946</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2697</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2472</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2267</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1615</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">11</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8963</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.8043</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7224</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6496</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5847</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5268</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4751</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4289</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3875</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3505</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3173</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2875</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2607</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2366</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2149</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1954</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1346</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">12</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8874</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7885</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7014</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6246</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5568</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4970</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4440</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3971</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3555</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3186</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2858</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2567</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2307</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2076</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1869</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1685</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1122</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">13</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8787</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7730</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6810</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6006</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5303</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4688</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4150</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3677</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3262</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2897</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2575</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2292</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2042</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1821</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1625</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1452</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0935</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">14</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8700</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7579</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6611</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5775</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5051</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4423</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3878</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3405</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2992</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2633</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2320</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2046</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1807</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1597</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1413</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1252</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0779</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">15</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8613</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7430</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6419</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5553</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4810</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4173</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3624</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3152</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2745</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2394</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2090</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1827</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1599</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1401</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1229</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1079</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0649</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">16</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8528</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7284</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6232</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5339</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4581</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3936</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3387</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2919</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2519</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2176</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1883</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1631</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1415</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1229</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1069</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0930</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0541</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">17</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8444</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7142</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6050</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5134</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4363</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3714</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3166</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2703</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2311</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1978</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1696</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1456</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1252</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1078</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0929</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0802</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0451</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">18</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8360</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.7002</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5874</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4936</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4155</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3503</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2959</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2502</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2120</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1799</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1528</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1300</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1108</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0946</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0808</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0691</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0376</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">19</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8277</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6864</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5703</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4746</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3957</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3305</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2765</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2317</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1945</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1635</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1377</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1161</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0981</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0829</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0703</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0596</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0313</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">20</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8195</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6730</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5537</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4564</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3769</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3118</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2584</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2145</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1784</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1486</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1240</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1037</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0868</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0728</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0611</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0514</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0261</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">21</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8114</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6598</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5375</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4388</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3589</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2942</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2415</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1987</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1637</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1351</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1117</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0926</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0768</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0638</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0531</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0443</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0217</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">22</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.8034</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6468</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5219</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4220</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3418</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2775</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2257</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1839</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1502</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1228</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1007</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0826</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0680</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0560</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0462</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0382</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0181</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">23</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.7954</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6342</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.5067</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4057</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3256</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2618</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2109</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1703</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1378</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1117</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0907</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0738</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0601</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0491</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0402</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0329</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0151</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">24</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.7876</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6217</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4919</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3901</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3101</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2470</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1971</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1577</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1264</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1015</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0817</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0659</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0532</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0431</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0349</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0284</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0126</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">25</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>0.7798</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.6095</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.4776</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.3751</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2953</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.2330</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1842</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1460</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.1160</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0923</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0736</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0588</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0471</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0378</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0304</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0245</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>0.0105</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
              </Table.Tbody>
            </Table>
          </div>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to use the PVIF table in real life</H2>
          <P>
            The PVIF table allows you to quickly determine the present value of
            a future amount without needing a calculator. Suppose you’re offered
            $1,000 two years from now, and you want to calculate its present
            value using an interest rate of 2%. Here’s the process:
          </P>
          <Ol>
            <Ol.Li>
              Locate the row for the number of periods—in this example, 2 years
              (n = 2).
            </Ol.Li>
            <Ol.Li>
              Find the column corresponding to the interest rate—here, 2%.
            </Ol.Li>
            <Ol.Li>
              Identify the PVIF value at their intersection—in this case,
              0.9612.
            </Ol.Li>
            <Ol.Li>
              Multiply the PVIF by the future amount:
              <BlockMath math="\$1,000 \times 0.9612 = \$961.20" />
            </Ol.Li>
          </Ol>
          <P>
            Thus, $1,000 two years from now has a present value of $961.20 at a
            2% interest rate. Practically, this means you’d need to invest
            $961.20 today at 2% interest to grow it to $1,000 in two years.
          </P>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">Frequently asked questions</H2>
          <H3>What if my interest rate or time period isn’t in the table?</H3>
          <P>
            If the PVIF table doesn’t include your exact interest rate or period
            (for example, 2.5% or 7 years), you can estimate by choosing the
            closest available values. For a more precise result, consider using
            our dedicated PVIF calculator—just enter your specific numbers to
            get an accurate calculation immediately. Alternatively, you can
            calculate PVIF yourself using the formula:
          </P>
          <BlockMath math="\text{PVIF} = \frac{1}{(1 + r)^n}" />
          <P>
            Here, <Strong>r</Strong> represents the interest rate (as a
            decimal), and <Strong>n</Strong> is the number of periods.
          </P>
          <H3>
            Why do PVIF values decrease as time or interest rates increase?
          </H3>
          <P>
            PVIF values decrease because, as the time period increases or the
            interest rate goes up, future money is worth less today. A higher
            interest rate or a longer period means money today has more earning
            potential, making future dollars comparatively less valuable. In
            other words, you’d need less money today to grow to a given future
            amount if you have more time or a higher interest rate. That’s why
            the PVIF values shrink as these variables rise.
          </P>
        </Section>
      </Article>
    </main>
  );
}
