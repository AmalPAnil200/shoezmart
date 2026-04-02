import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ListOrdered,
  LogOut,
  Settings,
  ChartPie,
  ChevronRight,
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Inventory", path: "/admin", icon: <ShoppingBag size={18} /> },
    { name: "Orders", path: "/admin/orders", icon: <ListOrdered size={18} /> },
    { name: "Analytics", path: "/admin/AnalyticsChart", icon: <ChartPie size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* ── Sidebar ── */}
      <aside className="w-72 bg-zinc-950 text-white p-8 flex flex-col sticky top-0 h-screen">
        {/* Brand Header */}
        <div className="mb-12">
          <span className="text-xl font-black tracking-tighter block">
            SHOE<span className="text-orange-500">ZMART</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mt-1 block">
            Control Center
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 flex-grow">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                isActive(item.path)
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-[11px] font-black uppercase tracking-widest">
                  {item.name}
                </span>
              </div>
              {isActive(item.path) && <ChevronRight size={14} />}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-8 border-t border-zinc-900 space-y-2">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 p-4 rounded-2xl text-zinc-500 hover:bg-zinc-900 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest"
          >
            <LayoutDashboard size={18} />
            View Shop
          </button>

          <button
            onClick={() => {
              // Add your logout logic here
              alert("Logged out");
              navigate("/login");
            }}
            className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-500/50 hover:bg-red-500/10 hover:text-red-500 transition-all text-[11px] font-black uppercase tracking-widest"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto py-12 px-10">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
