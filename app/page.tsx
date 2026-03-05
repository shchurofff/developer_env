import { getProjects } from "#server/services";
import { ModeToggle } from "#shared/components/mode-toggle";
import { Button } from "#ui";

export default async function Home() {
  const projects = await getProjects();
  console.log("loaded", projects);
  return (
    <div>
      <p>Initial Page</p>
      <Button variant={"default"}>add</Button>
      <ModeToggle />
    </div>
  );
}
