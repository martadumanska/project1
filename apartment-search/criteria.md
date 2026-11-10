# Search criteria

The weekly screening reads this file every run. Edit it to change the search,
and the next run follows the new version.

## Hard filters (a listing must pass all of them)

| Filter | Value |
|---|---|
| Location | Stockholm region, within the location tiers below. Anything outside them is dropped. |
| Rent | **≤ 12,000 SEK/month**, counting the platform's tenant fee (Qasa and Samtrygg show prices with the fee included). |
| Move-in | **On or before 31 Jan 2027.** Anything starting later is dropped. |
| Status | Must look active. A listing whose move-in date is already past is dropped unless it says the date is flexible. |
| Not a swap | Drop swap-only listings ("bytesbostad", "byte", "lägenhetsbyte"): they need you to already have a rental to swap. |

## Preferences (used for ranking)

### Move-in date
The current housing presumably ends around 31 Jan, so the ideal is a short overlap of up to three weeks.

| Move-in | Fit |
|---|---|
| 10–31 Jan 2027 | Ideal |
| 1–9 Jan 2027 | Good, but about one extra month of rent. Try to negotiate a mid-January start. |
| December 2026 | Early. Only worth it if the landlord will move the start date. |
| "Immediately" / not stated | Ask the landlord. Low priority. |

### Location tiers
**Priority: living close to central Stockholm and KI Solna.** A short Uppsala commute is a bonus, not the main goal.
The targets are **KI campus Solna** (around Solnavägen and Karolinska University Hospital Solna), **central Stockholm**, and **Uppsala C**.
SL commuter train **line 40** (Uppsala C – Knivsta – Arlanda C – Upplands Väsby – Sollentuna – Solna – Odenplan – City – …) gives the
inner areas a direct train to Uppsala.
The times below are rough estimates. The report gives door-to-door times for top picks only after checking them.

| Tier | Areas | To KI Solna | To Stockholm City | To Uppsala C |
|---|---|---|---|---|
| **A** | Hagastaden. Vasastan. Norrmalm. Kungsholmen. Inner Solna: Hagalund, Arenastaden, Frösunda, Råsunda, Solna centrum, Skytteholm, Solna Business Park, Huvudsta | walk, bike or ≤ 20 min | ≤ 20 min | ~45–60 min, direct on line 40 from Solna or Odenplan |
| **B** | Sundbyberg (incl. Rissne, Ursvik, Hallonbergen), Bergshamra, Ulriksdal, Södermalm, Östermalm, Gärdet, Essingeöarna | ~15–30 min | ≤ 25 min | ~50–70 min |
| **C** | Sollentuna, Helenelund, Häggvik, Bromma, other places ≤ ~45 min to KI Solna | ≤ 45 min | ≤ 35 min | ≤ 75 min |
| **D** | Upplands Väsby, Knivsta, Märsta: close to Uppsala but far from Stockholm. Only listed if the deal is exceptional. | ~25–40 min | ~25–40 min | ~10–30 min |
| Drop | Anything else, such as Södertälje, Tumba, Täby or the far south | | | |

Tickets: SL and UL travel is free for the user, so ticket cost is **not** a factor. Only travel time and closeness to Stockholm count.

### Home type
1. A whole apartment, ideally ≥ 25 m².
2. A studio or small apartment under 25 m².
3. A room in a shared apartment. Fallback only; listed in a separate section of the report.

### Lease and trust
Best is first-hand or an open-ended (tillsvidare) sublet through a platform with secure payment (Qasa, Samtrygg).
Next is a fixed term of 6 months or more. Last is a fixed term under 6 months.

## Scoring (0–100)

| Part | Points |
|---|---|
| Location | A = 40, B = 30, C = 15, D = 5 |
| Move-in date | 10–31 Jan = 20, 1–9 Jan = 15, Dec 2026 = 8, ASAP / not stated = 5 |
| Price | ≤ 9,000 = 15, 9,001–10,500 = 11, 10,501–12,000 = 7 |
| Home type | Apartment ≥ 25 m² = 10, apartment < 25 m² = 7, room = 3 |
| Lease and trust | First-hand or tillsvidare on a secure platform = 15, fixed ≥ 6 months = 11, fixed < 6 months = 6, aggregator listing that can't be verified = 3, scam red flags = 0 |

## Scam red flags (any one → score 0 for trust, and say why)
- The landlord is "abroad" and can't show the place, or wants a deposit or rent before a viewing or signed contract.
- Payment by Western Union, crypto, gift cards or a foreign bank account.
- A price far below the market for the area and size: Solna 1 rok sublets are usually 9–14k, so a 35 m² place at 5k is suspicious.
- The same photos appear in other listings, or the contact info is only a WhatsApp number.
- For a bostadsrätt or hyresrätt sublet: no written approval from the BRF or landlord, which is required.

## Open questions (answers sharpen the search; fill in when known)
- [ ] KI campus: Solna (assumed) or Flemingsberg?
- [ ] How often do you need to get to Uppsala, and where in Uppsala (BMC, Ångström, Centrum)?
- [ ] Whole apartment only, or are rooms OK?
- [ ] How long a lease do you need (end date)?
- [ ] Furnished or unfurnished?
- [ ] Does the 12,000 SEK include electricity and internet?
- [ ] Do you need to register your address (folkbokföring), for example to get a personnummer?
- [ ] Are you eligible for KI Housing or SSSB (KI student, researcher or employee)?
- [ ] One person or more? Pets? Smoker?
