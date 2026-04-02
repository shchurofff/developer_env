import { Button, Tooltip, TooltipContent, TooltipTrigger } from "#ui";
import { LogOutIcon } from "lucide-react";
import { FC } from "react";

interface LogOutButtonProps {
  onLogout: () => Promise<void>;
}

export const LogOutButton: FC<LogOutButtonProps> = ({ onLogout }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="cursor-pointer"
          onClick={onLogout}
        >
          <LogOutIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Выйти</p>
      </TooltipContent>
    </Tooltip>
  );
};
