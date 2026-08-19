import { FaArrowRight } from "react-icons/fa";
import { blogPosts } from "../data/site";
import SectionTitle from "./SectionTitle";

export default function Blog() {
  return (
    <section id="blog" className="section-shell bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Insights"
          title="Practical writing on technology, security, cloud, AI, and business growth."
          copy="Articles are in preparation — these are the topics we are covering first. Request a topic and we will prioritize it."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map(([category, title]) => (
            <article key={category} className="glass rounded-2xl p-6">
              <p className="text-sm font-black uppercase tracking-wide text-cyan-200">{category}</p>
              <h3 className="mt-4 min-h-[84px] text-xl font-black leading-8 text-white">{title}</h3>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                Request This Topic <FaArrowRight className="text-xs" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
