import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Account from "./pages/Account";
import Favorites from "./pages/Favorites";
import Fixtures from "./pages/Fixtures";
import Home from "./pages/Home";
import Leagues from "./pages/Leagues";
import LiveScores from "./pages/LiveScores";
import Login from "./pages/Login";
import MatchDetails from "./pages/MatchDetails";
import PlayerProfile from "./pages/PlayerProfile";
import Players from "./pages/Players";
import Signup from "./pages/Signup";
import TeamProfile from "./pages/TeamProfile";
import Teams from "./pages/Teams";

function Page({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/fixtures" element={<Page><Fixtures /></Page>} />
          <Route path="/leagues" element={<Page><Leagues /></Page>} />
          <Route path="/teams" element={<Page><Teams /></Page>} />
          <Route path="/teams/:id" element={<Page><TeamProfile /></Page>} />
          <Route path="/players" element={<Page><Players /></Page>} />
          <Route path="/players/:id" element={<Page><PlayerProfile /></Page>} />
          <Route
            path="/live"
            element={
              <ProtectedRoute>
                <Page><LiveScores /></Page>
              </ProtectedRoute>
            }
          />
          <Route
            path="/match/:id"
            element={
              <ProtectedRoute>
                <Page><MatchDetails /></Page>
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Page><Favorites /></Page>
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Page><Account /></Page>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Page><Login /></Page>} />
          <Route path="/signup" element={<Page><Signup /></Page>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
