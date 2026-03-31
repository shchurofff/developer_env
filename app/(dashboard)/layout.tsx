import { Header } from "#mod/header";
import { PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen pb-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/*<div className="mx-auto min-h-screen w-full max-w-7xl">*/}
        {/*<div className="px-6 py-4">*/}
        <Header />
        <main className="mt-6">{children}</main>
        {/*</div>*/}
      </div>
    </div>
  );
}
