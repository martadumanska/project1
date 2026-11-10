# Weekly run procedure

The scheduled task follows these steps every Monday. Edit them here to change what every future run does.

1. **Sync.** In the `martadumanska/project1` checkout, run
   `git fetch origin claude/peaceful-keller-auo6ul && git checkout claude/peaceful-keller-auo6ul && git pull origin claude/peaceful-keller-auo6ul`.
2. **Date check.** If today is after 2027-01-31, don't search. Reply that the move-in deadline has passed, and offer to disable the
   "Weekly Stockholm apartment screening" scheduled task or to set new dates in `criteria.md`. Then stop.
3. **Read** `criteria.md` (hard filters, commute tiers, scoring, scam flags), `sources.md` (the query plan), `seen-listings.csv`
   (everything already reported) and the newest file in `reports/` (the format to follow).
4. **Search.** Run every query in the `sources.md` query plan with WebSearch, using the `allowed_domains` given there.
   Retry thin results once in `extended` mode. From 1 Dec 2026 on, also run the Qasa Solna, Vasastan and Sundbyberg queries
   with "december 2026" and "omgående".
   - Direct page fetches (curl, WebFetch) of these sites are blocked in this environment, and WebSearch refuses blocket.se, so don't try either.
   - Ignore paste.rs and similar spam pages.
   - Never invent a listing or a detail. If a field isn't in the search result, write "not stated".
   - Don't put any personal details in queries. Never contact landlords or post anything.
5. **Filter and score** exactly as `criteria.md` says. Match against `seen-listings.csv` on source + address + move-in date and
   mark each listing **NEW**, "seen before", or "updated" (when its date or price changed). NEW listings go first in each table.
6. **Write** `reports/YYYY-MM-DD.md` with these sections: Act this week (1–4 actions) · Whole apartments (ranked) · Rooms (fallback) ·
   Just over budget (≤ 12,700 SEK) · Missed the date cut (starts 1–7 Feb) · Scam and risk flags · Checked, nothing matching.
   At the top, remind the reader that search snapshots can be stale, so each listing must be verified.
   Spot-check the top 1–2 new picks with one extra WebSearch each (is it swap-only? stale? a duplicate?) and note the result.
7. **Log** each NEW or updated listing as a row in `seen-listings.csv`, using the same columns.
8. **Commit** `Apartment screening YYYY-MM-DD` and push with `git push -u origin claude/peaceful-keller-auo6ul`.
   Retry up to 4 times with backoff, but only on network errors.
9. **Notify.** Send one PushNotification of under 200 characters, for example
   "Apartments: 3 new matches. Top: 1 rum 25 m² Solna, 9,800 SEK from 15 Jan (score 88). Report in apartment-search/reports."
   Then end with a summary of about 15 lines: the number of new matches, the top 5 new ones (street and area, size, rent,
   move-in, score, link), anything urgent, and the report path. If nothing new matched, say so plainly.
