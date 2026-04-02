import { useState, useEffect } from "react";
import { MoveRight } from "lucide-react"; // Optional: for a slicker button icon

// Import your assets
import sneaker1 from "../assets/images/s-1.png";
import sneaker2 from "../assets/images/s-2.png";
import sneaker3 from "../assets/images/s-3.png";

const SLIDES = [
  {
    tag: "New Season 2026",
    title: "UNLEASH",
    subtitle: "THE PACE",
    description: "Built for speed, designed for the street. Experience the evolution of the original icon.",
    image: sneaker1,
    bgText: "SPEED",
    gradient: "from-orange-500 to-rose-500",
  },
  {
    tag: "Limited Edition",
    title: "VINTAGE",
    subtitle: "REBORN",
    description: "Classic silhouettes meet modern energy. A timeless masterpiece, redesigned for now.",
    image: sneaker2,
    bgText: "RETRO",
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    tag: "Performance Pro",
    title: "BEYOND",
    subtitle: "LIMITS",
    description: "Ultra-responsive cushioning and a locked-in fit. Push your boundaries every single day.",
    image: sneaker3,
    bgText: "POWER",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative h-[80vh] md:h-[85vh] w-full bg-zinc-100 overflow-hidden flex items-center">
      {/* ── Background Large Text ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h2 
          key={`bg-${slide.bgText}`}
          className="text-[28vw] font-black text-zinc-200/60 italic leading-none tracking-tighter uppercase animate-in fade-in zoom-in duration-1000"
        >
          {slide.bgText}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 items-center relative z-10">
        {/* ── Text Content ── */}
        <div className="flex flex-col gap-2">
          <span 
            key={`tag-${slide.tag}`}
            className="w-fit px-3 py-1 bg-white shadow-sm border border-zinc-200 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500 animate-in slide-in-from-left-8 duration-500"
          >
            {slide.tag}
          </span>
          
          <div className="overflow-hidden">
            <h1 
              key={`title-${slide.title}`}
              className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8] animate-in slide-in-from-bottom-12 duration-700"
            >
              {slide.title}
            </h1>
            <h1 
              key={`sub-${slide.subtitle}`}
              className={`text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r ${slide.gradient} animate-in slide-in-from-bottom-12 duration-1000`}
            >
              {slide.subtitle}
            </h1>
          </div>

          <p 
            key={`desc-${slide.description}`}
            className="text-zinc-500 text-sm md:text-base max-w-sm mt-4 mb-8 leading-relaxed animate-in fade-in duration-1000"
          >
            {slide.description}
          </p>

          <div className="flex items-center gap-6">
            <button className="group bg-zinc-900 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-zinc-200">
              Shop Now <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {SLIDES.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${current === idx ? "w-8 bg-zinc-900" : "w-2 bg-zinc-300"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Image Content ── */}
        <div className="hidden md:flex justify-center items-center relative h-full">
          <img
            key={`img-${slide.image}`}
            src={slide.image}
            alt="Hero Sneaker"
            className="w-full max-w-xl drop-shadow-[0_50px_50px_rgba(0,0,0,0.2)] rotate-[-15deg] hover:rotate-0 transition-all duration-1000 animate-in zoom-in slide-in-from-right-20 duration-1000"
            style={{ animation: 'floating 4s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes floating {
          0%, 100% { transform: translateY(-5%) rotate(-15deg); }
          50% { transform: translateY(5%) rotate(-15deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;