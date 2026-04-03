import { Header } from "#mod/header";
import { CurrentUser, requireSession } from "@/lib/auth";
import { PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await requireSession();
  const currentUser: CurrentUser = {
    id: session.user.id,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    isAnonymous: session.user.isAnonymous ?? false,
  };
  return (
    <div className="min-h-screen pb-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header user={currentUser} />
        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}
