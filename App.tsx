import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Writings from './pages/Writings';
import ScrollToTop from './components/ScrollToTop';

// Simple ScrollToTop component to ensure pages start at top
function ScrollToTopWrapper() {
  return <ScrollToTop />;
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="bg-white dark:bg-darker text-slate-900 dark:text-slate-300 min-h-screen font-sans">
        <ScrollToTopWrapper />
        <Navbar />
        {/* Main Content Area */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/writings" element={<Writings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;