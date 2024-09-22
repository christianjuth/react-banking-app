import Link from "next/link";
import * as routes from "@/lib/routes";
import { BottomTabNavigator, Sidebar, Drawer } from "@/components/nav.client";
import { Logo } from '@/components/icons'
import { getSessionFromCookie } from '@/lib/server/service/session'
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionFromCookie();

  if (!user) {
    redirect(routes.login);
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="h-14 border-b flex flex-row items-center justify-between px-4 fixed top-0 inset-x-0 bg-background/70 z-20 backdrop-blur">
          <Drawer />

          <Link
            href={routes.home}
            className="md:flex-1 flex flex-row items-center space-x-1 mr-3"
          >
            <Logo className="text-2xl fill-primary -mt-0.5" />
            <span className="font-black text-2xl">BANK</span>
          </Link>

          {/* <SearchBar /> */}

          <div className="md:flex-1 flex items-center justify-end ml-3">
            <>
              {/* <Link href={routes.user(user.data.handle)}> */}
                {/* <ActorAvatar actor={user.data} className="h-8 w-8" /> */}
              {/* </Link> */}
            </>
          </div>
        </div>

        <div className="h-14" />

        <aside className="fixed left-0 bottom-0 w-60 border-r top-14 p-6 max-md:hidden overflow-y-auto">
          <Sidebar />
        </aside>

        <main className="w-full mx-auto md:pl-60">{children}</main>

        <BottomTabNavigator />
      </div>
    </>
  );
}
