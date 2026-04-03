import { HomeCardBlock } from "#mod/home";
import { Badge, FlickeringGrid, Heading, Text } from "#ui";
import { getServerSession } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession();
  const user = session?.user
    ? {
        email: session?.user.email ?? null,
        name: session?.user.name ?? null,
      }
    : null;
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={4}
        gridGap={10}
        color="gray"
        maxOpacity={0.5}
        flickerChance={0.1}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 py-16">
        <div className="mb-10 flex max-w-3xl flex-col items-center gap-4 text-center">
          <Badge variant="outline">Developer workspace</Badge>
          <Heading className="max-w-2xl text-balance">
            Developer Environment
          </Heading>
          <Text variant="muted" className="max-w-2xl text-base text-balance">
            Управляй проектами, фиксируй задачи и собирай свою базу знаний в
            одном спокойном рабочем пространстве.
          </Text>
        </div>

        <HomeCardBlock user={user} />
      </div>
    </div>
  );
}
