"use client";

import { Badge, Separator } from "#ui";
import { authClient, CurrentUser } from "@/lib/auth";
import { ModeToggle } from "../../components/mode-toggle";
import { HeaderLogo } from "./header-logo";
import { HeaderNavigation } from "./header-navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { AnonymousLogOutButton } from "./anonymous-logout-button";
import { LogOutButton } from "./logout-button";

interface HeaderProps {
  user: CurrentUser;
}

export const Header: FC<HeaderProps> = ({ user }) => {
  const router = useRouter();
  const anonymousUser = user.isAnonymous;

  const handleLogOut = async () => {
    const result = await authClient.signOut();
    if (!result.error) {
      toast.success("Вы вышли из аккаунта");
      router.replace("/");
      router.refresh();
      return;
    }
    toast.error(result.error.message ?? "Не удалось выйти");
  };

  const handleAnonymousLogOut = async () => {
    const result = await authClient.deleteAnonymousUser();
    if (!result.error) {
      toast.success("Вы вышли из гостевого аккаунта");
      router.replace("/");
      router.refresh();
      return;
    }
    toast.error(result.error.message ?? "Не удалось выйти");
  };

  return (
    <header className="bg-background/70 sticky top-0 z-20 flex items-center justify-between gap-2 px-4 py-2 backdrop-blur-lg">
      <div className="flex gap-2">
        <HeaderLogo />
        <Separator orientation="vertical" />
        <HeaderNavigation />
      </div>
      <div className="flex items-center justify-center gap-2">
        <ModeToggle />

        {anonymousUser ? (
          <>
            <AnonymousLogOutButton onLogout={handleAnonymousLogOut} />
            <Badge>Demo</Badge>
          </>
        ) : (
          <LogOutButton onLogout={handleLogOut} />
        )}
      </div>
    </header>
  );
};
