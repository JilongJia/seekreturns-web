import "katex/dist/katex.min.css";

import { Article } from "@/app/components/en/content/page/main/article/Article";
import { BlockMath } from "@/app/components/en/content/page/main/article/Math";
import { H1 } from "@/app/components/en/content/page/main/article/H1";
import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { Header } from "@/components/en/ui/Header";
import { ModifiedDate } from "@/app/components/en/content/page/main/article/ModifiedDate";
import { Ol } from "@/app/components/en/content/page/main/article/Ol";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Strong } from "@/app/components/en/content/page/main/article/Strong";
import { Table } from "@/app/components/en/content/page/main/article/Table";

import styles from "./Main.module.css";
import type { MainProps } from "@/components/en/ui/Main";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>Future Value Interest Factor of Annuity (FVIFA) Table</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Imagine you’re saving a fixed amount every year to build a nest egg
          for the future—how much will it really be worth down the road? That’s
          where the future value interest factor of annuity (FVIFA) comes in.
          It’s a powerful tool that helps you calculate the future value of a
          series of equal payments, factoring in interest over time, without
          getting lost in complex math.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is FVIFA?</H2>
          <P>
            The future value interest factor of annuity (FVIFA) shows how much a
            series of equal payments will be worth in the future, with compound
            interest factored in. Imagine setting aside $500 each year for 10
            years at a 6% interest rate. The FVIFA will tell you exactly how
            much your savings will be worth at the end—not just the $5,000 you
            put in, but also the extra money earned from interest.
          </P>
          <P>The math behind FVIFA is straightforward:</P>
          <BlockMath math="\text{FVIFA} = \frac{(1 + r)^n - 1}{r}" />
          <P>
            In this formula, <Strong>r</Strong> is the interest rate per period,
            and <Strong>n</Strong> is the total number of payments. But don’t
            worry about calculating this by hand. FVIFA tables already provide
            these values, allowing you to avoid complex computations. Using
            FVIFA tables is a quick and easy way to see how time and interest
            can grow your money.
          </P>
        </Section>
        <Section ariaLabelledby="table">
          <H2 id="table">FVIFA table</H2>
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
                  <Table.Tbody.Tr.Td>1.0000</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0200</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0300</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0400</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0500</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0600</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0700</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0800</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0900</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1000</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1100</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1200</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1300</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1400</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1500</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1600</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2000</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">2</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>2.0100</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0200</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0300</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0400</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0500</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0600</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0700</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0800</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0900</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1000</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1100</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1200</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1300</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1400</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1500</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1600</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.2000</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">3</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>3.0301</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.0604</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.0909</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.1216</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.1525</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.1836</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.2149</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.2464</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.2781</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.3100</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.3421</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.3744</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.4069</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.4396</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.4725</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.5056</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.6400</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">4</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>4.0604</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.1216</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.1836</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.2465</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.3101</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.3746</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.4399</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.5061</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.5731</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.6410</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.7097</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.7793</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.8498</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.9211</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.9934</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.0665</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.3680</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">5</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>5.1010</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.2040</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.3091</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.4163</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.5256</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.6371</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.7507</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.8666</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.9847</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.1051</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.2278</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.3528</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.4803</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.6101</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.7424</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.8771</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.4416</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">6</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>6.1520</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.3081</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.4684</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.6330</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.8019</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.9753</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.1533</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.3359</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.5233</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.7156</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.9129</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.1152</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.3227</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.5355</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.7537</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.9775</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.9299</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">7</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>7.2135</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.4343</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.6625</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.8983</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.1420</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.3938</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.6540</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.9228</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.2004</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.4872</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.7833</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.0890</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.4047</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.7305</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.0668</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.4139</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.9159</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">8</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>8.2857</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.5830</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.8923</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.2142</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.5491</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.8975</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.2598</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.6366</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.0285</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.4359</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.8594</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.2997</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.7573</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.2328</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.7268</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.2401</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>16.4991</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">9</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>9.3685</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.7546</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.1591</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.5828</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.0266</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.4913</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.9780</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.4876</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.0210</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.5795</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.1640</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.7757</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.4157</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>16.0853</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>16.7858</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>17.5185</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>20.7989</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">10</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>10.4622</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.9497</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.4639</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.0061</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.5779</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.1808</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.8164</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.4866</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.1929</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.9374</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>16.7220</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>17.5487</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>18.4197</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>19.3373</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>20.3037</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.3215</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>25.9587</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">11</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>11.5668</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.1687</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.8078</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.4864</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.2068</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.9716</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.7836</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>16.6455</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>17.5603</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>18.5312</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>19.5614</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>20.6546</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.8143</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>23.0445</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>24.3493</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>25.7329</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>32.1504</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">12</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>12.6825</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.4121</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.1920</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.0258</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.9171</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>16.8699</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>17.8885</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>18.9771</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>20.1407</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.3843</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>22.7132</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>24.1331</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>25.6502</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>27.2707</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>29.0017</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>30.8502</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>39.5805</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">13</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>13.8093</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.6803</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.6178</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>16.6268</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>17.7130</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>18.8821</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>20.1406</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.4953</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>22.9534</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>24.5227</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>26.2116</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>28.0291</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>29.9847</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>32.0887</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>34.3519</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>36.7862</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>48.4966</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">14</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>14.9474</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.9739</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>17.0863</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>18.2919</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>19.5986</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.0151</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>22.5505</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>24.2149</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>26.0192</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>27.9750</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>30.0949</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>32.3926</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>34.8827</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>37.5811</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>40.5047</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>43.6720</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>59.1959</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">15</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>16.0969</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>17.2934</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>18.5989</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>20.0236</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.5786</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>23.2760</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>25.1290</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>27.1521</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>29.3609</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>31.7725</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>34.4054</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>37.2797</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>40.4175</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>43.8424</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>47.5804</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>51.6595</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>72.0351</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">16</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>17.2579</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>18.6393</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>20.1569</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.8245</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>23.6575</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>25.6725</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>27.8881</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>30.3243</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>33.0034</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>35.9497</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>39.1899</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>42.7533</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>46.6717</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>50.9804</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>55.7175</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>60.9250</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>87.4421</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">17</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>18.4304</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>20.0121</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.7616</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>23.6975</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>25.8404</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>28.2129</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>30.8402</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>33.7502</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>36.9737</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>40.5447</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>44.5008</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>48.8837</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>53.7391</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>59.1176</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>65.0751</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>71.6730</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>105.931</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">18</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>19.6147</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.4123</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>23.4144</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>25.6454</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>28.1324</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>30.9057</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>33.9990</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>37.4502</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>41.3013</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>45.5992</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>50.3959</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>55.7497</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>61.7251</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>68.3941</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>75.8364</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>84.1407</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>128.117</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">19</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>20.8109</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>22.8406</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>25.1169</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>27.6712</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>30.5390</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>33.7600</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>37.3790</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>41.4463</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>46.0185</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>51.1591</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>56.9395</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>63.4397</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>70.7494</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>78.9692</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>88.2118</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>98.6032</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>154.740</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">20</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>22.0190</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>24.2974</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>26.8704</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>29.7781</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>33.0660</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>36.7856</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>40.9955</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>45.7620</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>51.1601</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>57.2750</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>64.2028</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>72.0524</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>80.9468</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>91.0249</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>102.444</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>115.380</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>186.688</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">21</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>23.2392</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>25.7833</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>28.6765</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>31.9692</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>35.7193</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>39.9927</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>44.8652</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>50.4229</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>56.7645</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>64.0025</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>72.2651</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>81.6987</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>92.4699</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>104.768</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>118.810</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>134.841</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>225.026</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">22</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>24.4716</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>27.2990</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>30.5368</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>34.2480</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>38.5052</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>43.3923</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>49.0057</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>55.4568</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>62.8733</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>71.4027</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>81.2143</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>92.5026</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>105.491</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>120.436</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>137.632</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>157.415</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>271.031</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">23</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>25.7163</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>28.8450</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>32.4529</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>36.6179</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>41.4305</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>46.9958</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>53.4361</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>60.8933</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>69.5319</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>79.5430</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>91.1479</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>104.603</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>120.205</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>138.297</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>159.276</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>183.601</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>326.237</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">24</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>26.9735</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>30.4219</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>34.4265</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>39.0826</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>44.5020</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>50.8156</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>58.1767</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>66.7648</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>76.7898</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>88.4973</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>102.174</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>118.155</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>136.831</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>158.659</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>184.168</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>213.978</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>392.484</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">25</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>28.2432</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>32.0303</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>36.4593</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>41.6459</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>47.7271</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>54.8645</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>63.2490</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>73.1059</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>84.7009</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>98.3471</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>114.413</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>133.334</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>155.620</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>181.871</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>212.793</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>249.214</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>471.981</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
              </Table.Tbody>
            </Table>
          </div>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to use the FVIFA table in real life</H2>
          <P>
            The FVIFA table helps you quickly calculate the future value of
            regular payments without complex formulas. Suppose you invest $200
            annually at a 2% interest rate for three years. Here’s how to use
            the table:
          </P>
          <Ol>
            <Ol.Li>Find the column for 2% interest.</Ol.Li>
            <Ol.Li>Locate the row for 3 years.</Ol.Li>
            <Ol.Li>
              Identify the FVIFA factor at their intersection—let’s say 3.0604.
            </Ol.Li>
            <Ol.Li>
              Multiply your annual investment by this factor:
              <BlockMath math="\$200 \times 3.0604 = \$612.08" />
            </Ol.Li>
          </Ol>
          <P>
            This means your total investment grows to $612.08 after three years.
          </P>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">Frequently asked questions</H2>
          <H3>What if my interest rate or time period isn’t in the table?</H3>
          <P>
            If your specific interest rate (like 2.5%) or time period (such as 7
            years) isn’t included in the table, don’t worry—there are simple
            ways to handle it. You can estimate the value by averaging between
            the nearest listed rates or periods, which works well for a rough
            figure. Alternatively, for a more exact result, plug your numbers
            into the FVIFA formula:
          </P>
          <BlockMath math="\text{FVIFA} = \frac{(1 + r)^n - 1}{r}" />
          <P>
            Even better, skip the math entirely and use our FVIFA
            Calculator—just enter your rate and period, and you’ll get a precise
            answer in seconds.
          </P>
          <H3>Does the FVIFA table work for monthly payments?</H3>
          <P>
            The FVIFA table can work for monthly payments, but you’ll need to
            tweak the inputs first. Convert the time period by multiplying the
            number of years by 12 (e.g., 3 years becomes 36 months) and adjust
            the interest rate by dividing the annual rate by 12 (e.g., 2% per
            year becomes about 0.167% per month).
          </P>
          <P>
            However, most FVIFA tables are designed for annual compounding, so
            after these adjustments, you’re unlikely to find an exact match in
            the table. In that case, you’ll likely need to calculate it yourself
            using the methods mentioned earlier—either interpolation or the
            FVIFA formula—or simply use our FVIFA Calculator for an exact
            result.
          </P>
        </Section>
      </Article>
    </main>
  );
}
