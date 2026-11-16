// Citation data copied from Diego Morra's Google Scholar profile:
// https://scholar.google.com/citations?user=GJynx_QAAAAJ
//
// Google Scholar has no API and blocks automated requests, so these numbers
// are updated by hand: open the profile, copy the "Cited by" table and the
// citation count of each article, and update the date below.

/** ISO date of the last update (shown as "November 2026"). */
export const SCHOLAR_UPDATED = "2026-11-15";

/** The "Cited by" table of the profile ("All" column). */
export const scholarMetrics = {
  citations: 170,
  hIndex: 7,
  i10Index: 5,
};

/** "Cited by" of each publication, keyed by its id in publications.ts. */
export const scholarCitations: Record<string, number> = {
  "ijhcs-2026-llm": 0,
  "ijhcs-2024-makenodes": 4,
  "ijhcs-2024-rapid": 9,
  "rsta-2024-sidewalk": 13,
  "ijhcs-2023-wellbeing": 75,
  "ijcci-2023-nature": 18,
  "chi-2026-uwb": 2,
  "avi-2022-phygital": 16,
  "interact-2021-cobo": 15,
  "springer-2026-guidelines": 0,
  "avi-2024-chatgpt": 8,
  "chitaly-2023-swim": 6,
  "avi-2022-iotgo": 0,
  "avi-2026-civics": 0,
  "empathy-2022-reflection": 1,
  "empathy-2021-young-adults": 0,
  "empathy-2020-cards": 0,
  "copda-2026-ambiguous": 0,
  "avi-2022-digital-wellbeing-ws": 2,
  "arxiv-2026-vlm-sidewalk": 0,
};
