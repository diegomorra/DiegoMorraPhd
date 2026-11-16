import { useState, type MouseEvent, type ReactNode } from "react";
import {
  findLine,
  linesOfGroup,
  projectGroups,
  projectsOfGroup,
  type Project,
  type ProjectGroupId,
} from "../../data/research";
import type { AppId } from "../../types";
import { useWindowStore } from "../../store/windowStore";
import { ExplorerItem } from "../../components/shared/ExplorerItem";
import { handleArrowNavigation } from "../../utils/activation";

const FOLDER_ICON = "/icons/Folder_32x32_4.png";
const OPEN_FOLDER_ICON = "/icons/FolderOpen_32x32_4.png";
const DOC_ICON = "/icons/FolderFile_32x32_4.png";

/** App that shows each desktop folder (see appsRegistry). */
const GROUP_APP: Record<ProjectGroupId, AppId> = {
  research: "projects",
  exhibitions: "exhibitions",
  design: "design",
};

/** Clicking an empty area deselects, as on the desktop. */
function deselectOnBackground(setSelected: (id: string | null) => void) {
  return (e: MouseEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).closest(".explorer-item")) setSelected(null);
  };
}

/** Opens a project's document window. */
function useOpenProject() {
  const open = useWindowStore((s) => s.openWindow);
  return (p: Project) =>
    open("project-doc", {
      title: `${p.title}.doc`,
      icon: DOC_ICON,
      payload: { projectId: p.id },
      initialSize: { width: 560, height: 460 },
    });
}

/**
 * Explorer window for one of the desktop folders.
 * - Research Projects lists its sub-folders, and the documents of the topics
 *   that are a single project (`standalone`); a sub-folder (lineId) lists its
 *   projects.
 * - Exhibitions and Design Stuff ("flat" folders) list their projects directly.
 * The left "web view" panel of a desktop folder always describes that folder:
 * selecting an item at its top level does not change it. In a list of
 * projects the panel shows the selected project; inside a sub-folder it shows
 * only the sub-folder's name until a project is selected.
 */
export function ProjectsExplorer({
  groupId,
  lineId,
}: {
  groupId: ProjectGroupId;
  lineId?: string;
}) {
  const group = projectGroups[groupId];

  if (lineId) {
    const line = findLine(lineId);
    if (!line) return <div className="explorer-body">Folder not found.</div>;
    return <ProjectList heading={line.name} projects={line.projects} />;
  }
  if (group.flat) {
    return (
      <ProjectList
        heading={group.name}
        intro={<p>{group.intro}</p>}
        projects={projectsOfGroup(groupId)}
      />
    );
  }
  return <FolderList groupId={groupId} />;
}

/** Top level of a folder with sub-folders. */
function FolderList({ groupId }: { groupId: ProjectGroupId }) {
  const open = useWindowStore((s) => s.openWindow);
  const openProject = useOpenProject();
  const [selected, setSelected] = useState<string | null>(null);
  const group = projectGroups[groupId];
  const lines = linesOfGroup(groupId);

  return (
    <div className="explorer-layout">
      <aside className="explorer-webview">
        <img src={OPEN_FOLDER_ICON} alt="" className="explorer-webview-icon" />
        <h2>{group.name}</h2>
        <p>{group.intro} Open a folder to see its projects.</p>
      </aside>
      <div
        className="explorer-body"
        onMouseDown={deselectOnBackground(setSelected)}
      >
        <ul
          className="explorer-grid"
          aria-label={`${group.name} contents`}
          onKeyDown={(e) => handleArrowNavigation(e, ".explorer-item")}
        >
          {lines.map((line) =>
            line.standalone ? (
              <ExplorerItem
                key={line.id}
                icon={DOC_ICON}
                label={line.projects[0].title}
                kind="document"
                selected={selected === line.id}
                onSelect={() => setSelected(line.id)}
                onOpen={() => openProject(line.projects[0])}
              />
            ) : (
              <ExplorerItem
                key={line.id}
                icon={FOLDER_ICON}
                label={line.name}
                kind={`folder, ${line.projects.length} ${line.projects.length === 1 ? "item" : "items"}`}
                selected={selected === line.id}
                onSelect={() => setSelected(line.id)}
                onOpen={() =>
                  open(GROUP_APP[groupId], {
                    title: `${group.name} - ${line.name}`,
                    icon: OPEN_FOLDER_ICON,
                    payload: { lineId: line.id },
                    initialSize: { width: 640, height: 440 },
                  })
                }
              />
            ),
          )}
        </ul>
      </div>
    </div>
  );
}

/** A list of project documents: a sub-folder, or a flat desktop folder. */
function ProjectList({
  heading,
  intro,
  projects,
}: {
  heading: string;
  /** Shown in the side panel while no project is selected. */
  intro?: ReactNode;
  projects: Project[];
}) {
  const openProject = useOpenProject();
  const [selected, setSelected] = useState<string | null>(null);
  const sel = projects.find((p) => p.id === selected);

  return (
    <div className="explorer-layout">
      <aside className="explorer-webview">
        <img src={OPEN_FOLDER_ICON} alt="" className="explorer-webview-icon" />
        <h2>{heading}</h2>
        {sel ? (
          <>
            <p className="explorer-webview-title">{sel.title}</p>
            {/* No dates here: they are in the project's document window. */}
            {sel.discipline && (
              <p className="explorer-webview-meta">{sel.discipline}</p>
            )}
            <p>{sel.summary}</p>
            {sel.role && (
              <p className="explorer-webview-meta">Role: {sel.role}</p>
            )}
          </>
        ) : (
          intro
        )}
      </aside>
      <div
        className="explorer-body"
        onMouseDown={deselectOnBackground(setSelected)}
      >
        <ul
          className="explorer-grid"
          aria-label={`${heading} projects`}
          onKeyDown={(e) => handleArrowNavigation(e, ".explorer-item")}
        >
          {projects.map((p) => (
            <ExplorerItem
              key={p.id}
              icon={DOC_ICON}
              label={p.title}
              eyebrow={p.discipline}
              kind="document"
              selected={selected === p.id}
              onSelect={() => setSelected(p.id)}
              onOpen={() => openProject(p)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
