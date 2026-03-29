import { useEffect, useState } from "react";
import Header from "./components/Header";
import { AppProvider } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";

function useRouter() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate = (newPath: string) => {
    window.history.pushState(null, "", newPath);
    setPath(newPath);
  };

  return { path, navigate };
}

function AppRoutes() {
  const { path, navigate } = useRouter();
  const isAdminRoute = path.startsWith("/admin");

  return (
    <div className="min-h-screen">
      {!isAdminRoute && <Header onNavigate={navigate} currentPath={path} />}
      {path === "/" && <HomePage />}
      {path === "/admin" && <AdminLogin onNavigate={navigate} />}
      {path === "/admin/dashboard" && <AdminDashboard onNavigate={navigate} />}
      {!["/", "/admin", "/admin/dashboard"].includes(path) && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
          <div className="text-center">
            <h1
              className="text-6xl font-bold text-emerald-600 mb-4"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              404
            </h1>
            <p className="text-slate-600 mb-6">Page not found</p>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
