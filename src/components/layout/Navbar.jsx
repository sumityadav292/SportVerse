import { AnimatePresence, motion } from "framer-motion";
import { Menu, Radio, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeButton from "../ui/ThemeButton";

const links = [
  { to: "/", label: "Home" },
  { to: "/live", label: "Live" },
  { to: "/fixtures", label: "Fixtures" },
  { to: "/leagues", label: "Leagues" },
  { to: "/teams", label: "Teams" },
  { to: "/players", label: "Players" },
  { to: "/favorites", label: "Favorites" },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05060A]/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg tracking-tight">
          <Radio className="h-5 w-5 text-live" />
          SportVerse
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="relative text-sm text-white/65 hover:text-white">
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 h-0.5 w-full bg-live" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeButton />
          {isAuthenticated ? (
            <>
              <Link to="/account" className="text-sm text-white/70">
                {user.name}
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-widest"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">
                Login
              </Link>
              <Link to="/signup" className="rounded-full bg-live px-4 py-2 text-xs font-semibold uppercase tracking-widest text-studio">
                Join
              </Link>
            </>
          )}
        </div>
        <button type="button" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-3 px-4 py-4">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
