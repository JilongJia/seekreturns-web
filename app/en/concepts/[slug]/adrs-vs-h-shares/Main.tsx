import { Article } from "@/components/en/ui/Article";
import { H1 } from "@/components/en/ui/H1";
import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { Header } from "@/components/en/ui/Header";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Ul } from "@/components/en/ui/Ul";

import type { MainProps } from "@/components/en/ui/Main";

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
            brokerage account.
          </P>
          <P>
            Consequently, these instruments reduce friction and simplify the
            process, enabling you to capitalize on opportunities in restrictive
            markets.
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
            exchange.
          </P>
          <P>
            This simplification allows investors to concentrate on evaluating
            corporate performance rather than worrying about currency
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
            (CNOOC)—are exclusively available as H-shares.
          </P>
          <P>
            Thus, your investment strategy may be shaped by the availability of
            shares across these two channels. If a company isn’t available as an
            ADR, investors must either participate directly through HKEX or
            exclude it from their portfolio entirely.
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
            The cost structures of ADRs and H-shares have notable differences,
            which can affect your net returns depending on how you trade and
            hold your investments.
          </P>
          <P>
            ADRs come with depositary fees, typically $0.01–$0.03 per share
            annually, which are payable to the issuing bank. These fees may be
            embedded in the share price or deducted through brokers.
            Additionally, dividends from Chinese ADRs are subject to a 10%
            withholding tax imposed by Chinese tax authorities before
            distribution, meaning investors receive their dividends net of this
            amount.
          </P>
          <P>
            H-shares, in contrast, do not incur depositary fees, but investors
            must account for trading fees levied by HKEX (approximately
            0.005%–0.1% per transaction) as well as currency conversion costs
            when exchanging their local currency into Hong Kong dollars. Like
            ADRs, H-share dividends are also subject to the same 10% withholding
            tax under Mainland Chinese tax regulations.
          </P>
          <P>
            While ADRs may have small ongoing depositary fees, H-shares involve
            one-time trading and currency conversion costs. The most
            cost-effective choice depends on your broker’s fee structure and
            your trading frequency.
          </P>
        </Section>
        <Section ariaLabelledby="frequently-asked-questions">
          <H2 id="frequently-asked-questions">Frequently asked questions</H2>
          <H3>
            Can I trade both ADRs and H-shares in my U.S. brokerage account?
          </H3>
          <P>
            Yes, you can trade both ADRs and H-shares, but the ease of doing so
            depends on your brokerage.
          </P>
          <P>
            ADRs are straightforward since they trade on U.S. exchanges like the
            NYSE and Nasdaq. Virtually all U.S. brokerage platforms support
            them.
          </P>
          <P>
            H-shares require a broker that provides international access to the
            Hong Kong Stock Exchange (HKEX). Platforms such as Interactive
            Brokers or Fidelity’s global trading service commonly offer this
            capability, but you may need to enable HKEX trading or open a
            dedicated international trading account.
          </P>
          <H3>Are ADRs riskier than H-shares, or vice versa?</H3>
          <P>
            Neither ADRs nor H-shares are inherently riskier than the other, but
            each has unique considerations:
          </P>
          <P>
            ADRs involve minor risks, such as reliance on a U.S. depositary bank
            as a middleman. While bank failures are rare, this extra layer adds
            some complexity. Additionally, currency conversions are handled
            within the ADR structure, which could introduce small
            inefficiencies.
          </P>
          <P>
            H-shares expose investors directly to Hong Kong’s market dynamics,
            including HKEX-specific volatility and fluctuations in the Hong Kong
            dollar (which is pegged to the USD but can still experience slight
            variations).
          </P>
          <P>
            Both ADRs and H-shares share common risks related to the company,
            industry, and Chinese regulatory environment. ADRs may feel safer
            due to U.S. regulatory oversight, whereas H-shares provide more
            direct and transparent market exposure without an intermediary.
          </P>
          <H3>Why would a company only offer H-shares and not ADRs?</H3>
          <P>
            Companies may choose to offer only H-shares and not ADRs primarily
            due to cost considerations and regulatory complexities:
          </P>
          <P>
            Listing as an ADR involves extensive U.S. Securities and Exchange
            Commission (SEC) disclosure requirements, higher compliance fees,
            and additional administrative overhead. Some Chinese
            firms—especially state-owned enterprises like China National
            Offshore Oil Corporation (CNOOC)—may find the costs outweigh the
            potential benefits, particularly if they anticipate limited U.S.
            investor demand.
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
            When holding ADRs, investors are subject to U.S. capital gains
            taxes—ranging from 0% to 20% for long-term gains and 10% to 37% for
            short-term gains. Additionally, dividends received from ADRs are
            subject to a 10% withholding tax imposed by China. However, U.S.
            investors can typically claim this withholding as a foreign tax
            credit by filing IRS Form 1116, helping to offset their overall U.S.
            tax liability.
          </P>
          <P>
            For H-shares, Hong Kong does not impose capital gains taxes, but
            China still withholds 10% on dividends before distribution. While
            capital gains from selling H-shares are not taxed in Hong Kong, they
            must still be reported as foreign income to the IRS and are taxed
            according to standard U.S. capital gains rules. Like ADRs, the 10%
            withholding tax on H-share dividends may also qualify for a foreign
            tax credit, depending on the investor’s tax situation.
          </P>
          <P>
            While both ADRs and H-shares have similar tax implications on
            dividends, H-shares require additional foreign income reporting,
            particularly for capital gains. To ensure compliance and optimize
            tax efficiency, consulting a tax professional is highly recommended.
          </P>
          <H3>Which is cheaper to trade in the long run—ADRs or H-shares?</H3>
          <P>
            The cost-effectiveness of ADRs versus H-shares largely depends on
            how frequently you trade and the fee structure of your brokerage.
          </P>
          <P>
            For investors who trade frequently, ADRs are often the more
            economical choice. U.S. brokerage commissions are typically low, and
            while ADRs come with depositary fees—usually ranging from $0.01 to
            $0.03 per share annually—these fees are relatively minor compared to
            the potential costs of foreign exchange. Since ADRs trade directly
            on U.S. exchanges in USD, investors avoid the additional expenses
            associated with converting currency, making them a more convenient
            and cost-effective option for those who actively buy and sell.
          </P>
          <P>
            On the other hand, for long-term investors, H-shares can be more
            cost-efficient due to the absence of depositary fees. Although HKEX
            trading fees (typically 0.005% to 0.1% per transaction) and currency
            conversion costs apply when buying or selling, these are one-time
            expenses rather than ongoing charges. As a result, H-shares may be
            the better choice for those who intend to hold their investments for
            an extended period rather than trade frequently.
          </P>
          <H3>
            Which is better for small investors starting out—ADRs or H-shares?
          </H3>
          <P>
            ADRs are generally better suited for small investors or beginners in
            international investing.
          </P>
          <Ul>
            <Ul.Li>
              They allow purchasing even a single share, without minimum lot
              requirements. In contrast, H-shares often require minimum lot
              sizes (commonly 100 shares), leading to higher upfront investment
              costs. For example, buying 100 H-shares at $50 HKD (~$6.40 USD per
              share) would require around $640 USD. In comparison, ADRs allow
              gradual position building, making them a more accessible entry
              point for new investors.
            </Ul.Li>
            <Ul.Li>
              They trade in U.S. dollars on familiar U.S. exchanges, eliminating
              currency conversion complexities.
            </Ul.Li>
          </Ul>
          <P>
            Investors can expand into H-shares later as they gain experience and
            capital.
          </P>
        </Section>
      </Article>
    </main>
  );
}
