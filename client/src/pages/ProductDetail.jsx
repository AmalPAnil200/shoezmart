import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  // Prepare Data
  const sizes = product?.sizes?.split(",") || ["7", "8", "9", "10", "11"];
  const colors = product?.colors ? product.colors.split(",") : [];

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`,
        );
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        if (!data) throw new Error("Not found");
        setProduct(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-black uppercase italic">Shoe Not Found!</h2>
      <Link to="/" className="text-orange-500 font-bold underline">Back to Shop</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <Link to="/" className="text-zinc-400 hover:text-zinc-900 text-xs font-black flex items-center gap-2 mb-10 transition-colors tracking-widest uppercase">
          ← BACK TO COLLECTION
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* ── Left: Image ── */}
          <div className="bg-zinc-50 rounded-[40px] p-12 flex items-center justify-center border border-zinc-100 h-fit sticky top-24">
            <img
              src={product?.image?.startsWith("http") ? product.image : `${import.meta.env.VITE_API_BASE_URL}/uploads/${product.image}`}
              alt={product?.name}
              className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* ── Right: Details ── */}
          <div className="flex flex-col">
            <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-4">
              {product.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-zinc-900 mb-6 leading-[0.9]">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-zinc-900 italic">₹{product.price}</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${product.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                {product.stock > 0 ? `${product.stock} Units In Stock` : "Out of Stock"}
              </span>
            </div>

            {/* ── Color Selection ── */}
            {colors.length > 0 && (
              <div className="mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">
                  Available Colors
                </h4>
                <div className="flex gap-4">
                  {colors.map((color) => {
                    // 🚀 THE FIX: Clean the string so CSS understands it
                    const cleanColor = color.trim().toLowerCase();

                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color.trim())}
                        className={`w-10 h-10 rounded-full border-2 transition-all p-1 ${selectedColor === color.trim()
                            ? "border-zinc-900 scale-110 shadow-lg"
                            : "border-transparent"
                          }`}
                      >
                        <div
                          className="w-full h-full rounded-full border border-zinc-200 shadow-inner"
                          style={{ backgroundColor: cleanColor }} // CSS works now
                          title={color.trim()}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Size Selection ── */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Select Size (UK)</h4>
                <button className="text-[10px] font-bold text-zinc-400 underline underline-offset-4 uppercase">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 rounded-2xl border-2 font-black transition-all active:scale-90 text-sm ${selectedSize === size
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-xl"
                      : "border-zinc-100 text-zinc-400 hover:border-zinc-200"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-zinc-500 text-lg leading-relaxed mb-10 border-l-4 border-zinc-100 pl-6 italic">
              {product.description || "Designed for ultimate performance and street-ready style, this silhouette provides unmatched comfort and durability."}
            </p>

            {/* ── Add to Cart Button ── */}
            <button
              disabled={product.stock <= 0 || !selectedSize}
              onClick={() => addToCart({ ...product, selectedSize, selectedColor })}
              className={`w-full py-6 rounded-[32px] font-black uppercase tracking-widest text-lg transition-all active:scale-95 shadow-2xl ${product.stock > 0 && selectedSize
                ? "bg-zinc-900 text-white hover:bg-orange-500 shadow-orange-200"
                : "bg-zinc-100 text-zinc-300 cursor-not-allowed border border-zinc-200 shadow-none"
                }`}
            >
              {product.stock <= 0 ? "Sold Out" : !selectedSize ? "Select a Size" : "Add to Bag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
