import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Vote, Info, HelpCircle, CheckSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotEligible, setShowNotEligible] = useState(false);
  const navigate = useNavigate();

  const handleEligible = () => {
    setIsModalOpen(false);
    navigate("/#checklist");
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>
          <Vote className="logo-icon" size={32} color="#3b82f6" />
          <span className="logo-text" style={{ color: "var(--text-primary)" }}>
            Elec<span>Guide</span> India
          </span>
        </Link>
        <div className="nav-links">
          <a href="/#timeline" className="nav-link">
            <Info size={18} />
            <span>Process</span>
          </a>
          <Link to="/chat" className="nav-link">
            <HelpCircle size={18} />
            <span>Assistant</span>
          </Link>
          <a href="/#checklist" className="nav-link">
            <CheckSquare size={18} />
            <span>Checklist</span>
          </a>
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Register Now
        </button>
      </div>

      {/* Eligibility Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
              <h3>Wait! Want to check if you're eligible first?</h3>
              <p>
                You must be an Indian citizen and at least 18 years old to
                register.
              </p>

              {!showNotEligible ? (
                <div className="modal-actions">
                  <button className="btn btn-primary" onClick={handleEligible}>
                    Yes, I am eligible
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => setShowNotEligible(true)}
                  >
                    No, I'm not
                  </button>
                </div>
              ) : (
                <div className="not-eligible-msg">
                  <p>
                    Thanks for your honesty! You can still explore CivicBot to
                    learn about the democratic process for the future.
                  </p>
                  <button
                    className="btn btn-primary"
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
