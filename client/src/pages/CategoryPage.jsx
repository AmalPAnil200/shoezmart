import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { SlidersHorizontal, ChevronRight } from "lucide-react";

const CategoryPage = ({ category, displayName, bannerColor }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── FILTER STATES ──
  const [priceRange, setPriceRange] = useState(25000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        // Fetch products for this specific category (men, women, kids, etc.)
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/search?category=${category}`,
        );
        const data = Array.isArray(res.data) ? res.data : [];
        console.log("Category API response (sanitized):", data);
        setProducts(data);
      } catch (err) {
        console.error("Filter failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredProducts();
  }, [category]);

  // ── MULTI-FILTER LOGIC (Applied to the category results) ──
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) {
        console.error("ERROR: 'products' is not an array in CategoryPage useMemo:", products);
        return [];
    }
    return products.filter((p) => {
      const matchPrice = p.price <= priceRange;

      const pSizes = p.sizes ? p.sizes.split(",").map(s => s.trim()) : null;
      const matchSize =
        selectedSizes.length === 0 ||
        (pSizes && selectedSizes.some(s => pSizes.includes(s)));

      const pColors = p.colors ? p.colors.split(",").map(c => c.trim().toLowerCase()) : null;
      const matchColor =
        selectedColors.length === 0 ||
        (pColors && selectedColors.some(c => pColors.includes(c.toLowerCase())));

      return matchPrice && matchSize && matchColor;
    });
  }, [products, priceRange, selectedSizes, selectedColors]);

  const toggleFilter = (array, setArray, value) => {
    setArray(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Dynamic Banner ── */}
      <div className={`${bannerColor} py-20 px-6 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">
          <span>Shop</span> <ChevronRight size={10} /> <span>{displayName}</span>
        </div>
        <h1 className="max-w-7xl mx-auto text-6xl md:text-8xl font-black italic uppercase text-zinc-900 tracking-tighter leading-none">
          {displayName} <span className="text-orange-500">Collection</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">

        {/* ── 🛠️ SIDEBAR FILTERS ── */}
        <aside className="w-full lg:w-64 space-y-12 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-8 text-zinc-900">
              <SlidersHorizontal size={18} />
              <h3 className="font-black uppercase italic tracking-widest text-sm">Refine By</h3>
            </div>

            {/* Price Filter */}
            <div className="mb-10">
              <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-4">Max Price: ₹{priceRange}</h4>
              <input
                type="range" min="1000" max="25000" step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* Size Filter */}
            <div className="mb-10">
              <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-4">Sizes (UK)</h4>
              <div className="grid grid-cols-3 gap-2">
                {["7", "8", "9", "10", "11", "12"].map(size => (
                  <button
                    key={size}
                    onClick={() => toggleFilter(selectedSizes, setSelectedSizes, size)}
                    className={`py-3 text-[10px] font-black rounded-xl border-2 transition-all ${selectedSizes.includes(size) ? "bg-zinc-900 text-white border-zinc-900" : "border-zinc-100 text-zinc-400 hover:border-zinc-200"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-4">Colors</h4>
              <div className="flex flex-wrap gap-3">
                {["Red", "Black", "White", "Blue", "Green"].map(color => (
                  <button
                    key={color}
                    onClick={() => toggleFilter(selectedColors, setSelectedColors, color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(color) ? "border-zinc-900 scale-125 shadow-md" : "border-zinc-100"}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => { setPriceRange(25000); setSelectedSizes([]); setSelectedColors([]); }}
              className="w-full mt-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] bg-zinc-50 text-zinc-400 rounded-2xl border border-zinc-100"
            >
              Clear All
            </button>
          </div>
        </aside>

        {/* ── 👟 PRODUCT GRID ── */}
        <main className="flex-1">
          <div className="flex justify-between items-end mb-10 pb-4 border-b border-zinc-100">
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{filteredProducts.length} Styles Found</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 mb-4"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-40 bg-zinc-50 rounded-[40px] border-2 border-dashed border-zinc-100">
              <h3 className="text-xl font-black uppercase italic text-zinc-300">No matches in this category</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;