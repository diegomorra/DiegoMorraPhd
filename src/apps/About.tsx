import type { ReactNode } from "react";
import {
  profile,
  appointments,
  education,
  awards,
  academicLinks,
  cv,
} from "../data/profile";
import {
  talks,
  workshopOrganization,
  programCommittees,
  reviewing,
} from "../data/activities";

export function About() {
  return (
    <div className="doc-body about-body">
      <div className="about-header">
        <div className="about-photo">
          <img src={profile.photo.src} alt={profile.photo.alt} />
        </div>
        <div style={{ minWidth: 0 }}>
          <h2>{profile.fullName}</h2>
          <p className="about-role">
            {profile.position}
            <br />
            {profile.lab}, {profile.institution}
          </p>
          <p className="about-links">
            {academicLinks.map((l, i) => (
              <span key={l.label}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>

      <Section title={profile.headline}>
        {profile.statement.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Section>

      <Section title="Research interests">
        <ul className="about-bullets">
          {profile.interests.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </Section>

      <Section title="Appointments" logo="/mit-logo-pixel.png">
        <ul className="about-list">
          {appointments.map((a) => (
            <li key={a.role + a.period}>
              <strong>{a.role}</strong>, {a.org}{" "}
              <span className="about-period">({a.period})</span>
              {a.note && <span className="about-note">{a.note}</span>}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education" logo="/polimi-logo-pixel.png">
        <ul className="about-list">
          {education.map((d) => (
            <li key={d.degree}>
              <strong>{d.degree}</strong>, {d.org}{" "}
              <span className="about-period">({d.period})</span>
              {d.details?.map((line) => (
                <span key={line} className="about-note">
                  {line}
                </span>
              ))}
              {d.url && (
                <span className="about-note">
                  <a href={d.url.href} target="_blank" rel="noreferrer">
                    {d.url.label}
                  </a>
                </span>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Awards and fellowships">
        <ul className="about-list">
          {awards.map((a) => (
            <li key={a.title}>
              <strong>{a.title}</strong> ({a.year}), {a.org}
              <span className="about-note">{a.note}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Invited talks and guest lectures">
        <ul className="about-list">
          {talks.map((t) => (
            <li key={`${t.year}-${t.event}-${t.title ?? ""}`}>
              <span className="doc-year">{t.year}</span> {t.kind}
              {t.title ? (
                <>
                  , <em>“{t.title}”</em>
                </>
              ) : null}
              .{" "}
              {t.href ? (
                <a href={t.href} target="_blank" rel="noreferrer">
                  {t.event}
                </a>
              ) : (
                t.event
              )}
              , {t.place}.
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Academic service">
        <h4>Workshop organization</h4>
        <ul className="about-list">
          {workshopOrganization.map((w) => (
            <li key={w.event}>
              <span className="doc-year">{w.year}</span> {w.role},{" "}
              <strong>{w.event}</strong>. {w.detail}.
            </li>
          ))}
        </ul>
        <h4>Program committees</h4>
        <ul className="about-list">
          {programCommittees.map((v) => (
            <li key={v.venue}>
              <strong>{v.venue}</strong>, {v.full}
            </li>
          ))}
        </ul>
        <h4>Reviewing</h4>
        <ul className="about-list">
          {reviewing.map((v) => (
            <li key={v.venue}>
              <strong>{v.venue}</strong> ({v.years}), {v.full}
            </li>
          ))}
        </ul>
      </Section>

      <p className="about-more">
        For more information, see{" "}
        <a href={cv.pdf} target="_blank" rel="noreferrer">
          Diego’s CV (PDF)
        </a>
        .
      </p>
    </div>
  );
}

function Section({
  title,
  logo,
  children,
}: {
  title: string;
  logo?: string;
  children: ReactNode;
}) {
  return (
    <section className="about-section">
      <h3>
        <span>{title}</span>
        {logo && <img src={logo} alt="" className="about-logo" />}
      </h3>
      {children}
    </section>
  );
}
