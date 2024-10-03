"use client";
import { Package2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SidebarLink } from "./SidebarLink";
import { Input } from "../ui/input";
import InviteMember from "./InviteMember";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { navLinks } from "@/lib/navlinks";

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Kishor Zadid",
      avatar: "https://avatars.githubusercontent.com/u/7904326?v=4",
    },
    { id: 1, name: "John Doe", avatar: "https://github.com/shadcn.png" },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: 3,
      name: "Bob Johnson",
      avatar: "https://github.com/shadcn.png",
    },
    { id: 1, name: "John Doe", avatar: "https://github.com/shadcn.png" },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: 3,
      name: "Bob Johnson",
      avatar: "https://github.com/shadcn.png",
    },
    { id: 1, name: "John Doe", avatar: "https://github.com/shadcn.png" },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: 3,
      name: "Bob Johnson",
      avatar: "https://github.com/shadcn.png",
    },
    { id: 1, name: "John Doe", avatar: "https://github.com/shadcn.png" },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: 3,
      name: "Bob Johnson",
      avatar: "https://github.com/shadcn.png",
    },
    { id: 1, name: "John Doe", avatar: "https://github.com/shadcn.png" },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: 3,
      name: "Bob Johnson",
      avatar: "https://github.com/shadcn.png",
    },
    { id: 1, name: "John Doe", avatar: "https://github.com/shadcn.png" },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: 3,
      name: "Bob Johnson",
      avatar: "https://github.com/shadcn.png",
    },
  ]);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
            {navLinks.map((link) => (
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
              <InviteMember />

              <ScrollArea className="h-full max-h-[600px] overflow-auto">
                {filteredUsers.map((user) => (
                  <Link key={user.id} href="/dashboard/user/1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start mb-2"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
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
