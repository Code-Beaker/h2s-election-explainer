import { motion } from "framer-motion";
import { PlayCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-24 overflow-hidden bg-bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6 text-text-primary">
            Learn. Vote. <br /> Shape the <span className="text-primary-main">Future</span>.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-[600px]">
            Navigate the world&apos;s largest democratic exercise with ease. From
            registration to result day, we guide you through every step of the
            Indian election process.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all bg-primary-main text-white hover:bg-primary-hover hover:-translate-y-[1px]"
            >
              Ask Assistant <MessageSquare size={20} />
            </Link>
            <a
              href="https://youtu.be/gIdo77PCeH8?si=h-Nh_CG3pAvG2rS4"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all border border-border-main text-text-primary hover:bg-bg-tertiary hover:border-text-muted"
            >
              <PlayCircle size={20} /> Watch How it Works
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-bg-secondary border border-border-main rounded-xl shadow-lg transition-all hover:border-border-focus">
              <h3 className="text-3xl font-heading font-bold text-primary-main mb-1">900M+</h3>
              <p className="text-sm text-text-muted">Registered Voters</p>
            </div>
            <div className="p-6 bg-bg-secondary border border-border-main rounded-xl shadow-lg transition-all hover:border-border-focus">
              <h3 className="text-3xl font-heading font-bold text-primary-main mb-1">1M+</h3>
              <p className="text-sm text-text-muted">Polling Stations</p>
            </div>
            <div className="col-span-2 p-6 bg-bg-secondary border border-border-main rounded-xl shadow-lg transition-all hover:border-border-focus">
              <h3 className="text-3xl font-heading font-bold text-primary-main mb-1">7+</h3>
              <p className="text-sm text-text-muted">Election Phases Across India</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
