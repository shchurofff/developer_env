import { RegisterForm } from "#mod/auth/components";
import { FlickeringGrid } from "#ui";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const auth = await getServerSession();

  if (auth && !auth.user.isAnonymous) {
    redirect("/projects");
  }
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4">
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={4}
        gridGap={10}
        color="gray"
        maxOpacity={0.5}
        flickerChance={0.1}
      />

      <div className="bg-background/95 z-10 w-full max-w-md border p-6 shadow-lg supports-backdrop-filter:backdrop-blur-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
