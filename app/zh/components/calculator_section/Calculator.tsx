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
  const [initialInvestmentInput, setInitialInvestmentInput] = useState("1000");
  const [finalValueInput, setFinalValueInput] = useState("1500");

  const initialInvestmentValue = parseFloat(initialInvestmentInput);
  const finalValueValue = parseFloat(finalValueInput);

  let initialInvestmentError = "";
  if (initialInvestmentInput.trim() === "") {
    initialInvestmentError = "请输入初始投资金额";
  } else if (Number.isNaN(initialInvestmentValue)) {
    initialInvestmentError = "初始投资金额必须为有效数字";
  } else if (initialInvestmentValue <= 0) {
    initialInvestmentError = "初始投资金额必须大于0";
  }

  let finalValueError = "";
  if (finalValueInput.trim() === "") {
    finalValueError = "请输入最终价值";
  } else if (Number.isNaN(finalValueValue)) {
    finalValueError = "最终价值必须为有效数字";
  } else if (finalValueValue < 0) {
    finalValueError = "最终价值不能为负数";
  }

  const errorMessages = [initialInvestmentError, finalValueError].filter(
    Boolean,
  );

  let roi = "";
  if (errorMessages.length === 0) {
    roi = (
      ((finalValueValue - initialInvestmentValue) / initialInvestmentValue) *
      100
    ).toFixed(2);
  }

  return (
    <Section className={className}>
      <ScreenReaderH2>投资回报率（ROI）计算器</ScreenReaderH2>
      <Form>
        <InputCard className={styles.inputCard}>
          <InputCard.Label htmlFor="initial-investment-number-input">
            初始投资：
          </InputCard.Label>
          <InputCard.NumberInput
            id="initial-investment-number-input"
            value={initialInvestmentInput}
            min="0"
            unit="cny"
            className={styles.numberInput}
            onChange={(e) => setInitialInvestmentInput(e.target.value)}
          />

          <InputCard.Label htmlFor="final-value-number-input">
            最终价值：
          </InputCard.Label>
          <InputCard.NumberInput
            id="final-value-number-input"
            value={finalValueInput}
            min="0"
            unit="cny"
            className={styles.numberInput}
            onChange={(e) => setFinalValueInput(e.target.value)}
          />
        </InputCard>

        {roi && (
          <OutputCard>
            <OutputCard.Label htmlFor="roi-output">
              投资回报率（ROI）：
            </OutputCard.Label>
            <OutputCard.Output
              id="roi-output"
              htmlFor="initial-investment-number-input final-value-number-input"
            >
              {roi}%
            </OutputCard.Output>
            <OutputCard.P>
              投资{initialInvestmentValue}元，最终价值{finalValueValue}
              元，回报率为{roi}%。
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
