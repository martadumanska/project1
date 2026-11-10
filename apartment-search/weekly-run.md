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
5. **Check links and freshness.** Do this for every listing that passes the filters:
   - **Find its own page.** If the result only gave an area/search page (for example a Qasa `find-home?...` URL), run one more WebSearch
     for the street and size (such as `"Vasavägen" Solna 18 m² qasa`, same `allowed_domains`). Look for a listing URL:
     `qasa.com/.../home/<id>`, `qasa.se/hyra/.../<id>`, `samtrygg.se/object/...` or `/RentalObject/Show/...`,
     `bostadsportal.se/...-id-<n>`, `bofrid.se/hyra-lagenhet/...`, `homii.se/soka-bostad/annonser/<uuid>`.
     Only use it if the search result ties it to **this** ad (same street, size and rent); streets often have several ads.
   - **No listing URL found:** link the narrowest area list that showed it, and label the link **"<Site> <area> list: find "<Street>""**.
     Never label an area page as if it were the listing. For rooms on Qasa, use the list without `homeTypes=apartment`, because that filter hides rooms.
   - **Only use URLs that the search tool actually returned.** Never build or guess one. Rewrite odd mirror domains
     (`ww.`, `ww-w.`, `www-.`, `w.`, `email.`) to `www.`.
   - **Stale:** apply the "Fresh" filter from `criteria.md`, using the publish date or rental period in the search result.
     Put dropped listings in a "Removed after checking" table with the reason.
6. **Filter and score** exactly as `criteria.md` says. Match against `seen-listings.csv` on source + address + move-in date and
   mark each listing **NEW**, "seen before", or "updated" (when its date or price changed). NEW listings go first in each table.
7. **Write** `reports/YYYY-MM-DD.md` with these sections: Act this week (1–4 actions) · Whole apartments (ranked) · Rooms (fallback) ·
   Just over budget (≤ 12,700 SEK) · Missed the date cut (starts 1–7 Feb) · Removed after checking · Scam and risk flags · Checked, nothing matching. Start with the "About the links" note from the newest report.
   At the top, remind the reader that search snapshots can be stale, so each listing must be verified.
   Spot-check the top 1–2 new picks with one extra WebSearch each (is it swap-only? stale? a duplicate?) and note the result.
8. **Log** each NEW or updated listing as a row in `seen-listings.csv`, using the same columns.
9. **Commit** `Apartment screening YYYY-MM-DD` and push with `git push -u origin claude/peaceful-keller-auo6ul`.
   Retry up to 4 times with backoff, but only on network errors.
10. **Notify.** Send one PushNotification of under 200 characters, for example
   "Apartments: 3 new matches. Top: 1 rum 25 m² Solna, 9,800 SEK from 15 Jan (score 88). Report in apartment-search/reports."
   Then end with a summary of about 15 lines: the number of new matches, the top 5 new ones (street and area, size, rent,
   move-in, score, link), anything urgent, and the report path. If nothing new matched, say so plainly.
