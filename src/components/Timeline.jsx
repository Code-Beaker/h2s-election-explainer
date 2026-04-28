import { useState } from 'react';
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
    <section id="timeline" className="py-24 lg:py-32 bg-bg-primary border-t border-border-main/50">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-text-primary">
            Interactive Election <span className="text-primary-main">Journey</span>
          </h2>
          <p className="text-lg text-text-secondary">Understand the 6 critical steps of the Indian democratic process.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">
          <div className="flex flex-col gap-4 sticky top-[100px]">
            {steps.map((step) => (
              <button 
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-4 p-4 border rounded-md text-left transition-all ${
                  activeStep === step.id 
                    ? 'bg-bg-tertiary text-text-primary' 
                    : 'bg-bg-secondary border-border-main text-text-secondary hover:text-text-primary'
                }`}
                style={{ borderColor: activeStep === step.id ? step.color : undefined }}
                aria-current={activeStep === step.id ? "step" : undefined}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    activeStep === step.id ? 'text-white' : 'bg-bg-tertiary'
                  }`}
                  style={{ backgroundColor: activeStep === step.id ? step.color : undefined }}
                >
                  {step.id}
                </div>
                <div className="font-medium text-[0.95rem]">{step.title}</div>
              </button>
            ))}
          </div>

          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="p-8 bg-bg-secondary border border-border-main rounded-2xl shadow-xl flex flex-col h-full"
              >
                <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border-main">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: steps[activeStep-1].color }}
                  >
                    {steps[activeStep-1].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-text-primary mb-1">
                      {steps[activeStep-1].title}
                    </h3>
                    <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                      Phase {activeStep} of 6
                    </p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-lg leading-relaxed text-text-primary mb-10">
                    {steps[activeStep-1].description}
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
                      Key Activities:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {steps[activeStep-1].details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-4 bg-bg-tertiary/50 border border-border-main rounded-lg transition-colors hover:border-border-focus">
                          <div 
                            className="w-2 h-2 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: steps[activeStep-1].color }}
                          ></div>
                          <span className="text-[0.95rem] text-text-primary leading-tight">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-10 flex justify-end gap-4">
                  <a 
                    href="https://www.eci.gov.in/voter-education" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all border border-border-main text-text-primary hover:bg-bg-tertiary hover:border-text-muted"
                  >
                    Read Official Guide
                  </a>
                  <button 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all bg-primary-main text-white hover:bg-primary-hover hover:-translate-y-[1px]"
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
