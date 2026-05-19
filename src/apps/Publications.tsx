import { publications, type Publication } from "../data/publications";

function paperUrl(p: Publication): string | null {
  if (p.openAccessUrl) return p.openAccessUrl;
  if (p.doi) return p.doi;
  return null;
}

function groupByYear(pubs: Publication[]) {
  const byYear = new Map<number, Publication[]>();
  for (const p of pubs) {
    const list = byYear.get(p.year) ?? [];
    list.push(p);
    byYear.set(p.year, list);
  }
  return [...byYear.entries()].sort(([a], [b]) => b - a);
}

function computeMetrics(pubs: Publication[]) {
  const totalCitations = pubs.reduce((sum, p) => sum + p.citedBy, 0);
  const sortedCitations = pubs
    .map((p) => p.citedBy)
    .sort((a, b) => b - a);
  let hIndex = 0;
  for (let i = 0; i < sortedCitations.length; i++) {
    if (sortedCitations[i] >= i + 1) hIndex = i + 1;
    else break;
  }
  const i10Index = pubs.filter((p) => p.citedBy >= 10).length;
  return {
    works: pubs.length,
    totalCitations,
    hIndex,
    i10Index,
  };
}

const SCHOLAR_URL =
  "https://scholar.google.com/citations?user=GJynx_QAAAAJ&hl=it";

export function Publications() {
  if (publications.length === 0) {
    return (
      <div className="notepad-body">
        {`No publications indexed yet.
Check back soon.`}
      </div>
    );
  }

  const metrics = computeMetrics(publications);
  const grouped = groupByYear(publications);

  return (
    <div className="notepad-body">
      <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 14 }}>
        Publications
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 6,
          padding: 8,
          marginBottom: 16,
          background: "#dfdfdf",
          boxShadow:
            "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
        }}
      >
        <Metric label="Works" value={metrics.works} />
        <Metric label="Citations" value={metrics.totalCitations} />
        <Metric label="h-index" value={metrics.hIndex} />
        <Metric label="i10-index" value={metrics.i10Index} />
      </div>

      {grouped.map(([year, items]) => (
        <div key={year} style={{ marginBottom: 16 }}>
          <h3
            style={{
              fontSize: 12,
              color: "#000080",
              margin: "0 0 6px",
              borderBottom: "1px solid #c0c0c0",
              paddingBottom: 2,
            }}
          >
            {year}
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((p, i) => {
              const url = paperUrl(p);
              return (
                <li key={i} style={{ marginBottom: 10 }}>
                  <div style={{ lineHeight: 1.35 }}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#0000ee" }}
                      >
                        {p.title}
                      </a>
                    ) : (
                      <span>{p.title}</span>
                    )}
                  </div>
                  <div
                    style={{
                      color: "#606060",
                      fontSize: 11,
                      marginTop: 1,
                    }}
                  >
                    {p.venue || p.type || "—"}
                    {p.citedBy > 0 &&
                      ` · cited ${p.citedBy} time${p.citedBy === 1 ? "" : "s"}`}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <p style={{ color: "#808080", fontSize: 10, marginTop: 24 }}>
        Full profile on{" "}
        <a href={SCHOLAR_URL} target="_blank" rel="noreferrer">
          Google Scholar
        </a>
        .
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2px 4px",
        background: "#ffffff",
        boxShadow: "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
      }}
    >
      <span
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#000080",
          lineHeight: 1.1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 10,
          color: "#404040",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </span>
    </div>
  );
}
