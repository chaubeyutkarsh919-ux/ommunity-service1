import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Cpu,
  HeartHandshake,
  Landmark,
  Palette,
  Award,
  Zap,
  Code2,
  Brush,
  DollarSign,
  Layers,
  ChevronRight,
  TrendingUp,
  Check,
  Clock,
  Laptop
} from 'lucide-react';
import TickerBanner from '../components/TickerBanner';
import StatsWidget from '../components/StatsWidget';
import FeedbackModal from '../components/FeedbackModal';

export default function Home() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Interactive Recommender Form State
  const [selectedClass, setSelectedClass] = useState('12th');
  const [selectedInterests, setSelectedInterests] = useState(['Technology', 'Engineering']);
  const [mathMarks, setMathMarks] = useState('88');
  const [scienceMarks, setScienceMarks] = useState('84');
  const [englishMarks, setEnglishMarks] = useState('80');
  const [recommendationsGenerated, setRecommendationsGenerated] = useState(false);
  const resultsRef = useRef(null);

  const interestOptions = [
    { id: 'Technology', label: 'Technology', icon: Cpu },
    { id: 'Engineering', label: 'Engineering', icon: Wrench },
    { id: 'Healthcare', label: 'Healthcare', icon: HeartHandshake },
    { id: 'Arts', label: 'Arts & Media', icon: Palette },
    { id: 'Design', label: 'Design', icon: Brush },
    { id: 'Commerce', label: 'Commerce & Finance', icon: Landmark },
    { id: 'Defense', label: 'Defense & Armed Cadres', icon: Award },
    { id: 'Trades', label: 'Vocational Trades', icon: Zap }
  ];

  const toggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== interestId));
      }
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleGenerateRecommendations = (e) => {
    e.preventDefault();
    setRecommendationsGenerated(true);
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 6 Core Vocational & Higher Routes
  const pathways = [
    {
      title: 'Vocational & ITI Fast-Track',
      tag: 'Earn in 1-2 Years',
      icon: Wrench,
      desc: 'Hands-on trades like Solar Inverter Tech, Electrician, CNC Machining, and Railway Apprentice. Zero college debt, immediate local jobs.',
      eligibility: 'Class 10 Pass',
      startingPay: '₹18,000 - ₹32,000 / mo'
    },
    {
      title: 'Science, Tech & Web Coding',
      tag: 'Polytechnic & Degrees',
      icon: Cpu,
      desc: 'Software development, cybersecurity support, and drone operations via low-cost Polytechnic diplomas, BCA, or government colleges.',
      eligibility: 'Class 10 or 12 (PCM/General)',
      startingPay: '₹25,000 - ₹50,000 / mo'
    },
    {
      title: 'Healthcare & Nursing Assistance',
      tag: 'Lifelong Respect',
      icon: HeartHandshake,
      desc: 'Emergency Medical Tech (Paramedic), Community Nurse (ANM/GNM), and trauma care. Free hostel and stipends available under state schemes.',
      eligibility: 'Class 12 (PCB or Any)',
      startingPay: '₹20,000 - ₹38,000 / mo'
    },
    {
      title: 'Commerce & Tax Consulting',
      tag: 'Banking & Business',
      icon: Landmark,
      desc: 'GST tax accounting, tally operations, and bank clerk examinations through affordable government commerce courses and PMKVY certifications.',
      eligibility: 'Class 12 (Commerce or Any)',
      startingPay: '₹20,000 - ₹40,000 / mo'
    },
    {
      title: 'Design, Animation & Media',
      tag: 'Creative & Remote',
      icon: Palette,
      desc: 'UI/UX drafting, video editing, social media management, and commercial graphics. Lucrative remote freelancing and agency opportunities.',
      eligibility: 'Class 10 or 12 (Any Stream)',
      startingPay: '₹22,000 - ₹45,000 / mo'
    },
    {
      title: 'Defense, Police & Armed Cadres',
      tag: 'Pride & Job Security',
      icon: Award,
      desc: 'Agniveer (Army, Navy, Air Force), State Police Constables, and Paramilitary cadres with pension security, medical coverage, and quotas.',
      eligibility: 'Class 10 or 12 (Physical Standard)',
      startingPay: '₹30,000 - ₹48,000 / mo'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-250">
      
      {/* Real-time Ticker Marquee with verified grants */}
      <TickerBanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-20 border-b border-[var(--border-subtle)]">
        {/* Ambient Dark Gradient & Radial Mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-base)] to-[var(--bg-base)] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent-glow)] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Mission & Core Value Props */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge: Free Public Career Cell */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                <span>Government & State Board Aligned (CBSE, RBSE, BSEB, UP)</span>
              </div>

              {/* Primary Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.15]">
                <span className="text-[var(--accent-primary)]">
                  Personalized Career & Scholarship Guidance
                </span>{' '}
                for Students.
              </h1>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl">
                Empowering Class 10/12 students with tailored recommendations based on Interests and Marks. Designed for Under-Resourced Schools.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#recommender-tool"
                  className="btn-primary-accent inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-lg text-sm sm:text-base font-semibold shadow-sm active:scale-[0.97] transition-all group"
                >
                  <Sparkles className="w-4 h-4 text-[var(--accent-contrast)] group-hover:rotate-12 transition-transform" />
                  <span>Try Recommender Tool</span>
                  <ArrowRight className="w-4 h-4 text-[var(--accent-contrast)] group-hover:translate-x-1 transition-transform" />
                </a>

                <Link
                  to="/assessment"
                  className="btn-secondary-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm sm:text-base font-semibold active:scale-[0.97] transition-all"
                >
                  <Compass className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>Full 5-Min Assessment</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)]" />
                  100% Free Public Initiative
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)]" />
                  Rule-Based & ML Algorithms
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)]" />
                  Zero Coaching Jargon
                </span>
              </div>

            </div>

            {/* Right Column: Compelling Photo of Students */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-card group">
                <img
                  src="/indian_students_classroom.jpg"
                  alt="Diverse Indian high school students collaborating on career roadmaps in a modern classroom"
                  className="w-full h-[320px] sm:h-[360px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Badge on Photo */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)]" />
                    <span className="text-xs font-semibold">Tested in Real Classrooms</span>
                  </div>
                  <span className="text-[11px] font-medium text-[var(--accent-text)] bg-[var(--accent-bg)] px-2 py-0.5 rounded border border-[var(--accent-border)]">
                    2,400+ Students Guided
                  </span>
                </div>
              </div>

              {/* Decorative Accent Badges */}
              <div className="hidden sm:flex absolute -top-3 -left-3 bg-[var(--bg-card)] text-[var(--text-primary)] px-3.5 py-1.5 rounded-lg shadow-card border border-[var(--border-subtle)] items-center gap-2 text-xs font-semibold">
                <GraduationCap className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Class 10 & 12 Focused</span>
              </div>

              <div className="hidden sm:flex absolute -bottom-3 -right-3 bg-[var(--accent-primary)] text-[var(--accent-contrast)] px-3.5 py-1.5 rounded-lg shadow-card items-center gap-1.5 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-contrast)]" />
                <span>Govt Portal Linked</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Main Recommendation Tool Interface: FIND YOUR PATH & FUNDING */}
      <section id="recommender-tool" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] shadow-card p-8 sm:p-10 lg:p-12 relative overflow-hidden">
          
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--accent-text)] text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Instant Interactive Profiler</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              FIND YOUR PATH & FUNDING
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              Select your academic stage, tap what you enjoy doing, and provide your recent marks to unlock tailored roadmaps and eligible grants.
            </p>
          </div>

          {/* Interactive Form: STEP 1: TELL US ABOUT YOURSELF */}
          <form onSubmit={handleGenerateRecommendations} className="space-y-8">
            
            {/* Step 1 Label */}
            <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
              <div className="w-7 h-7 rounded-full bg-[var(--accent-primary)] text-[var(--accent-contrast)] flex items-center justify-center font-bold text-xs">
                1
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] uppercase tracking-wide">
                  STEP 1: TELL US ABOUT YOURSELF
                </h3>
                <p className="text-xs text-[var(--text-muted)]">Quick answers take less than 30 seconds</p>
              </div>
            </div>

            {/* Field 1: Select Class */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                Select Class:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
                {['10th', '12th'].map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClass(cls)}
                    className={`py-2.5 px-4 rounded-lg text-sm font-medium border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      selectedClass === cls
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--accent-contrast)] shadow-sm font-semibold'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {selectedClass === cls && <Check className="w-4 h-4 text-[var(--accent-contrast)]" />}
                    <span>Class {cls}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Field 2: Enter Your Interests (Multiple) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                  Enter Your Interests (Multiple):
                </label>
                <span className="text-[11px] font-normal text-[var(--text-muted)]">
                  Select all that excite you
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedInterests.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleInterest(opt.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[var(--accent-primary)] bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`} />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 3: Enter Your Marks (Optional, for Scholarships) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                  Enter Your Marks (Optional, for Scholarships):
                </label>
                <span className="text-[11px] font-medium text-[var(--success-text)] bg-[var(--success-bg)] px-2.5 py-0.5 rounded-full border border-[var(--success-border)]">
                  Helps unlock merit-based funding
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    Maths / Quantitative (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={mathMarks}
                      onChange={(e) => setMathMarks(e.target.value)}
                      placeholder="e.g. 90"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] text-[var(--text-primary)] font-medium focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:outline-none transition-all text-sm"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-[var(--text-muted)] font-semibold">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    Science / Applied (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scienceMarks}
                      onChange={(e) => setScienceMarks(e.target.value)}
                      placeholder="e.g. 85"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] text-[var(--text-primary)] font-medium focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:outline-none transition-all text-sm"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-[var(--text-muted)] font-semibold">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    English / Language (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={englishMarks}
                      onChange={(e) => setEnglishMarks(e.target.value)}
                      placeholder="e.g. 78"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] text-[var(--text-primary)] font-medium focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:outline-none transition-all text-sm"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-[var(--text-muted)] font-semibold">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button & Note */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-[var(--accent-contrast)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] shadow-sm active:scale-[0.97] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[var(--accent-contrast)]" />
                <span>GET PERSONALIZED RECOMMENDATIONS</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent-contrast)]" />
              </button>

              <div className="flex items-center gap-2 text-xs font-normal text-[var(--text-secondary)]">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Powered by rule-based and ML algorithms</span>
              </div>
            </div>

          </form>

        </div>
      </section>

      {/* Simulated & Live Recommendation Results Section */}
      <section ref={resultsRef} id="scholarships" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] text-[var(--success-text)] text-xs font-semibold uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success-text)]" />
                <span>Matched with Class {selectedClass} Profile</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                YOUR TOP RECOMMENDATIONS {recommendationsGenerated ? '(LIVE MATCH)' : '(SAMPLE)'}
              </h2>
            </div>

            <Link
              to="/assessment"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] hover:underline"
            >
              <span>Take Full Comprehensive Assessment</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Row of Modern Cards with Soft Edges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: DATA SCIENTIST CAREER PATH */}
            <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-6 shadow-card hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_-4px_var(--accent-glow)] transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]">
                    Strong Match (94%)
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  DATA SCIENTIST CAREER PATH
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  Analyze datasets, train practical predictive algorithms, and build dashboards for businesses and tech services.
                </p>

                <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] space-y-2 text-xs">
                  <div className="text-[var(--text-secondary)] font-medium">Skills to Learn:</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium text-[11px]">Python</span>
                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium text-[11px]">Math / Stats</span>
                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium text-[11px]">AI / ML</span>
                  </div>
                  <div className="pt-2 flex justify-between font-medium text-xs">
                    <span className="text-[var(--text-muted)]">Entry Pay:</span>
                    <span className="text-[var(--success-text)] font-semibold">₹30,000 - ₹55,000/mo</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[var(--border-subtle)]">
                <Link
                  to="/assessment"
                  className="w-full py-2 px-4 rounded-lg text-xs font-semibold text-[var(--accent-text)] bg-[var(--accent-bg)] hover:bg-[var(--accent-bg)]/80 border border-[var(--accent-border)] text-center block transition-colors"
                >
                  View Step-by-Step Roadmap
                </Link>
              </div>
            </div>

            {/* Card 2: GRAPHIC DESIGNER CAREER */}
            <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-6 shadow-card hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_-4px_var(--accent-glow)] transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Brush className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)]">
                    Interest Match (89%)
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  GRAPHIC DESIGNER CAREER
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  Design visual brand assets, social media campaigns, print collateral, and interactive digital interfaces for studios and remote clients.
                </p>

                <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] space-y-2 text-xs">
                  <div className="text-[var(--text-secondary)] font-medium">Skills to Learn:</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium text-[11px]">Figma</span>
                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium text-[11px]">Photoshop</span>
                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium text-[11px]">Typography</span>
                  </div>
                  <div className="pt-2 flex justify-between font-medium text-xs">
                    <span className="text-[var(--text-muted)]">Entry Pay:</span>
                    <span className="text-[var(--success-text)] font-semibold">₹20,000 - ₹42,000/mo</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[var(--border-subtle)]">
                <Link
                  to="/assessment"
                  className="w-full py-2 px-4 rounded-lg text-xs font-semibold text-[var(--accent-text)] bg-[var(--accent-bg)] hover:bg-[var(--accent-bg)]/80 border border-[var(--accent-border)] text-center block transition-colors"
                >
                  View Step-by-Step Roadmap
                </Link>
              </div>
            </div>

            {/* Card 3: MERIT-BASED SCHOLARSHIP A */}
            <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-6 shadow-card hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_-4px_var(--accent-glow)] transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]">
                    Direct Funding
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  MERIT-BASED SCHOLARSHIP A
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  National Central Sector Scheme for top performing students transitioning to undergraduate diplomas and degree courses.
                </p>

                <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] space-y-2 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-[var(--text-muted)]">Grant Amount:</span>
                    <span className="text-[var(--success-text)] font-semibold text-sm">₹50,000 / year</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[var(--text-muted)]">Eligibility:</span>
                    <span className="text-[var(--text-primary)]">85%+ in Class 12</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[var(--text-muted)]">Portal:</span>
                    <span className="text-[var(--accent-primary)]">scholarships.gov.in</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[var(--border-subtle)]">
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 rounded-lg text-xs font-semibold text-[var(--accent-contrast)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-center block shadow-sm active:scale-[0.97] transition-all cursor-pointer"
                >
                  APPLY NOW
                </a>
              </div>
            </div>

            {/* Card 4: REGIONAL SCHOLARSHIP B */}
            <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-6 shadow-card hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_-4px_var(--accent-glow)] transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)]">
                    State & Regional
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  REGIONAL SCHOLARSHIP B
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  Post-Matric Technical & Polytechnic Assistance Scheme for students from rural and government schools pursuing applied technical diplomas.
                </p>

                <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] space-y-2 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-[var(--text-muted)]">Grant Amount:</span>
                    <span className="text-[var(--success-text)] font-semibold text-sm">₹30,000 / yr + Waiver</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[var(--text-muted)]">Eligibility:</span>
                    <span className="text-[var(--text-primary)]">Class 10 or 12 Pass</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[var(--text-muted)]">Application:</span>
                    <span className="text-[var(--accent-primary)]">State Welfare Portal</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[var(--border-subtle)]">
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 rounded-lg text-xs font-semibold text-[var(--accent-contrast)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-center block shadow-sm active:scale-[0.97] transition-all cursor-pointer"
                >
                  APPLY NOW
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Sequential Visual Path: YOUR LEARNING & CAREER JOURNEY */}
      <section id="journey" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-[var(--bg-card)] rounded-xl p-8 sm:p-12 border border-[var(--border-subtle)] shadow-card relative overflow-hidden">
          
          <div className="max-w-3xl mb-10 relative z-10 text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] bg-[var(--accent-bg)] px-3 py-1 rounded-full border border-[var(--accent-border)] inline-block mb-2">
              End-to-End Progression
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              YOUR LEARNING & CAREER JOURNEY
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
              A transparent, 5-step sequential journey from your current school marks to real employment and fully funded higher education.
            </p>
          </div>

          {/* Sequential 5 Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            
            {/* Step 1: Input */}
            <div className="bg-[var(--bg-card-subtle)] rounded-xl p-5 border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-4px_var(--accent-glow)] transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent-primary)] transition-colors">
                  Input Profile & Marks
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Enter Class 10/12 status, preferred stream, marks in key subjects, and financial background.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--accent-primary)] font-medium flex items-center gap-1">
                <span>Takes 3-5 mins</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2: Algorithmic Match */}
            <div className="bg-[var(--bg-card-subtle)] rounded-xl p-5 border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-4px_var(--accent-glow)] transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <Cpu className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent-primary)] transition-colors">
                  Algorithmic Matching
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Rule-based eligibility matrix + multi-factor cosine vector calculations filter 100+ viable careers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--accent-primary)] font-medium flex items-center gap-1">
                <span>Rule-Based & ML</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 3: Roadmap & Skills */}
            <div className="bg-[var(--bg-card-subtle)] rounded-xl p-5 border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-4px_var(--accent-glow)] transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <Layers className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent-primary)] transition-colors">
                  Skill Gap & Roadmap
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Receive a clear chronological timeline with diplomas, ITI certificates, entrance exam deadlines, and free course links.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--accent-primary)] font-medium flex items-center gap-1">
                <span>Printable Roadmaps</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 4: Scholarship Funding */}
            <div className="bg-[var(--bg-card-subtle)] rounded-xl p-5 border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-4px_var(--accent-glow)] transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <DollarSign className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent-primary)] transition-colors">
                  Scholarship Unlocking
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Match with direct government and private trust funds (NSP, AICTE, State Schemes) matching your exact marks bracket.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--accent-primary)] font-medium flex items-center gap-1">
                <span>Direct Official Links</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 5: Application & Launch */}
            <div className="bg-[var(--bg-card-subtle)] rounded-xl p-5 border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-4px_var(--accent-glow)] transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center font-bold text-xs">
                    05
                  </div>
                  <TrendingUp className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent-primary)] transition-colors">
                  Mentorship & Launch
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Follow application checklists, verify document requirements, and start your first high-paying job or funded degree.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--accent-primary)] font-medium flex items-center gap-1">
                <span>Zero Tuition Debt</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

          {/* Photographic Laptop Mockup Callout */}
          <div className="mt-10 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2 justify-center md:justify-start">
                <Laptop className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Responsive & Lightweight Across All Devices</span>
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Works seamlessly on school lab computers, affordable Android smartphones, and prints clean offline roadmaps.
              </p>
            </div>

            <Link
              to="/assessment"
              className="px-6 py-2.5 rounded-lg text-xs font-semibold text-[var(--accent-contrast)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] transition-colors shadow-sm flex items-center gap-2 active:scale-[0.97]"
            >
              <span>Begin Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Visual Career Pathways Summary Grid: 6 Practical High School Routes */}
      <section id="pathways" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] bg-[var(--accent-bg)] px-3 py-1 rounded-full border border-[var(--accent-border)]">
            Pathways Designed For Real Lives
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            Explore 6 Practical High School Routes
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Whether you need to start earning immediately after Class 10 or aim for a multi-year funded degree, there is a clear roadmap for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pathways.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-6 shadow-card hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_-4px_var(--accent-glow)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)]">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[var(--text-muted)]">Eligibility:</span>
                    <span className="text-[var(--text-primary)] font-medium">{p.eligibility}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[var(--text-muted)]">Entry Pay:</span>
                    <span className="text-[var(--accent-primary)] font-semibold">{p.startingPay}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTED BY STUDENTS: Testimonials & Partner Organizations Section */}
      <section id="mentorship" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-8 sm:p-12 shadow-card space-y-10">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--success-text)] bg-[var(--success-bg)] px-3 py-1 rounded-full border border-[var(--success-border)] block mb-2 w-fit">
                Student Proof
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                TESTED BY STUDENTS
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Real feedback from Class 10 and 12 students across government and municipal school cohorts.
              </p>
            </div>

            <Link
              to="/cohort-feedback"
              className="px-4 py-2 rounded-lg bg-[var(--accent-bg)] hover:bg-[var(--accent-bg)]/80 text-[var(--accent-text)] border border-[var(--accent-border)] text-xs sm:text-sm font-semibold transition-colors"
            >
              Read All Cohort Reviews
            </Link>
          </div>

          {/* Testimonial Cards with Student Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Student 1: Amit S. */}
            <div className="bg-[var(--bg-card-subtle)] rounded-xl p-6 border border-[var(--border-subtle)] flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/student_amit.jpg"
                    alt="Amit S."
                    className="w-12 h-12 rounded-full object-cover border-2 border-[var(--accent-border)] shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">Amit S., Class 12</h4>
                    <p className="text-xs text-[var(--accent-primary)] font-medium">Found My Way!</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                  "I scored 74% in PCM and thought coaching for JEE was my only choice. FuturePaths showed me a 3-year Government Polytechnic diploma in Computer Engineering and unlocked a State Post-Matric grant of ₹30,000/year. I am now in semester 2 with zero loan!"
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border-subtle)] text-[11px] font-medium text-[var(--text-muted)]">
                Govt Model Senior Secondary School, Jaipur
              </div>
            </div>

            {/* Student 2: Pooja R. */}
            <div className="bg-[var(--bg-card-subtle)] rounded-xl p-6 border border-[var(--border-subtle)] flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/student_pooja.jpg"
                    alt="Pooja R."
                    className="w-12 h-12 rounded-full object-cover border-2 border-[var(--accent-border)] shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">Pooja R., Class 10</h4>
                    <p className="text-xs text-[var(--accent-primary)] font-medium">Polytechnic Scholar</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                  "After 10th grade, my family wanted me to take any general arts course nearby. Margdarshak guided me to an Emergency Medical Paramedic training with free hostel support. Now I am certified and helping patients in our district hospital!"
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border-subtle)] text-[11px] font-medium text-[var(--text-muted)]">
                Zilla Parishad High School, Maharashtra
              </div>
            </div>

            {/* Student 3: Rohan M. */}
            <div className="bg-[var(--bg-card-subtle)] rounded-xl p-6 border border-[var(--border-subtle)] flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--accent-text)] flex items-center justify-center font-bold text-sm shadow-sm">
                    RM
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">Rohan M., Class 12</h4>
                    <p className="text-xs text-[var(--accent-primary)] font-medium">Agniveer & Tech Track</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                  "The clear timeline for Indian Armed Forces exams along with solar electrical apprenticeships gave me two backup plans. The step-by-step roadmap prevented me from missing registration dates."
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border-subtle)] text-[11px] font-medium text-[var(--text-muted)]">
                Kendriya Vidyalaya, Bhopal
              </div>
            </div>

          </div>

          {/* Partner Organization Logos & Recognition */}
          <div className="pt-6 border-t border-[var(--border-subtle)]">
            <p className="text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-6">
              Recognized and Integrated with National Frameworks
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-90">
              <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)] text-sm">
                <div className="w-7 h-7 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center font-bold text-xs">NCS</div>
                <span>National Career Service</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)] text-sm">
                <div className="w-7 h-7 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center font-bold text-xs">NSP</div>
                <span>National Scholarship Portal</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)] text-sm">
                <div className="w-7 h-7 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center font-bold text-xs">PM</div>
                <span>PMKVY Skill India</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)] text-sm">
                <div className="w-7 h-7 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center font-bold text-xs">AICTE</div>
                <span>AICTE Pragati Schemes</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Live Cohort Statistics & Real Impact Tracking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-card)] rounded-xl p-6 sm:p-10 border border-[var(--border-subtle)] shadow-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider block mb-1">
                Real Impact Tracking
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Verified Feedback from Under-Resourced Schools
              </h2>
            </div>
            
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="px-4 py-2.5 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] rounded-lg text-xs sm:text-sm font-semibold shadow-sm active:scale-[0.97] transition-all cursor-pointer"
            >
              Share Your Feedback
            </button>
          </div>

          <StatsWidget />
        </div>
      </section>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />

    </div>
  );
}
