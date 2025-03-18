import { type MainProps } from "@/app/components/en/content/page/main";
import { Article } from "@/app/components/en/content/page/main/article/Article";
import { H1 } from "@/app/components/en/content/page/main/article/H1";
import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { Header } from "@/app/components/en/content/page/main/article/Header";
import { ModifiedDate } from "@/app/components/en/content/page/main/article/ModifiedDate";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";

export function Main({ pathname, className }: MainProps) {
  return (
    <main className={className}>
      <Article>
        <Header>
          <H1>ADRs vs. H-shares</H1>
          <ModifiedDate pathname={pathname} />
        </Header>
        <P>
          Ever wondered how you can invest in the growth of Chinese companies
          without directly trading on foreign exchanges? In 2024 alone, American
          Depositary Receipts (ADRs) and H-Shares collectively channeled
          billions of dollars into mainland Chinese firms, offering investors
          two distinct paths to invest in China’s dynamic economy.{" "}
        </P>
        <Section ariaLabelledby="adrs-definition">
          <H2 id="adrs-definition">What are ADRs?</H2>
          <P>
            American Depositary Receipts (ADRs) allow investors to own shares in
            foreign companies without trading directly on those companies’ home
            stock exchanges. To create an ADR, a U.S. financial
            institution—usually a large commercial bank—purchases the actual
            shares of the foreign company (for example, Alibaba shares listed in
            Hong Kong). The bank then issues receipts, known as ADRs,
            representing these underlying shares.
          </P>
          <P>
            These ADRs trade on U.S. stock exchanges such as the NYSE or Nasdaq,
            priced and transacted entirely in U.S. dollars, just like domestic
            American stocks. Each ADR corresponds to a specific number of
            foreign shares, which varies depending on the company. For instance,
            one ADR might represent two shares of Alibaba traded overseas, while
            another ADR might represent ten shares of a different foreign firm.
          </P>
          <P>
            This structure simplifies investing in international companies by
            eliminating the need for investors to handle foreign currency
            exchange, directly navigate overseas regulatory requirements, or
            trade on foreign stock exchanges. Instead, all these complexities
            are managed by the issuing bank, enabling investors to focus solely
            on choosing their investments.
          </P>
        </Section>
        <Section ariaLabelledby="h-shares-definition">
          <H2 id="h-shares-definition">What are H-shares?</H2>
          <P>
            H-shares represent ownership in mainland Chinese companies but are
            traded directly on the Hong Kong Stock Exchange (HKEX). Companies
            such as PetroChina and China Mobile are examples of firms
            incorporated in mainland China, regulated by Chinese authorities,
            but listed in Hong Kong specifically to attract international
            investment.
          </P>
          <P>
            Unlike ADRs, which trade in U.S. dollars on American exchanges,
            H-shares are priced, traded, and settled directly in Hong Kong
            dollars. Investors typically purchase H-shares through brokers
            offering international market access. The “H” stands for “Hong
            Kong,” indicating that these shares bypass mainland China’s
            restrictive foreign investment regulations, allowing easier entry
            for overseas investors.
          </P>
          <P>
            For investors new to international trading, H-shares provide direct
            exposure to China’s economy but require familiarity with currency
            conversion and HKEX-specific trading procedures and rules.
          </P>
        </Section>
        <Section ariaLabelledby="similarities">
          <H2 id="similarities">Key similarities between ADRs and H-shares</H2>
          <P>
            ADRs and H-shares both enable investment in global markets, but
            their similarities extend beyond international accessibility. Below
            are two critical similarities that directly impact your portfolio
            decisions.
          </P>
          <H3>Exposure to restricted markets with fewer barriers</H3>
          <P>
            Both ADRs and H-shares provide access to companies operating in
            markets with strict foreign ownership rules, notably mainland China.
            Firms like Alibaba or ICBC exemplify businesses that would otherwise
            be challenging to access directly due to China’s tight restrictions
            on foreign investment in its domestic A-share market.
          </P>
          <P>
            ADRs, through U.S. banks, and H-shares, via Hong Kong listings,
            effectively bypass these barriers. This allows investors to
            participate in China’s economic growth without navigating the
            complex regulatory environment or the need to open a mainland
            brokerage account. Consequently, these instruments reduce friction
            and simplify the process, enabling you to capitalize on
            opportunities in restrictive markets.
          </P>
          <H3>Simplified currency handling</H3>
          <P>
            Both ADRs and H-shares streamline currency management for
            international investing. ADRs trade directly in U.S. dollars on
            American exchanges, with the issuing banks managing currency
            conversion from the underlying shares denominated in foreign
            currencies like Chinese yuan.
          </P>
          <P>
            Similarly, H-shares are traded in Hong Kong dollars, separate from
            the Chinese yuan, insulating investors from China’s domestic
            currency restrictions. Additionally, since the Hong Kong dollar is
            pegged to the U.S. dollar, currency fluctuations remain relatively
            predictable, mitigating the risks typically associated with foreign
            exchange. This simplification allows investors to concentrate on
            evaluating corporate performance rather than worrying about currency
            volatility.
          </P>
        </Section>
        <Section ariaLabelledby="differences">
          <H2 id="differences">Key differences between ADRs and H-shares</H2>
          <P>
            Although ADRs and H-shares both offer investors opportunities to
            access foreign stocks, understanding their key differences can
            significantly affect your investment decisions. Below are five
            essential distinctions investors should consider carefully:
          </P>
          <H3>Trading venue and ownership structure</H3>
          <P>
            ADRs represent an indirect form of ownership: a U.S. bank holds the
            underlying shares of a foreign company (such as Alibaba), and
            investors trade certificates linked to these shares on American
            exchanges (NYSE or Nasdaq). You don’t own the actual shares directly
            but rather the ADR certificates, traded in U.S. dollars under U.S.
            regulatory frameworks.
          </P>
          <P>
            In contrast, H-shares are actual shares of mainland Chinese
            companies listed and traded directly on the Hong Kong Stock Exchange
            (HKEX). Investors who purchase H-shares directly own the company’s
            stock and must navigate HKEX trading hours, rules, and market
            conditions.
          </P>
          <H3>Availability across markets</H3>
          <P>
            Not all Chinese companies provide both ADR and H-share options,
            limiting investor choices. While prominent firms like Alibaba offer
            both ADRs and H-shares, many others—particularly state-owned
            enterprises such as China National Offshore Oil Corporation
            (CNOOC)—are exclusively available as H-shares. Thus, your investment
            strategy may be shaped by the availability of shares across these
            two channels. If a company isn’t available as an ADR, investors must
            either participate directly through HKEX or exclude it from their
            portfolio entirely.
          </P>
          <H3>Minimum purchase requirements</H3>
          <P>
            The barrier to entry differs significantly between ADRs and
            H-shares. ADRs typically have no minimum investment beyond one
            share, and flexible ADR ratios (e.g., one ADR representing two
            underlying shares) often reduce the individual share price, making
            them accessible to smaller investors.
          </P>
          <P>
            Conversely, H-shares adhere to HKEX trading standards, generally
            requiring purchases in minimum lot sizes (often ranging from 100
            shares per lot). This structure results in higher entry costs and
            potentially limits smaller or incremental investments compared to
            ADRs. For example, purchasing H-shares of larger companies may
            involve significant initial capital outlay, influencing investors
            with smaller budgets.
          </P>
          <H3>Trading hours and calendars</H3>
          <P>
            Trading hours differ significantly due to geographical locations.
            ADRs follow standard U.S. market hours (9:30 AM to 4:00 PM Eastern
            Time) and observe U.S. holidays, such as Thanksgiving or
            Independence Day.
          </P>
          <P>
            H-shares trade according to Hong Kong Stock Exchange (HKEX) hours:
            typically 9:30 AM–12:00 PM and 1:00 PM–4:00 PM Hong Kong time.
            Investors trading H-shares must account for time-zone differences
            and Hong Kong holidays, potentially complicating short-term trading.
            However, for long-term investors, these timing issues are manageable
            through the use of pre-set orders.
          </P>
          <H3>Cost considerations</H3>
          <P>
            The cost structures differ significantly between ADRs and H-shares,
            impacting your net returns in distinct ways:
          </P>
          <P>
            ADRs incur depositary fees (usually around $0.01–$0.03 per share
            annually) payable to the issuing bank, U.S. capital gains taxes on
            profits, and dividends subject to withholding taxes, depending on
            U.S. treaties with the company’s home country. These fees are often
            embedded into the share price or handled transparently through
            brokers.
          </P>
          <P>
            H-shares typically do not include depositary fees, but investors
            directly pay trading fees levied by HKEX (ranging from approximately
            0.005%–0.1% per trade). Additionally, investors must consider the
            cost of currency conversion from their local currency into Hong Kong
            dollars. Capital gains taxes in Hong Kong are generally not
            applicable, but dividends from H-shares may be subject to
            withholding taxes determined by Mainland Chinese regulations.
          </P>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">Frequently asked questions</H2>
          <H3>
            Can I trade both ADRs and H-shares in my U.S. brokerage account?
          </H3>
          <P>
            You can trade both ADRs and H-shares, but the ease of doing so
            depends on your brokerage. ADRs are straightforward because they
            trade on U.S. exchanges like the NYSE and Nasdaq, and virtually all
            U.S. brokerage platforms support them. Trading H-shares, however,
            requires a broker that provides international access to the Hong
            Kong Stock Exchange (HKEX). Platforms such as Interactive Brokers or
            Fidelity’s global trading service commonly offer this capability,
            but you might need to specifically enable HKEX trading or open a
            dedicated international trading account.
          </P>
          <H3>Are ADRs riskier than H-shares, or vice versa?</H3>
          <P>
            Neither ADRs nor H-shares are inherently riskier than the other, but
            each comes with unique considerations. ADRs include minor risks such
            as relying on a U.S. depositary bank as a middleman—though bank
            failure or significant issues are rare—and the embedded currency
            conversions. H-shares involve direct exposure to Hong Kong’s market
            dynamics, including HKEX-specific volatility and direct fluctuations
            in the Hong Kong dollar (despite its peg to the USD, minor
            fluctuations can still occur).
          </P>
          <P>
            Both ADRs and H-shares share common underlying risks related to the
            specific company, industry, and the Chinese regulatory environment.
            Ultimately, ADRs might feel safer due to familiar U.S. regulatory
            oversight, whereas H-shares provide more direct and transparent
            market exposure without the intermediary layer.
          </P>
          <H3>Why would a company only offer H-shares and not ADRs?</H3>
          <P>
            Companies may choose to offer only H-shares and not ADRs primarily
            due to cost considerations and regulatory complexities. Listing as
            an ADR involves extensive U.S. Securities and Exchange Commission
            (SEC) disclosure requirements, higher compliance fees, and
            additional administrative overhead.Some Chinese firms—especially
            state-owned enterprises like China National Offshore Oil Corporation
            (CNOOC)—may find the costs outweigh the potential benefits,
            particularly if they anticipate limited U.S. investor demand.
          </P>
          <P>
            On the other hand, H-shares are typically simpler and more
            cost-effective, with Hong Kong’s regulatory framework being both
            robust and comparatively more flexible. The geographic proximity of
            Hong Kong to mainland China also makes HKEX listings a natural fit
            for attracting both Asian and international investors without the
            extra costs and complexity associated with ADRs.
          </P>
          <H3>
            How do taxes work if I’m a U.S. investor holding ADRs and H-shares?
          </H3>
          <P>
            As a U.S. investor, taxes differ slightly for ADRs and H-shares,
            though both are subject to similar dividend withholding taxes by
            China. ADRs held in the U.S. incur standard U.S. capital gains
            taxes—ranging from 0% to 20% for long-term gains and 10% to 37% for
            short-term gains—and are also subject to a 10% Chinese withholding
            tax on dividends. U.S. investors can typically offset this foreign
            withholding through IRS Form 1116 as a foreign tax credit.
          </P>
          <P>
            For H-shares, while Hong Kong does not levy capital gains taxes on
            investments, mainland China still withholds 10% of dividends. Any
            capital gains realized from H-share sales must be reported as
            foreign income to the IRS and will be taxed according to standard
            U.S. capital gains rules. Thus, while both ADRs and H-shares incur a
            similar 10% dividend withholding, H-shares involve different
            reporting requirements and tax filings. Consulting a tax
            professional is advisable for optimizing your overall tax efficiency
            and compliance.
          </P>
          <H3>Which is cheaper to trade in the long run—ADRs or H-shares?</H3>
          <P>
            The cost-effectiveness of ADRs versus H-shares depends significantly
            on your trading frequency and brokerage fees. ADRs typically carry
            depositary fees (around $0.01–$0.03 per share annually), which can
            gradually reduce returns, although standard U.S. brokerage
            commissions are generally low. H-shares avoid depositary fees
            entirely but incur HKEX trading fees (approximately 0.005%–0.1% per
            transaction) and foreign exchange fees for converting USD into Hong
            Kong dollars. If you trade infrequently and maintain positions over
            longer periods, the impact of these fees is less pronounced for
            H-shares. Ultimately, you’ll need to consider your broker’s specific
            fee structures and your personal trading frequency to determine
            which is more economical.
          </P>
          <H3>
            Which is better for small investors starting out—ADRs or H-shares?
          </H3>
          <P>
            ADRs are generally better suited for small investors or those just
            beginning international investing. They allow investors to buy even
            a single share at a time without minimum purchase requirements,
            trading in U.S. dollars on familiar U.S. exchanges. This eliminates
            the upfront barrier associated with HKEX, which often mandates
            minimum lot sizes (commonly 100 shares), leading to a more
            substantial initial investment. For example, purchasing 100 H-shares
            priced at around $50 HKD (~$6.40 USD per share) would require about
            $640 USD. In contrast, ADRs let investors build positions gradually,
            making them an accessible entry point. Investors can later expand
            into H-shares as they gain experience and capital.
          </P>
        </Section>
      </Article>
    </main>
  );
}
