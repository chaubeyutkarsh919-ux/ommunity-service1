import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Compass,
  Printer,
  RotateCcw,
  Award,
  Layers,
  Filter,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  MessageSquareHeart,
  Share2,
  Clock,
  BookOpen
} from 'lucide-react';
import CareerCard from '../components/CareerCard';
import ScholarshipCard from '../components/ScholarshipCard';
import FeedbackModal from '../components/FeedbackModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('careers'); // 'careers' or 'scholarships'
  const [careerFilter, setCareerFilter] = useState('all'); // 'all', 'vocational', 'degree', 'defense'
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    // Read from localStorage
    const savedResults = localStorage.getItem('margdarshak_results');
    const savedProfile = localStorage.getItem('margdarshak_profile');

    if (savedResults && savedProfile) {
      try {
        setData(JSON.parse(savedResults));
        setProfile(JSON.parse(savedProfile));
        setLoading(false);
      } catch (e) {
        console.error('Error parsing stored results:', e);
        fetchDefaultData();
      }
    } else {
      // If student lands directly without taking the quiz, run a high-match default profile
      fetchDefaultData();
    }
  }, []);

  const fetchDefaultData = async () => {
    const defaultProfile = {
      class_level: "12",
      stream: "PCM",
      percentage: 74,
      state: "All India / Central",
      income_bracket: "1_5l_to_2_5l",
      category: "OBC",
      gender: "Female",
      interests: ["building_things", "math_logic", "technology"],
      preferred_pathway: "any"
    };

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultProfile)
      });
      const resData = await res.json();
      setData(resData);
      setProfile(defaultProfile);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-3 border-[var(--accent-primary)] border-t-transparent animate-spin mx-auto"></div>
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          Calculating career fit and verifying government scholarship criteria...
        </p>
      </div>
    );
  }

  const allCareers = data?.careers || [];
  const allScholarships = data?.scholarships || [];

  // Filter careers
  const filteredCareers = allCareers.filter((c) => {
    if (careerFilter === 'vocational') return c.is_vocational;
    if (careerFilter === 'degree') return !c.is_vocational;
    if (careerFilter === 'defense') return c.category.toLowerCase().includes('defense') || c.category.toLowerCase().includes('police');
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pb-20 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print-page">
        
        {/* Top Banner with Student Profile Summary & Action Buttons */}
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success-text)]" />
              <span>Profile Evaluated Successfully</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Your Personalized Guidance Dashboard
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--text-secondary)] pt-1">
              <span className="px-2.5 py-1 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-md">
                Class {profile?.class_level}th ({profile?.stream})
              </span>
              <span className="px-2.5 py-1 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-md">
                {profile?.percentage}% Marks
              </span>
              <span className="px-2.5 py-1 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-md">
                Category: {profile?.category}
              </span>
              <span className="px-2.5 py-1 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-md">
                {profile?.gender}
              </span>
            </div>
          </div>

          {/* Actions Group (Retake, Print, Feedback) */}
          <div className="flex flex-wrap items-center gap-2.5 no-print">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-[var(--bg-card-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] rounded-lg text-xs font-semibold active:scale-[0.97] transition-all cursor-pointer"
              title="Print or Save PDF for offline sharing with parents/teachers"
            >
              <Printer className="w-4 h-4 text-[var(--text-muted)]" />
              <span>Save / Print PDF</span>
            </button>

            <button
              onClick={() => setShowFeedbackModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-bg)] hover:bg-[var(--accent-bg)]/80 text-[var(--accent-text)] border border-[var(--accent-border)] rounded-lg text-xs font-semibold active:scale-[0.97] transition-all cursor-pointer"
            >
              <MessageSquareHeart className="w-4 h-4 text-[var(--accent-text)]" />
              <span>Give Cohort Feedback</span>
            </button>

            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] rounded-lg text-xs font-semibold active:scale-[0.97] transition-all shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Profiler</span>
            </Link>
          </div>

        </div>

        {/* Navigation Switch Tabs with Animated Sliding Underline/Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-subtle)] pb-3 gap-3 no-print">
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setActiveTab('careers')}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'careers'
                  ? 'text-[var(--accent-contrast)] bg-[var(--accent-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] bg-[var(--bg-card)]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Recommended Career Pathways ({allCareers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('scholarships')}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'scholarships'
                  ? 'text-[var(--accent-contrast)] bg-[var(--accent-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] bg-[var(--bg-card)]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Matched Scholarships ({allScholarships.length})</span>
            </button>
          </div>

          {/* Filter for Careers */}
          {activeTab === 'careers' && (
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <span className="text-[var(--text-muted)] mr-1 flex items-center gap-1 font-medium">
                <Filter className="w-3.5 h-3.5 text-[var(--text-muted)]" /> Filter:
              </span>
              {[
                { id: 'all', label: 'All Fits' },
                { id: 'vocational', label: 'Short ITI / Diploma' },
                { id: 'degree', label: 'Degree College' },
                { id: 'defense', label: 'Defense / Police' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCareerFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all text-xs cursor-pointer ${
                    careerFilter === f.id
                      ? 'bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] font-semibold'
                      : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] font-medium'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB CONTENT WITH CROSS-FADE TRANSITION */}
        <AnimatePresence mode="wait">
          {/* CAREERS TAB VIEW */}
          {activeTab === 'careers' && (
            <motion.div
              key="careers-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                    Top Matched Career Pathways For You
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Sorted by your academic marks compatibility and interest similarity
                  </p>
                </div>
                <span className="text-xs font-semibold text-[var(--success-text)] bg-[var(--success-bg)] px-3 py-1 rounded-full border border-[var(--success-border)]">
                  {filteredCareers.length} Options Available
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredCareers.slice(0, 5).map((career, idx) => (
                  <CareerCard key={career.id} career={career} rank={idx + 1} />
                ))}
              </div>
            </motion.div>
          )}

          {/* SCHOLARSHIPS TAB VIEW */}
          {activeTab === 'scholarships' && (
            <motion.div
              key="scholarships-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                    Verified Government & Private Scholarships
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Direct financial aid based on your {profile?.percentage}% marks, caste category, and family income bracket
                  </p>
                </div>
                <span className="text-xs font-semibold text-[var(--accent-text)] bg-[var(--accent-bg)] px-3 py-1 rounded-full border border-[var(--accent-border)]">
                  {allScholarships.length} Schemes Ready
                </span>
              </div>

              {allScholarships.length === 0 ? (
                <div className="p-8 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] text-center space-y-3 shadow-card">
                  <AlertTriangle className="w-8 h-8 text-[var(--accent-primary)] mx-auto" />
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    No Direct Hard Cutoff Match Found
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
                    Try updating your percentage or income bracket to discover additional state-level schemes.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allScholarships.map((scholarship) => (
                    <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Embedded Help & Cohort Feedback Banner */}
        <div className="bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[var(--border-subtle)] shadow-card no-print transition-all">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] bg-[var(--accent-bg)] px-3 py-1 rounded-full border border-[var(--accent-border)] inline-block">
              Student Voice Initiative
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              Did you discover an option you didn't know about before?
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-xl">
              Your 30-second anonymous review helps us improve the questions and add local scholarships for future students in your district.
            </p>
          </div>

          <button
            onClick={() => setShowFeedbackModal(true)}
            className="px-5 py-2.5 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] font-semibold text-xs sm:text-sm rounded-lg shadow-sm active:scale-[0.97] transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <MessageSquareHeart className="w-4 h-4" />
            <span>Leave 30-Sec Review</span>
          </button>
        </div>

        {/* Cohort Feedback Modal */}
        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
        />

      </div>
    </div>
  );
}
