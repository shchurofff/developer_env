import { Separator } from "#ui";
import { ModeToggle } from "../../components/mode-toggle";
import { HeaderLogo } from "./header-logo";
import { HeaderNavigation } from "./header-navigation";

export const Header = () => {
  return (
    <header className="bg-background/70 sticky top-0 z-20 flex items-center justify-between gap-2 px-4 py-2 backdrop-blur-lg">
      <div className="flex gap-2">
        <HeaderLogo />
        <Separator orientation="vertical" />
        <HeaderNavigation />
      </div>
      <ModeToggle />
    </header>
  );
};
