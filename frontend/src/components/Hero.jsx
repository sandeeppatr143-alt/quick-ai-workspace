import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText, Image, WandSparkles } from "lucide-react";
import { motion as Motion } from "motion/react";
import BlobBackground from "./BlobBackground";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative flex min-h-[92vh] w-full flex-col justify-center overflow-hidden bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat px-5 pt-24 sm:px-12 xl:px-32">
      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 shadow-sm">
          <WandSparkles className="h-4 w-4" /> One workspace, useful AI tools
        </span>
        <h1 className="mx-auto mt-7 text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl xl:text-7xl">
          Turn the next idea into <span className="text-[var(--color-primary)]">something real.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Draft content, create images, clean up photos, and review career documents from one focused workspace.
          Quick AI is built around practical tools—not inflated promises.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <button className="fancy-btn inline-flex items-center gap-2" onClick={() => navigate("/ai")}>
            Open workspace <ArrowRight className="h-4 w-4" />
          </button>
          <button className="rounded-lg border border-slate-200 bg-white/90 px-7 py-3 font-medium text-slate-800 transition hover:border-violet-300 hover:bg-white" onClick={() => navigate("/ai")}>
            Explore the tools
          </button>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
          {[
            { icon: FileText, title: "Write & refine", detail: "Articles, titles, resume feedback" },
            { icon: Image, title: "Create visuals", detail: "Generate images from prompts" },
            { icon: WandSparkles, title: "Edit with AI", detail: "Background and object removal" },
          ].map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-start gap-3 rounded-xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur">
              <span className="rounded-lg bg-violet-50 p-2 text-violet-700"><Icon className="h-5 w-5" /></span>
              <div><p className="font-semibold text-slate-900">{title}</p><p className="mt-1 text-sm text-slate-500">{detail}</p></div>
            </div>
          ))}
        </div>
      </Motion.div>
      <BlobBackground />
    </section>
  );
};

export default Hero;
