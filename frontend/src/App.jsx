import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageSquareHeart } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FeedbackModal from './components/FeedbackModal';
import Home from './pages/Home';
import AssessmentWizard from './pages/AssessmentWizard';
import Dashboard from './pages/Dashboard';
import CohortReview from './pages/CohortReview';
import Login from './pages/Login';
import { getInitialTheme, applyTheme } from './lib/theme';

export default function App() {
  const [globalFeedbackOpen, setGlobalFeedbackOpen] = useState(false);

  useEffect(() => {
    applyTheme(getInitialTheme());
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans antialiased transition-colors duration-250">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<AssessmentWizard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cohort-feedback" element={<CohortReview />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Floating Quick Feedback Trigger */}
        <button
          onClick={() => setGlobalFeedbackOpen(true)}
          className="no-print fixed bottom-6 right-6 z-40 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] px-4 py-3 rounded-full shadow-elevated hover:shadow-[0_0_20px_var(--accent-glow)] flex items-center gap-2 text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 group border border-white/15"
          aria-label="Student Cohort Feedback"
        >
          <MessageSquareHeart className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline-block pr-1 font-medium">Student Voice</span>
        </button>

        {/* Global Feedback Modal */}
        <FeedbackModal
          isOpen={globalFeedbackOpen}
          onClose={() => setGlobalFeedbackOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
