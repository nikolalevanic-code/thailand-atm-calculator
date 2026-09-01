# Traffic → Monetisation Roadmap (v2)

## 1. Current live SERP titles

| Page | Title in the code today |
| --- | --- |
| `/` | Stop Paying Insane Hidden Fees at Thai ATMs — See the Real Cost |
| `/blog` | Don't Let Thai ATMs Rob You: 2026 Fee Guides & Money Hacks |
| `/blog/thailand-atm-fees` | The 3 Hidden Fees Thai ATMs Charge Foreigners (And How to Beat Them) |
| `/blog/thailand-atm-withdrawal-limit` | Why Small Withdrawals in Thailand Are Costing You a Fortune |
| `/blog/thailand-atm-no-fee` | How to Withdraw Cash in Thailand Without Getting Ripped Off |
| `/blog/best-atm-thailand-foreigners` | The Best ATMs in Thailand for Foreign Cards (Avoid the Tourist Traps) |
| `/blog/wise-revolut-thailand` | Wise vs Revolut in Thailand: Which One Actually Saves You Money? |
| `/blog/how-much-cash-thailand` | How Much Cash You Actually Need in Thailand (Don't Over-Withdraw) |

These are the emotionally-driven set we shipped. Google may still display older cached titles or rewrite them for some queries; that settles over a few weeks.

## 2. AEON — drop the dedicated page, keep the answer

Semrush (US) puts "aeon atm thailand" at only ~20 searches/month, so a dedicated page was never going to be a traffic driver even before AEON withdrew. Better play: turn it into a credibility signal.

- Add an "AEON ATMs in Thailand: what happened" section inside `/blog/best-atm-thailand-foreigners` (our top-performing article) rather than a new page.
- Be explicit that AEON no longer operates the fee-free ATM network foreigners used to seek out, and redirect the reader to what actually works now.
- This captures the residual "aeon atm thailand" searches, satisfies the intent instead of frustrating it, and signals freshness to Google — outdated advice is everywhere on this topic, so being the page that says "this changed" is a real differentiator.

Before writing it I need one thing from you: your source and rough date for AEON pulling out, so the claim is verifiable rather than asserted.

## 3. The "foreigner ATM" cluster is genuinely worth chasing

Fee-related keywords are low-volume individually (10–170/mo each), which matches your ~0.34% CTR at position 6.7 — we rank, but the pool is small. The volume sits one step out from where we are:

| Keyword | Volume | Difficulty | Note |
| --- | --- | --- | --- |
| thb to usd | 90,500/mo | 52 | Converter intent — huge |
| thb to gbp (UK) | 22,200/mo | 35 | Very winnable |
| thai baht exchange rate | 1,600/mo | 72 | Hard, but the cluster hub |
| superrich thailand | 590/mo | 60 | Money-changer brand demand |
| currency exchange bangkok | 170/mo (US) / 90/mo (UK) | 54 / 41 | Direct money-changer intent |
| how much cash to bring to thailand | 140/mo | 22 | We already have this page |
| best place to exchange money in bangkok | 70/mo | 23 | Easy win, high affiliate fit |
| exchange money in thailand | 70/mo | 0 | Easy win |
| cash or card in thailand (UK) | 90/mo | 19 | $2.41 CPC — commercially valuable |

Source: Semrush, US and UK databases.

The read: **currency conversion is a 100× bigger audience than ATM fees, and it is the same visitor at an earlier moment.** Someone checking "THB to USD" hasn't landed yet. Someone comparing ATM fees is already at the machine. Owning the earlier moment feeds both your ad inventory and your money-changer ambitions.

## 4. Plan

### Phase A — Own the converter query (highest leverage)

Build a **THB currency converter tool** at `/thb-converter` (plus `/thb-to-usd`, `/thb-to-gbp`, `/thb-to-aud`, `/thb-to-eur` as targeted landing pages).

- Reuses the live FX rate server function we already have — no new infrastructure.
- Each page: live rate, a converter input, "what you'd actually receive" after typical ATM vs money-changer vs card margins, and a link into the ATM calculator.
- This is the single biggest traffic unlock available to the site and the natural home for money-changer partners.

### Phase B — Money-changer content cluster

- `/blog/exchange-money-thailand` — money changers vs ATMs vs banks vs airport, with a real rate comparison table.
- `/blog/best-exchange-rate-bangkok` — Super Rich, Vasu, Twelve Victory, airport booths; targets the "superrich thailand" and "currency exchange bangkok" demand.
- `/blog/cash-or-card-thailand` — high CPC, low difficulty, directly answers the pre-trip question.

Each carries a "Rates today" module fed by the FX function, giving people a reason to return.

### Phase C — Freshness and authority

- AEON update inside the best-ATM article (section 2 above).
- "Last verified" dates on every article, refreshed monthly.
- Related-guides links at the bottom of every article; internal links from each new converter page into the calculator.
- Request indexing in Search Console for every new and updated URL.

### Phase D — Monetisation

1. **Money changers / FX partners** — this is what you actually want, and Phase A + B is the inventory that makes you worth partnering with. Approach Bangkok exchange chains and online FX providers once the converter pages have a few weeks of traffic. Pitch: pre-arrival intent traffic, geo-targeted.
2. **Card affiliates** — Wise, Revolut, travel cards. Build a real comparison component (rate, fee, apply link) for the `below-results` and `article-affiliate` slots. Highest revenue per visitor at your current volume.
3. **Display ads** — AdSense or Ezoic in `article-mid` and `home-footer` once traffic supports it. Keep them below the fold on mobile; mobile is 80% of your clicks and its CTR is 13× desktop, so protecting that experience matters more than ad density.
4. **Email capture** — "Get the rate before you fly." Low effort, compounding, and valuable to FX partners.

## 5. Sequencing

```text
Week 1-2   Phase A: converter tool + 4 currency landing pages
Week 2-3   Phase C: AEON update, freshness dates, internal links
Week 3-5   Phase B: three money-changer articles
Week 4-6   Phase D: card affiliate component, then FX partner outreach
Week 6+    Display ads, email capture, iterate on what ranks
```

## 6. What I need from you

- Your source/date for AEON exiting Thailand.
- Whether you want the converter pages built now (my recommendation) or the money-changer articles first.
- Any FX or money-changer contacts you already have, so the content can be built with those partners in mind.

## Immediate next step

On approval I'll start Phase A: the THB converter tool and its four currency landing pages, wired to the existing FX server function and the Midnight Card design.
