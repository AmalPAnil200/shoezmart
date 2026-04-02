import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
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

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);

  // 1. Added colors and sizes to the initial state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "men",
    stock: "",
    colors: "", // Added
    sizes: "", // Added
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`,
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const [editingId, setEditingId] = useState(null); // Track which shoe is being updated
  const [editStock, setEditStock] = useState("");
  const handleUpdateStock = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/products/${id}`,
        {
          stock: editStock,
        },
      );
      alert("Stock updated!");
      setEditingId(null); // Close the edit mode
      fetchProducts(); // Refresh the list
    } catch (err) {
      console.error("Update failed:", err);
      alert("Could not update stock.");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    // 🚀 FIXED: All appends must use the SAME name (formData)
    formData.append("image", file);
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("stock", newProduct.stock);
    formData.append("colors", newProduct.colors); // Fixed: changed 'data' to 'formData'
    formData.append("sizes", newProduct.sizes); // Fixed: changed 'data' to 'formData'
    formData.append("description", newProduct.description);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/products`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      alert("Product added successfully!");

      // 2. Reset the form properly including new fields
      setNewProduct({
        name: "",
        price: "",
        category: "men",
        stock: "",
        colors: "",
        sizes: "",
        description: "",
      });
      setFile(null);
      fetchProducts();
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Upload failed. Check server console.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this shoe?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/products/${id}`,
        );
        fetchProducts();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-10 italic uppercase tracking-tighter text-zinc-900">
          Inventory <span className="text-orange-500">Management</span>
        </h1>

        {/* ── Add Product Form ── */}
        <form
          onSubmit={handleAdd}
          className="bg-zinc-50 p-8 rounded-[32px] border border-zinc-100 shadow-sm mb-12"
        >
          {/* Top Row: Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                Shoe Name
              </label>
              <input
                type="text"
                placeholder="e.g. Nike Dunk Low"
                className="p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-zinc-700 transition-all"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                Price (₹)
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-zinc-700 transition-all"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                Target Category
              </label>
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-zinc-700 cursor-pointer transition-all"
                required
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="basketball">Basketball</option>
                <option value="streetwear">Streetwear</option>
                <option value="athletic">Athletic</option>
              </select>
            </div>
          </div>

          {/* Middle Row: Customization & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                Colors (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="Red, Black, Blue"
                value={newProduct.colors}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, colors: e.target.value })
                }
                className="p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-medium text-zinc-600 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                Sizes (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="7, 8, 9, 10, 11"
                value={newProduct.sizes}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, sizes: e.target.value })
                }
                className="p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-medium text-zinc-600 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                Total Stock
              </label>
              <input
                type="number"
                placeholder="Amount"
                className="p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-zinc-700 transition-all"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Bottom Row: File Upload & Submit */}
          <div className="flex flex-col md:flex-row items-end gap-8 border-t border-zinc-200 pt-8">
            <div className="flex-1 w-full">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 block ml-1">
                Product Image
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-zinc-500 file:mr-6 file:py-3 file:px-8 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-zinc-900 file:text-white hover:file:bg-orange-600 cursor-pointer transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-orange-500 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-900 transition-all active:scale-95 shadow-xl shadow-orange-100"
            >
              Publish Product
            </button>
          </div>
        </form>

        {/* ── Product List Table ── */}
        <div className="overflow-hidden shadow-2xl rounded-2xl border border-zinc-100 bg-white">
          <table className="w-full text-left">
            <thead className="bg-zinc-900 text-white text-[10px] uppercase tracking-[0.2em]">
              <tr>
                <th className="p-5">Product</th>
                <th className="p-5">Category</th>
                <th className="p-5">Price</th>
                <th className="p-5">Stock</th>
                <th className="p-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-5 font-bold text-zinc-800">{p.name}</td>
                  <td className="p-5 italic text-zinc-400 text-xs uppercase">
                    {p.category}
                  </td>
                  <td className="p-5 font-mono font-bold text-orange-600">
                    ₹{p.price}
                  </td>

                  {/* ── Dynamic Stock Column ── */}
                  <td className="p-5">
                    {editingId === p.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          className="w-20 p-2 border border-orange-500 rounded-lg outline-none font-bold text-sm"
                          value={editStock}
                          onChange={(e) => setEditStock(e.target.value)}
                          autoFocus
                        />
                        <button
                          onClick={() => handleUpdateStock(p.id)}
                          className="bg-zinc-900 text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-zinc-400 text-[10px] font-black uppercase hover:text-zinc-900"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-bold ${p.stock < 5 ? "text-red-500 animate-pulse" : "text-zinc-700"}`}
                        >
                          {p.stock} units
                        </span>
                        <button
                          onClick={() => {
                            setEditingId(p.id);
                            setEditStock(p.stock); // Pre-fill with current value
                          }}
                          className="text-zinc-400 hover:text-orange-500 transition-colors"
                        >
                          <RefreshCw size={14} />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-5 text-right flex justify-end gap-6">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPanel;
