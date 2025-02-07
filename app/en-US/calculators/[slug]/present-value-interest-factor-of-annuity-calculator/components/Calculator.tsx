"use client";

import { useState } from "react";

import { ErrorMessageCard } from "@/app/components/en-US/content/page/main_content/calculator/ErrorMessageCard";
import { Form } from "@/app/components/en-US/content/page/main_content/calculator/Form";
import { InputCard } from "@/app/components/en-US/content/page/main_content/calculator/InputCard";
import { OutputCard } from "@/app/components/en-US/content/page/main_content/calculator/OutputCard";
import { Section } from "@/app/components/en-US/content/page/main_content/calculator/Section";
import { VisuallyHiddenH2 } from "@/app/components/en-US/content/page/main_content/calculator/VisuallyHiddenH2";

type CalculatorProps = {
  margin?: string;
  className?: string;
};

export function Calculator({ margin, className = "" }: CalculatorProps) {
  const [interestRateInput, setInterestRateInput] = useState("6.4");
  const [numberOfPeriodsInput, setNumberOfPeriodsInput] = useState("10");

  const interestRatePercentValue = parseFloat(interestRateInput);
  const numberOfPeriodsValue = parseFloat(numberOfPeriodsInput);

  let interestRateError = "";
  if (interestRateInput.trim() === "") {
    interestRateError = "Please enter an interest rate.";
  } else if (Number.isNaN(interestRatePercentValue)) {
    interestRateError = "Please enter a valid numeric interest rate.";
  } else if (interestRatePercentValue < 0) {
    interestRateError = "Interest rate must not be less than 0.";
  }

  let numberOfPeriodsError = "";
  if (numberOfPeriodsInput.trim() === "") {
    numberOfPeriodsError = "Please enter the number of periods.";
  } else if (Number.isNaN(numberOfPeriodsValue)) {
    numberOfPeriodsError = "Please enter a valid numeric number of periods.";
  } else if (numberOfPeriodsValue < 0) {
    numberOfPeriodsError = "Number of periods must not be less than 0.";
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
    <Section margin={margin} className={className}>
      <VisuallyHiddenH2>PVIFA calculator</VisuallyHiddenH2>
      <Form>
        <InputCard className="grid grid-cols-[1fr_auto] items-center gap-5">
          <InputCard.Label htmlFor="interest-rate-number-input">
            Interest Rate:
          </InputCard.Label>
          <InputCard.NumberInput
            id="interest-rate-number-input"
            value={interestRateInput}
            min="0"
            max="50"
            step="0.01"
            className="w-32 justify-self-end sm:w-36 md:w-32 xl:w-36"
            unit="percent"
            onChange={(e) => setInterestRateInput(e.target.value)}
          />
          <InputCard.VisuallyHiddenLabel htmlFor="interest-rate-range-input">
            Interest Rate:
          </InputCard.VisuallyHiddenLabel>
          <InputCard.RangeInput
            id="interest-rate-range-input"
            value={interestRateInput}
            min="0"
            max="50"
            step="0.01"
            unit="percent"
            className="col-span-full mb-1"
            onChange={(e) => setInterestRateInput(e.target.value)}
          />

          <InputCard.Label htmlFor="number-of-periods-number-input">
            Number of Periods:
          </InputCard.Label>
          <InputCard.NumberInput
            id="number-of-periods-number-input"
            value={numberOfPeriodsInput}
            min="1"
            max="50"
            step="1"
            unit="year"
            className="w-32 justify-self-end sm:w-36 md:w-32 xl:w-36"
            onChange={(e) => setNumberOfPeriodsInput(e.target.value)}
          />
          <InputCard.VisuallyHiddenLabel htmlFor="number-of-periods-range-input">
            Number of Periods:
          </InputCard.VisuallyHiddenLabel>
          <InputCard.RangeInput
            id="number-of-periods-range-input"
            value={numberOfPeriodsInput}
            min="1"
            max="50"
            step="1"
            unit="year"
            className="col-span-full"
            onChange={(e) => setNumberOfPeriodsInput(e.target.value)}
          />
        </InputCard>
        {pvifa && (
          <OutputCard>
            <OutputCard.Label htmlFor="pvifa-output">
              Present Value Interest Factor of Annuity:
            </OutputCard.Label>
            <OutputCard.Output
              id="pvifa-output"
              htmlFor="interest-rate-number-input number-of-periods-number-input"
            >
              {pvifa}
            </OutputCard.Output>
            <OutputCard.P>
              With an interest rate of {interestRatePercentValue}% over{" "}
              {numberOfPeriodsValue} years, the present value of an annuity with
              periodic payments of $1 is ${pvifa}.
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
