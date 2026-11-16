import { emails, academicLinks, otherLinks } from "../data/profile";

export function Contact() {
  return (
    <div className="doc-body contact-body">
      <h2 className="visually-hidden">Contacts</h2>
      <h3>Email</h3>
      <ul className="contact-list">
        {emails.map((e) => (
          <li key={e.address}>
            <strong>{e.label}:</strong>{" "}
            <a href={`mailto:${e.address}`}>{e.address}</a>
          </li>
        ))}
      </ul>
      <h3>Academic</h3>
      <ul className="contact-list">
        {academicLinks.map((l) => (
          <li key={l.label}>
            <strong>{l.label}:</strong>{" "}
            <a href={l.href} target="_blank" rel="noreferrer">
              {l.display}
            </a>
          </li>
        ))}
      </ul>
      <h3>General</h3>
      <ul className="contact-list">
        {otherLinks.map((l) => (
          <li key={l.label}>
            <strong>{l.label}:</strong>{" "}
            <a href={l.href} target="_blank" rel="noreferrer">
              {l.display}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
