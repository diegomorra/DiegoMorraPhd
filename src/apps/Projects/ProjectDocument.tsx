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
      {project.longDescription && <p>{project.longDescription}</p>}
      {project.url && (
        <p>
          Link:&nbsp;
          <a href={project.url} target="_blank" rel="noreferrer">
            {project.url}
          </a>
        </p>
      )}
      <p style={{ color: "#808080", marginTop: 24 }}>
        [Project images will be added soon.]
      </p>
    </div>
  );
}
