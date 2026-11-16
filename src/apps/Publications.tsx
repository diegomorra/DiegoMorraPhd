import {
  PUB_TYPE_LABEL,
  PUB_TYPE_ORDER,
  formatFetchedAt,
  publicationMetrics,
  publicationsOfType,
} from "../data/publications";
import { SCHOLAR_URL } from "../data/profile";
import { PublicationCitation } from "../components/shared/PublicationCitation";

export function Publications() {
  const m = publicationMetrics();
  const fetched = formatFetchedAt(m.fetchedAt);

  return (
    <div className="doc-body">
      <h2>Publications</h2>

      <dl className="pub-metrics">
        <div>
          <dt>Publications</dt>
          <dd>{m.works}</dd>
        </div>
        <div>
          <dt>Citations</dt>
          <dd>{m.totalCitations}</dd>
        </div>
        <div>
          <dt>h-index</dt>
          <dd>{m.hIndex}</dd>
        </div>
      </dl>
      <p className="pub-metrics-note">
        {fetched ? `Updated ${fetched}. ` : ""}Visit{" "}
        <a href={SCHOLAR_URL} target="_blank" rel="noreferrer">
          Google Scholar
        </a>{" "}
        for the latest figures.
      </p>

      {PUB_TYPE_ORDER.map((type) => {
        const items = publicationsOfType(type);
        if (items.length === 0) return null;
        return (
          <section key={type} aria-labelledby={`pubs-${type}`}>
            <h3 id={`pubs-${type}`}>
              {PUB_TYPE_LABEL[type]} ({items.length})
            </h3>
            <ul className="pub-list">
              {items.map((p) => (
                <li key={p.id} className="pub-item">
                  <PublicationCitation pub={p} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

    </div>
  );
}
