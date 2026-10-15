import { NavLink } from "react-router-dom";

const items = [
  { to: "/live", label: "Live desk" },
  { to: "/fixtures", label: "Fixtures" },
  { to: "/favorites", label: "Favorites" },
  { to: "/account", label: "Account" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-white/10 p-4 lg:block">
      <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/35">Control room</p>
      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-xl px-3 py-2 text-sm ${isActive ? "bg-live/15 text-live" : "text-white/60"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
