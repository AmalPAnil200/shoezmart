import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  Search,
  ShoppingBag,
  User,
  LogOut,
  X,
  Menu,
  ChevronRight,
  Zap,
  Heart,
  ArrowRight,
} from "lucide-react";

const categories = [
  // { name: "New Drops", path: "/new-drops", hot: true },
  { name: "Men", path: "/men" },
  { name: "Women", path: "/women" },
  { name: "Kids", path: "/kids" },
  // { name: "Sale 🔥", path: "/sale" },
];

const Navbar = () => {
  const { getCartCount, clearCart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole"); // 👈 Added

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus input whenever search bar opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchTerm("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchOpen(false);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    clearCart();
    navigate("/login");
  };

  const cartCount = getCartCount();

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="bg-zinc-950 text-zinc-300 text-[10px] md:text-[11px] text-center py-2.5 tracking-[0.2em] uppercase font-medium">
        <span className="inline-flex items-center gap-2">
          <Zap size={10} className="text-orange-400" />
          Free delivery over ₹999 · 30-day hassle-free returns
          <Zap size={10} className="text-orange-400" />
        </span>
      </div>

      {/* ── Sticky wrapper: nav + search bar drop together ── */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.08)]" : ""
        }`}>

        {/* ── Main Nav ── */}
        <nav className={`border-b transition-all duration-300 ${scrolled
            ? "bg-white/96 backdrop-blur-lg border-zinc-200"
            : "bg-white border-transparent"
          }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 lg:h-[70px] gap-6">

              {/* ── Brand ── */}
              <Link to="/" className="shrink-0">
                <div className="flex flex-col leading-none">
                  <span className="text-[22px] lg:text-[26px] font-black tracking-[-0.04em] text-zinc-950">
                    SHOE
                    <span
                      className="text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(110deg, #f97316, #e52e71)" }}
                    >
                      ZMART
                    </span>
                  </span>
                  <span className="text-[8px] tracking-[0.25em] uppercase text-zinc-400 font-semibold -mt-0.5 hidden sm:block">
                    Premium Footwear
                  </span>
                </div>
              </Link>

              {/* ── Category Links (desktop) ── */}
              <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    className="relative px-4 py-2 text-[17px] font-bold uppercase tracking-wide text-zinc-600 hover:text-zinc-950 transition-colors group"
                  >
                    {cat.name}
                    {cat.hot && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none">
                        New
                      </span>
                    )}
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-orange-500 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                  </Link>
                ))}
              </div>

              {/* ── Right Actions ── */}
              <div className="flex items-center gap-1 ml-auto">

                {/* Search toggle button */}
                <button
                  onClick={() => { setSearchOpen(!searchOpen); setSearchTerm(""); }}
                  className={`p-2.5 rounded-full transition-all ${searchOpen
                      ? "bg-orange-50 text-orange-500"
                      : "hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950"
                    }`}
                  aria-label="Toggle search"
                >
                  {searchOpen ? <X size={18} strokeWidth={2} /> : <Search size={18} strokeWidth={2} />}
                </button>

                {/* Auth — desktop */}
                <div className="hidden md:flex items-center gap-1">
                  {token ? (
                    <>
                      <span className="text-[13px] font-bold text-zinc-700 px-3">
                        Hi, {userName || "User"}
                      </span>
                      {userRole === "admin" && (
                        <Link
                          to="/admin"
                          className="text-[13px] font-bold text-orange-500 hover:text-orange-600 px-3 transition-colors"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-semibold text-zinc-500 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
                      >
                        <User size={15} strokeWidth={2} />
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="px-4 py-2 rounded-full text-[13px] font-bold text-white transition-all hover:opacity-90 active:scale-95"
                        style={{ background: "linear-gradient(110deg, #f97316, #e52e71)" }}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>

                {/* Wishlist */}
                <Link
                  to="/Wishlist"
                  className="p-2.5 rounded-full hover:bg-zinc-100 transition-all ml-1 relative group"
                  aria-label="Wishlist"
                >
                  <Heart size={22} strokeWidth={1.8} className="text-zinc-800 group-hover:text-orange-500 transition-colors" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-orange-500 text-white text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative p-2.5 rounded-full hover:bg-zinc-100 transition-all active:scale-90 ml-1"
                  aria-label="Cart"
                >
                  <ShoppingBag size={22} strokeWidth={1.8} className="text-zinc-800" />
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-black text-white rounded-full px-1 border-2 border-white"
                      style={{ background: "linear-gradient(135deg, #f97316, #e52e71)" }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden p-2.5 rounded-full hover:bg-zinc-100 transition-all ml-1"
                  aria-label="Menu"
                >
                  {menuOpen
                    ? <X size={20} className="text-zinc-800" />
                    : <Menu size={20} className="text-zinc-800" />
                  }
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* ── Search Drop Bar ── */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${searchOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div
            className="border-b border-zinc-800"
            style={{ background: "linear-gradient(135deg, #18181b 0%, #27272a 100%)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <form onSubmit={handleSearch}>
                {/* Input row */}
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus-within:border-orange-400/60 focus-within:bg-white/8 transition-all duration-200">
                  <Search size={20} className="text-orange-400 shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search sneakers, brands, styles…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent text-base text-white placeholder-zinc-500 focus:outline-none font-medium"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="p-1.5 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <X size={15} />
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!searchTerm.trim()}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                    style={{ background: "linear-gradient(110deg, #f97316, #e52e71)" }}
                  >
                    <ArrowRight size={15} />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>

                {/* Hint row */}
                <div className="flex items-center justify-between mt-2.5 px-1">
                  <div className="flex items-center gap-3">
                    {["Running", "Sneakers", "Nike", "Sale"].map((hint) => (
                      <button
                        key={hint}
                        type="button"
                        onClick={() => setSearchTerm(hint)}
                        className="text-[11px] text-zinc-500 hover:text-orange-400 font-medium transition-colors"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                  <span className="hidden md:flex items-center gap-1 text-[11px] text-zinc-600">
                    <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-500 font-mono text-[10px]">Esc</kbd>
                    to close
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="bg-white border-t border-zinc-100 px-6 py-6 space-y-1 shadow-xl">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em] mb-4">
              Explore
            </p>

            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 text-base font-bold text-zinc-800 hover:text-orange-500 transition-colors border-b border-zinc-50"
            >
              <span className="flex items-center gap-2">
                My Wishlist
                {wishlist.length > 0 && (
                  <span className="text-orange-500">({wishlist.length})</span>
                )}
              </span>
              <Heart size={16} className="text-zinc-300" />
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-3 text-base font-bold text-zinc-800 hover:text-orange-500 transition-colors border-b border-zinc-50"
              >
                <span className="flex items-center gap-2">
                  {cat.name}
                  {cat.hot && (
                    <span className="bg-orange-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">
                      New
                    </span>
                  )}
                </span>
                <ChevronRight size={16} className="text-zinc-300" />
              </Link>
            ))}

            <div className="pt-5 space-y-3">
              {token ? (
                <>
                  <p className="text-sm font-bold text-zinc-700">
                    Hi, {userName || "User"} 👋
                  </p>
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                    className="flex items-center gap-2 text-sm font-semibold text-red-500"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center py-3 rounded-full border border-zinc-200 text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center py-3 rounded-full text-sm font-bold text-white transition hover:opacity-90"
                    style={{ background: "linear-gradient(110deg, #f97316, #e52e71)" }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>{/* end sticky wrapper */}
    </>
  );
};

export default Navbar;