import { type MainProps } from "@/app/components/en/content/page/main";
import { Article } from "@/app/components/en/content/page/main/article/Article";
import { H1 } from "@/app/components/en/content/page/main/article/H1";
import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { Header } from "@/app/components/en/content/page/main/article/Header";
import { ImageFigure } from "@/app/components/en/content/page/main/article/ImageFigure";
import { ModifiedDate } from "@/app/components/en/content/page/main/article/ModifiedDate";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";

import coveredCallStrategyProfitAndLossGraph from "./images/covered-call-strategy-profit-and-loss-graph.png";
import tslaStockInformation from "./images/tsla-stock-information.jpg";
import tslaCallOptionInformation from "./images/tsla-call-option-information.jpg";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>Covered Call Options Strategy</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Generally speaking, we buy or sell stocks based on the current market
          conditions at that time, which also includes our guesses about future
          market trends. But the market’s direction is not only a simple rise
          and fall. Horizontal price movement is also widespread. At this time,
          we can use hedging strategies to magnify the profits and limit the
          risk. This article will introduce one of the most straightforward and
          practical options trading strategies: covered call options trading
          strategy. If you can master this strategy, you can significantly
          amplify your profits in the stock market.
        </P>
        <Section ariaLabelledby="definition">
          <H2 id="definition">
            What is the covered call options trading strategy?
          </H2>
          <P>
            The covered call options trading strategy is a combination strategy.
            It is a strategy to make profits by combining stocks and calls. If
            there is no stock, a simple short call cannot be called a covered
            call strategy. That is a “Naked Call” because there is no underlying
            stock position.
          </P>
          <P>
            Looking back at the characteristics of the simple short-call option
            strategy, you will find that its risks can be infinite.
          </P>
          <P>
            But the risk is minimal if we own the target stock and sell an equal
            number of calls. This combined strategy is the covered call
            strategy.
          </P>
          <ImageFigure>
            <ImageFigure.Image
              src={coveredCallStrategyProfitAndLossGraph}
              alt="Covered call strategy profit and loss graph"
            />
            <ImageFigure.Figcaption>
              Covered call strategy profit and loss graph (Underlying price:
              $100, Strike price: $110, Premium: $20)
            </ImageFigure.Figcaption>
          </ImageFigure>
          <H3 id="example">Example</H3>
          <P>
            For example, we own 100 shares of TSLA (Tesla Inc) at $190. TSLA
            stock has fluctuated between $180 to $200 for more than half a
            month. Suppose we judge that TSLA’s stock price will not break
            through $220 in the next month. We can sell a call option that
            expires in one month with a strike price of $220 at a premium of
            $525.
          </P>
          <P>
            If TSLA’s stock price does not exceed $220 a month later, we can
            earn $525 in the premium.
          </P>
          <P>
            If the stock price of TSLA exceeds $220 a month later, the buyer of
            the options will exercise the option to buy 100 shares of TSLA at
            $220 from us. We earn a gain on the stocks plus the premiums of
            $525. But the profit on the stocks over $220 does not belong to us
            anymore.
          </P>
          <ImageFigure>
            <ImageFigure.Image
              src={tslaStockInformation}
              alt="Tesla (TSLA) stock information"
            />
            <ImageFigure.Figcaption>
              Tesla (TSLA) stock details (Price: $194.7)
            </ImageFigure.Figcaption>
          </ImageFigure>
          <ImageFigure>
            <ImageFigure.Image
              src={tslaCallOptionInformation}
              alt="Tesla (TSLA) call option information"
            />
            <ImageFigure.Figcaption>
              Tesla (TSLA) call option details (Premium: $5.25, Strike price:
              $220.0, Expiration date: 01/06/2023)
            </ImageFigure.Figcaption>
          </ImageFigure>
        </Section>
        <Section ariaLabelledby="when-to-use">
          <H2 id="when-to-use">
            When should you use the covered call options trading strategy?
          </H2>
          <P>
            Generally speaking, the purpose of constructing a covered call is to
            expect that the stock price will not rise too much in the future.
            You can earn premiums from short calls to increase profit if you
            have some stocks. In addition, If you think the stocks may fall but
            don’t want to sell, you can get the premiums from selling call
            options to make up for the loss.
          </P>
          <H3 id="increase-income">
            Increase income through the covered call strategy
          </H3>
          <P>
            For example, I bought TQQQ (ProShares UltraPro QQQ) a few days ago
            and planned to hold it for a long time. But the price was unlikely
            to rise sharply in the short term. The probable situation was that
            it would go sideways or drop slightly. If the ETF has horizontal
            price movement for a long time, capital utilization will be very
            low.
          </P>
          <P>
            My holding cost is $18. Through analysis, it is unlikely that the
            price will rise to $25 in the next month, so I sold call options
            whose strike price is $25. Then there will be three situations:
          </P>
          <Ul>
            <Ul.Li>
              If the price rises above $25, the buyer of the options will
              exercise the call option, and part of my stock profit will be
              hedged. In other words, the income from TQQQ above $25 does not
              belong to me.
            </Ul.Li>
            <Ul.Li>
              If the price is between $18 – $25, I will pocket the premium from
              selling the call options and earn more than simply holding the
              spot stock.
            </Ul.Li>
            <Ul.Li>
              If the price fell below $18, the premium received from selling the
              call offset part of the loss from the stock price drop. The money
              lost was less than the original situation of just holding the spot
              stock.
            </Ul.Li>
          </Ul>
          <P>
            Because I intend to hold TQQQ for a long time, I can sell calls to
            earn income on a rolling basis. It sounds like I deposit the stock
            in the bank and make interest monthly. The covered call strategy is
            essential for fundamental long-term investors, which can lower the
            cost of stocks.
          </P>
          <H3 id="cover-losses">
            Make up for losses through the covered call strategy
          </H3>
          <P>
            For example, I currently hold DIA (SPDR Dow Jones Industrial Average
            ETF Trust). Because the Dow Jones Index has risen a lot compared to
            the Nasdaq Index, my current position has already made a lot of
            profits. Even so, I don’t want to sell these positions at current
            prices. Because Federal Reserve Chairman Powell turned dovish and
            CPI tended to fall. So I don’t know if the price will go sideways,
            fall slightly, or break through the previous pressure level in one
            step.
          </P>
          <P>
            It is an excellent time to use the covered call strategy. The
            current price is $345, and I sold some call options
            (out-of-the-money calls) whose strike price is $380 at a slightly
            farther expiration date. If the price breaks through the pressure
            level and goes directly to $380 or even higher, then parts of the
            income generated by my stock above $380 will be hedged by the short
            call. In other words, the part of profit above $380 has nothing to
            do with me. So I don’t want the price to go up too much directly. If
            the price drops sharply, the loss of my underlying stock will be
            partially offset by the short call. But still, my position will
            change from profit to loss, which is still not worthwhile. So I
            don’t expect the price to drop significantly either. So the best
            situation is that the price remains at the same place or rises and
            falls slightly so that I can keep the profits I earned before and
            collect the premium from selling call options, which is the best
            situation.
          </P>
        </Section>
        <Section ariaLabelledby="risk">
          <H2 id="risk">Risk of the covered call strategy</H2>
          <P>
            Risk and return are inseparable in trading, which is also true for
            the covered call strategy.
          </P>
          <H3 id="stock-plummet">Losses caused by stock plummet</H3>
          <P>
            You need to own some stocks to construct the covered call
            strategies. Since you own some stocks, you need to undertake the
            risk of the stock price plummeting. If the stock price falls
            significantly, the loss outweighs the premium. You will lose money
            at this time.
          </P>
          <H3 id="profit-reduction">
            The profit reduction caused by the rapid rise of the stock
          </H3>
          <P>
            While using the covered call strategy, the maximum profit you can
            obtain from the stock price rise has a maximum limit.
          </P>
          <P>
            Once some good news stimulates the stock, the price rises rapidly,
            far exceeding the exercise price marked by the call. Although we can
            earn the premium and some money from the stock rise, we cannot
            obtain much more profit from the stock over the strike price.
          </P>
        </Section>
        <Section ariaLabelledby="tips">
          <H2 id="tips">Covered call strategy tips</H2>
          <H3 id="choose-underlying">Choose an excellent underlying</H3>
          <P>
            For the covered call strategy, the underlying selection is critical.
            Be sure to select bullish stocks for the long term, and don’t go up
            too fast. It requires some fundamental and technical analysis. It
            will be better if there are dividends. For beginners, it is tough to
            study the fundamental analysis of a company and the technical
            analysis of the company’s stocks. At this time, we may choose index
            fund ETFs, such as SPY (SPDR S&P 500 ETF Trust), IWM (iShares
            Russell 2000 ETF), DIA (SPDR Dow Jones Industrial Average ETF
            Trust), etc. The advantage of an index fund is that its fundamentals
            are related to macroeconomic and financial policies. These indexes
            are well diversified and will not rise or fall sharply. So, they are
            ideal targets for covered calls.
          </P>
          <H3 id="buy-low">Buy stocks at low prices</H3>
          <P>
            For stocks or ETFs with good fundamentals and long-term bullishness,
            it is an excellent opportunity to enter the market at low prices
            when a black swan event hits the price.
          </P>
          <H3 id="sell-high">Regularly sell call options at high prices</H3>
          <P>
            When stocks are rising, if you sell stocks, you can earn short-term
            income, but you maybe miss long-term opportunities forever. Frequent
            short-term stock trading will increase commissions and taxes
            expenditure. While holding stocks, keep selling out-of-the-money
            calls due next month (that is, the exercise price is higher than the
            current price, out-of-the-money calls), and you can get premiums. In
            that case, you will not miss long-term opportunities and can also
            seize short-term opportunities from fluctuations.
          </P>
        </Section>
      </Article>
    </main>
  );
}
