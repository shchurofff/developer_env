import { Separator } from "#ui";
import { ModeToggle } from "../../components/mode-toggle";
import { HeaderLogo } from "./header-logo";
import { HeaderNavigation } from "./header-navigation";

export const Header = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between gap-2">
      <div className="flex gap-2 px-2">
        <HeaderLogo />
        <Separator orientation="vertical" />
        <HeaderNavigation />
      </div>
      <ModeToggle />
    </header>
  );
};
