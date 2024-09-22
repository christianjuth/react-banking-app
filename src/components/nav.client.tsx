"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as routes from "@/lib/routes";
// import { logout } from "@/lib/bsky/server-actions";

import {
  HomeOutline,
  HomeFill,
  Menu,
} from "@/components/icons";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const SIDEBAR_LINKS_SECTION_1 = [
  {
    href: routes.home,
    text: "Home",
    icon: HomeOutline,
    iconActive: HomeFill,
  },
];

const matchPaths = (target: string, current: string) => {
  if (target === routes.home) {
    return current === target;
  }

  return current.startsWith(target);
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between min-h-full divide-y">
      <div className="flex flex-col space-y-1 pb-4">
        {SIDEBAR_LINKS_SECTION_1.map(
          ({ href, text, icon: Icon, iconActive: IconActive }) => (
            <Button
              key={href}
              asChild
              variant={matchPaths(href, pathname) ? "secondary" : "ghost"}
              className="justify-start px-2.5 -mx-2.5"
              size="sm"
            >
              <Link href={href}>
                {matchPaths(href, pathname) ? (
                  <IconActive className="mr-1.5 text-lg" />
                ) : (
                  <Icon className="mr-1.5 text-lg" />
                )}
                {text}
              </Link>
            </Button>
          ),
        )}
      </div>
    </div>
  );
}

export function BottomTabNavigator() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 z-20 backdrop-blur md:hidden pb-safe-or-2">
      <div className="flex flex-row justify-between pt-2 px-8">
        {SIDEBAR_LINKS_SECTION_1.map(
          ({ href, text, icon: Icon, iconActive: IconActive }) => (
            <Link href={href} className="flex flex-col items-center" key={href}>
              {matchPaths(href, pathname) ? (
                <IconActive className="mr-1.5 text-2xl" />
              ) : (
                <Icon className="mr-1.5 text-xl" />
              )}
              <span className="text-sm">{text}</span>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

export function Drawer() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="mr-3" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="overflow-y-auto h-full p-6">
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
