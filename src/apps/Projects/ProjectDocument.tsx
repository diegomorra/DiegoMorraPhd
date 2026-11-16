import {
  findProject,
  projectGroups,
  type ProjectPart,
} from "../../data/research";
import { findPublication } from "../../data/publications";
import { PublicationCitation } from "../../components/shared/PublicationCitation";

export function ProjectDocument({ projectId }: { projectId?: string }) {
  const found = projectId ? findProject(projectId) : undefined;

  if (!found) {
    return (
      <div className="doc-body">
        File not found. Maybe it was moved to the Recycle Bin?
      </div>
    );
  }

  const { project, line } = found;
  const pubs = (project.publicationIds ?? [])
    .map(findPublication)
    .filter((p) => p !== undefined);

  const meta: [string, string | undefined][] = [
    // No theme for flat folders (Exhibitions, Design Stuff) or for a topic
    // that is the project itself.
    [
      "Theme",
      projectGroups[line.group].flat || line.standalone ? undefined : line.title,
    ],
    ["Discipline", project.discipline],
    ["Years", project.period],
    ["Role", project.role],
    ["Context", project.context],
    ["Funding", project.funding],
    ["Methods", project.methods?.join(" · ")],
  ];

  return (
    <article className="doc-body">
      <h2>{project.title}</h2>
      <p className="doc-summary">{project.summary}</p>
      {project.highlight && (
        <p className="doc-highlight">
          <img src="/icons/Awschd32400_32x32_4.png" alt="" /> {project.highlight}
        </p>
      )}
      <dl className="doc-meta">
        {meta
          .filter(([, v]) => Boolean(v))
          .map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>

      {project.body.map((para, i) => (
        <p key={i}>{para}</p>
      ))}

      {project.parts?.map((part, i) => (
        <PartSection
          key={part.title}
          part={part}
          id={`${project.id}-part-${i}`}
        />
      ))}

      {pubs.length > 0 && (
        <section aria-labelledby={`${project.id}-pubs`}>
          <h3 id={`${project.id}-pubs`}>Publications</h3>
          <ul className="pub-list">
            {pubs.map((p) => (
              <li key={p.id} className="pub-item">
                <PublicationCitation pub={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.links && project.links.length > 0 && (
        <section aria-labelledby={`${project.id}-links`}>
          <h3 id={`${project.id}-links`}>Links</h3>
          <ul className="doc-links">
            {project.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.images.length > 0 && (
        <section aria-labelledby={`${project.id}-images`}>
          <h3 id={`${project.id}-images`}>Images</h3>
          <ul className="doc-gallery">
            {project.images.map((img) => (
              <li key={img.src}>
                <a href={img.src} target="_blank" rel="noreferrer">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <span className="visually-hidden">
                    {" "}
                    (opens the full-size image in a new tab)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

/** One work of a project that groups several, with its own text and papers. */
function PartSection({ part, id }: { part: ProjectPart; id: string }) {
  const pubs = (part.publicationIds ?? [])
    .map(findPublication)
    .filter((p) => p !== undefined);
  const meta = (
    [
      ["Years", part.period],
      ["Role", part.role],
      ["Context", part.context],
      ["Methods", part.methods?.join(" · ")],
    ] as [string, string | undefined][]
  ).filter(([, v]) => Boolean(v));

  return (
    <section aria-labelledby={id}>
      <h3 id={id}>{part.title}</h3>
      {part.summary && <p className="doc-summary">{part.summary}</p>}
      {meta.length > 0 && (
        <dl className="doc-meta">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {part.body.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
      {pubs.length > 0 && (
        <>
          <h4 id={`${id}-pubs`}>Publications</h4>
          <ul className="pub-list" aria-labelledby={`${id}-pubs`}>
            {pubs.map((p) => (
              <li key={p.id} className="pub-item">
                <PublicationCitation pub={p} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
