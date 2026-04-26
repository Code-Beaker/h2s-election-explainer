import React, { useState, useEffect } from 'react';
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
    <section id="checklist" className="checklist-section">
      <div className="container">
        <div className="checklist-layout">
          <div className="checklist-info">
            <h2>Your Voter <span>Checklist</span></h2>
            <p>Track your preparation progress to ensure a smooth voting experience.</p>
            
            <div className="progress-container card">
              <div className="progress-header">
                <span>Election Readiness</span>
                <span className="percentage">{progress}%</span>
              </div>
              <div className="progress-bar-bg">
                <motion.div 
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              {progress === 100 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="completion-badge"
                >
                  <Trophy size={16} /> You're ready to vote!
                </motion.div>
              )}
            </div>
          </div>

          <div className="tasks-container card">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                <div className="task-checkbox">
                  {task.completed ? (
                    <CheckCircle2 size={24} color="var(--secondary)" />
                  ) : (
                    <Circle size={24} color="var(--border)" />
                  )}
                </div>
                <span className="task-text">{task.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Checklist;
