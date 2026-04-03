import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Context & Protection
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Common Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

// Company Pages
import About from "./pages/about";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Blog from "./pages/Blog";

// Admin Pages
import AdminPanel from "./pages/admin/AdminPanel";
import OrdersPage from "./pages/admin/OrdersPage";
import AnalyticsChart from "./pages/admin/AnalyticsChart";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  const location = useLocation();

  // Route Checkers for UI visibility
  const isAdminPath = location.pathname.startsWith("/admin");
  const isLoginPath =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup") ||
    location.pathname === "/admin/login";

  return (
    <CartProvider>
      <WishlistProvider>
        {/* Vercel Deployment Tracking */}
        <Analytics />
        <SpeedInsights />

        <div className="app-wrapper min-h-screen flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
          {/* Global Navbar - Hidden on Admin/Auth pages */}
          {!isAdminPath && !isLoginPath && <Navbar />}

          <main className="content flex-grow">
            <Routes>
              {/* ── PUBLIC ROUTES ── */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />

              {/* ── AUTH ROUTES ── */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* ── DYNAMIC CATEGORY ROUTES ── */}
              <Route
                path="/men"
                element={
                  <CategoryPage
                    category="men"
                    displayName="Men's"
                    bannerColor="bg-blue-50"
                  />
                }
              />
              <Route
                path="/women"
                element={
                  <CategoryPage
                    category="women"
                    displayName="Women's"
                    bannerColor="bg-pink-50/30"
                  />
                }
              />
              <Route
                path="/kids"
                element={
                  <CategoryPage
                    category="kids"
                    displayName="Kids'"
                    bannerColor="bg-green-50/30"
                  />
                }
              />
              <Route
                path="/sale"
                element={
                  <CategoryPage
                    category="sale"
                    displayName="Hot Sale"
                    bannerColor="bg-red-50/30"
                  />
                }
              />

              {/* ── VIBE/COLLECTION ROUTES ── */}
              <Route
                path="/basketball"
                element={
                  <CategoryPage
                    category="basketball"
                    displayName="Basketball"
                    bannerColor="bg-orange-100"
                  />
                }
              />
              <Route
                path="/streetwear"
                element={
                  <CategoryPage
                    category="streetwear"
                    displayName="Streetwear"
                    bannerColor="bg-zinc-200"
                  />
                }
              />
              <Route
                path="/athletic"
                element={
                  <CategoryPage
                    category="athletic"
                    displayName="Athletic"
                    bannerColor="bg-emerald-100"
                  />
                }
              />

              {/* ── PROTECTED USER ROUTES ── */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* ── COMPANY ROUTES ── */}
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/press" element={<Press />} />
              <Route path="/blog" element={<Blog />} />

              {/* ── ADMIN ROUTES (STRICT PROTECTION) ── */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute adminOnly>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/AnalyticsChart"
                element={
                  <ProtectedRoute adminOnly>
                    <AnalyticsChart />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {/* Global Footer - Hidden on Admin/Auth pages */}
          {!isAdminPath && !isLoginPath && <Footer />}
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
