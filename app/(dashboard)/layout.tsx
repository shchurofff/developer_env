import { Header } from "#mod/header";
import { requireSession } from "@/lib/auth";
import { PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  await requireSession();
  return (
    <div className="min-h-screen pb-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}
