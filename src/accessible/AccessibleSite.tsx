// The text version of the website: one linear page of plain semantic HTML,
// designed to be easier to use with screen readers. No client-side JavaScript
// in production: it is prerendered to dist/text/index.html at build time
// (scripts/prerender-accessible.mjs).
// All content comes from the same data files as the Windows 98 desktop.

import type { ReactNode } from "react";
import {
  profile,
  appointments,
  education,
  awards,
  academicLinks,
  otherLinks,
  emails,
  cv,
  SCHOLAR_URL,
} from "../data/profile";
import {
  imagesFor,
  linesOfGroup,
  projectGroups,
  projectsOfGroup,
  type Project,
  type ProjectPart,
  type ProjectGroupId,
  type ResearchLine,
} from "../data/research";
import {
  PUB_TYPE_LABEL,
  PUB_TYPE_ORDER,
  findPublication,
  formatFetchedAt,
  publicationMetrics,
  publicationsOfType,
} from "../data/publications";
import {
  talks,
  workshopOrganization,
  programCommittees,
  reviewing,
  pressLinks,
} from "../data/activities";
import { PublicationCitation } from "../components/shared/PublicationCitation";
import { CONTENT_UPDATED } from "./meta";

/** [id, menu label, heading] — numbered like the options of the startup menu. */
const SECTIONS: [string, string, string][] = [
  ["about-site", "About this website", "About this website"],
  ["bio", "Bio", "Bio"],
  ["research-projects", "Research projects", "Research projects"],
  ["publications", "Publications", "Publications"],
  ["exhibitions", "Exhibitions", "Exhibitions"],
  ["design", "Design stuff", "Design stuff"],
  ["press", "Press and links", "Press and links"],
  ["contact", "Contact", "Contact"],
];

function Section({
  id,
  children,
  backLink = true,
}: {
  id: string;
  children: ReactNode;
  backLink?: boolean;
}) {
  const index = SECTIONS.findIndex(([s]) => s === id);
  const heading = SECTIONS[index][2];
  return (
    <section id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>
        <span className="h-num" aria-hidden="true">
          {index + 1}.{" "}
        </span>
        {heading}
      </h2>
      {children}
      {backLink && (
        <p className="back-to-menu">
          <a href="#contents">
            <span aria-hidden="true">↑ </span>Back to contents
          </a>
        </p>
      )}
    </section>
  );
}

function ProjectArticle({
  project,
  headingLevel = 4,
}: {
  project: Project;
  /** 4 inside a sub-folder (h3), 3 directly under a section (h2). */
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const headingId = `project-${project.id}`;
  const pubs = (project.publicationIds ?? [])
    .map(findPublication)
    .filter((p) => p !== undefined);
  const image = imagesFor(project.id)[0];
  const meta: [string, string | undefined][] = [
    ["Discipline", project.discipline],
    ["Years", project.period],
    ["Role", project.role],
    ["Context", project.context],
    ["Funding", project.funding],
    ["Methods", project.methods?.join(", ")],
  ];
  const metaRows = meta.filter(([, v]) => Boolean(v));

  return (
    <article className="project" aria-labelledby={headingId}>
      <Heading id={headingId} className="project-title">
        {project.title}
      </Heading>
      <p className="project-summary">{project.summary}</p>
      {project.highlight && <p className="highlight">{project.highlight}</p>}
      {metaRows.length > 0 && (
        <dl className="meta">
          {metaRows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {project.body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {project.parts?.map((part, i) => (
        <ProjectPartSection
          key={part.title}
          part={part}
          id={`${headingId}-part-${i}`}
          headingLevel={headingLevel === 3 ? 4 : 5}
        />
      ))}
      {pubs.length > 0 && (
        <>
          <p className="list-label" id={`${headingId}-pubs`}>
            Publications
          </p>
          <ul className="pub-list" aria-labelledby={`${headingId}-pubs`}>
            {pubs.map((p) => (
              <li key={p.id} className="pub-item">
                <PublicationCitation pub={p} showCitations={false} />
              </li>
            ))}
          </ul>
        </>
      )}
      {project.links && project.links.length > 0 && (
        <>
          <p className="list-label" id={`${headingId}-links`}>
            Links
          </p>
          <ul aria-labelledby={`${headingId}-links`}>
            {project.links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </>
      )}
      {image && (
        <figure>
          <img src={image.src} alt={image.alt} loading="lazy" />
        </figure>
      )}
    </article>
  );
}

/** One work of a project that groups several, with its own text and papers. */
function ProjectPartSection({
  part,
  id,
  headingLevel,
}: {
  part: ProjectPart;
  id: string;
  headingLevel: 4 | 5;
}) {
  const Heading = headingLevel === 4 ? "h4" : "h5";
  const pubs = (part.publicationIds ?? [])
    .map(findPublication)
    .filter((p) => p !== undefined);
  const metaRows = (
    [
      ["Years", part.period],
      ["Role", part.role],
      ["Context", part.context],
      ["Methods", part.methods?.join(", ")],
    ] as [string, string | undefined][]
  ).filter(([, v]) => Boolean(v));

  return (
    <section className="project-part" aria-labelledby={id}>
      <Heading id={id} className="part-title">
        {part.title}
      </Heading>
      {part.summary && <p className="project-summary">{part.summary}</p>}
      {metaRows.length > 0 && (
        <dl className="meta">
          {metaRows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {part.body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {pubs.length > 0 && (
        <>
          <p className="list-label" id={`${id}-pubs`}>
            Publications
          </p>
          <ul className="pub-list" aria-labelledby={`${id}-pubs`}>
            {pubs.map((p) => (
              <li key={p.id} className="pub-item">
                <PublicationCitation pub={p} showCitations={false} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

/** One of the desktop folders: its sub-folders, or (flat) its projects. */
function ProjectGroup({ groupId }: { groupId: ProjectGroupId }) {
  const group = projectGroups[groupId];
  return (
    <>
      <p>{group.intro}</p>
      {group.flat
        ? projectsOfGroup(groupId).map((p) => (
            <ProjectArticle key={p.id} project={p} headingLevel={3} />
          ))
        : linesOfGroup(groupId).map((line) =>
            line.standalone ? (
              <ProjectArticle
                key={line.id}
                project={line.projects[0]}
                headingLevel={3}
              />
            ) : (
              <ProjectFolder key={line.id} line={line} />
            ),
          )}
    </>
  );
}

function ProjectFolder({ line }: { line: ResearchLine }) {
  return (
    <section className="research-line" aria-labelledby={`line-${line.id}`}>
      <h3 id={`line-${line.id}`}>{line.title}</h3>
      {line.projects.map((p) => (
        <ProjectArticle key={p.id} project={p} />
      ))}
    </section>
  );
}

export function AccessibleSite() {
  const m = publicationMetrics();
  const fetched = formatFetchedAt(m.fetchedAt);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="site-header">
        <p className="titlebar">diegomorra.exe · Text version</p>
        <p className="prompt" aria-hidden="true">
          C:\&gt; type diegomorra.txt<span className="cursor">_</span>
        </p>
        <h1>{profile.fullName}</h1>
        <p className="site-role">
          {profile.position}, {profile.lab}, {profile.institution}
        </p>
        <p className="site-links">
          {academicLinks.map((l, i) => (
            <span key={l.label}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <a href={l.href}>{l.label}</a>
            </span>
          ))}
        </p>
        <p className="site-switch">
          <a href="/">Go to the interactive Windows 98 desktop</a>
        </p>
      </header>

      <div className="layout">
        <nav id="contents" className="toc" aria-labelledby="toc-title">
          <p className="toc-title" id="toc-title">
            Contents
          </p>
          <ol>
            {SECTIONS.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`}>
                  <span className="toc-num" aria-hidden="true">
                    {i + 1}.
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <main id="main" tabIndex={-1}>
          <Section id="about-site" backLink={false}>
            <p>
              This page is the text version of diego-morra.com, designed to be
              easier to use with screen readers. It contains the exact same
              information as the interactive Windows 98 desktop version.
            </p>
          </Section>

          <Section id="bio">
            <h3 className="statement-title">{profile.headline}</h3>
            <div className="about-intro">
              <img
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={120}
                height={120}
                className="portrait"
              />
              <div>
                {profile.statement.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <h3>Research interests</h3>
            <ul>
              {profile.interests.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>

            <h3>Appointments</h3>
            <ul className="entries">
              {appointments.map((a) => (
                <li key={a.role + a.period}>
                  <strong>{a.role}</strong>, {a.org}, {a.place}.{" "}
                  <span className="when">{a.period}</span>
                  {a.note && <span className="note">{a.note}</span>}
                </li>
              ))}
            </ul>

            <h3>Education</h3>
            <ul className="entries">
              {education.map((d) => (
                <li key={d.degree}>
                  <strong>{d.degree}</strong>, {d.org}.{" "}
                  <span className="when">{d.period}</span>
                  {d.details?.map((line) => (
                    <span key={line} className="note">
                      {line}
                    </span>
                  ))}
                  {d.url && (
                    <span className="note">
                      <a href={d.url.href}>{d.url.label}</a>
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <h3>Awards and fellowships</h3>
            <ul className="entries">
              {awards.map((a) => (
                <li key={a.title}>
                  <strong>{a.title}</strong>, {a.org}.{" "}
                  <span className="when">{a.year}</span>
                  <span className="note">{a.note}</span>
                </li>
              ))}
            </ul>

            <h3>Invited talks and guest lectures</h3>
            <ul className="entries">
              {talks.map((t) => (
                <li key={`${t.year}-${t.event}-${t.title ?? ""}`}>
                  <span className="when">{t.year}</span> {t.kind}
                  {t.title ? <>, “{t.title}”</> : null}.{" "}
                  {t.href ? <a href={t.href}>{t.event}</a> : t.event},{" "}
                  {t.place}.
                </li>
              ))}
            </ul>

            <h3>Academic service</h3>
            <h4 className="subhead">Workshop organization</h4>
            <ul className="entries">
              {workshopOrganization.map((w) => (
                <li key={w.event}>
                  <span className="when">{w.year}</span> {w.role},{" "}
                  <strong>{w.event}</strong>. {w.detail}.
                </li>
              ))}
            </ul>
            <h4 className="subhead">Program committees</h4>
            <ul className="entries">
              {programCommittees.map((v) => (
                <li key={v.venue}>
                  <strong>{v.venue}</strong>, {v.full}
                </li>
              ))}
            </ul>
            <h4 className="subhead">Reviewing</h4>
            <ul className="entries">
              {reviewing.map((v) => (
                <li key={v.venue}>
                  <strong>{v.venue}</strong> ({v.years}), {v.full}
                </li>
              ))}
            </ul>

            <p className="more-info">
              For more information, see <a href={cv.pdf}>Diego’s CV (PDF)</a>.
            </p>
          </Section>

          <Section id="research-projects">
            <ProjectGroup groupId="research" />
          </Section>

          <Section id="publications">
            <p>
              Publications: {m.works} · Citations: {m.totalCitations} ·
              h-index: {m.hIndex}.{" "}
              {fetched ? `Updated ${fetched}. ` : ""}Visit{" "}
              <a href={SCHOLAR_URL}>Google Scholar</a> for the latest figures.
            </p>
            {PUB_TYPE_ORDER.map((type) => {
              const items = publicationsOfType(type);
              if (items.length === 0) return null;
              return (
                <section key={type} aria-labelledby={`pubs-${type}`}>
                  <h3 id={`pubs-${type}`}>
                    {PUB_TYPE_LABEL[type]} ({items.length})
                  </h3>
                  <ol className="pub-list">
                    {items.map((p) => (
                      <li key={p.id} className="pub-item">
                        <PublicationCitation pub={p} />
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
          </Section>

          <Section id="exhibitions">
            <ProjectGroup groupId="exhibitions" />
          </Section>

          <Section id="design">
            <ProjectGroup groupId="design" />
          </Section>

          <Section id="press">
            <ul className="entries">
              {pressLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>{" "}
                  <span className="when">{l.source}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="contact">
            <h3>Email</h3>
            <ul className="entries">
              {emails.map((e) => (
                <li key={e.address}>
                  {e.label}: <a href={`mailto:${e.address}`}>{e.address}</a>
                </li>
              ))}
            </ul>
            <h3>Academic</h3>
            <ul className="entries">
              {academicLinks.map((l) => (
                <li key={l.label}>
                  {l.label}: <a href={l.href}>{l.display}</a>
                </li>
              ))}
            </ul>
            <h3>General</h3>
            <ul className="entries">
              {otherLinks.map((l) => (
                <li key={l.label}>
                  {l.label}: <a href={l.href}>{l.display}</a>
                </li>
              ))}
            </ul>
          </Section>
        </main>
      </div>

      <footer className="site-footer">
        <p>
          Content updated {CONTENT_UPDATED}.{" "}
          <a href="/">Back to the Windows 98 desktop</a>
        </p>
        <p className="keys-hint">
          Tab: next link · Shift+Tab: previous link · Enter: open · Contents
          menu: jump to a section
        </p>
      </footer>
    </>
  );
}
