# Stockholm apartment screening

A weekly automated search for a rental in Stockholm that is:
- **≤ 12,000 SEK/month**
- available **by 31 Jan 2027**, ideally from about 10 January
- well connected to **Karolinska Institutet (Solna)** and **Uppsala**

## How it works
- A Claude Code **scheduled task** runs **every Monday at 07:17 (Stockholm time)** in a fresh cloud session.
- Each run reads `criteria.md` and `sources.md`, searches the sources, and drops listings that fail the hard filters.
  It scores the rest and checks them against `seen-listings.csv`, so you see what's new.
  It then writes `reports/YYYY-MM-DD.md` and pushes it to this branch (`claude/peaceful-keller-auo6ul`).
- You get a push notification with the week's top new listings. The full report is in `reports/`.
- After 31 Jan 2027 the task stops searching and reminds you to turn it off.

## Files
| File | Purpose |
|---|---|
| `criteria.md` | Filters, commute tiers, scoring, scam red flags, open questions. **Edit this to change the search.** |
| `sources.md` | Which sites are searched and how, plus what can't be automated. |
| `manual-checklist.md` | Alerts to set, Facebook groups, "looking for" post templates (SV/EN), checks before paying. |
| `seen-listings.csv` | Every listing reported so far (used to flag new ones). |
| `reports/` | One report per run. |

## Limitations
- **Search snapshots, not live pages.** This environment's network blocks direct page reads, so listings come from search-index snapshots and may already be taken.
  Always open the listing to confirm.
- **Facebook groups and Blocket can't be searched automatically** (login wall and a crawler block). Use `manual-checklist.md`.
- **Commute times are estimates.** Check the top picks in the SL app before committing.

## Changing or stopping it
Ask Claude, for example "change the apartment screening to twice a week" or "stop the apartment screening".
You can also manage it under scheduled tasks on claude.ai/code.
