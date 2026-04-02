import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import {
  Package,
  Truck,
  AlertCircle,
  RefreshCw,
  CreditCard,
  Trash2,
  CheckCircle,
  Clock,
} from "lucide-react";

const STATUS_STYLES = {
  Processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Shipped: "bg-blue-100 text-blue-700 border-blue-200",
  Delivered: "bg-green-100 text-green-700 border-green-200",
  Cancelled: "bg-red-100 text-red-600 border-red-200",
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Order fetch failed", err);
      setError(
        "Could not connect to server. Make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/orders/${orderId}`,
        {
          status: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === orderId ? { ...o, status: newStatus } : o,
        ),
      );
    } catch (err) {
      alert("Status update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  // 🚀 NEW: DELETE FUNCTION
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to permanently remove this order record?",
      )
    ) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        // Remove from local state — match by orderId string
        setOrders((prev) => prev.filter((o) => o.orderId !== id));
      } catch (err) {
        console.error("Delete failed", err);
        alert("Could not delete the order. Check backend routes.");
      }
    }
  };

  const safeParseItems = (items) => {
    if (!items) return [];
    if (typeof items === "string") {
      try {
        return JSON.parse(items);
      } catch {
        return [];
      }
    }
    return Array.isArray(items) ? items : [];
  };

  const safeParseAddr = (addr) => {
    if (!addr) return {};
    if (typeof addr === "string") {
      try {
        return JSON.parse(addr);
      } catch {
        return {};
      }
    }
    return typeof addr === "object" ? addr : {};
  };

  if (loading)
    return (
      <AdminLayout>
        <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4 text-zinc-400">
          <RefreshCw size={32} className="animate-spin" />
          <p className="font-black uppercase tracking-widest text-sm">
            Loading Orders...
          </p>
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Order <span className="text-orange-500">Tracking</span>
          </h1>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 px-5 py-3 bg-zinc-100 rounded-xl font-black text-[10px] uppercase tracking-widest text-zinc-500 hover:bg-zinc-200 transition-all"
          >
            <RefreshCw size={12} /> Refresh
          </button>
        </div>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="py-24 text-center bg-zinc-50 rounded-[32px] border-2 border-dashed border-zinc-200">
              <Package size={40} className="text-zinc-300 mx-auto mb-4" />
              <p className="font-bold text-zinc-400 uppercase tracking-widest text-sm">
                No orders found
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const items = safeParseItems(order.items);
              const addr = safeParseAddr(order.shippingAddress);
              const statusStyle =
                STATUS_STYLES[order.status] ||
                "bg-zinc-100 text-zinc-600 border-zinc-200";
              const isUpdating = updatingId === order.orderId;

              return (
                <div
                  key={order.orderId}
                  className="bg-white border border-zinc-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  {/* ── Header Area ── */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">
                          Ref: {order.orderId}
                        </span>
                        <button
                          onClick={() => handleDelete(order.orderId)}
                          className="p-2 text-zinc-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          title="Delete Order"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <h3 className="text-2xl font-black italic uppercase text-zinc-900 leading-none mt-1">
                        {order.payerName || "Guest User"}
                      </h3>
                      <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Clock size={10} />{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Status Controls */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${statusStyle}`}
                      >
                        {order.status}
                      </span>

                      <div
                        className={`flex items-center gap-2 bg-zinc-50 p-2 rounded-2xl border border-zinc-100 ${isUpdating ? "opacity-50" : ""}`}
                      >
                        <select
                          value={order.status || "Processing"}
                          onChange={(e) =>
                            updateStatus(order.orderId, e.target.value)
                          }
                          disabled={isUpdating}
                          className="bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl outline-none cursor-pointer hover:bg-orange-600 transition-colors"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* ── Details Grid ── */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                        <Truck size={12} /> Address
                      </h4>
                      <p className="text-sm font-bold text-zinc-800 leading-relaxed">
                        {addr.address} <br />
                        {addr.city}, {addr.state} -{" "}
                        <span className="text-orange-500">{addr.pincode}</span>
                      </p>
                      <p className="text-[10px] font-black text-zinc-400 mt-4 uppercase">
                        Phone:{" "}
                        <span className="text-zinc-900">{addr.phone}</span>
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                        <Package size={12} /> Items
                      </h4>
                      <div className="space-y-2">
                        {items.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center bg-white p-3 rounded-xl border border-zinc-100 shadow-sm"
                          >
                            <span className="text-[10px] font-black uppercase italic text-zinc-800">
                              {item.name} (UK {item.selectedSize})
                            </span>
                            <span className="font-black italic text-zinc-900 text-xs">
                              ₹{item.price}
                            </span>
                          </div>
                        ))}
                        <div className="mt-6 pt-4 border-t border-dashed border-zinc-200 flex justify-between items-baseline">
                          <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                            Grand Total
                          </span>
                          <span className="text-2xl font-black italic text-zinc-900 tracking-tighter">
                            ₹{Number(order.totalAmount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;
