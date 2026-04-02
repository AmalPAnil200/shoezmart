import React from 'react';

const Press = () => (
  <div className="max-w-5xl mx-auto px-6 py-20">
    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-zinc-900 mb-12">
      Media <span className="text-orange-500">Center</span>
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(item => (
        <div key={item} className="bg-zinc-50 p-8 rounded-[32px] border border-zinc-100">
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">April 2026</span>
          <h4 className="text-lg font-black uppercase italic mt-4 leading-tight">ShoeZmart hits 50k monthly active users.</h4>
          <button className="mt-8 text-[10px] font-black uppercase underline hover:text-orange-500">Read More</button>
        </div>
      ))}
    </div>
  </div>
);

export default Press;
