import { AnimatePresence, motion } from "framer-motion";
import { Check, Radio } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedButton from "../components/ui/AnimatedButton";
import SportsBall3D from "../components/three/SportsBall3D";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", terms: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = useMemo(() => {
    const p = form.password;
    let score = 0;
    if (p.length >= 6) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/\d/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;
    return score;
  }, [form.password]);

  const colors = ["#FF2D55", "#FF2D55", "#FBBF24", "#22D3EE", "#00FF87"];

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email.includes("@")) {
      setError("Add your name and a valid email.");
      return;
    }
    if (form.password.length < 6 || form.password !== form.confirm) {
      setError("Passwords must match and be 6+ characters.");
      return;
    }
    if (!form.terms) {
      setError("Accept terms to continue.");
      return;
    }
    setLoading(true);
    try {
      await signup(form);
      setSuccess(true);
      setTimeout(() => navigate("/", { replace: true }), 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <SportsBall3D variant="basketball" className="h-screen w-full" />
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="ok" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="grid h-24 w-24 place-items-center rounded-full bg-live text-studio">
              <Check className="h-10 w-10" />
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass w-full max-w-md rounded-3xl p-8">
              <div className="mb-6 flex items-center gap-2 font-display text-xl">
                <Radio className="text-live" /> SportVerse
              </div>
              <h1 className="font-display text-3xl">Create your desk</h1>
              {["name", "email", "password", "confirm"].map((field) => (
                <input
                  key={field}
                  type={field.includes("password") || field === "confirm" ? "password" : "text"}
                  placeholder={field === "confirm" ? "Confirm password" : field[0].toUpperCase() + field.slice(1)}
                  className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-live"
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                />
              ))}
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full" animate={{ width: `${strength * 25}%`, backgroundColor: colors[strength] }} />
              </div>
              <label className="mt-4 flex items-center gap-2 text-xs text-white/50">
                <input type="checkbox" checked={form.terms} onChange={(e) => setForm((f) => ({ ...f, terms: e.target.checked }))} />
                I agree to terms and privacy
              </label>
              {error && (
                <motion.p animate={{ x: [0, -6, 6, 0] }} className="mt-3 text-sm text-crimson">
                  {error}
                </motion.p>
              )}
              <AnimatedButton type="submit" loading={loading} className="mt-6">
                Create account
              </AnimatedButton>
              <p className="mt-6 text-center text-sm text-white/45">
                Already in?{" "}
                <Link className="text-live" to="/login">
                  Sign in
                </Link>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
