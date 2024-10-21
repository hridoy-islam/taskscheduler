"use client";
import { Package2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SidebarLink } from "./SidebarLink";
import { Input } from "../ui/input";
import InviteMember from "./InviteMember";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import {
  adminNavLinks,
  companyNavLinks,
  creatorNavLinks,
  directorNavLinks,
  userNavLinks,
} from "@/lib/navlinks";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Sidebar() {
  const { data: session, status } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]); // State to hold tasks
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchData = async () => {
    if (session?.user?.id) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/company/${session?.user?.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Task Scheduler </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {session?.user?.role === "admin" &&
              adminNavLinks.map((link) => (
                <SidebarLink key={link.label} {...link} />
              ))}
              {session?.user?.role === "director" &&
              directorNavLinks.map((link) => (
                <SidebarLink key={link.label} {...link} />
              ))}
            {session?.user?.role === "company" &&
              companyNavLinks.map((link) => (
                <SidebarLink key={link.label} {...link} />
              ))}
            {session?.user?.role === "creator" &&
              creatorNavLinks.map((link) => (
                <SidebarLink key={link.label} {...link} />
              ))}
            {session?.user?.role === "user" &&
              userNavLinks.map((link) => (
                <SidebarLink key={link.label} {...link} />
              ))}
            <div className="mt-2 flex-1">
              <Input
                type="text"
                placeholder="Search users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />

              {session?.user?.role === "admin" && <InviteMember />}
              <ScrollArea className="h-full max-h-[600px] overflow-auto">
                <Link href={`/dashboard/task/${session?.user?.id}`}>
                  <Button variant="ghost" className="w-full justify-start mb-2">
                    <img
                      src={"https://github.com/shadcn.png"}
                      alt={"ok"}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{session?.user?.name}</span>
                  </Button>
                </Link>
                {filteredUsers.map((user) => (
                  <Link key={user.id} href={`/dashboard/task/${user?._id}`}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start mb-2"
                    >
                      <Avatar className="w-6 h-6 rounded-full mr-2">
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}{" "}
                          {/* Get initials */}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </Button>
                  </Link>
                ))}
              </ScrollArea>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
