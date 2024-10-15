import {
  CalendarDays,
  Home,
  Star,
  Sun,
  Building2,
  UserPlus,
  PersonStanding,
  User,
  Milestone,
  NotebookPen,
} from "lucide-react";

export const adminNavLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/myday", icon: Sun, label: "My Day" },
  { href: "/dashboard/notes", icon: NotebookPen, label: "Notes" },
  { href: "/dashboard/director", icon: User, label: "Directors" },
  { href: "/dashboard/company", icon: Building2, label: "Company" },
  { href: "/dashboard/creator", icon: UserPlus, label: "Creator" },
  { href: "/dashboard/user", icon: PersonStanding, label: "User" },
  { href: "/dashboard/invitation", icon: Milestone, label: "Invitations" },
  {
    href: "/dashboard/important",
    icon: Star,
    label: "Important",
    active: true,
  },
  {
    href: "/dashboard/planner",
    icon: CalendarDays,
    label: "Planner",
    active: true,
  },
];

export const companyNavLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/myday", icon: Sun, label: "My Day" },
  { href: "/dashboard/creator", icon: UserPlus, label: "Creator" },
  { href: "/dashboard/user", icon: PersonStanding, label: "User" },

  {
    href: "/dashboard/important",
    icon: Star,
    label: "Important",
    active: true,
  },
  {
    href: "/dashboard/planner",
    icon: CalendarDays,
    label: "Planner",
    active: true,
  },
];

export const creatorNavLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/myday", icon: Sun, label: "My Day" },
  { href: "/dashboard/user", icon: PersonStanding, label: "User" },
  {
    href: "/dashboard/important",
    icon: Star,
    label: "Important",
    active: true,
  },
  {
    href: "/dashboard/planner",
    icon: CalendarDays,
    label: "Planner",
    active: true,
  },
];

export const userNavLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/myday", icon: Sun, label: "My Day" },
  {
    href: "/dashboard/important",
    icon: Star,
    label: "Important",
    active: true,
  },
  {
    href: "/dashboard/planner",
    icon: CalendarDays,
    label: "Planner",
    active: true,
  },
];
