import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, PlayCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <Link to="/chat" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Ask Assistant <MessageSquare size={20} />
            </Link>
            <a href="https://youtu.be/gIdo77PCeH8?si=h-Nh_CG3pAvG2rS4" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ textDecoration: 'none' }}>
              <PlayCircle size={20} /> Watch How it Works
            </a>
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
