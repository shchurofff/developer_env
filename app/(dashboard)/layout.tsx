import { Header } from "#mod/header";
import { PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto min-h-screen w-full max-w-7xl">
        <div className="px-6 py-4">
          <Header />
          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
