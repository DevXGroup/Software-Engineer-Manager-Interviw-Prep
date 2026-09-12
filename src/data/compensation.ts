/**
 * Engineering manager compensation, by company and level.
 *
 * Every number below was read off a public page on the date in `checkedOn`.
 * levels.fyi publishes a single median per level rather than a band, so `base`
 * and `total` say "median" when that is what the source gave. A *median* is the
 * middle reported package: half the reports sit above it, half below.
 *
 * Nothing here is an offer. Treat it as the opening position for a conversation.
 */

export interface CompBand {
  level: string
  title: string
  base: string
  total: string
  basis: 'US' | 'Bay Area'
  source: string
  checkedOn: string
  verified: boolean
  note?: string
}

export interface CompanyComp {
  slug: 'meta' | 'amazon' | 'apple' | 'netflix' | 'google' | 'microsoft'
  ladder: string
  equityNote: string
  negotiationNote: string
  bands: CompBand[]
}

export const compensationCheckedOn = '2026-09-12'

const CHECKED = '2026-09-12'

const META_SRC = 'https://www.levels.fyi/companies/meta/salaries/software-engineering-manager'
const AMAZON_SRC = 'https://www.levels.fyi/companies/amazon/salaries/software-engineering-manager'
const APPLE_SRC = 'https://www.levels.fyi/companies/apple/salaries/software-engineering-manager'
const NETFLIX_SRC = 'https://www.levels.fyi/companies/netflix/salaries/software-engineering-manager'
const GOOGLE_SRC = 'https://www.levels.fyi/companies/google/salaries/software-engineering-manager'
const MICROSOFT_SRC = 'https://www.levels.fyi/companies/microsoft/salaries/software-engineering-manager'

export const compensation: Record<CompanyComp['slug'], CompanyComp> = {
  meta: {
    slug: 'meta',
    ladder:
      'Meta runs a separate manager ladder, so there is no "EM E5". The rungs are M0, then M1, M2, and D1 for director. Each one is paid like its peer on the engineer ladder: M1 sits with E6, M2 with E7, D1 with E8.',
    equityNote:
      'Equity is RSUs, restricted stock units, meaning company shares handed to you over time and worth whatever the stock is worth the day they land. Meta vests them over four years: 25 percent in year one, paid quarterly in 6.25 percent slices, then evenly across years two to four. The grant is agreed in dollars and converted to shares at the grant-date price, so what you collect moves with the share price.',
    negotiationNote:
      'Commonly reported as negotiable: the level itself, which is the biggest single lever between M1 and M2, then the equity grant and the sign-on bonus, which is often used to cover unvested stock you leave behind. Base salary is commonly reported as the hardest piece to move, because it sits in a band tied to the level.',
    bands: [
      {
        level: 'M0',
        title: 'Engineering manager, first manager rung',
        base: 'median $246K',
        total: 'median $533K',
        basis: 'US',
        source: META_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $255K a year.',
      },
      {
        level: 'M1',
        title: 'Engineering manager, paid as an E6 peer',
        base: 'median $278K',
        total: 'median $711K',
        basis: 'US',
        source: META_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $386K a year.',
      },
      {
        level: 'M2',
        title: 'Senior engineering manager, paid as an E7 peer',
        base: 'median $316K',
        total: 'median $1.11M',
        basis: 'US',
        source: META_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $718K a year.',
      },
      {
        level: 'D1',
        title: 'Director of engineering, paid as an E8 peer',
        base: 'median $303K',
        total: 'median $1.43M',
        basis: 'US',
        source: META_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Base sits below M2 in the reported sample while stock jumps to about $1.07M a year, which is what pushes the total up.',
      },
    ],
  },

  amazon: {
    slug: 'amazon',
    ladder:
      'Amazon managers are SDMs, software development managers, on the same numeric ladder as engineers. The level names and the pay figures below come from the levels.fyi page cited under each row, which is public salary data. L6 is an SDM, L7 a senior SDM, L8 a director, and an L5 manager rung exists.',
    equityNote:
      'Equity is RSUs, restricted stock units, meaning company shares handed to you over time. The vesting is back-loaded, which means most of the value arrives in the later years, so leaving early costs you most of the grant. Amazon does not publish the year-by-year split and neither will we: read your own offer letter, which states the exact schedule and cliff you are being offered.',
    negotiationNote:
      'Commonly reported as negotiable: the two-year sign-on bonus and the stock grant. Base salary runs into a company-wide cap that most reports put near $350K to $360K, so above that the money moves into equity.',
    bands: [
      {
        level: 'L6',
        title: 'Software development manager',
        base: 'median $241K',
        total: 'median $449K',
        basis: 'US',
        source: AMAZON_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $208K a year.',
      },
      {
        level: 'L7',
        title: 'Senior software development manager',
        base: 'median $278K',
        total: 'median $618K',
        basis: 'US',
        source: AMAZON_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $330K a year.',
      },
      {
        level: 'L8',
        title: 'Director of engineering',
        base: 'median $307K',
        total: 'median $1.27M',
        basis: 'US',
        source: AMAZON_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $959K a year, which is where nearly all of the increase sits.',
      },
      {
        level: 'L5',
        title: 'Software development manager, entry manager rung',
        base: 'median $191K',
        total: 'median $312K',
        basis: 'US',
        source: AMAZON_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Listed for completeness. Most external manager hiring starts at L6.',
      },
    ],
  },

  apple: {
    slug: 'apple',
    ladder:
      'Apple managers sit on M1, M2 and M3, then D1 and D2 for director. ICT4 through ICT6 are the individual contributor codes, so an "ICT5 EM" is a mismatch: ICT is the engineer ladder, M is the manager ladder.',
    equityNote:
      'Equity is RSUs over four years, 25 percent in year one and the rest across years two to four, usually paid in April and October. Apple also runs a stock purchase plan that lets you buy shares at a discount through payroll, and unlike Meta or Google it publishes no standard refresh cycle, so annual top-up grants vary a lot by org and performance.',
    negotiationNote:
      'Commonly reported as negotiable: the equity grant and the sign-on bonus, with the level being the real lever between M1 and M2. Apple is commonly reported as running narrow base bands per level and moving less on salary than Meta or Google.',
    bands: [
      {
        level: 'M1',
        title: 'Manager',
        base: 'median $217K',
        total: 'median $400K',
        basis: 'US',
        source: APPLE_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $154K a year.',
      },
      {
        level: 'M2',
        title: 'Manager 2',
        base: 'median $268K',
        total: 'median $546K',
        basis: 'US',
        source: APPLE_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $231K a year.',
      },
      {
        level: 'M3',
        title: 'Senior manager',
        base: 'median $310K',
        total: 'median $789K',
        basis: 'US',
        source: APPLE_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $408K a year.',
      },
      {
        level: 'D1',
        title: 'Director',
        base: 'median $361K',
        total: 'median $1.45M',
        basis: 'US',
        source: APPLE_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $913K a year. D2, senior director, sits above this and is not published as a separate median.',
      },
    ],
  },

  netflix: {
    slug: 'netflix',
    ladder:
      'Netflix publishes no numeric levels. Manager roles are titled Manager, Senior Manager, Director and Senior Director, and pay is set per person against the market rather than by a level band, so two managers on the same team can be far apart.',
    equityNote:
      "There are no RSUs. Netflix pays one number, almost all of it salary, and once a year you elect what share of it to take as stock options instead of cash. An *option* is the right to buy a share at a fixed price, so it only pays if the stock rises above that price. The options are granted monthly at that month's price, vest immediately and last ten years. Saying Netflix has no equity is wrong: it has optional equity that you fund out of your own cash pay.",
    negotiationNote:
      'Commonly reported as negotiable: the single salary number, since there is no equity or bonus to hide a gap in and no band to point at. Netflix is commonly reported as asking for your number first and paying top of market rather than haggling in rounds.',
    bands: [
      {
        level: 'Manager',
        title: 'Engineering manager',
        base: 'median $678K',
        total: 'median $678K',
        basis: 'US',
        source: NETFLIX_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Reported stock and bonus are both zero, so base and total match. The reported sample is small, so the median moves more than at the other five.',
      },
      {
        level: 'Senior Manager',
        title: 'Senior engineering manager',
        base: 'median $788K',
        total: 'median $788K',
        basis: 'US',
        source: NETFLIX_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'All cash before any option election.',
      },
      {
        level: 'Director',
        title: 'Director of engineering',
        base: 'median $1.21M',
        total: 'median $1.21M',
        basis: 'US',
        source: NETFLIX_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'All cash before any option election.',
      },
      {
        level: 'Senior Director',
        title: 'Senior director of engineering',
        base: 'not published',
        total: 'above the director median, figure not published',
        basis: 'US',
        source: NETFLIX_SRC,
        checkedOn: CHECKED,
        verified: false,
        note: 'The level exists on the page but has no reported median, so no number is given here.',
      },
    ],
  },

  google: {
    slug: 'google',
    ladder:
      'Google managers share the numeric engineer ladder. L6 is an engineering manager, L7 a senior manager, L8 a director. L5 manager exists and is the entry manager rung.',
    equityNote:
      'Equity is GSUs, Google stock units, which are RSUs under a Google name. They vest over four years, monthly or quarterly depending on grant size, and most reports describe a front-loaded schedule of roughly 33 percent, 33 percent, 22 percent, 12 percent for newer grants. Google refreshes grants every year, so the running total after a few years is usually larger than the offer letter suggests.',
    negotiationNote:
      'Commonly reported as negotiable: the equity grant and the level, set by a hiring committee rather than the hiring manager. Base is commonly reported as band-bound, and a competing offer is commonly reported as the thing that actually moves the number.',
    bands: [
      {
        level: 'L6',
        title: 'Engineering manager',
        base: 'median $271K',
        total: 'median $732K',
        basis: 'US',
        source: GOOGLE_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $408K a year.',
      },
      {
        level: 'L7',
        title: 'Senior engineering manager',
        base: 'median $326K',
        total: 'median $920K',
        basis: 'US',
        source: GOOGLE_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $501K a year.',
      },
      {
        level: 'L8',
        title: 'Director of engineering',
        base: 'median $374K',
        total: 'median $1.38M',
        basis: 'US',
        source: GOOGLE_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $875K a year.',
      },
      {
        level: 'L5',
        title: 'Engineering manager, entry manager rung',
        base: 'median $234K',
        total: 'median $416K',
        basis: 'US',
        source: GOOGLE_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Listed for completeness. External manager hiring usually targets L6.',
      },
    ],
  },

  microsoft: {
    slug: 'microsoft',
    ladder:
      'Microsoft uses numeric levels shared between engineers and managers, not M1 or M2 codes. A software engineering manager normally sits at 63 to 65, a principal manager at 65 to 67, and 67 and above carries director and partner titles.',
    equityNote:
      'Equity is RSUs, usually over four years at 25 percent a year, sometimes five years at 20 percent. Two pieces matter beyond the initial grant: an annual stock award that varies with performance, and a cash bonus of roughly 10 to 30 percent of base depending on level, both decided in the August review. Microsoft equity is a smaller share of total pay than at Meta or Google, so base salary carries more of the package.',
    negotiationNote:
      'Commonly reported as negotiable: the sign-on bonus and the initial stock grant, and the level when the gap between 64 and 65 is in play. That step is commonly reported as the hardest internal promotion, which is why arriving at 65 is worth more than a salary win.',
    bands: [
      {
        level: '64',
        title: 'Software engineering manager, reported as senior manager',
        base: 'median $206K',
        total: 'median $285K',
        basis: 'US',
        source: MICROSOFT_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $45.6K a year, a much smaller share of the package than at Meta or Google.',
      },
      {
        level: '66',
        title: 'Principal engineering manager',
        base: 'median $244K',
        total: 'median $407K',
        basis: 'US',
        source: MICROSOFT_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $114K a year.',
      },
      {
        level: '67',
        title: 'Senior director of engineering',
        base: 'median $254K',
        total: 'median $539K',
        basis: 'US',
        source: MICROSOFT_SRC,
        checkedOn: CHECKED,
        verified: true,
        note: 'Stock reported at about $209K a year.',
      },
      {
        level: '63 and 65',
        title: 'Engineering manager and principal manager',
        base: 'between the 64 and 66 medians, no separate figure published',
        total: 'between the 64 and 66 medians, no separate figure published',
        basis: 'US',
        source: MICROSOFT_SRC,
        checkedOn: CHECKED,
        verified: false,
        note: 'The manager page publishes no median for 63 or 65, so these are bracketed by the levels above and below rather than given a number.',
      },
      {
        level: '68 and above',
        title: 'Partner and director titles',
        base: 'not published for managers',
        total: 'reported up to about $1.42M at VP level',
        basis: 'US',
        source: MICROSOFT_SRC,
        checkedOn: CHECKED,
        verified: false,
        note: 'The page states a top of about $1.42M a year for VP without breaking out 68 or 69, so only that ceiling is quoted.',
      },
    ],
  },
}
