import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link to="/" className="text-zinc-400 hover:text-zinc-900 text-xs font-black flex items-center gap-2 mb-4 transition-colors">
              <ArrowLeft size={14} /> BACK TO SHOP
            </Link>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
              My <span className="text-orange-500">Wishlist</span>
            </h1>
          </div>
          <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100">
            {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
          </p>
        </div>

        {wishlist.length === 0 ? (
          /* ── Empty State ── */
          <div className="flex flex-col items-center justify-center py-32 bg-zinc-50 rounded-[40px] border-2 border-dashed border-zinc-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <ShoppingBag size={32} className="text-zinc-300" />
            </div>
            <h2 className="text-2xl font-black uppercase italic text-zinc-400">Your list is empty</h2>
            <p className="text-zinc-400 text-sm mt-2 mb-8">Add some heat to your collection.</p>
            <Link to="/" className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-100">
              Go Shopping
            </Link>
          </div>
        ) : (
          /* ── Wishlist Grid ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((product) => {
              const imageSrc = product?.image?.startsWith("http")
                ? product.image
                : `${import.meta.env.VITE_API_BASE_URL}/uploads/${product.image}`;

              return (
                <div key={product.id} className="group relative flex flex-col bg-white rounded-[32px] p-4 border border-zinc-100 hover:border-zinc-200 transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-100">
                  
                  {/* Image Container */}
                  <div className="relative aspect-square bg-zinc-50 rounded-2xl overflow-hidden mb-4">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={imageSrc} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = "https://placehold.co/400x300?text=No+Image"; }}
                      />
                    </Link>

                    {/* Remove Button (Trash Icon) */}
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-3 right-3 p-2.5 bg-white text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl shadow-sm border border-zinc-100 transition-all active:scale-90"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="px-2 flex-1">
                    <h3 className="font-bold text-zinc-900 line-clamp-1 uppercase italic tracking-tight">{product.name}</h3>
                    <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-3">{product.category}</p>
                    <p className="text-xl font-black text-zinc-900">₹{product.price.toLocaleString()}</p>
                  </div>

                  {/* Action Button */}
                  <button
                    disabled={product.stock <= 0}
                    onClick={() => addToCart(product)}
                    className={`mt-6 w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg active:scale-95 ${
                      product.stock > 0 
                      ? 'bg-zinc-900 text-white hover:bg-orange-600 shadow-zinc-200' 
                      : 'bg-zinc-100 text-zinc-300 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {product.stock > 0 ? "Move to Cart" : "Out of Stock"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;