import { HomeCardBlock } from "#mod/home";
import { FlickeringGrid, Heading, Text } from "#ui";

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

      <div className="relative flex h-screen w-full flex-col items-center justify-center space-y-5">
        <Heading>Developer Environment</Heading>
        <Text>
          Управляй проектами, фиксируй задачи и храни знания в одном месте.
        </Text>

        <HomeCardBlock />
      </div>
    </div>
  );
}
