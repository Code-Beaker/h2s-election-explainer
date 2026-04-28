import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';

const defaultTasks = [
  { id: 1, text: "Check your name in the Voter List (NVSP)", completed: false },
  { id: 2, text: "Update your address if moved recently", completed: false },
  { id: 3, text: "Download your e-EPIC (Voter ID Card)", completed: false },
  { id: 4, text: "Research candidates in your constituency", completed: false },
  { id: 5, text: "Locate your Polling Station", completed: false },
  { id: 6, text: "Check the Polling Date for your area", completed: false },
  { id: 7, text: "Carry a valid ID proof on Polling Day", completed: false }
];

const Checklist = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('electionTasks');
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem('electionTasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

  return (
    <section id="checklist" className="py-24 bg-bg-primary">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary">
              Your Voter <span className="text-primary-main">Checklist</span>
            </h2>
            <p className="text-lg text-text-secondary">Track your preparation progress to ensure a smooth voting experience.</p>
            
            <div className="p-8 bg-bg-secondary border border-border-main rounded-2xl shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-text-primary">Election Readiness</span>
                <span className="text-2xl font-bold text-primary-main">{progress}%</span>
              </div>
              <div className="h-3 w-full bg-bg-tertiary rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary-main shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              {progress === 100 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center justify-center gap-2 py-3 bg-secondary-main/10 text-secondary-main rounded-xl border border-secondary-main/20 font-bold"
                >
                  <Trophy size={20} /> You&apos;re ready to vote!
                </motion.div>
              )}
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {tasks.map(task => (
              <li key={task.id}>
                <button 
                  className={`w-full flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${
                    task.completed 
                      ? 'bg-secondary-main/5 border-secondary-main/30' 
                      : 'bg-bg-secondary border-border-main hover:border-border-focus'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="shrink-0">
                    {task.completed ? (
                      <CheckCircle2 size={28} className="text-secondary-main" />
                    ) : (
                      <Circle size={28} className="text-border-main" />
                    )}
                  </div>
                  <span className={`text-lg transition-all ${
                    task.completed ? 'text-text-muted line-through opacity-70' : 'text-text-primary'
                  }`}>
                    {task.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Checklist;
