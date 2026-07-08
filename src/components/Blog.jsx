import { FaArrowRight } from "react-icons/fa";
import { blogPosts } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Blog() {
  return (
    <section id="blog" className="section-shell bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Blog"
          title="Insights for technology, security, cloud, AI, and business growth."
          copy="A publishing hub for practical articles that help clients make better technical decisions."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map(([category, title]) => (
            <article key={category} className="glass rounded-2xl p-6">
              <p className="text-sm font-black uppercase tracking-wide text-cyan-200">{category}</p>
              <h3 className="mt-4 min-h-[84px] text-xl font-black leading-8 text-white">{title}</h3>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                Read Article <FaArrowRight className="text-xs" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
