import { useState, useEffect, useMemo } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { API_BASE_URL } from "../api/config";
import sneakerHero from "../assets/images/s-1.png";
import Hero from "../components/Hero";

// Matches the categories in your Navbar
const FILTERS = ["All", "Men", "Women", "Kids", "Sale"];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const location = useLocation();
  const navigate = useNavigate();


  const vibes = [
    { name: "Basketball", path: "/basketball", label: "Performance", img: "..." },
    { name: "Streetwear", path: "/streetwear", label: "Lifestyle", img: "..." },
    { name: "Athletic", path: "/athletic", label: "Running", img: "..." },
  ];

  const searchQuery = useMemo(
    () => new URLSearchParams(location.search).get("search") || "",
    [location.search],
  );

  useEffect(() => {
    const getShoes = async () => {
      setLoading(true);
      try {
        const url = searchQuery
          ? `${API_BASE_URL}/api/products/search?q=${searchQuery}`
          : `${API_BASE_URL}/api/products`;
        const res = await axios.get(url);
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Could not load shoes:", err);
      } finally {
        setLoading(false);
      }
    };
    getShoes();
  }, [searchQuery]);

  // Client-side filtering logic
  const filtered = useMemo(() => {
    return activeFilter === "All"
      ? products
      : products.filter(
        (p) =>
          p.category?.toLowerCase() === activeFilter.toLowerCase() ||
          p.name?.toLowerCase().includes(activeFilter.toLowerCase()),
      );
  }, [products, activeFilter]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      {/* ── 1. HIGH-ENERGY HERO SECTION ── */}
      <Hero />

      {/* ── 2. FILTER & TOOLBAR ── */}
      {/* <div className="sticky top-16 md:top-20 z-40 bg-white/80 backdrop-blur-lg border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${activeFilter === f
                  ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Showing {filtered.length} styles
          </p>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4">
          Editorial
        </p>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Featured <span className="text-orange-500">Products</span>
        </h1>

        <div className="w-20 h-[2px] bg-orange-500 mx-auto mt-6"></div>
      </div>
      {/* ── 3. PRODUCT GRID ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 12).map((shoe) => (
            <ProductCard key={shoe.id} product={shoe} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/shop" className="bg-zinc-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all">
            View Full Collection
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-2">
              Editorial
            </p>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
              The Season's <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(110deg, #f97316, #e52e71)" }}
              >
                Finest Kicks
              </span>
            </h2>
          </div>
          <a
            href="/shop"
            className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M3 12h18" />
            </svg>
          </a>
        </div>

        {/* ── Asymmetric tile grid ── */}
        <div className="grid grid-cols-12 grid-rows-[280px_280px] gap-4">

          {/* Tile 1 — large left (spans 2 rows) */}
          <div className="col-span-12 md:col-span-5 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900"
              alt="Feature drop"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            {/* Tag pill */}
            <span className="absolute top-5 left-5 bg-orange-500 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              New Drop
            </span>

            <div className="absolute bottom-7 left-7 right-7 text-white">
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white/60 mb-1">
                Men's Running
              </p>
              <h3 className="text-2xl font-black uppercase italic leading-tight mb-3">
                Airwave Pro <br /> V2 2026
              </h3>
              {/* <a
                href="/product/1"
                className="inline-flex items-center gap-2 bg-white text-zinc-900 text-[11px] font-black uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-orange-500 hover:text-white transition-all"
              >
                Shop Now
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M3 12h18" />
                </svg>
              </a> */}
            </div>
          </div>

          {/* Tile 2 — top right wide */}
          <div className="col-span-12 md:col-span-4 row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=700"
              alt="Streetwear"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute top-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              Lifestyle
            </span>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/60 mb-0.5">Streetwear</p>
              <h3 className="text-xl font-black uppercase italic">Urban Core</h3>
            </div>
          </div>

          {/* Tile 3 — top right narrow */}
          <div className="col-span-12 md:col-span-3 row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer bg-zinc-950">
            <img
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600"
              alt="Limited"
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
            <span
              className="absolute top-5 left-5 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
              style={{ background: "linear-gradient(110deg,#f97316,#e52e71)" }}
            >
              Limited
            </span>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50 mb-0.5">Exclusive</p>
              <h3 className="text-xl font-black uppercase italic">Only 50 Pairs</h3>
            </div>
          </div>

          {/* Tile 4 — bottom right, spans both middle cols */}
          <div className="col-span-12 md:col-span-7 row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?q=80&w=900"
              alt="Basketball"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            <span className="absolute top-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              Performance
            </span>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/60 mb-0.5">Basketball</p>
              <h3 className="text-xl font-black uppercase italic">Court Dominator</h3>
            </div>

            {/* Floating price tag */}
            {/* <div className="absolute bottom-6 right-6 bg-white rounded-2xl px-4 py-3 text-right shadow-lg">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 leading-none mb-1">
                Starting at
              </p>
              <p className="text-lg font-black text-zinc-900 leading-none">₹2,499</p>
            </div> */}
          </div>

        </div>
      </section>

      {/*Drop-in replacement for the trust/features strip section*/}

      <section className="bg-white py-10 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                ),
                gradient: "from-orange-50 to-amber-50",
                accent: "text-orange-500",
                title: "Free Shipping",
                desc: "On orders over ₹999",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                gradient: "from-emerald-50 to-teal-50",
                accent: "text-emerald-500",
                title: "Secure Payment",
                desc: "100% protected",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
                  </svg>
                ),
                gradient: "from-blue-50 to-sky-50",
                accent: "text-blue-500",
                title: "Easy Returns",
                desc: "30-day window",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ),
                gradient: "from-pink-50 to-rose-50",
                accent: "text-pink-500",
                title: "Premium Quality",
                desc: "Certified authentic",
              },
            ].map((trait, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 bg-gradient-to-br ${trait.gradient} px-6 py-7 group cursor-default`}
              >
                {/* Icon box */}
                <div
                  className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-white shadow-sm border border-zinc-100 ${trait.accent} group-hover:scale-110 transition-transform duration-200`}
                >
                  {trait.icon}
                </div>

                {/* Text */}
                <div>
                  <p className="text-[13px] font-black uppercase tracking-widest text-zinc-900 leading-none">
                    {trait.title}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-medium mt-1.5 leading-none">
                    {trait.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* --- Visual Categories Section --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8">
          Shop by <span className="text-orange-500">Vibe</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Basketball",
              path: "/basketball",
              label: "Performance",
              img: "https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?q=80&w=800",
            },
            {
              name: "Streetwear",
              path: "/streetwear",
              label: "Lifestyle",
              img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800",
            },
            {
              name: "Athletic",
              path: "/athletic",
              label: "Running",
              img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
            },
          ].map((vibe, i) => (
            <div
              key={i}
              onClick={() => navigate(vibe.path)} // ✅ FIXED (only change)
              className="relative h-80 rounded-[32px] overflow-hidden group cursor-pointer border border-zinc-100"
            >
              {/* Image */}
              <img
                src={vibe.img}
                alt={vibe.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1 opacity-70">
                  {vibe.label}
                </p>
                <h3 className="text-3xl font-black uppercase italic">
                  {vibe.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FOOTER PREVIEW ── */}
      <footer className="bg-zinc-950 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black italic mb-6">
            SHOE<span className="text-orange-500">ZMART</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto mb-10">
            Join our newsletter to receive the latest updates on exclusive drops
            and member-only rewards.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 bg-zinc-900 border-zinc-800 rounded-lg px-4 text-sm focus:ring-orange-500"
            />
            <button className="bg-orange-500 px-6 py-2 rounded-lg font-bold">
              Join
            </button>
          </div>
        </div>
      </footer>

      <div className="bg-orange-500 py-4 overflow-hidden whitespace-nowrap border-y-2 border-zinc-900">
        <div className="flex animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-zinc-900 font-black italic uppercase text-2xl mx-8">
              Limited Drops Available • 100% Authentic • ShoeZmart Exclusive •
            </span>
          ))}
        </div>
      </div>

      <style>{`
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: inline-flex;
    animation: marquee 20s linear infinite;
  }
`}</style>

      {/* Custom Styles for Ticker and Animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Home;
