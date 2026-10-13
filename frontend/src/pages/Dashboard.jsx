import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Command, Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { assistantCommandExamples, parseAssistantCommand } from "../lib/assistantCommands.js";
import { motion as Motion } from "motion/react";
import CreationItems from "../components/CreationItems.jsx";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [command, setCommand] = useState("");
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const getDashboardData = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCreations(data.creations);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <Motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }} className="mb-6 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-violet-50 p-3 text-violet-700"><Command className="h-5 w-5" /></span>
          <div><h2 className="font-semibold text-slate-900">Quick command</h2><p className="mt-1 text-sm text-slate-500">Describe what you want to do and jump straight to the matching tool.</p></div>
        </div>
        <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={(event) => { event.preventDefault(); const result = parseAssistantCommand(command); if (result) navigate(result.route); else toast("Try: write an article, generate an image, remove background, or review resume."); }}>
          <input value={command} onChange={(event) => setCommand(event.target.value)} aria-label="Describe a task" placeholder="e.g. Review my resume" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">Go to tool <ArrowRight className="h-4 w-4" /></button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">{assistantCommandExamples.map((example) => <button type="button" key={example} onClick={() => setCommand(example)} className="rounded-full bg-slate-50 px-3 py-1.5 text-xs text-slate-600 hover:bg-violet-50 hover:text-violet-700">{example}</button>)}</div>
        <p className="mt-3 text-xs text-slate-400">Command routing is rule-based and runs locally in the browser; unknown phrases are not sent to a model.</p>
      </Motion.div>

      <Motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-start flex-wrap gap-4"
      >
        {/* TOTAL CREATIONS CARD */}
        <div className="flex justify-between items-center gap-4 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600 ">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 ml-10 rounded-lg bg-gradient-to-br from-[#3588f2] to-[#0bb0d7] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* ACTIVE PLAN CARD */}
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center gap-4 p-4 px-6 bg-white rounded-xl border border-gray-200"
        >
          <div className="text-slate-600 ">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan={"premium"} fallback={"free"}>
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 ml-10 rounded-lg bg-gradient-to-br from-[#ff61c5] to-[#9e53ee] flex items-center justify-center">
            <Gem className="w-5 h-5 text-white" />
          </div>
        </Motion.div>
      </Motion.div>

      {loading ? (
        <div className="absolute top-1/2 left-1/2 w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      ) : (
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-3"
        >
          {/* RECENT CREATIONS */}
          <p className="mt-6 mb-4">Recent Creations</p>
          {creations.map((item, index) => (
            <CreationItems key={index} item={item} />
          ))}
        </Motion.div>
      )}
    </div>
  );
};

export default Dashboard;
