import { PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="px-6 py-4">
      <div className="mt-8">{children}</div>
    </div>
  );
}
