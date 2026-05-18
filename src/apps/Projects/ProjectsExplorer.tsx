import { projectCategories } from "../../data/projects";
import { useWindowStore } from "../../store/windowStore";

export function ProjectsExplorer({
  categoryId,
}: {
  categoryId?: string;
}) {
  const open = useWindowStore((s) => s.openWindow);

  if (!categoryId) {
    return (
      <div className="explorer-body">
        <div className="explorer-grid">
          {projectCategories.map((cat) => (
            <div
              key={cat.id}
              className="explorer-item"
              tabIndex={0}
              onDoubleClick={() =>
                open("projects", {
                  title: `Projects - ${cat.name}`,
                  icon: "/icons/FolderOpen_32x32_4.png",
                  payload: { categoryId: cat.id },
                  initialSize: { width: 560, height: 400 },
                })
              }
            >
              <img src="/icons/Folder_32x32_4.png" alt="" />
              <span className="explorer-item-label">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const cat = projectCategories.find((c) => c.id === categoryId);
  if (!cat) {
    return <div className="explorer-body">Category not found.</div>;
  }

  return (
    <div className="explorer-body">
      <div className="explorer-grid">
        {cat.projects.map((p) => (
          <div
            key={p.id}
            className="explorer-item"
            tabIndex={0}
            onDoubleClick={() =>
              open("project-doc", {
                title: `${p.title}.doc`,
                icon: "/icons/FolderFile_32x32_4.png",
                payload: { projectId: p.id },
                initialSize: { width: 520, height: 420 },
              })
            }
          >
            <img src="/icons/FolderFile_32x32_4.png" alt="" />
            <span className="explorer-item-label">{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
