export function getProjectBreadcrumb(project: { name: string; slug: string }) {
  return [{ label: "Проекты", href: "/projects" }, { label: project.name }];
}
