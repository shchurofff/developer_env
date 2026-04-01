import { LoginForm } from "#mod/auth/components";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const auth = await getServerSession();

  if (auth) {
    redirect("/");
  }
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-lg border p-3">
        <LoginForm />
      </div>
    </div>
  );
}
