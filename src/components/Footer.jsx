import { Link } from "react-router-dom";
import { Vote, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-bg-secondary border-t border-border-main py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr] gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-2xl font-heading font-bold text-text-primary">
              <Vote size={32} className="text-primary-main" />
              <span>Elec<span className="text-primary-main">Guide</span> India</span>
            </div>
            <p className="text-text-secondary text-lg max-w-sm leading-relaxed">
              Making democracy accessible and understandable for every citizen
              of India.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-text-primary font-bold uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/#timeline" className="text-text-secondary hover:text-text-primary transition-colors">Process</a>
              </li>
              <li>
                <Link to="/chat" className="text-text-secondary hover:text-text-primary transition-colors">AI Assistant</Link>
              </li>
              <li>
                <a href="/#checklist" className="text-text-secondary hover:text-text-primary transition-colors">Voter Checklist</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-text-primary font-bold uppercase tracking-wider text-sm">Official Resources</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="https://eci.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
                  ECI Website <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://voters.eci.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  NVSP Portal <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://results.eci.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  Results Portal <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-main flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-sm">
            &copy; 2026 ElecGuide India. This is an educational assistant
            project.
          </p>
          <div className="flex gap-8">
            <Link to="/" className="text-text-muted hover:text-text-primary text-sm transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-text-muted hover:text-text-primary text-sm transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
