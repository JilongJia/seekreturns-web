import { Article } from "@/app/components/en/content/page/main/article/Article";
import { Br } from "@/app/components/en/content/page/main/article/Br";
import { H1 } from "@/components/en/ui/H1";
import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { Header } from "@/components/en/ui/Header";
import { ImageFigure } from "@/app/components/en/content/page/main/article/ImageFigure";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
import { Ol } from "@/app/components/en/content/page/main/article/Ol";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Strong } from "@/app/components/en/content/page/main/article/Strong";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";

import styles from "./Main.module.css";
import type { MainProps } from "@/components/en/ui/Main";

import protectivePutOptionsStrategyProfitAndLossGraph from "./images/protective-put-options-strategy-profit-and-loss-graph.png";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>Protective Put Options Strategy</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Imagine your investment portfolio suddenly takes a steep dive due to a
          market crash—what would you do? For many investors, the answer lies in
          a simple yet effective tool: the protective put options strategy. This
          approach helps you shield your investments from losses without forcing
          you to sell your stocks, providing both stability and peace of mind
          during turbulent market conditions.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">What is the protective put options strategy?</H2>
          <P>
            The protective put strategy is a risk management tool that investors
            use to protect their stock holdings from significant declines in
            value. At its core, it involves buying a put option—a contract that
            gives you the right, but not the obligation, to sell a specific
            stock at a set price, known as the strike price, within a certain
            period. Think of it like an insurance policy for your stocks: it
            limits your losses if the stock price falls, while still letting you
            hold onto your shares for potential future gains.
          </P>
          <P>Here’s how it works in practice:</P>
          <Ul>
            <Ul.Li>You own shares of a stock.</Ul.Li>
            <Ul.Li>
              You buy a put option for those shares, specifying a strike price
              and expiration date.
            </Ul.Li>
            <Ul.Li>
              If the stock price drops below the strike price, you can exercise
              the put option to sell your shares at the higher strike price,
              capping your losses.
            </Ul.Li>
            <Ul.Li>
              If the stock price stays above the strike price, the option
              expires unused, and your only cost is the premium—the price you
              paid for the option.
            </Ul.Li>
          </Ul>
          <P>
            The beauty of this strategy is that it sets a floor on your
            potential losses, though you’ll need to weigh this benefit against
            the upfront cost of the premium.
          </P>
          <H3 id="example">Example of a protective put in action</H3>
          <P>
            To illustrate how this strategy plays out, let’s use the same setup:
            You own 100 shares of XYZ stock, currently priced at $100 per share,
            for a total value of $10,000. You buy a put option with a strike
            price of $90, expiring in three months, at a premium of $20 per
            share—costing $2,000 total.
          </P>
          <P>Here’s what could happen:</P>
          <Ul>
            <Ul.Li>
              <Strong>Scenario 1: Stock price stays above $90</Strong>
              <Br />
              Suppose XYZ’s price remains above $90—say, $95 or $105—by the
              expiration date. The put option expires worthless because there’s
              no benefit to selling at $90 when the market price is higher. You
              lose the $2,000 premium, but your 100 shares remain intact, still
              valued at $9,500 or $10,500, respectively. You can continue
              holding them or sell at the current market price, depending on
              your goals.
            </Ul.Li>
            <Ul.Li>
              <Strong>Scenario 2: Stock price drops to $40</Strong>
              <Br />
              Now imagine XYZ’s price falls to $40 per share. Without
              protection, your shares would be worth just $4,000—a $6,000 loss
              from their initial $10,000 value. With the put option, you
              exercise your right to sell all 100 shares at the strike price of
              $90 each, receiving $9,000. After subtracting the $2,000 premium,
              your net proceeds are $7,000, capping your total loss at $3,000
              ($10,000 minus $7,000). This saves you $3,000 compared to the
              $6,000 loss you’d face without the put.
            </Ul.Li>
          </Ul>
          <ImageFigure>
            <ImageFigure.Image
              src={protectivePutOptionsStrategyProfitAndLossGraph}
              alt="Protective put strategy profit and loss graph"
            />
            <ImageFigure.Figcaption>
              Protective put strategy profit and loss graph (Underlying price:
              $100, Strike price: $90, Premium: $20)
            </ImageFigure.Figcaption>
          </ImageFigure>
        </Section>
        <Section ariaLabelledby="guide">
          <H2 id="guide">How to implement a protective put?</H2>
          <P>
            Applying a protective put options strategy involves a clear process
            paired with thoughtful decisions to balance protection, cost, and
            potential returns. Below is a detailed guide to help you execute it
            effectively, along with best practices to maximize its value.
          </P>
          <H3 id="steps">Steps to implement a protective put</H3>
          <Ol>
            <Ol.Li>
              <Strong>Identify the stock to protect</Strong>
              <Br />
              Select a stock in your portfolio that you intend to hold long-term
              but feel vulnerable to short-term drops. This might be due to
              upcoming events like earnings reports or broader market
              uncertainty. This stock becomes the focus of your hedge.
            </Ol.Li>
            <Ol.Li>
              <Strong>Select the put option</Strong>
              <Br />
              Using your brokerage platform, pick a put option that matches your
              needs. Consider these key factors:
              <Ul className={styles.secondaryList}>
                <Ul.Li>
                  <Strong>Strike price:</Strong> Choose a price at or below the
                  stock’s current value (e.g., $45 for a $50 stock) based on how
                  much loss you’re willing to absorb before protection kicks in.
                </Ul.Li>
                <Ul.Li>
                  <Strong>Expiration date:</Strong> Set it to cover your
                  expected holding period—typically 1 to 6 months—aligned with
                  the event you’re hedging (e.g., two months for an earnings
                  release).
                </Ul.Li>
                <Ul.Li>
                  <Strong>Premium cost:</Strong> Ensure the cost fits your
                  budget (e.g., a $2-per-share premium equals $200 per contract,
                  as each contract covers 100 shares).
                </Ul.Li>
              </Ul>
            </Ol.Li>
            <Ol.Li>
              <Strong>Purchase the put</Strong>
              <Br />
              Buy the put option contract—one contract per 100 shares you own
              (e.g., two contracts for 200 shares). This secures your right to
              sell at the strike price if the stock declines.
            </Ol.Li>
            <Ol.Li>
              <Strong>Monitor and decide</Strong>
              <Br />
              Keep an eye on the stock price and market conditions. If the price
              dips below the strike, you can either exercise the put to sell
              your shares at the strike price or sell the option itself if it
              has gained value. If the stock rises or holds steady, let the put
              expire and evaluate your next move.
            </Ol.Li>
          </Ol>
          <H3 id="best-practices">Best practices</H3>
          <Ul>
            <Ul.Li>
              <Strong>Balance strike price and premium:</Strong> A
              near-the-money strike (e.g., $95 for a $100 stock) provides robust
              protection but comes with a higher premium. An out-of-the-money
              strike (e.g., $80) costs less but only activates after a larger
              drop. Test different strike prices against your risk tolerance and
              budget. Check implied volatility (IV) too—high IV can drive up
              premiums, so weigh the cost versus the protection offered.
            </Ul.Li>
            <Ul.Li>
              <Strong>Incorporate premiums into profit goals:</Strong> The
              premium adds to your investment cost. For a $100 stock with a $20
              premium, your breakeven rises to $120 (stock price + premium). Set
              profit targets above this level to ensure the strategy remains
              worthwhile.
            </Ul.Li>
            <Ul.Li>
              <Strong>Optimize timing:</Strong> Match the expiration to the
              specific risk you’re hedging. A shorter duration (e.g., 1-2
              months) suits event-driven risks like earnings, while a longer
              term (e.g., 6 months) fits broader market uncertainty. Avoid
              overpaying for time you don’t need.
            </Ul.Li>
          </Ul>
        </Section>
        <Section ariaLabelledby="pros-and-cons">
          <H2 id="pros-and-cons">
            Pros and cons of the protective put options strategy
          </H2>
          <P>
            Before using the protective put strategy, it’s worth weighing its
            strengths against its limitations. This approach offers powerful
            protection but comes with trade-offs that can impact your returns.
            Here’s a clear breakdown of its advantages and drawbacks.
          </P>
          <H3 id="advantages">Advantages</H3>
          <Ul>
            <Ul.Li>
              <Strong>Effective downside protection:</Strong> The strategy
              limits your losses if the stock price crashes. For a $100 stock
              with a $90 strike put, your maximum loss is $10 per share plus the
              premium (e.g., $20), even if the stock falls to $30. This is
              especially valuable in volatile markets or during uncertain events
              like earnings reports.
            </Ul.Li>
            <Ul.Li>
              <Strong>Retains upside potential:</Strong> You keep full ownership
              of your shares, allowing you to benefit from price increases. If
              the stock rises to $160, you gain $60 per share after subtracting
              the premium—unlike selling your position outright to dodge risk.
            </Ul.Li>
            <Ul.Li>
              <Strong>Customizable flexibility:</Strong> You can adjust the
              strike price and expiration to fit your needs. A near-the-money
              strike (e.g., $95 for a $100 stock) provides strong protection,
              while an out-of-the-money strike (e.g., $80) lowers costs. Your
              choice hinges on your risk tolerance and budget.
            </Ul.Li>
          </Ul>
          <H3 id="drawbacks">Drawbacks</H3>
          <Ul>
            <Ul.Li>
              <Strong>Premium costs reduce returns:</Strong> The upfront cost of
              the put (e.g., $2,000 for 100 shares at $20 per share) cuts into
              your profits. For a $100 stock, the price must climb past $120
              (stock price + premium) to break even if the put expires unused,
              which can weigh down returns in stable or rising markets.
            </Ul.Li>
            <Ul.Li>
              <Strong>No payoff in flat markets:</Strong> If the stock price
              stays above the strike—say, $100 with a $90 strike—the put expires
              worthless, and you lose the premium. This can feel like a wasted
              expense when the anticipated downturn doesn’t materialize.
            </Ul.Li>
            <Ul.Li>
              <Strong>Timing challenges:</Strong> Choosing the wrong expiration
              can leave you vulnerable or cost you more. A short-term put (e.g.,
              1 month) might expire before a drop occurs, while a long-term one
              (e.g., 6 months) ties up capital with pricier premiums, requiring
              careful planning.
            </Ul.Li>
          </Ul>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">Frequently asked questions</H2>
          <H3>
            What’s the main difference between a protective put and selling a
            stock?
          </H3>
          <P>
            A protective put keeps your stock in play, letting you profit from
            price increases while capping losses if the price falls. Selling a
            stock removes all downside risk but also locks in your
            position—eliminating upside potential and possibly triggering taxes
            or fees. The put offers flexibility with protection; selling is a
            full exit.
          </P>
          <H3>How do I know if the premium is worth it?</H3>
          <P>
            Weigh the premium against the loss you’re guarding against. For a
            $50 stock, a $2-per-share put (costing $200 per contract) might
            prevent a $10 drop—saving you $800 after the premium. Look at
            implied volatility (IV) too—high IV can inflate costs, so balance
            that with your view of the stock’s risk.
          </P>
          <H3>Can I use protective puts for my entire portfolio?</H3>
          <P>
            You can, but the cost often makes it impractical. Instead, target
            high-value or volatile stocks in your portfolio. For wider coverage,
            consider index puts (e.g., on the S&P 500), which protect a
            diversified set of holdings more cost-effectively.
          </P>
          <H3>What happens if I don’t exercise the put?</H3>
          <P>
            If the stock price stays above the strike, the put expires
            worthless, and you lose the premium. Alternatively, you could sell
            the put before expiration if its value increases—potentially
            offsetting the cost or making a profit.
          </P>
          <H3>How often should I buy protective puts?</H3>
          <P>
            It varies by your goals and market outlook. Some investors buy puts
            for specific risks, like earnings reports, renewing them as events
            arise. Others keep continuous coverage. Either way, track premium
            costs—overuse can erode returns if protection isn’t needed.
          </P>
        </Section>
      </Article>
    </main>
  );
}
