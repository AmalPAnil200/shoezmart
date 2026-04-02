import React from 'react';

const Careers = () => {
  const jobs = [
    { title: "UI/UX Designer", type: "Full-time", loc: "Remote" },
    { title: "Supply Chain Manager", type: "On-site", loc: "Kochi" },
    { title: "Social Media Lead", type: "Hybrid", loc: "Bangalore" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-black italic uppercase tracking-tighter text-zinc-900 mb-4 text-center">
        Join the <span className="text-orange-500">Hustle</span>
      </h1>
      <p className="text-center text-zinc-400 font-medium mb-16 uppercase text-[10px] tracking-widest">We don't just sell shoes; we move culture.</p>

      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.title} className="bg-white border border-zinc-100 p-8 rounded-[32px] flex justify-between items-center hover:border-orange-500 transition-all group">
            <div>
              <h3 className="text-xl font-black uppercase italic text-zinc-900 group-hover:text-orange-500 transition-colors">{job.title}</h3>
              <p className="text-xs font-bold text-zinc-400 uppercase mt-1">{job.type} • {job.loc}</p>
            </div>
            <button className="bg-zinc-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;
