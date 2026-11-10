# Sources

## How the weekly run reaches them (and what it can't reach)

The cloud environment's network blocks direct page fetches of these sites (proxy 403 / WebFetch "host not allowed").
The run therefore uses **WebSearch**, which returns search-index snapshots of listing pages: address, rent, size and dates.
That data can be days to weeks old, so every listing in a report is marked **"verify it is still active"**.

| Source | What it is | Reachable automatically? |
|---|---|---|
| **Qasa** (qasa.com / qasa.se) | Largest sublet and first-hand marketplace; secure payment. **Blocket Bostad listings are mostly Qasa listings.** | Yes, via WebSearch `allowed_domains: ["qasa.com","qasa.se"]`. The best automated source. |
| **Samtrygg** (samtrygg.se) | Secure sublet platform (insured, contract included). | Yes, via WebSearch `allowed_domains: ["samtrygg.se"]`. |
| **Bofrid** (bofrid.se) | Listing aggregator. | Yes, WebSearch. Dates are often missing, so verify. |
| **BostadsPortal** (bostadsportal.se) | Aggregator; contacting landlords needs a paid subscription. | Yes, WebSearch. Treat with caution. |
| **Hyresbostad / Hyrenbostad / BostadsZonen / Boio / Bostaddirekt** | Aggregators and smaller sites. | Yes, WebSearch. Often stale. |
| **KI staff portal: "Housing for rent"** (staff.ki.se) | Private ads aimed at KI staff and researchers, often near campus. | Yes, WebSearch `allowed_domains: ["staff.ki.se","ki.se"]`. |
| **KI Housing / KI Residence Solna** (ki.se/en/about-ki/ki-housing) | KI's own rooms and studios on the Solna campus (rooms from ~6,679 SEK, studios from ~9,075 SEK). Only for eligible KI students, researchers or guests. | Info only; apply directly. |
| **HomeQ** (homeq.se) | First-hand rentals without a queue; needs a profile and an income check. | Rarely indexed. Set up a profile manually. |
| **Bostadsförmedlingen Stockholm** (bostad.stockholm.se) | The city queue. Average wait is years, but short-term contracts (korttidskontrakt) and "Bostadssnabben" exist. | Manual. |
| **SSSB** (sssb.se) | Student housing for students at Stockholm universities. Queue. | Manual. |
| **Akademisk kvart** | Marketplace aimed at academics and visiting researchers. | Try WebSearch; otherwise manual. |
| **Blocket Bostad** (blocket.se) | Big classifieds site. | **No**: Blocket blocks automated search. Its rental listings mostly come from Qasa, so the Qasa coverage overlaps. Check Blocket manually. |
| **Facebook groups and Marketplace** | Many private sublets are posted here first. | **No**: groups require login. The run tries public posts via WebSearch, but expect few results. See `manual-checklist.md`. |

## Weekly query plan

Run these as WebSearch queries (mode `standard`; switch to `extended` if a query comes back thin).
Replace `{MONTH}` with "januari 2027". As the date nears, also try "december 2026" and "omgående".

### Qasa (`allowed_domains: ["qasa.com","qasa.se"]`)
1. `qasa Solna lägenhet 1 rum {MONTH} hyra`
2. `qasa Solna rum i lägenhet {MONTH}`
3. `qasa Vasastan Hagastaden Odenplan lägenhet {MONTH}`
4. `qasa Sundbyberg lägenhet {MONTH}`
5. `qasa Sollentuna Upplands Väsby lägenhet {MONTH}`
6. `qasa Kungsholmen Norrmalm lägenhet {MONTH}`
7. `qasa Knivsta lägenhet {MONTH}`

### Samtrygg (`allowed_domains: ["samtrygg.se"]`)
8. `Samtrygg Solna Sundbyberg 1rok 2rok {MONTH}`
9. `Samtrygg Stockholm Vasastan Kungsholmen Sollentuna {MONTH}`

### Aggregators (`allowed_domains: ["bofrid.se","bostadsportal.se","hyresbostad.se","bostadszonen.se","boio.se","hyrenbostad.se","en.hyrenbostad.se","bostaddirekt.com"]`)
10. `lägenhet uthyres Solna tillträde {MONTH}`
11. `lägenhet uthyres Sundbyberg Sollentuna tillträde {MONTH}`
12. `lägenhet uthyres Vasastan Kungsholmen {MONTH}`

### KI (`allowed_domains: ["staff.ki.se","ki.se"]`)
13. `KI housing for rent apartment room January 2027`

### Facebook / open web (no domain filter, or `allowed_domains: ["facebook.com"]`)
14. `lägenhet uthyres Solna {MONTH} facebook`
15. `andrahand lägenhet Stockholm {MONTH} uthyres Solna OR Vasastan OR Sundbyberg`
16. `apartment for rent Solna Stockholm January 2027 sublet`

Ignore `paste.rs` / `paste.ofcode.org` pages and similar text dumps: they are spam.
