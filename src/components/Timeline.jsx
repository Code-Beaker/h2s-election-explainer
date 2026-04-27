import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Calendar, FileText, Megaphone, Fingerprint, BarChart3 } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Voter Registration",
    icon: <UserPlus size={24} />,
    description: "The first step is ensuring you are on the electoral roll. Citizens aged 18+ can register via the NVSP portal or Voter Helpline App.",
    details: [
      "Check your name in the Electoral Roll",
      "Apply for Form 6 for new registration",
      "Correction of entries via Form 8",
      "Linking Aadhaar with Voter ID (Optional)"
    ],
    color: "#3b82f6"
  },
  {
    id: 2,
    title: "Election Notification",
    icon: <Calendar size={24} />,
    description: "The Election Commission of India (ECI) announces the schedule, marking the start of the 'Model Code of Conduct'.",
    details: [
      "Announcement of polling phases",
      "Enforcement of Model Code of Conduct",
      "Publication of Gazetted Notification",
      "Last date for filing nominations"
    ],
    color: "#10b981"
  },
  {
    id: 3,
    title: "Candidate Nominations",
    icon: <FileText size={24} />,
    description: "Candidates file their nomination papers, including affidavits about their assets, education, and criminal records.",
    details: [
      "Scrutiny of nominations by Returning Officer",
      "Withdrawal period for candidates",
      "Allocation of symbols to independent candidates",
      "Publication of final list of candidates"
    ],
    color: "#f59e0b"
  },
  {
    id: 4,
    title: "Campaigning Phase",
    icon: <Megaphone size={24} />,
    description: "Political parties and candidates reach out to voters through rallies, manifestos, and door-to-door campaigning.",
    details: [
      "Public meetings and processions",
      "Release of Party Manifestos",
      "Campaigning stops 48 hours before polling",
      "Door-to-door silent campaigning"
    ],
    color: "#8b5cf6"
  },
  {
    id: 5,
    title: "Polling Day",
    icon: <Fingerprint size={24} />,
    description: "The most crucial day. Voters go to polling stations to cast their votes using Electronic Voting Machines (EVMs) and VVPATs.",
    details: [
      "Identity verification (Voter ID/ID proof)",
      "Marking with Indelible Ink",
      "Pressing the button on EVM",
      "Verifying vote on VVPAT screen"
    ],
    color: "#ec4899"
  },
  {
    id: 6,
    title: "Counting & Results",
    icon: <BarChart3 size={24} />,
    description: "Votes are counted under strict supervision, and the candidate with the highest votes in each constituency is declared the winner.",
    details: [
      "Secure transport of EVMs to counting centers",
      "Round-wise counting of votes",
      "Verification of VVPAT slips (random sample)",
      "Issuance of Certificate of Election"
    ],
    color: "#3b82f6"
  }
];

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <div className="section-header">
          <h2>Interactive Election <span>Journey</span></h2>
          <p>Understand the 6 critical steps of the Indian democratic process.</p>
        </div>

        <div className="timeline-container">
          <div className="timeline-nav">
            {steps.map((step) => (
              <button 
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`timeline-nav-item ${activeStep === step.id ? 'active' : ''}`}
                style={{ '--step-color': step.color }}
              >
                <div className="step-num">{step.id}</div>
                <div className="step-label">{step.title}</div>
              </button>
            ))}
          </div>

          <div className="step-content-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="step-content card"
              >
                <div className="step-header">
                  <div className="step-icon" style={{ backgroundColor: steps[activeStep-1].color }}>
                    {steps[activeStep-1].icon}
                  </div>
                  <div className="step-title-group">
                    <h3>{steps[activeStep-1].title}</h3>
                    <p className="step-subtitle">Phase {activeStep} of 6</p>
                  </div>
                </div>
                
                <div className="step-body">
                  <p className="step-description">{steps[activeStep-1].description}</p>
                  
                  <div className="details-grid">
                    <h4>Key Activities:</h4>
                    <ul>
                      {steps[activeStep-1].details.map((detail, idx) => (
                        <li key={idx}>
                          <div className="bullet" style={{ backgroundColor: steps[activeStep-1].color }}></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="step-footer">
                  <a href="https://www.eci.gov.in/voter-education" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                    Read Official Guide
                  </a>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveStep(prev => prev < 6 ? prev + 1 : 1)}
                  >
                    {activeStep < 6 ? 'Next Step' : 'Back to Start'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Timeline;
