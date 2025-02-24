import "katex/dist/katex.min.css";

import { type MainProps } from "@/app/components/en-US/content/page/main";
import { Article } from "@/app/components/en-US/content/page/main/article/Article";
import { BlockMath } from "@/app/components/en-US/content/page/main/article/Math";
import { Dl } from "@/app/components/en-US/content/page/main/article/Dl";
import { H1 } from "@/app/components/en-US/content/page/main/article/H1";
import { H2 } from "@/app/components/en-US/content/page/main/article/H2";
import { Header } from "@/app/components/en-US/content/page/main/article/Header";
import { ModifiedDate } from "@/app/components/en-US/content/page/main/article/ModifiedDate";
import { P } from "@/app/components/en-US/content/page/main/article/P";
import { Section } from "@/app/components/en-US/content/page/main/article/Section";
import { Table } from "@/app/components/en-US/content/page/main/article/Table";
import styles from "./Main.module.css";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>How to Calculate the 7-Day Yield in Excel</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          The 7-Day Yield is crucial for evaluating short-term investment
          returns, particularly in money market funds. This article provides a
          straightforward guide on how to calculate the 7-Day Yield using Excel,
          a common tool for financial analysis.
        </P>
        <Section ariaLabelledby="formula">
          <H2 id="formula">The 7-day yield formula</H2>
          <P>
            The formula to calculate the 7-Day Yield is a key tool for investors
            to understand the potential annualized return for a money market
            mutual fund based on a week’s performance. It is expressed as:
          </P>
          <BlockMath
            math="\text{7-Day Yield (\%)} = \frac{\text{End Price} + \text{Distributions} - \text{Start Price} - \text{Fees}}{\text{Start Price}} \times \frac{365}{7}"
            ariaLabel="7-day yield formula"
            className={styles.blockMath}
          />
          <Dl>
            <Dl.Dt>End Price + Distributions</Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                This represents the value of a share, including earnings (such
                as dividends or interest), at the end of the seven days.
              </Dl.Dd.P>
            </Dl.Dd>
            <Dl.Dt>Start Price</Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                The value of the share at the beginning of the seven days.
              </Dl.Dd.P>
            </Dl.Dd>
            <Dl.Dt>Fees</Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                These are the fees incurred during the seven-day period, which
                may include management fees or other charges.
              </Dl.Dd.P>
            </Dl.Dd>
            <Dl.Dt>Annualizing Factor (365/7)</Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                This converts the weekly yield into an annualized figure,
                providing a hypothetical yearly rate if the week’s performance
                were to continue unchanged for an entire year.
              </Dl.Dd.P>
            </Dl.Dd>
          </Dl>
        </Section>
        <Section ariaLabelledby="example">
          <H2 id="example">
            A detailed example of calculating the 7-day yield in Excel
          </H2>
          <Table>
            <Table.Caption>
              An example of calculating the 7-day yield in Excel
            </Table.Caption>
            <Table.Thead>
              <Table.Thead.Tr>
                <Table.Thead.Tr.Th scope="row">Fund</Table.Thead.Tr.Th>
                <Table.Thead.Tr.Th scope="col">Fund A</Table.Thead.Tr.Th>
                <Table.Thead.Tr.Th scope="col">Fund B</Table.Thead.Tr.Th>
              </Table.Thead.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tbody.Tr>
                <Table.Tbody.Tr.Th scope="row">
                  Start share price
                </Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>$100</Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>$200</Table.Tbody.Tr.Td>
              </Table.Tbody.Tr>
              <Table.Tbody.Tr>
                <Table.Tbody.Tr.Th scope="row">
                  End share price + Earnings
                </Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>$100.05</Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>$200.08</Table.Tbody.Tr.Td>
              </Table.Tbody.Tr>
              <Table.Tbody.Tr>
                <Table.Tbody.Tr.Th scope="row">Fees</Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>0.01</Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>0.02</Table.Tbody.Tr.Td>
              </Table.Tbody.Tr>
              <Table.Tbody.Tr>
                <Table.Tbody.Tr.Th scope="row">7-day yield</Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>2.09%</Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>1.56%</Table.Tbody.Tr.Td>
              </Table.Tbody.Tr>
            </Table.Tbody>
          </Table>
          <P>
            Assume you want to calculate the 7-Day Yield for two money market
            mutual funds using Excel. Here’s how to set it up and get your
            results:
          </P>
          <Dl>
            <Dl.Dt>Setting Up the Worksheet</Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                Adjust the width of columns A, B, and C for better visibility.
              </Dl.Dd.P>
              <Dl.Dd.P>
                Label column B as “Fund A” and column C as “Fund B”.
              </Dl.Dd.P>
              <Dl.Dd.P>
                For example, let’s consider two hypothetical money market funds:
                Fund A and Fund B. Fund A has an end share price (including
                earnings) of $100.05, a start share price of $100, and incurs
                $0.01 in fees. Fund B has an end share price of $200.08, a start
                share price of $200, and incurs $0.02 in fees.
              </Dl.Dd.P>
            </Dl.Dd>
            <Dl.Dt>Entering Data</Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                In cells A2, A3, and A4, enter “Start Share Price”, “End Share
                Price + Earnings”, and “Fees”, respectively.
              </Dl.Dd.P>
              <Dl.Dd.P>Enter “7-Day Yield” in cell A5.</Dl.Dd.P>
              <Dl.Dd.P>Inputting the Numbers for Fund A:</Dl.Dd.P>
              <Dl.Dd.P>In cell B2 (Start Share Price), enter 100.</Dl.Dd.P>
              <Dl.Dd.P>
                In cell B3 (End Share Price + Earnings), enter 100.05.
              </Dl.Dd.P>
              <Dl.Dd.P>In cell B4 (Fees), enter 0.01.</Dl.Dd.P>
            </Dl.Dd>
            <Dl.Dt>Calculating the 7-Day Yield for Fund A</Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                In cell B5, input the formula =((B3 – B2 – B4) / B2) * 365/7.
              </Dl.Dd.P>
              <Dl.Dd.P>
                This formula will calculate the 7-Day Yield for Fund A.
              </Dl.Dd.P>
            </Dl.Dd>
            <Dl.Dt>Repeating the Process for Fund B</Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                Input 200 in cell C2, 200.08 in cell C3, and 0.02 in cell C4.
              </Dl.Dd.P>
              <Dl.Dd.P>
                In cell C5, use the formula =((C3 – C2 – C4) / C2) * 365/7 to
                calculate the 7-Day Yield for Fund B.
              </Dl.Dd.P>
            </Dl.Dd>
            <Dl.Dt>Interpreting Results</Dl.Dt>
            <Dl.Dd>
              <Dl.Dd.P>
                The values in cells B5 and C5 give each fund’s annualized 7-Day
                Yield, reflecting the projected yearly return based on the past
                week’s performance.
              </Dl.Dd.P>
              <Dl.Dd.P>
                For Fund A, the 7-Day Yield is approximately 2.09%.
              </Dl.Dd.P>
              <Dl.Dd.P>
                For Fund B, the 7-Day Yield is also approximately 1.56%.
              </Dl.Dd.P>
              <Dl.Dd.P>
                This Excel method offers a precise and efficient way to
                calculate and compare the 7-Day Yield of different money market
                mutual funds, aiding in financial analysis and decision-making.
              </Dl.Dd.P>
            </Dl.Dd>
          </Dl>
        </Section>
      </Article>
    </main>
  );
}
