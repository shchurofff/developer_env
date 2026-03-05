import { getProjects } from "#server/services";

export default async function Home() {
  const projects = await getProjects();
  console.log("loaded", projects);
  return <div>Initial Page</div>;
}
