import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-text"
        >
          <div className="badge">Democratic Duty 2026</div>
          <h1>Empowering Every Indian <span>Voter</span></h1>
          <p>
            Navigate the world's largest democratic exercise with ease. 
            From registration to result day, we guide you through every step 
            of the Indian election process.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary">
              Start Explainer <ChevronRight size={20} />
            </button>
            <button className="btn btn-outline">
              <PlayCircle size={20} /> Watch How it Works
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-visual"
        >
          <div className="stats-grid">
            <div className="stat-card card">
              <h3>900M+</h3>
              <p>Registered Voters</p>
            </div>
            <div className="stat-card card">
              <h3>1M+</h3>
              <p>Polling Stations</p>
            </div>
            <div className="stat-card card">
              <h3>7+</h3>
              <p>Election Phases</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
