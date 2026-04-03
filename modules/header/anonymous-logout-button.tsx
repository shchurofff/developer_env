import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#ui";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface AnonymousLogOutButtonProps {
  onLogout: () => Promise<void>;
}

export const AnonymousLogOutButton: FC<AnonymousLogOutButtonProps> = ({
  onLogout,
}) => {
  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button size={"icon"} variant={"ghost"} className="cursor-pointer">
              <LogOutIcon />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Выйти</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Выйти из демо-режима?</AlertDialogTitle>
          <AlertDialogDescription>
            Если выйдете сейчас, вы можете потерять доступ к созданным проектам.
            Зарегистрируйтесь, чтобы сохранить прогресс за аккаунтом.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/*<Button asChild variant="outline">
            <Link href="/register">Зарегистрироваться</Link>
          </Button>*/}

          <div className="flex w-full flex-col gap-2">
            <AlertDialogAction asChild>
              <Link href="/register">Зарегистрироваться</Link>
            </AlertDialogAction>

            <AlertDialogAction variant="destructive" onClick={onLogout}>
              Выйти без сохранения
            </AlertDialogAction>
            <AlertDialogCancel>Вернуться</AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
