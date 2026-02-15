import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Writings from './pages/Writings';
import Arcade from './pages/Arcade';
import ScrollToTop from './components/ScrollToTop';
import Terminal from './components/Terminal';

const AppContent: React.FC = () => {
  return (
    <div className="bg-white dark:bg-darker text-slate-900 dark:text-slate-300 min-h-screen font-sans transition-colors duration-500 relative">
      <div className="relative z-50">
        <ScrollToTop />
        <Terminal /> {/* Global Terminal Overlay */}
        <Navbar />
      </div>
      {/* Main Content Area */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/writings" element={<Writings />} />
          <Route path="/arcade" element={<Arcade />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppContent />
    </Router>
  );
}

export default App;