import React from 'react';

const Blog = () => {
  const posts = [
    { title: "How to clean your white kicks", cat: "Tips", img: "🧼" },
    { title: "Sneaker Trends 2026", cat: "Trends", img: "🔥" },
    { title: "The Alpha Series Design", cat: "Behind the Scenes", img: "✍️" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-black italic uppercase tracking-tighter text-zinc-900 mb-12">
        The <span className="text-orange-500">Journal</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map(post => (
          <div key={post.title} className="group cursor-pointer">
            <div className="h-64 bg-zinc-100 rounded-[40px] mb-6 flex items-center justify-center text-6xl group-hover:bg-orange-50 transition-colors">
              {post.img}
            </div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{post.cat}</span>
            <h3 className="text-2xl font-black uppercase italic text-zinc-900 mt-2 group-hover:text-orange-500 transition-colors">
              {post.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;