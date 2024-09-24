import Link from "next/link";

export const SidebarLink = ({ href, icon: Icon, label, active }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      active
        ? "bg-muted text-primary"
        : "text-muted-foreground hover:text-primary"
    }`}
  >
    <Icon className="h-4 w-4" />
    {label}
  </Link>
);
