import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { CircleUser, Menu, Package2 } from "lucide-react";
import Link from "next/link";
import {
  adminNavLinks,
  companyNavLinks,
  creatorNavLinks,
  userNavLinks,
} from "@/lib/navlinks";
import { SidebarLink } from "./SidebarLink";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import Logout from "./Logout";

export default async function DashboardHeader() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Task Scheduler </span>
            </Link>
            {session.user.role === "admin" &&
              adminNavLinks.map((link) => (
                <SidebarLink key={link.label} {...link} />
              ))}
            {session.user.role === "company" &&
              companyNavLinks.map((link) => (
                <SidebarLink key={link.label} {...link} />
              ))}
            {session.user.role === "creator" &&
              creatorNavLinks.map((link) => (
                <SidebarLink key={link.label} {...link} />
              ))}
            {session.user.role === "user" &&
              userNavLinks.map((link) => (
                <SidebarLink key={link.label} {...link} />
              ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1"></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <Logout />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
