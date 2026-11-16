import {
  SELF_AUTHOR,
  citationsFor,
  doiUrl,
  type Publication,
} from "../../data/publications";

/**
 * One publication as a readable citation. Plain semantic markup with `pub-*`
 * classes, shared by the desktop windows and the text version.
 */
export function PublicationCitation({
  pub,
  showCitations = true,
}: {
  pub: Publication;
  showCitations?: boolean;
}) {
  // The title links to the DOI (or to the full text when there is no DOI).
  const mainUrl = pub.doi ? doiUrl(pub.doi) : pub.openAccessUrl;
  const cites = showCitations ? citationsFor(pub) : undefined;

  return (
    <>
      {pub.venueShort && (
        <span className="pub-badge">
          {pub.venueShort}
          <span className="visually-hidden">.</span>
        </span>
      )}{" "}
      <span className="pub-title">
        {mainUrl ? (
          <a href={mainUrl} target="_blank" rel="noreferrer">
            {pub.title}
          </a>
        ) : (
          pub.title
        )}
      </span>{" "}
      <span className="pub-authors">
        {pub.authors.map((a, i) => (
          <span key={a}>
            {a === SELF_AUTHOR ? <strong>{a}</strong> : a}
            {i < pub.authors.length - 1 ? ", " : ". "}
          </span>
        ))}
      </span>
      <span className="pub-venue">
        <em>{pub.venue}</em>
        {pub.details ? `, ${pub.details}` : ""}, {pub.year}.
      </span>
      {pub.note && <span className="pub-note"> {pub.note}.</span>}
      {cites !== undefined && cites > 0 && (
        <span className="pub-extra">Cited by {cites}</span>
      )}
    </>
  );
}
