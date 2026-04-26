import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Info, HelpCircle, CheckSquare } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <Vote className="logo-icon" size={32} color="#3b82f6" />
          <span className="logo-text" style={{ color: 'var(--text-primary)' }}>Elec<span>Guide</span> India</span>
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
        <button className="btn btn-primary btn-sm">Get Registered</button>
      </div>
    </nav>
  );
};

export default Navbar;
