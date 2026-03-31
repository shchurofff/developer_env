import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "#ui";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems: { title: string; href: string }[] = [
  {
    title: "Проекты",
    href: "/projects",
  },
  {
    title: "Хранилище",
    href: "/repository",
  },
];

export const HeaderNavigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item, i) => (
          <NavigationMenuItem key={i}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={item.href}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
