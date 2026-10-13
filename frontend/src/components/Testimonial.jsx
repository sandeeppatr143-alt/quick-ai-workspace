import { motion as Motion } from "motion/react";
import { FileText, Image, Sparkles } from "lucide-react";

const examples = [
  { icon: FileText, title: "Start with a rough brief", body: "Turn a topic or keyword into an article outline or a set of blog-title options." },
  { icon: Image, title: "Make visual iterations", body: "Create an image, then use background or object removal to prepare it for a project." },
  { icon: Sparkles, title: "Polish the final draft", body: "Review a resume or revisit previous generations from the workspace dashboard." },
];

const Testimonial = () => (
  <section className="px-5 py-16 sm:px-12 xl:px-32">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Example workflows</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">A simple path from prompt to output</h2>
      <p className="mx-auto mt-4 max-w-xl text-slate-500">A few practical ways the tools can work together. These are examples, not customer testimonials.</p>
    </div>
    <div className="mx-auto mt-9 grid max-w-6xl gap-4 md:grid-cols-3">
      {examples.map(({ icon: Icon, title, body }, index) => (
        <Motion.article key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="inline-flex rounded-xl bg-violet-50 p-3 text-violet-700"><Icon className="h-5 w-5" /></span>
          <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
        </Motion.article>
      ))}
    </div>
  </section>
);

export default Testimonial;
