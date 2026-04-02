import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userRole", res.data.user.role);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      window.location.reload();
    } catch (err) {
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 flex-col justify-between p-12 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600 opacity-5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="text-white text-lg font-semibold tracking-widest uppercase relative z-10">
          Shoe<span className="text-pink-500">Z</span>mart
        </div>

        {/* Hero text */}
        <div className="relative z-10">
          <h1 className="text-7xl font-light text-white leading-tight mb-4">
            Step into
            <br />
            <span className="text-pink-500 font-semibold italic">your style.</span>
          </h1>
          <p className="text-xs tracking-widest uppercase text-zinc-500">
            Curated Footwear · Premium Brands · Fast Delivery
          </p>
        </div>

        {/* Footer ticker */}
        <div className="flex gap-6 text-xs tracking-widest uppercase text-zinc-700 relative z-10">
          <span>New arrivals</span>
          <span className="text-zinc-800">·</span>
          <span>Free shipping over ₹999</span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 bg-stone-50 flex items-center justify-center p-8 relative">
        {/* Corner label */}
        <span className="absolute top-10 right-12 text-xs tracking-widest uppercase text-zinc-300 hidden lg:block">
          Login
        </span>

        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10 text-zinc-900 text-lg font-semibold tracking-widest uppercase">
            Shoe<span className="text-pink-500">Z</span>mart
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-4xl font-light text-zinc-900 leading-snug">
              Welcome <span className="text-pink-500 font-semibold italic">back</span>
            </h2>
            <p className="text-xs text-zinc-400 tracking-wider mt-2">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-7">
            {/* Email field */}
            <div>
              <label
                className={`block text-xs tracking-widest uppercase mb-2 transition-colors duration-200 ${focused === "email" ? "text-pink-500" : "text-zinc-400"
                  }`}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                required
                className="w-full bg-transparent border-b border-zinc-200 focus:border-pink-500 outline-none py-2 text-sm text-zinc-900 placeholder-zinc-300 transition-colors duration-200"
              />
            </div>

            {/* Password field */}
            <div>
              <label
                className={`block text-xs tracking-widest uppercase mb-2 transition-colors duration-200 ${focused === "password" ? "text-pink-500" : "text-zinc-400"
                  }`}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                required
                className="w-full bg-transparent border-b border-zinc-200 focus:border-pink-500 outline-none py-2 text-sm text-zinc-900 placeholder-zinc-300 transition-colors duration-200"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-4 bg-zinc-900 hover:bg-pink-500 text-white text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs tracking-widest uppercase text-zinc-300">or</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* Links */}
          <div className="flex justify-between text-xs text-zinc-400 tracking-wide">
            <a href="/forgot-password" className="text-pink-500 hover:underline underline-offset-4">
              Forgot password?
            </a>
            <a href="/signup" className="text-pink-500 hover:underline underline-offset-4">
              Create account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;