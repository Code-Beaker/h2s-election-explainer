import { Link } from 'react-router-dom';
import { Vote, Globe, MessageCircle, Users, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <Vote size={24} color="#3b82f6" />
              <span>ElecGuide India</span>
            </div>
            <p>Making democracy accessible and understandable for every citizen of India.</p>
            <div className="social-links">
              <a href="#"><Globe size={20} /></a>
              <a href="#"><MessageCircle size={20} /></a>
              <a href="#"><Users size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/#timeline">Process</a></li>
              <li><Link to="/chat">AI Assistant</Link></li>
              <li><a href="/#checklist">Voter Checklist</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Official Resources</h4>
            <ul>
              <li><a href="https://eci.gov.in" target="_blank" rel="noreferrer">ECI Website <ExternalLink size={14} /></a></li>
              <li><a href="https://voters.eci.gov.in" target="_blank" rel="noreferrer">NVSP Portal <ExternalLink size={14} /></a></li>
              <li><a href="https://results.eci.gov.in" target="_blank" rel="noreferrer">Results Portal <ExternalLink size={14} /></a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 ElecGuide India. This is an educational assistant project.</p>
          <div className="bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
