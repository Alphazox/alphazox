import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { BackgroundFX } from './components/BackgroundFX';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { DemoModal } from './components/DemoModal';
import { DemoContext } from './context/demo';
import HomePage from './pages/HomePage';
import AgenticPage from './pages/AgenticPage';
import PlatformPage from './pages/PlatformPage';
import SolutionsPage from './pages/SolutionsPage';
import IndustriesPage from './pages/IndustriesPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import SolutionDetailPage from './pages/SolutionDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Hash links from the mega-menu land on their section; everything else starts at the top.
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
};

const App: React.FC = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = useCallback(() => setDemoOpen(true), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);
  const ctx = useMemo(() => ({ openDemo }), [openDemo]);

  return (
    <BrowserRouter>
      <DemoContext.Provider value={ctx}>
        <ScrollToTop />
        <BackgroundFX />
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/agentic-ai" element={<AgenticPage />} />
              <Route path="/platform" element={<PlatformPage />} />
              <Route path="/platform/:slug" element={<SolutionDetailPage kind="platform" />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/solutions/:slug" element={<SolutionDetailPage kind="initiative" />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/industries/:slug" element={<SolutionDetailPage kind="industry" />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Old URLs from the previous site */}
              <Route path="/services" element={<Navigate to="/solutions" replace />} />
              <Route path="/platforms" element={<Navigate to="/platform" replace />} />
              <Route path="/quote" element={<Navigate to="/contact" replace />} />
              <Route path="/blog" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ChatBot />
        <DemoModal open={demoOpen} onClose={closeDemo} />
      </DemoContext.Provider>
    </BrowserRouter>
  );
};

export default App;
