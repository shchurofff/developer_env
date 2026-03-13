import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link className="flex items-center" href="/">
      <div className="flex items-center justify-center text-lg font-bold tracking-tighter">
        env. <span className="text-muted-foreground">dev</span>
      </div>
    </Link>
  );
};
