import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Loader2, CheckCircle2, Trash2 } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  // ── DEMO PAYMENT STATES ──
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = totalPrice > 999 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  // ── SIMULATED PAYMENT HANDLER ──
  const handleDemoPayment = async () => {
    setIsProcessing(true);

    // Simulate bank processing delay (2.5 seconds)
    setTimeout(async () => {
      try {
        const demoOrderID = `SZ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // 1. Send data to your existing backend route
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/orders/success`,
          {
            cartItems: cart,
            orderID: demoOrderID,
            payerName: "Guest User", // Replace with auth user name if available
            total: grandTotal,
          },
        );

        setIsProcessing(false);
        setIsSuccess(true);

        // 2. Clear local cart and redirect after showing success state
        setTimeout(() => {
          clearCart();
          navigate("/admin/orders"); // Redirecting to admin to see the order immediately
        }, 2000);

      } catch (err) {
        console.error("Order processing failed:", err);
        alert("Payment simulated, but backend failed to save the order.");
        setIsProcessing(false);
      }
    }, 2500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-7xl mb-6 grayscale opacity-20">🛒</div>
        <h2 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">Your bag is empty</h2>
        <p className="text-zinc-500 text-sm mb-8 max-w-xs">Looks like you haven't added anything yet. Let's fix that.</p>
        <Link to="/" className="px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest text-white bg-zinc-900 hover:bg-orange-500 transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-zinc-900">
          Shopping <span className="text-orange-500">Bag</span>
        </h1>
        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
          {cart.length} Styles ready for dispatch
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* ── Item List ── */}
        <div className="flex-1 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-6 bg-white border border-zinc-100 rounded-[32px] p-6 group transition-all hover:border-zinc-200">
              <div className="w-32 h-32 rounded-3xl bg-zinc-50 flex items-center justify-center shrink-0 overflow-hidden border border-zinc-100">
                <img
                  src={item.image?.startsWith("http") ? item.image : `http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black uppercase italic text-zinc-900 text-lg leading-none">{item.name}</h3>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2">
                      Size: {item.selectedSize || 'N/A'} <span className="mx-2">•</span> {item.selectedColor || 'Default'}
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4 bg-zinc-50 p-1 rounded-2xl border border-zinc-100">
                    <button onClick={() => updateQuantity(item.id, -1, item.stock)} className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold hover:bg-zinc-900 hover:text-white transition-all">−</button>
                    <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1, item.stock)} disabled={item.quantity >= item.stock} className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold hover:bg-zinc-900 hover:text-white transition-all disabled:opacity-30">+</button>
                  </div>
                  <p className="font-black text-xl italic text-zinc-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order Summary ── */}
        <div className="lg:w-[380px] shrink-0">
          <div className="bg-zinc-950 text-white rounded-[40px] p-8 sticky top-24 shadow-2xl shadow-zinc-200">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8">Summary</h2>

            <div className="space-y-4 text-sm font-bold">
              <div className="flex justify-between text-zinc-400">
                <span className="uppercase tracking-widest text-[10px]">Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="uppercase tracking-widest text-[10px]">Shipping</span>
                <span className={shipping === 0 ? "text-green-400" : "text-white"}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
            </div>

            <div className="my-8 border-t border-zinc-900" />

            <div className="flex justify-between items-end mb-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Grand Total</span>
              <span className="text-4xl font-black italic leading-none">₹{grandTotal.toLocaleString()}</span>
            </div>

            {/* 🚀 DEMO PAYMENT BUTTON 🚀 */}
            <div className="space-y-4">
              <Link
                to="/checkout"
                className="w-full py-5 rounded-[24px] bg-white text-zinc-900 font-black uppercase tracking-widest text-xs flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all shadow-xl active:scale-95"
              >
                Proceed to Checkout
              </Link>

              <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                <ShieldCheck size={12} className="text-orange-500" />
                Secure Demo Gateway
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;