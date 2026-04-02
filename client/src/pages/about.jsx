import React, { useEffect, useRef } from 'react';
import image1 from '../assets/images/s-1.png';
import image2 from '../assets/images/s-2.png';
import image3 from '../assets/images/s-3.png';


const AboutPage = () => {
  return (
    <div className="bg-zinc-50 text-zinc-900 overflow-x-hidden" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Barlow:wght@400;500;600&display=swap');
        .display { font-family: 'Barlow Condensed', sans-serif; }
        .ticker-wrap { overflow: hidden; white-space: nowrap; }
        .ticker { display: inline-block; animation: ticker 18s linear infinite; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .stat-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .stat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .shoe-float { animation: float 4s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0) rotate(-8deg);} 50%{transform:translateY(-18px) rotate(-8deg);} }
        .fade-in { opacity: 0; transform: translateY(30px); animation: fadeUp 0.7s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.6s; }
        .slash-bg { background: repeating-linear-gradient(135deg, transparent, transparent 8px, rgba(249,115,22,0.06) 8px, rgba(249,115,22,0.06) 10px); }
        .team-card { transition: transform 0.3s, box-shadow 0.3s; }
        .team-card:hover { transform: scale(1.04); box-shadow: 0 16px 36px rgba(0,0,0,0.13); }
        .pill { display: inline-block; border: 2px solid #18181b; padding: 2px 14px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; }
        .values-card { transition: background-color 0.3s, color 0.3s; }
      `}</style>

      {/* NAVBAR */}
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="display font-black text-2xl italic uppercase tracking-tight">
            Shoe<span className="text-orange-500">Zmart</span>
          </span>
          <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {['Shop', 'About', 'Drops', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className={`hover:text-orange-500 transition-colors ${item === 'About' ? 'text-orange-500' : ''}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-zinc-900 text-white min-h-[520px] flex items-center">
        <div className="absolute inset-0 slash-bg opacity-40"></div>
        <div
          className="absolute right-0 top-0 w-2/5 h-full bg-orange-500 hidden lg:block"
          style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
        ></div>
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="pill bg-orange-500 text-white border-orange-500 mb-6 block w-fit fade-in" style={{ backgroundColor: '#f97316', borderColor: '#f97316', color: 'white' }}>
              Founded 2025 • Kochi, India
            </span>
            <h1 className="display font-black italic uppercase text-6xl md:text-8xl leading-none mb-6 fade-in delay-1">
              We Are<br /><span className="text-orange-500">The</span><br />Movement.
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed max-w-md fade-in delay-2">
              Born in Kochi. Built for every sneakerhead who got priced out, botted out, or shut out.
              ShoeZmart is heat — without the hustle.
            </p>
          </div>
          <div className="flex items-center justify-center lg:justify-end fade-in delay-3">
            <div className="text-[140px] shoe-float select-none"><img src={image1} alt="" /></div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-orange-500 text-white py-3 ticker-wrap border-y-2 border-zinc-900">
        <div className="ticker display font-black italic uppercase text-lg tracking-widest">
          {[...Array(2)].map((_, i) => (
            <span key={i}>
              <span className="mx-8">100% Authentic</span><span className="mx-4 text-zinc-900">★</span>
              <span className="mx-8">No Bots. No Fakes.</span><span className="mx-4 text-zinc-900">★</span>
              <span className="mx-8">Ships All India</span><span className="mx-4 text-zinc-900">★</span>
              <span className="mx-8">Community First</span><span className="mx-4 text-zinc-900">★</span>
              <span className="mx-8">Real Heads Only</span><span className="mx-4 text-zinc-900">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '5K+', label: 'Happy Customers', bg: 'bg-white', valueCls: 'text-orange-500', labelCls: 'text-zinc-500', border: 'border-zinc-900' },
            { value: '200+', label: 'Exclusive Styles', bg: 'bg-zinc-900', valueCls: 'text-orange-500', labelCls: 'text-zinc-400', border: 'border-zinc-900' },
            { value: '48h', label: 'Avg. Delivery', bg: 'bg-orange-500', valueCls: 'text-white', labelCls: 'text-orange-100', border: 'border-orange-500' },
            { value: '0%', label: 'Fake Products', bg: 'bg-white', valueCls: 'text-zinc-900', labelCls: 'text-zinc-500', border: 'border-zinc-900' },
          ].map(({ value, label, bg, valueCls, labelCls, border }) => (
            <div key={label} className={`stat-card ${bg} border-2 ${border} rounded-3xl p-8 text-center cursor-default`}>
              <div className={`display font-black italic text-5xl ${valueCls}`}>{value}</div>
              <div className={`text-xs font-bold uppercase tracking-widest ${labelCls} mt-2`}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="bg-white border-y-2 border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="pill mb-4 block w-fit">Our Story</span>
            <h2 className="display font-black italic uppercase text-5xl md:text-6xl leading-none mb-6">
              More Than<br />A <span className="text-orange-500">Store.</span>
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-4 text-lg">
              ShoeZmart was born from a simple frustration: the sneaker world became too exclusive.
              Between the bots and the resellers, real fans were losing out.
            </p>
            <p className="text-zinc-600 leading-relaxed mb-8 text-lg">
              We built this platform to bring the "heat" back to the streets of India — so every fan,
              from Mumbai to Manipur, gets a fair shot at their grail.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="pill" style={{ backgroundColor: '#18181b', color: 'white', borderColor: '#18181b' }}>Kochi Grown</span>
              <span className="pill" style={{ backgroundColor: '#f97316', color: 'white', borderColor: '#f97316' }}>India Wide</span>
              <span className="pill">Always Legit</span>
            </div>
          </div>
          <div className="relative">
            <div className="bg-zinc-100 rounded-[40px] aspect-square flex items-center justify-center relative overflow-hidden border-2 border-zinc-200">
              <div className="absolute top-4 left-4 w-20 h-20 bg-orange-500 rounded-full opacity-30"></div>
              <div className="absolute bottom-8 right-8 w-32 h-32 bg-zinc-900 rounded-full opacity-10"></div>
              <div className="text-[120px] select-none z-10"><img src={image2} alt="" /></div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white rounded-2xl px-6 py-4 border-2 border-zinc-900 shadow-lg">
              <div className="display font-black italic text-2xl">EST. 2025</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Kochi, Kerala</div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="pill mb-4 block w-fit mx-auto">What We Stand For</span>
          <h2 className="display font-black italic uppercase text-5xl md:text-6xl leading-none">
            Our <span className="text-orange-500">Code.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { emoji: '🔒', title: '100% Authentic', desc: 'Every pair is verified. Every time. No exceptions. We stake our name on it.', base: 'bg-zinc-900 text-white border-zinc-900', hover: 'hover:bg-orange-500', descCls: 'text-zinc-300' },
            { emoji: '🤝', title: 'Community First', desc: 'Built by heads, for heads. Your feedback shapes every drop we carry.', base: 'bg-orange-500 text-white border-orange-500', hover: 'hover:bg-zinc-900', descCls: 'text-white/80' },
            { emoji: '⚡', title: 'Fastest Shipping', desc: 'Pan-India delivery in 48 hours. Your grails shouldn\'t wait.', base: 'bg-white text-zinc-900 border-zinc-900', hover: 'hover:bg-zinc-900 hover:text-white', descCls: 'text-zinc-500' },
          ].map(({ emoji, title, desc, base, hover, descCls }) => (
            <div key={title} className={`values-card group ${base} ${hover} rounded-3xl p-10 flex flex-col gap-4 border-2 cursor-default`}>
              <div className="text-5xl">{emoji}</div>
              <h3 className="display font-black italic uppercase text-3xl">{title}</h3>
              <p className={`${descCls} text-sm leading-relaxed`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-zinc-900 text-white border-y-2 border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <span className="pill mb-4 block w-fit mx-auto" style={{ backgroundColor: '#f97316', color: 'white', borderColor: '#f97316' }}>The Crew</span>
            <h2 className="display font-black italic uppercase text-5xl md:text-6xl leading-none">
              Real <span className="text-orange-500">Heads.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { emoji: '👨‍💼', name: 'Arjun Menon', role: 'Founder & CEO', bio: 'Sneakerhead since 2011. Built ShoeZmart so no one gets left out of the drop.', bg: 'bg-zinc-800', roleCls: 'text-zinc-400', bioCls: 'text-zinc-400', accentBg: 'bg-orange-500' },
              { emoji: '👩‍🎨', name: 'Divya Krishnan', role: 'Head of Design', bio: 'Brings the visual heat. If it looks fire, it\'s Divya\'s doing.', bg: 'bg-orange-500', roleCls: 'text-orange-100', bioCls: 'text-white/80', accentBg: 'bg-white' },
              { emoji: '🧑‍💻', name: 'Rohit Nair', role: 'Tech Lead', bio: 'Keeps the platform faster than your reseller\'s bot. All day, every day.', bg: 'bg-zinc-800', roleCls: 'text-zinc-400', bioCls: 'text-zinc-400', accentBg: 'bg-orange-500' },
            ].map(({ emoji, name, role, bio, bg, roleCls, bioCls, accentBg }) => (
              <div key={name} className={`team-card ${bg} rounded-3xl p-8 flex flex-col items-center gap-4 text-center cursor-default`}>
                <div className={`w-20 h-20 rounded-full ${accentBg} flex items-center justify-center text-4xl border-4 border-zinc-700`}>{emoji}</div>
                <div>
                  <div className="display font-black italic text-xl">{name}</div>
                  <div className={`text-xs ${roleCls} font-bold uppercase tracking-widest`}>{role}</div>
                </div>
                <p className={`${bioCls} text-sm`}>{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="display font-black italic uppercase text-6xl md:text-8xl leading-none mb-6">
          Ready to<br /><span className="text-orange-500">Cop?</span>
        </h2>
        <p className="text-zinc-500 text-lg mb-10 max-w-md mx-auto">
          Join thousands of sneakerheads across India who trust ShoeZmart for their next grail.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="display font-black italic uppercase text-lg bg-orange-500 text-white px-10 py-4 rounded-full border-2 border-zinc-900 hover:bg-zinc-900 transition-colors shadow-lg">
            Shop Now
          </button>
          <button className="display font-black italic uppercase text-lg bg-white text-zinc-900 px-10 py-4 rounded-full border-2 border-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors">
            Join Community
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-900 text-zinc-400 py-8 border-t-2 border-zinc-800 text-center">
        <span className="display font-black italic uppercase text-2xl text-white">
          Shoe<span className="text-orange-500">Zmart</span>
        </span>
        <p className="text-xs mt-2 tracking-widest uppercase">© 2025 ShoeZmart. Kochi, India. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;