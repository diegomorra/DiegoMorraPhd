import { findProject } from "../../data/projects";

export function ProjectDocument({ projectId }: { projectId?: string }) {
  const project = projectId ? findProject(projectId) : undefined;

  if (!project) {
    return (
      <div className="notepad-body">
        File not found. Maybe it was moved to the Recycle Bin?
      </div>
    );
  }

  return (
    <div className="notepad-body">
      <h2 style={{ marginTop: 0, fontSize: 16 }}>{project.title}</h2>
      {project.year && <div>Year: {project.year}</div>}
      {project.context && <div>{project.context}</div>}
      <hr />
      <p>{project.description}</p>
      {project.longDescription &&
        project.longDescription
          .split("\n\n")
          .map((para, i) => <p key={i}>{para}</p>)}
      {project.url && (
        <p>
          Link:&nbsp;
          <a href={project.url} target="_blank" rel="noreferrer">
            {project.url}
          </a>
        </p>
      )}
      {project.images && project.images.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 8,
            marginTop: 16,
          }}
        >
          {project.images.map((src, i) => (
            <a
              key={i}
              href={src}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block",
                border: "1px solid #808080",
                background: "#000",
                lineHeight: 0,
              }}
            >
              <img
                src={src}
                alt={`${project.title} - ${i + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
