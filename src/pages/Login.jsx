import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff, Radio } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AnimatedButton from "../components/ui/AnimatedButton";
import SportsBall3D from "../components/three/SportsBall3D";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || password.length < 6) {
      setError("Enter a valid email and 6+ character password.");
      return;
    }
    setLoading(true);
    try {
      await login({ email, password, remember });
      setSuccess(true);
      setTimeout(() => navigate(from, { replace: true }), 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden min-h-[50vh] lg:block">
        <SportsBall3D className="h-screen w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-studio" />
      </div>
      <div className="relative flex items-center justify-center px-6 py-16">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="ok"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="grid h-24 w-24 place-items-center rounded-full bg-live text-studio"
            >
              <Check className="h-10 w-10" />
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass w-full max-w-md rounded-3xl p-8"
            >
              <div className="mb-8 flex items-center gap-2 font-display text-xl">
                <Radio className="text-live" />
                SportVerse
              </div>
              <h1 className="font-display text-3xl">Enter the studio</h1>
              <p className="mt-2 text-sm text-white/50">Live desks unlock after you sign in.</p>

              <label className="relative mt-8 block">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pb-2 pt-5 outline-none focus:border-live"
                />
                <span className="pointer-events-none absolute left-4 top-3 text-xs text-white/40 transition-all peer-focus:top-1.5 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-1.5">
                  Email
                </span>
              </label>
              <label className="relative mt-4 block">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pb-2 pt-5 pr-10 outline-none focus:border-live"
                />
                <span className="pointer-events-none absolute left-4 top-3 text-xs text-white/40">Password</span>
                <button type="button" className="absolute right-3 top-3.5 text-white/40" onClick={() => setShow((v) => !v)}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </label>

              <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  Remember me
                </label>
                <span className="cursor-pointer text-cyan">Forgot password</span>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ x: 0 }}
                    animate={{ x: [0, -8, 8, -6, 6, 0] }}
                    className="mt-4 rounded-xl border border-crimson/40 bg-crimson/10 px-3 py-2 text-sm text-crimson shadow-crimson"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatedButton type="submit" loading={loading} className="mt-6">
                Sign in
              </AnimatedButton>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button type="button" className="rounded-xl border border-white/10 py-2 text-sm">
                  Google
                </button>
                <button type="button" className="rounded-xl border border-white/10 py-2 text-sm">
                  Apple
                </button>
              </div>
              <p className="mt-6 text-center text-sm text-white/45">
                New here?{" "}
                <Link to="/signup" className="text-live">
                  Create an account
                </Link>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
