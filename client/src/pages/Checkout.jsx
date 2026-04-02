import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  MapPin, CreditCard, Truck, CheckCircle2,
  Loader2, ChevronRight, ShieldCheck, Smartphone
} from "lucide-react";

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate Totals
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = totalPrice > 999 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [shippingData, setShippingData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",   // 👈 Added
    pincode: "", // 👈 Added
    phone: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      try {
        const orderID = `SZ-${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/orders/success`,
          {
            cartItems: cart,
            orderID: orderID,
            payerName: shippingData.fullName || "Demo User",
            total: grandTotal,
            shippingAddress: shippingData, // Full address object
          paymentMethod: paymentMethod,  // ✅ Send selected payment method
        });
        setIsProcessing(false);
        setStep(3);
        setTimeout(() => { clearCart(); navigate("/"); }, 2500);
      } catch (err) {
        alert("Order failed to sync.");
        setIsProcessing(false);
      }
    }, 2000);
  };

  if (cart.length === 0 && step !== 3) return (
    <div className="py-40 text-center">
      <h2 className="text-2xl font-black uppercase italic">Your bag is empty</h2>
      <Link to="/" className="text-orange-500 font-bold underline mt-4 inline-block">Back to Shop</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* --- Stepper --- */}
      <div className="max-w-xl mx-auto px-6 py-12 flex items-center justify-between">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`flex items-center flex-1 last:flex-none`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-black italic ${step >= s ? 'border-orange-500 bg-orange-50 text-orange-500' : 'border-zinc-100 text-zinc-300'}`}>
              {s === 3 && step === 3 ? <CheckCircle2 size={20} /> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-[2px] mx-4 ${step > s ? 'bg-orange-500' : 'bg-zinc-100'}`} />}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          {step === 1 && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-8 text-zinc-900">Shipping <span className="text-orange-500">Info</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                  {/* Full Name & Address take full width */}
                  <div className="md:col-span-6 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Full Name</label>
                    <input name="fullName" value={shippingData.fullName} onChange={handleInputChange} className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold" placeholder="Amal P Anil" />
                  </div>

                  <div className="md:col-span-6 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Street Address</label>
                    <input name="address" value={shippingData.address} onChange={handleInputChange} className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold" placeholder="Flat/House No, Building, Street" />
                  </div>

                  {/* City, State, Pincode in one professional row */}
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">City</label>
                    <input name="city" value={shippingData.city} onChange={handleInputChange} className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold" placeholder="Kochi" />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">State</label>
                    <input name="state" value={shippingData.state} onChange={handleInputChange} className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold" placeholder="Kerala" />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Pincode</label>
                    <input name="pincode" value={shippingData.pincode} onChange={handleInputChange} className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold" placeholder="682001" />
                  </div>

                  <div className="md:col-span-6 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Phone Number</label>
                    <input name="phone" value={shippingData.phone} onChange={handleInputChange} className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold" placeholder="+91 98765 43210" />
                  </div>
                </div>              </div>
              <button onClick={() => setStep(2)} className="mt-10 bg-zinc-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-orange-500 transition-all shadow-xl shadow-zinc-200">
                Next: Payment <ChevronRight size={14} />
              </button>
            </section>
          )}

          {step === 2 && (
            <section className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-8 text-zinc-900">Choose <span className="text-orange-500">Payment</span></h2>
              <div className="space-y-4">
                {['Credit Card', 'UPI / GPay', 'Cash on Delivery'].map((m, i) => (
                  <div key={i} onClick={() => setPaymentMethod(m)} className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === m ? 'border-orange-500 bg-orange-50/50' : 'border-zinc-100'}`}>
                    <span className="font-black uppercase italic tracking-tight text-zinc-800">{m}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === m ? 'border-orange-500' : 'border-zinc-200'}`}>
                      {paymentMethod === m && <div className="w-3 h-3 bg-orange-500 rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex gap-4">
                <button onClick={() => setStep(1)} className="px-8 py-5 text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Back</button>
                <button onClick={handlePlaceOrder} disabled={isProcessing} className="flex-1 bg-zinc-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-orange-500 shadow-xl shadow-orange-100 transition-all">
                  {isProcessing ? <><Loader2 className="animate-spin" size={18} /> Verifying...</> : `Confirm ₹${grandTotal.toLocaleString()}`}
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <div className="text-center py-20 animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8"><CheckCircle2 size={48} /></div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-zinc-900">Order <span className="text-orange-500">Confirmed!</span></h2>
              <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest mt-6">Redirecting to shope...</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="bg-zinc-50 rounded-[40px] p-8 border border-zinc-100 sticky top-24">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 italic">Your Package</h3>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white rounded-2xl border border-zinc-100 p-2 shrink-0">
                    <img src={item.image?.startsWith('http') ? item.image : `http://localhost:5000/uploads/${item.image}`} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black uppercase italic text-zinc-900 truncate">{item.name}</p>
                    <p className="text-[9px] font-bold text-zinc-400 mt-1 uppercase tracking-tighter">Size {item.selectedSize} <span className="mx-1">•</span> Qty {item.quantity}</p>
                  </div>
                  <p className="text-xs font-black italic text-zinc-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-200 pt-6 space-y-3">
              <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-400 tracking-widest"><span>Shipping</span><span className="text-green-500">FREE</span></div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-xs font-black uppercase text-zinc-900">Total</span>
                <span className="text-4xl font-black italic text-zinc-900 leading-none tracking-tighter">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;