import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Vote, Info, HelpCircle, CheckSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotEligible, setShowNotEligible] = useState(false);
  const navigate = useNavigate();

  const handleEligible = () => {
    setIsModalOpen(false);
    if (window.location.pathname === "/") {
      const element = document.getElementById("checklist");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#checklist");
    }
  };

  return (
    <nav className="h-[72px] border-b border-border-main bg-bg-primary/95 backdrop-blur-md sticky top-0 z-[100] flex items-center">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex justify-between items-center w-full">
        <Link to="/" className="flex items-center gap-3 font-heading text-2xl font-bold">
          <Vote className="text-primary-main" size={32} />
          <span className="text-text-primary">
            Elec<span className="text-primary-main">Guide</span> India
          </span>
        </Link>
        <div className="hidden md:flex gap-8">
          <a href="/#timeline" className="flex items-center gap-2 text-[0.95rem] font-medium text-text-secondary hover:text-text-primary transition-colors">
            <Info size={18} />
            <span>Process</span>
          </a>
          <Link to="/chat" className="flex items-center gap-2 text-[0.95rem] font-medium text-text-secondary hover:text-text-primary transition-colors">
            <HelpCircle size={18} />
            <span>Assistant</span>
          </Link>
          <a href="/#checklist" className="flex items-center gap-2 text-[0.95rem] font-medium text-text-secondary hover:text-text-primary transition-colors">
            <CheckSquare size={18} />
            <span>Checklist</span>
          </a>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all bg-primary-main text-white hover:bg-primary-hover hover:-translate-y-[1px] text-[0.875rem]"
          onClick={() => setIsModalOpen(true)}
        >
          Register Now
        </button>
      </div>

      {/* Eligibility Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-[4px] z-[1000] flex items-center justify-center" 
            onClick={() => setIsModalOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsModalOpen(false)}
            role="presentation"
          >
            <motion.div
              className="bg-bg-secondary border border-border-main rounded-[1rem] p-8 max-w-[450px] w-[90%] relative text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 bg-transparent border-none text-text-muted cursor-pointer p-1 flex items-center justify-center rounded-md transition-all hover:bg-bg-tertiary hover:text-text-primary"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close registration modal"
              >
                <X size={20} />
              </button>
              <h3 className="mt-2 mb-4 text-text-primary text-xl font-heading font-semibold">Wait! Want to check if you&apos;re eligible first?</h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                You must be an Indian citizen and at least 18 years old to
                register.
              </p>

              {!showNotEligible ? (
                <div className="flex gap-4 justify-center">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all bg-primary-main text-white hover:bg-primary-hover hover:-translate-y-[1px]" onClick={handleEligible}>
                    Yes, I am eligible
                  </button>
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all border border-border-main text-text-primary hover:bg-bg-tertiary hover:border-text-muted"
                    onClick={() => setShowNotEligible(true)}
                  >
                    No, I&apos;m not
                  </button>
                </div>
              ) : (
                <div className="bg-primary-main/10 p-4 rounded-lg border border-primary-main/20">
                  <p className="mb-4 text-text-primary text-[0.95rem]">
                    Thanks for your honesty! You can still explore CivicBot to
                    learn about the democratic process for the future.
                  </p>
                  <button
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all bg-primary-main text-white hover:bg-primary-hover hover:-translate-y-[1px]"
                    onClick={() => {
                      setIsModalOpen(false);
                      setShowNotEligible(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
