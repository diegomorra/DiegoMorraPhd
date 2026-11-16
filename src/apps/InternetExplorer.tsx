import { pressLinks } from "../data/activities";

export function InternetExplorer() {
  return (
    <div className="doc-body ie-body">
      <div className="ie-dialing" aria-hidden="true">
        <img src="/icons/Inetcpl1313_32x32_4.png" alt="" />
        <div>
          <strong>Dialing remote connection...</strong>
          <br />
          <span className="ie-noise">beeeep - krrrr - sshhh</span>
        </div>
      </div>
      <h2>
        {pressLinks.length} results found for <em>Diego Morra</em>
      </h2>
      <ul className="ie-results">
        {pressLinks.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
            <span className="ie-source">{l.source}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
