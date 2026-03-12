import { FlickeringGrid, Heading, Text } from "#ui";
import { HomeCardBlock } from "@/components/home";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
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

      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center space-y-5">
        <Heading>Developer Environment</Heading>
        <ModeToggle />
        <Text>
          Управляй проектами, фиксируй задачи и храни знания в одном месте.
        </Text>

        <HomeCardBlock />
      </div>
    </div>
  );
}
