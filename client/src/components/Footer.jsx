import {
  Globe,
  Send,
  Link as LinkIcon,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white ">
      {/* Top CTA Strip */}

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <span className="text-2xl font-black tracking-tighter">
            <span className="text-white">SHOE</span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #ff8a00, #e52e71)",
              }}
            >
              ZMART
            </span>
          </span>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Elevating your walk since 2026. Premium footwear for every occasion
            — from the streets to the stage.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            <button
              aria-label="Website"
              className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              <Globe size={16} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Send"
              className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              <Send size={16} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Link"
              className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              <LinkIcon size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        {/* Quick Links */}

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-black text-zinc-500 mb-6 italic">
            Company
          </h4>
          <ul className="space-y-3">
            {[
              { name: "About Us", path: "/about" },
              { name: "Careers", path: "/careers" },
              { name: "Press", path: "/press" },
              { name: "Blog", path: "/blog" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-all hover:translate-x-1 inline-block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Support */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-500 mb-4">
            Support
          </h4>
          <ul className="space-y-2.5">
            {[
              "Shipping Policy",
              "Returns & Exchanges",
              "Size Guide",
              "Track My Order",
              "FAQ",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-500 mb-4">
            Get in Touch
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-sm text-zinc-400">
              <Mail size={16} strokeWidth={1.5} className="mt-0.5" />
              <span>support@shoezmart.com</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-zinc-400">
              <Phone size={16} strokeWidth={1.5} className="mt-0.5" />
              <span>+1 (555) SHOE-VAL</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-zinc-400">
              <Clock size={16} strokeWidth={1.5} className="mt-0.5" />
              <span>Mon–Sat, 9 AM – 7 PM</span>
            </li>
          </ul>

          {/* Payment Icons */}
          <div className="mt-6">
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">
              We Accept
            </p>
            <div className="flex gap-2 flex-wrap">
              {["Visa", "MC", "UPI", "COD"].map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 bg-zinc-800 text-zinc-400 text-[10px] font-bold rounded-md border border-zinc-700 tracking-wide"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 mx-6">
        <div className="max-w-7xl mx-auto py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
          <span>
            © {new Date().getFullYear()} ShoeZmart. All rights reserved.
          </span>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-zinc-400 transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
