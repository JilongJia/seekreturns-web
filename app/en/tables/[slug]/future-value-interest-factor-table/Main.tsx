import "katex/dist/katex.min.css";

import { Article } from "@/components/en/ui/Article";
import { BlockMath } from "@/app/components/en/content/page/main/article/Math";
import { H1 } from "@/components/en/ui/H1";
import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { Header } from "@/components/en/ui/Header";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
import { Ol } from "@/app/components/en/content/page/main/article/Ol";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";

import styles from "./Main.module.css";
import type { MainProps } from "@/components/en/ui/Main";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>Future Value Interest Factor (FVIF) Table</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Understanding how money grows over time is essential to investing and
          financial planning. One tool that simplifies this calculation is the
          future value interest factor (FVIF)—a number that allows you to
          quickly determine how much an investment today will be worth in the
          future, given compound interest.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is FVIF?</H2>
          <P>
            The future value interest factor (FVIF) indicates how much one
            dollar will grow over time when invested with compound interest. It
            serves as a multiplier: by multiplying your initial investment with
            the appropriate FVIF value—determined by the interest rate and
            investment period—you easily obtain the future value of your
            investment. FVIF highlights the powerful effect of compounding,
            where interest accumulates not only on the initial amount but also
            on previously earned interest.
          </P>
          <P>
            Compound interest differs significantly from simple interest, which
            grows your investment at a constant linear rate. FVIF specifically
            captures exponential growth, clearly illustrating why compound
            interest accelerates wealth accumulation over time. For example, if
            you invest $1 at an annual interest rate of 5% for 10 years, FVIF
            directly provides the future value, eliminating the need for manual
            yearly calculations.
          </P>
        </Section>
        <Section ariaLabelledby="table">
          <H2 id="table">FVIF table</H2>
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
                  <Table.Tbody.Tr.Td>1.0100</Table.Tbody.Tr.Td>
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
                  <Table.Tbody.Tr.Td>1.0201</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0404</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0609</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0816</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1025</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1236</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1449</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1664</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1881</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2100</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2321</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2544</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2769</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2996</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3225</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3456</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4400</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">3</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.0303</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0609</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0927</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1249</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1576</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1910</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2250</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2597</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2950</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3310</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3676</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4049</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4429</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4815</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5209</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5609</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7280</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">4</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.0406</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.0824</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1255</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1699</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2155</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2625</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3067</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3605</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4116</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4561</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5016</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5529</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6058</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6603</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7164</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8104</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0736</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">5</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.0510</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1041</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1593</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2167</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2763</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3382</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4026</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4693</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5386</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6105</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6851</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7623</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8424</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.9254</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0054</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1003</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.4883</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">6</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.0615</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1262</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1941</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2653</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3401</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4185</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5007</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5869</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6771</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7716</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8704</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.9738</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0820</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1950</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.3131</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.4364</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.9860</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">7</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.0721</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1487</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2299</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3159</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4071</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5036</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6058</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7138</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8280</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.9487</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0762</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.2107</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.3526</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.5023</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.6600</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.8262</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.5832</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">8</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.0829</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1717</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2668</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3686</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4775</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5938</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7182</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8509</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.9926</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1436</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.3045</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.4760</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.6584</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.8526</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.0590</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.2784</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.2998</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">9</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.0937</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.1951</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3048</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4233</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5513</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6895</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8385</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.9990</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1719</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.3579</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.5580</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.7731</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.0040</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.2519</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.5179</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.8030</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.1598</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">10</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.1046</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2190</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3439</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4802</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6289</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7908</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.9672</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1589</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.3674</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.5937</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.8394</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.1058</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.3946</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.7072</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.0456</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.4114</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.1917</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">11</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.1157</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2434</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3842</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5395</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7103</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8983</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1049</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.3316</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.5804</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.8531</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.1518</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.4785</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.8359</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.2262</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.6524</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.1173</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.4301</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">12</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.1268</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2682</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4258</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6010</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7959</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0122</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.2522</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.5182</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.8127</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.1384</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.4985</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.8960</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.3345</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.8179</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.3503</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.9360</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.9161</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">13</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.1381</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.2936</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4685</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6651</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8856</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1329</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.4098</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.7196</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.0658</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.4523</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.8833</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.3635</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.8980</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.4924</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.1528</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.8858</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.6993</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">14</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.1495</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3195</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5126</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7317</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.9799</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.2609</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.5785</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.9372</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.3417</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.7975</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.3104</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.8871</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.5348</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.2613</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.0757</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.9875</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.8392</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">15</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.1610</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3459</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5580</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8009</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0789</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.3966</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.7590</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.1722</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.6425</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.1772</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.7846</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.4736</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.2543</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.1379</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.1371</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.2655</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.4070</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">16</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.1726</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.3728</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6047</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8730</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1829</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.5404</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.9522</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.4259</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.9703</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.5950</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.3109</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.1304</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.0673</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.1372</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.3576</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.7480</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>18.4884</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">17</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.1843</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4002</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6528</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.9479</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.2920</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.6928</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.1588</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.7000</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.3276</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.0545</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.8951</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.8660</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.9861</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.2765</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.7613</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.4677</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>22.1861</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">18</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.1961</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4282</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7024</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0258</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.4066</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.8543</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.3799</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.9960</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.7171</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.5599</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.5436</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.6900</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.0243</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.5752</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.3755</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.4625</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>26.6233</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">19</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.2081</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4568</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.7535</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1068</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.5270</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.0256</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.6165</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.3157</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.1417</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.1159</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.2633</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.6128</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.1974</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.0557</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.2318</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>16.7765</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>31.9480</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">20</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.2202</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.4859</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8061</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.1911</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.6533</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.2071</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.8697</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.6610</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.6044</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.7275</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.0623</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.6463</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.5231</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.7435</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>16.3665</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>19.4608</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>38.3376</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">21</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.2324</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5157</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.8603</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.2788</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.7860</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.3996</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.1406</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.0338</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.1088</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.4002</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.9492</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.8038</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.0211</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.6676</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>18.8215</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>22.5745</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>46.0051</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">22</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.2447</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5460</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.9161</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.3699</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.9253</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.6035</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.4304</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.4365</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.6586</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.1403</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.9336</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.1003</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>14.7138</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>17.8610</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.6447</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>26.1864</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>55.2061</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">23</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.2572</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.5769</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.9736</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.4647</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.0715</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.8197</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.7405</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.8715</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.2579</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.9543</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>11.0263</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.5523</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>16.6266</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>20.3616</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>24.8915</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>30.3762</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>66.2474</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">24</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.2697</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6084</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0328</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.5633</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.2251</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.0489</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.0724</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.3412</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>7.9111</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>9.8497</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>12.2392</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>15.1786</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>18.7881</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>23.2122</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>28.6252</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>35.2364</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>79.4968</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
                <Table.Tbody.Tr>
                  <Table.Tbody.Tr.Th scope="row">25</Table.Tbody.Tr.Th>
                  <Table.Tbody.Tr.Td>1.2824</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>1.6406</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.0938</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>2.6658</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>3.3864</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>4.2919</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>5.4274</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>6.8485</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>8.6231</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>10.8347</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>13.5855</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>17.0001</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>21.2305</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>26.4619</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>32.9190</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>40.8742</Table.Tbody.Tr.Td>
                  <Table.Tbody.Tr.Td>95.3962</Table.Tbody.Tr.Td>
                </Table.Tbody.Tr>
              </Table.Tbody>
            </Table>
          </div>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to use the FVIF table in real life</H2>
          <P>
            The FVIF table helps you quickly find the future value of your
            investment without complex calculations. Suppose you’re investing
            $1,000 at a 2% interest rate for 3 years. Here’s how:
          </P>
          <Ol>
            <Ol.Li>Locate the column for 2% interest.</Ol.Li>
            <Ol.Li>Find the row for 3 years.</Ol.Li>
            <Ol.Li>
              Identify the FVIF value where they meet—in this case, 1.0609.
            </Ol.Li>
            <Ol.Li>
              Multiply your investment by this factor:
              <BlockMath math="\$1,000 \times 1.0609 = \$1,060.90" />
            </Ol.Li>
          </Ol>
          <P>
            This means your $1,000 investment grows to $1,060.90 after 3 years.
            You can use this same straightforward process for any interest rate
            or time period listed in the table.
          </P>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">Frequently asked questions</H2>
          <H3>What if my interest rate or time period isn’t on the table?</H3>
          <P>
            No table can list every possible rate or timeframe. If your rate or
            time falls between the listed values, you can estimate by averaging
            the closest FVIF values or use the nearest one for a quick
            approximation. For precise calculations, use our FVIF
            Calculator—just input your numbers for an instant answer.
          </P>
          <H3>Why does the FVIF increase significantly over time?</H3>
          <P>
            This rapid growth occurs due to compound interest—earning interest
            on previously earned interest. For example, the FVIF at 3% interest
            is 1.0300 for 1 year but increases to 1.0927 by the third year. The
            longer your money is invested, the greater the compounding effect,
            making time a powerful tool for building wealth.
          </P>
        </Section>
      </Article>
    </main>
  );
}
