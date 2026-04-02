import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Search, ArrowLeft, Sparkles, Footprints } from "lucide-react";

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q") || "";

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query.trim()) return;
            setLoading(true);
            try {
                // If user searches "shoes", we fetch all products for a better experience
                const isGenericSearch = ["shoes", "sneakers", "footwear", "shoe"].includes(query.toLowerCase().trim());

                const endpoint = isGenericSearch
                    ? `${import.meta.env.VITE_API_BASE_URL}/api/products`
                    : `${import.meta.env.VITE_API_BASE_URL}/api/products/search?q=${query}`;

                const res = await axios.get(endpoint);
                setProducts(res.data);

                // Fetch recommendations only if results are empty
                if (res.data.length === 0) {
                    const recRes = await axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/api/products`,
                    );
                    setRecommendations(recRes.data.slice(0, 4));
                }
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* ── Header ── */}
            <div className="bg-zinc-50 border-b border-zinc-100 py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="text-zinc-400 hover:text-zinc-900 text-[10px] font-black flex items-center gap-2 mb-6 transition-colors tracking-widest uppercase">
                        <ArrowLeft size={14} /> Back to Collection
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
                        {products.length > 0 ? "Found Your Style" : "Vault Empty"}
                    </h1>
                    <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-3 bg-white inline-block px-4 py-1.5 rounded-full border border-zinc-100">
                        {query ? `Results for: ${query}` : "All Products"}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500"></div>
                        <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest animate-pulse">Searching the vault...</p>
                    </div>
                ) : products.length === 0 ? (
                    /* ── ❌ NO RESULTS STATE ── */
                    <div className="space-y-16">
                        <div className="text-center py-20 bg-zinc-50 rounded-[40px] border-2 border-dashed border-zinc-200">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-6">
                                <Search size={32} className="text-zinc-200" />
                            </div>
                            <h2 className="text-2xl font-black uppercase italic text-zinc-900">Oops! No match for "{query}"</h2>
                            <p className="text-zinc-400 text-sm mt-2 mb-8 max-w-sm mx-auto font-medium">
                                We couldn't find that exact pair. Try brands like Nike or Jordan, or browse our full collection.
                            </p>
                            <Link to="/" className="inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-100">
                                Browse All Sneakers
                            </Link>
                        </div>

                        {/* ── Recommendations ── */}
                        {recommendations.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <Sparkles className="text-orange-500" size={20} />
                                    <h3 className="text-xl font-black uppercase italic tracking-tight">Top Picks for You</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {recommendations.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* ── ✅ RESULTS GRID ── */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;