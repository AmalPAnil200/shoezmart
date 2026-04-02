import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Filter, X } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ── FILTER STATE ──
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: 20000,
    selectedSizes: [],
    selectedColors: []
  });

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ── MULTI-FILTER LOGIC ──
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = filters.category === "All" || p.category === filters.category;
      const matchPrice = p.price <= filters.priceRange;
      
      const pSizes = p.sizes?.split(",") || [];
      const matchSize = filters.selectedSizes.length === 0 || 
                        filters.selectedSizes.some(s => pSizes.includes(s));

      const pColors = p.colors?.split(",") || [];
      const matchColor = filters.selectedColors.length === 0 || 
                         filters.selectedColors.some(c => pColors.includes(c));

      return matchCategory && matchPrice && matchSize && matchColor;
    });
  }, [products, filters]);

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const current = prev[type];
      const exists = current.includes(value);
      return {
        ...prev,
        [type]: exists ? current.filter(i => i !== value) : [...current, value]
      };
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-zinc-50 border-b border-zinc-100 py-12 px-6">
        <h1 className="max-w-7xl mx-auto text-5xl font-black italic uppercase tracking-tighter">
          The <span className="text-orange-500">Vault</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        
        {/* ── SIDEBAR FILTERS ── */}
        <aside className="w-full md:w-64 space-y-10 shrink-0">
          {/* Price Filter */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 mb-4">Max Price: ₹{filters.priceRange}</h4>
            <input 
              type="range" min="1000" max="20000" step="500"
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="w-full accent-zinc-900"
            />
          </div>

          {/* Size Filter */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 mb-4">Sizes (UK)</h4>
            <div className="grid grid-cols-3 gap-2">
              {["7", "8", "9", "10", "11", "12"].map(size => (
                <button 
                  key={size}
                  onClick={() => toggleFilter('selectedSizes', size)}
                  className={`py-2 text-xs font-bold rounded-lg border-2 transition-all ${filters.selectedSizes.includes(size) ? "bg-zinc-900 text-white border-zinc-900" : "border-zinc-100 text-zinc-400 hover:border-zinc-200"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 mb-4">Colors</h4>
            <div className="flex flex-wrap gap-3">
              {["Red", "Black", "White", "Blue", "Green"].map(color => (
                <button 
                  key={color}
                  onClick={() => toggleFilter('selectedColors', color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${filters.selectedColors.includes(color) ? "border-zinc-900 scale-110" : "border-zinc-100"}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={() => setFilters({ category: "All", priceRange: 20000, selectedSizes: [], selectedColors: [] })}
            className="w-full py-3 text-[10px] font-black uppercase tracking-widest border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all"
          >
            Reset Filters
          </button>
        </aside>

        {/* ── PRODUCT GRID ── */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8">
             <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">{filteredProducts.length} Results Found</p>
          </div>

          {loading ? (
             <div className="flex justify-center py-20 animate-spin"><div className="h-8 w-8 border-t-2 border-orange-500 rounded-full"/></div>
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

export default Shop;