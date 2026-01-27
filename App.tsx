import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChat from './components/AIChat';

function App() {
  return (
    <div className="bg-white dark:bg-darker text-slate-900 dark:text-slate-300 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <AIChat />
    </div>
  );
}

export default App;