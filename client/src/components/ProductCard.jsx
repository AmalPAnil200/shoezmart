import React from "react";
import { Link } from "react-router-dom";
import { Heart, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { API_BASE_URL } from "../api/config";

import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const active = isInWishlist(product.id);

  const imageSrc = product?.image?.startsWith("http")
    ? product.image
    : `${API_BASE_URL}/uploads/${product.image}`;

  // Navigate to product detail page on Add to Bag
  const handleAddToBag = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className={"group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-zinc-100"}>
      
      {/* Image Section */}
      <div className="relative bg-[#f0f0f0] rounded-2xl m-3 overflow-hidden aspect-square flex items-center justify-center">
        <Link to={`/product/${product.id}`} className="w-full h-full">
          <img
            src={imageSrc}
            alt={product?.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 left-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 hover:scale-110 transition-all shadow-sm"
        >
          <Heart
            size={18}
            fill={active ? "#ef4444" : "none"}
            className={active ? "text-red-500" : "text-zinc-400"}
          />
        </button>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-2xl z-10 pointer-events-none">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-white px-3 py-1.5 rounded-full border border-zinc-200">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Info & Selection */}
      <div className="px-4 pb-4 flex flex-col gap-2">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 line-clamp-1">{product.name}</h3>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{product.category}</p>
        </div>


        {/* Removed Color and Size Selection UI for better UX */}


        <div className="flex items-center justify-between mt-1">
          <p className="text-base font-black text-zinc-900">₹{product.price.toLocaleString()}</p>
        </div>

        <button
          disabled={isOutOfStock}
          onClick={handleAddToBag}
          className={`mt-1 w-full py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all 
            ${isOutOfStock
                ? "bg-zinc-100 text-zinc-300 cursor-not-allowed" 
                : "bg-zinc-900 text-white hover:bg-orange-600 active:scale-95 shadow-md"
            }`}
        >
          {isOutOfStock ? "Unavailable" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;