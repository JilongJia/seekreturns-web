import { Article } from "@/components/en/ui/Article";
import { H1 } from "@/components/en/ui/H1";
import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { Header } from "@/components/en/ui/Header";
import { ImageFigure } from "@/app/components/en/content/page/main/article/ImageFigure";
import { InternalLink } from "@/app/components/en/content/page/main/article/InternalLink";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
import { Ol } from "@/app/components/en/content/page/main/article/Ol";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Strong } from "@/app/components/en/content/page/main/article/Strong";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";

import styles from "./Main.module.css";
import type { MainProps } from "@/components/en/ui/Main";

import coveredCallOptionsStrategyProfitAndLossGraph from "./images/covered-call-options-strategy-profit-and-loss-graph.png";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>Covered Call Options Strategy</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          The covered call strategy is a popular approach for investors looking
          to potentially generate income from existing stock holdings. This
          guide explains what covered calls are, how they function, and key
          considerations for implementation.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What Is a Covered Call?</H2>
          <P>
            A covered call involves holding a long position in an asset (like
            owning at least 100 shares of a stock) and simultaneously selling
            (also known as writing) call options on that same asset. The premium
            received from selling the call option provides immediate income.
            It’s considered “covered” because if the option buyer exercises
            their right to buy the stock, the seller already owns the underlying
            shares required to meet the obligation (selling the shares at the
            agreed-upon price).
          </P>
          <P>
            This contrasts with selling a naked call, where the seller doesn’t
            own the underlying shares, exposing them to potentially unlimited
            risk if the stock price rises dramatically. With a covered call,
            owning the shares ensures your obligation is limited to delivering
            stock you already possess at the strike price if the option is
            exercised.
          </P>
          <P>The core components are:</P>
          <Ul>
            <Ul.Li>
              <Strong>Underlying Stock</Strong>: You must own at least 100
              shares for each standard call option contract you intend to sell.
            </Ul.Li>
            <Ul.Li>
              <Strong>Call Option</Strong>: A contract granting the buyer the
              right (not the obligation) to buy the underlying stock at a
              specified price on or before a certain date.
            </Ul.Li>
            <Ul.Li>
              <Strong>Strike Price</Strong>: The price at which the stock will
              be sold if the option is exercised.
            </Ul.Li>
            <Ul.Li>
              <Strong>Expiration Date</Strong>: The date by which the option
              contract must be exercised or it expires worthless.
            </Ul.Li>
            <Ul.Li>
              <Strong>Premium</Strong>: The amount the option seller receives
              from the buyer for undertaking the obligation. This is your
              upfront income.
            </Ul.Li>
          </Ul>
        </Section>
        <Section ariaLabelledby="how-it-works">
          <H2 id="how-it-works">How the Covered Call Strategy Works</H2>
          <P>
            Selling a covered call means you receive the premium immediately.
            This income slightly lowers your cost basis in the stock or provides
            a small cushion against price declines. By the expiration date, two
            primary outcomes are possible:
          </P>
          <Ul>
            <Ul.Li>
              <Strong>Stock Price Finishes Below the Strike Price</Strong>: The
              call option expires worthless, as the buyer won’t purchase the
              stock at the higher strike price when it’s cheaper on the market.
              You keep the full premium and retain your shares. You can then
              sell another covered call if desired.
            </Ul.Li>
            <Ul.Li>
              <Strong>Stock Price Finishes At or Above the Strike Price</Strong>
              : The option is likely to be exercised (you’ll be assigned). The
              buyer exercises their right, and you sell your 100 shares at the
              strike price. You keep the original premium plus the proceeds from
              selling the stock. Your broker typically handles the assignment
              process, notifying you and removing the shares from your account
              in exchange for the cash proceeds.
            </Ul.Li>
          </Ul>
          <P>
            Essentially, you’re trading potential stock appreciation above the
            strike price for immediate income (the premium). This strategy often
            suits a neutral to slightly bullish outlook on a stock you own.
          </P>
        </Section>
        <Section ariaLabelledby="profit-and-loss-dynamics">
          <H2 id="profit-and-loss-dynamics">Profit and Loss Dynamics</H2>
          <ImageFigure>
            <ImageFigure.Image
              src={coveredCallOptionsStrategyProfitAndLossGraph}
              alt="Covered call strategy profit and loss graph"
            />
            <ImageFigure.Figcaption>
              Covered call strategy profit and loss graph (Underlying price:
              $100, Strike price: $110, Premium: $20)
            </ImageFigure.Figcaption>
          </ImageFigure>
          <Ul>
            <Ul.Li>
              <Strong>Maximum Profit</Strong>: Your potential profit is capped.
              It equals the premium received plus any capital gain up to the
              strike price: (Strike Price - Stock Purchase Price) + Premium
              Received. You benefit from the premium and the stock’s rise only
              up to the strike.
            </Ul.Li>
            <Ul.Li>
              <Strong>Maximum Loss</Strong>: Your maximum loss is substantial
              because you still bear the risk of owning the stock. If the stock
              price falls to zero, your loss is the original price paid for the
              stock minus the premium received: (Stock Purchase Price - Premium
              Received). The premium slightly offsets the loss compared to only
              holding the stock.
            </Ul.Li>
            <Ul.Li>
              <Strong>Breakeven Point</Strong>: The stock price at which the
              overall position neither makes nor loses money. It’s calculated
              as: Stock Purchase Price - Premium Received. If the stock price
              falls below this point at expiration, the position results in an
              overall loss.
            </Ul.Li>
          </Ul>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">Step-by-Step Guide to Implementing a Covered Call</H2>
          <Ol>
            <Ol.Li>
              <Strong>Own the Underlying Shares</Strong>: Ensure you own at
              least 100 shares of the stock per contract. Choose stocks you’re
              comfortable holding long-term or are genuinely willing to sell at
              the chosen strike price. This is crucial as you might be forced to
              sell.
            </Ol.Li>
            <Ol.Li>
              <Strong>Choose the Option Contract</Strong>: Select the specific
              call option to sell:
              <Ul className={styles.secondaryList}>
                <Ul.Li>
                  <Strong>Strike Price</Strong>: Consider your goal. An
                  out-of-the-money (OTM) strike (above the current stock price)
                  offers a lower premium but a lower chance of assignment,
                  allowing more potential stock appreciation. An at-the-money
                  (ATM) or in-the-money (ITM) strike (below the current price)
                  yields a higher premium but increases the likelihood of
                  assignment. Choose a strike price at which you are truly
                  willing to part with your shares.
                </Ul.Li>
                <Ul.Li>
                  <Strong>Expiration Date</Strong>: Shorter-term options (e.g.,
                  weekly, monthly) provide premium income more frequently, and
                  time decay (theta) erodes their value faster (benefiting
                  sellers), but premiums are smaller. Longer-term options offer
                  higher upfront premiums but tie up your shares longer and give
                  the stock more time to move significantly, increasing
                  uncertainty.
                </Ul.Li>
              </Ul>
            </Ol.Li>
            <Ol.Li>
              <Strong>Sell (Write) the Call Option</Strong>: Place an order via
              your broker to “Sell to Open” the chosen contract(s). You’ll
              receive the premium (minus commission) in your account shortly
              after the trade executes.
            </Ol.Li>
            <Ol.Li>
              <Strong>Monitor the Position</Strong>: Track the stock price
              relative to the strike price, especially as expiration approaches.
              Be aware of upcoming events like earnings or dividend dates.
            </Ol.Li>
            <Ol.Li>
              <Strong>Manage at Expiration (or Before)</Strong>: Decide your
              action:
              <Ul className={styles.secondaryList}>
                <Ul.Li>
                  <Strong>Let it Expire</Strong>: If the stock is below the
                  strike at expiration, the option typically expires worthless.
                  You keep the premium and the shares.
                </Ul.Li>
                <Ul.Li>
                  <Strong>Allow Assignment</Strong>: If the stock is at or above
                  the strike, expect assignment. Your shares will be sold at the
                  strike price. You keep the premium and the sale proceeds.
                </Ul.Li>
                <Ul.Li>
                  <Strong>Roll the Option</Strong>: To potentially avoid
                  assignment and continue generating income, you can “roll” the
                  position. This involves executing a single order to “Buy to
                  Close” the current short call and simultaneously “Sell to
                  Open” a new call with a later expiration date and/or a
                  different (usually higher) strike price. This often results in
                  a net credit because the new, longer-dated option typically
                  has more time value than the expiring one.
                </Ul.Li>
                <Ul.Li>
                  <Strong>Close the Position Early</Strong>: You can “Buy to
                  Close” the call option before expiration. You might do this to
                  lock in a profit if the option’s value has decayed
                  significantly, or if you decide you want to sell the
                  underlying stock before expiration, or if you simply no longer
                  want the obligation.
                </Ul.Li>
              </Ul>
            </Ol.Li>
          </Ol>
        </Section>
        <Section ariaLabelledby="pros-and-cons">
          <H2 id="pros-and-cons">Pros and Cons of Covered Calls</H2>
          <P>
            <Strong>Pros</Strong>:
          </P>
          <Ul>
            <Ul.Li>
              <Strong>Income Generation</Strong>: Creates potential cash flow
              from existing stock holdings.
            </Ul.Li>
            <Ul.Li>
              <Strong>Partial Downside Protection</Strong>: The premium received
              lowers your breakeven point, offering a limited buffer against
              stock price declines.
            </Ul.Li>
            <Ul.Li>
              <Strong>Potential Exit Strategy</Strong>: Can be used to sell
              shares at a desired price (the strike) while earning income
              awaiting that level.
            </Ul.Li>
          </Ul>
          <P>
            <Strong>Cons</Strong>:
          </P>
          <Ul>
            <Ul.Li>
              <Strong>Capped Upside Potential</Strong>: You forfeit stock gains
              above the strike price if assigned. A soaring stock price means
              significant missed opportunity cost.
            </Ul.Li>
            <Ul.Li>
              <Strong>Significant Downside Risk Remains</Strong>: You retain
              nearly all the downside risk of owning the stock. A large drop in
              stock price can lead to substantial losses, only marginally offset
              by the premium.
            </Ul.Li>
            <Ul.Li>
              <Strong>Assignment Risk / Lack of Flexibility</Strong>: You may be
              forced to sell shares you wanted to keep. Early assignment, though
              less common, is possible (see{" "}
              <InternalLink href="#considerations">Considerations</InternalLink>
              ).
            </Ul.Li>
            <Ul.Li>
              <Strong>Potential Tax Implications</Strong>: Premiums are
              generally taxed as short-term capital gains. Assignment triggers a
              taxable event on the stock itself, affecting its holding period
              status.
            </Ul.Li>
          </Ul>
        </Section>
        <Section ariaLabelledby="considerations">
          <H2 id="considerations">Key Considerations</H2>
          <Ul>
            <Ul.Li>
              <Strong>Stock Selection</Strong>: Best suited for stable stocks,
              perhaps dividend-payers, where you have a
              neutral-to-slightly-bullish outlook and are comfortable selling at
              the strike. Using it on high-volatility growth stocks you expect
              to surge higher means likely capping significant potential gains
              (high opportunity cost).
            </Ul.Li>
            <Ul.Li>
              <Strong>Strike Price & Expiration Date Selection</Strong>: Balance
              your income goals (premium size) against assignment probability
              and your willingness to sell. Understand how time decay (theta)
              impacts different expiration choices.
            </Ul.Li>
            <Ul.Li>
              <Strong>Implied Volatility (IV)</Strong>: Higher IV leads to
              higher option premiums (good for sellers) but also implies greater
              expected price fluctuation (higher risk). Selling calls when IV is
              relatively high can be advantageous, but understand the underlying
              reasons for the high IV.
            </Ul.Li>
            <Ul.Li>
              <Strong>Dividends</Strong>: If you sell a call on a
              dividend-paying stock, be aware of the ex-dividend date. A buyer
              might exercise an ITM call early (just before the ex-date) to
              capture the upcoming dividend. If this happens, you lose the
              shares and the dividend. If you are assigned after the ex-dividend
              date, you keep the dividend.
            </Ul.Li>
            <Ul.Li>
              <Strong>Early Assignment Risk</Strong>: While most assignments
              happen at expiration, American-style options (most US stock
              options) can be exercised by the buyer at any time before
              expiration. This risk is highest for ITM calls, especially before
              an ex-dividend date or if the call has very little time value
              left.
            </Ul.Li>
            <Ul.Li>
              <Strong>Your Goals and Risk Tolerance</Strong>: Ensure the
              strategy aligns with your objectives (income vs. targeted selling)
              and that you’re comfortable with the capped upside and remaining
              downside stock risk.
            </Ul.Li>
          </Ul>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">
            Frequently Asked Questions (FAQ)
          </H2>
          <H3>What if I don’t own exactly 100 shares?</H3>
          <P>
            Standard options contracts cover 100 shares. Owning fewer means you
            cannot write a standard covered call (doing so would be partially
            naked). Some brokers offer “mini” options on certain widely traded
            stocks or ETFs, covering fewer shares, but they are less common.
          </P>
          <H3>Can I lose money with a covered call?</H3>
          <P>
            Yes. If the underlying stock price falls by more than the premium
            received per share, your overall position will be at a loss. The
            premium only offers limited protection.
          </P>
          <H3>What happens if the stock price goes way up?</H3>
          <P>
            If the stock price rises significantly above the strike price, your
            call will likely be assigned. You’ll sell your shares at the strike
            price and keep the premium, but you will miss out on all stock gains
            above that strike price.
          </P>
          <H3>What does “rolling” a covered call mean again?</H3>
          <P>
            Rolling involves closing your existing short call position (buying
            it back) and simultaneously opening a new short call position on the
            same stock, but typically with a later expiration date and/or a
            higher strike price. It’s a way to potentially avoid assignment on
            an ITM call or to continue collecting premiums if the original call
            is expiring OTM or close to the money.
          </P>
        </Section>
      </Article>
    </main>
  );
}
