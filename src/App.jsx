import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import ChatBot from './components/ChatBot';
import Checklist from './components/Checklist';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <ChatBot />
        <Checklist />
      </main>
      <Footer />
    </div>
  );
}

export default App;
