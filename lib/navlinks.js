import { CalendarDays, Home, Star, Sun } from "lucide-react";

export const navLinks = [
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
