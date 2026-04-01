"use client";

import {
  Button,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#ui";
import { authClient } from "@/lib/auth";
import { ModeToggle } from "../../components/mode-toggle";
import { HeaderLogo } from "./header-logo";
import { HeaderNavigation } from "./header-navigation";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

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

  return (
    <header className="bg-background/70 sticky top-0 z-20 flex items-center justify-between gap-2 px-4 py-2 backdrop-blur-lg">
      <div className="flex gap-2">
        <HeaderLogo />
        <Separator orientation="vertical" />
        <HeaderNavigation />
      </div>
      <div className="flex items-center justify-center gap-2">
        <ModeToggle />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="cursor-pointer"
              onClick={handleLogOut}
            >
              <LogOutIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Выйти</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};
