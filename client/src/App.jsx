import { Routes, Route, useLocation } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CategoryPage from "./pages/CategoryPage";
import AdminPanel from "./pages/admin/AdminPanel";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import SearchPage from "./pages/SearchPage";
import Shop from "./pages/Shop";
import OrdersPage from "./pages/admin/OrdersPage";
import Checkout from "./pages/Checkout";
import AnalyticsChart from "./pages/admin/AnalyticsChart";
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 Added
import About from "./pages/about";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Blog from "./pages/Blog";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  const location = useLocation();
  // This now works because the Router is in main.jsx!
  const isAdminPath = location.pathname.startsWith("/admin");
  const isLoginPath =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup") ||
    location.pathname === "/admin/login";

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="app-wrapper min-h-screen flex flex-col">
          {/* Navbar hides on Admin routes */}
          {!isAdminPath && !isLoginPath && <Navbar />}

          <main className="content flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Category Routes */}
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
              t
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
              {/* Existing Routes */}
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
                    bannerColor="bg-pink-50"
                  />
                }
              />
              {/* 🚀 NEW VIBE ROUTES */}
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
              {/* Functional Routes */}
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/press" element={<Press />} />
              <Route path="/blog" element={<Blog />} />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute adminOnly>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
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
              {/* Admin Route */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {/* Footer hides on Admin routes */}
          {!isAdminPath && !isLoginPath && <Footer />}
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
