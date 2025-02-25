"use client";

import { useState } from "react";

import { ErrorMessageCard } from "@/app/components/zh/content/page/main/calculator/ErrorMessageCard";
import { Form } from "@/app/components/zh/content/page/main/calculator/Form";
import { InputCard } from "@/app/components/zh/content/page/main/calculator/InputCard";
import { OutputCard } from "@/app/components/zh/content/page/main/calculator/OutputCard";
import { Section } from "@/app/components/zh/content/page/main/calculator/Section";
import { ScreenReaderH2 } from "@/app/components/zh/content/page/main/calculator/ScreenReaderH2";
import styles from "./Calculator.module.css";

type CalculatorProps = { className?: string };

export function Calculator({ className }: CalculatorProps) {
  const [interestRateInput, setInterestRateInput] = useState("6.4");
  const [numberOfPeriodsInput, setNumberOfPeriodsInput] = useState("10");

  const interestRatePercentValue = parseFloat(interestRateInput);
  const numberOfPeriodsValue = parseFloat(numberOfPeriodsInput);

  let interestRateError = "";
  if (interestRateInput.trim() === "") {
    interestRateError = "请输入利率。";
  } else if (Number.isNaN(interestRatePercentValue)) {
    interestRateError = "利率必须是数字。";
  } else if (interestRatePercentValue < 0) {
    interestRateError = "利率不能小于0。";
  }

  let numberOfPeriodsError = "";
  if (numberOfPeriodsInput.trim() === "") {
    numberOfPeriodsError = "请输入期数。";
  } else if (Number.isNaN(numberOfPeriodsValue)) {
    numberOfPeriodsError = "期数必须是数字。";
  } else if (numberOfPeriodsValue < 0) {
    numberOfPeriodsError = "期数不能小于0。";
  }

  const errorMessages = [interestRateError, numberOfPeriodsError].filter(
    Boolean,
  );

  let pvifa = "";
  if (errorMessages.length === 0) {
    const interestRateDecimalValue = interestRatePercentValue / 100;
    if (interestRateDecimalValue === 0) {
      pvifa = numberOfPeriodsValue.toFixed(4);
    } else {
      pvifa = (
        (1 - Math.pow(1 + interestRateDecimalValue, -numberOfPeriodsValue)) /
        interestRateDecimalValue
      ).toFixed(4);
    }
  }

  return (
    <Section className={className}>
      <ScreenReaderH2>年金现值系数计算器</ScreenReaderH2>
      <Form>
        <InputCard className={styles.inputCard}>
          <InputCard.Label htmlFor="interest-rate-number-input">
            利率：
          </InputCard.Label>
          <InputCard.NumberInput
            id="interest-rate-number-input"
            value={interestRateInput}
            min="0"
            max="50"
            step="0.01"
            unit="percent"
            className={styles.numberInput}
            onChange={(e) => setInterestRateInput(e.target.value)}
          />
          <InputCard.ScreenReaderLabel htmlFor="interest-rate-range-input">
            利率：
          </InputCard.ScreenReaderLabel>
          <InputCard.RangeInput
            id="interest-rate-range-input"
            value={interestRateInput}
            min="0"
            max="50"
            step="0.01"
            unit="percent"
            className={styles.rangeInput}
            onChange={(e) => setInterestRateInput(e.target.value)}
          />

          <InputCard.Label htmlFor="number-of-periods-number-input">
            期数：
          </InputCard.Label>
          <InputCard.NumberInput
            id="number-of-periods-number-input"
            value={numberOfPeriodsInput}
            min="1"
            max="50"
            step="1"
            unit="year"
            className={styles.numberInput}
            onChange={(e) => setNumberOfPeriodsInput(e.target.value)}
          />
          <InputCard.ScreenReaderLabel htmlFor="number-of-periods-range-input">
            期数：
          </InputCard.ScreenReaderLabel>
          <InputCard.RangeInput
            id="number-of-periods-range-input"
            value={numberOfPeriodsInput}
            min="1"
            max="50"
            step="1"
            unit="year"
            className={styles.rangeInput}
            onChange={(e) => setNumberOfPeriodsInput(e.target.value)}
          />
        </InputCard>

        {pvifa && (
          <OutputCard>
            <OutputCard.Label htmlFor="pvifa-output">
              年金现值系数：
            </OutputCard.Label>
            <OutputCard.Output
              id="pvifa-output"
              htmlFor="interest-rate-number-input number-of-periods-number-input"
            >
              {pvifa}
            </OutputCard.Output>
            <OutputCard.P>
              在{interestRatePercentValue}%的利率下，经过{numberOfPeriodsValue}
              年，每年支付1美元的年金现值系数为{pvifa}。
            </OutputCard.P>
          </OutputCard>
        )}

        {errorMessages.length > 0 && (
          <ErrorMessageCard>
            {errorMessages.map((message, index) => (
              <ErrorMessageCard.P key={index}>{message}</ErrorMessageCard.P>
            ))}
          </ErrorMessageCard>
        )}
      </Form>
    </Section>
  );
}
