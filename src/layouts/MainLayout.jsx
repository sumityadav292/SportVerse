import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-studio bg-studio-grid bg-[size:80px_80px]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
