import { motion as Motion } from "motion/react";
import { assets } from "../assets/assets.js";

const Footer = () => (
  <Motion.footer initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="border-t border-slate-200 px-5 py-8 text-slate-500 sm:px-12 xl:px-32">
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <img className="h-9" src={assets.logo} alt="Quick AI" />
        <p className="mt-2 max-w-md text-sm">A full-stack AI workspace for writing, image workflows, and document feedback.</p>
      </div>
      <div className="text-sm sm:text-right">
        <p className="font-medium text-slate-800">Built and customized by Sandeep Patra</p>
        <p className="mt-1">React · Express · Neon · Cloudinary · Clerk</p>
      </div>
    </div>
    <p className="mt-6 border-t border-slate-100 pt-4 text-xs">Portfolio project. AI features require valid service credentials and may incur third-party usage costs.</p>
  </Motion.footer>
);

export default Footer;
