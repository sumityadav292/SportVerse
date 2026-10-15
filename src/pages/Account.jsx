import { useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import Sidebar from "../components/layout/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-10">
      <Sidebar />
      <GlassCard className="flex-1">
        <h1 className="font-display text-3xl">Account</h1>
        <p className="mt-2 text-white/50">{user?.name}</p>
        <p className="text-sm text-white/40">{user?.email}</p>
        <button
          type="button"
          className="mt-8 rounded-full border border-white/15 px-5 py-2 text-sm"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </GlassCard>
    </div>
  );
}
