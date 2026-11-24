import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Heart,
  Wrench,
  Calculator,
  Palette,
  Shield,
  Briefcase,
  Layers,
  Award,
  CheckCircle2,
  Check,
  AlertCircle,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';

const INDIAN_STATES = [
  "All India / Central",
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi NCR",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other State / UT"
];

const INTEREST_TAGS = [
  {
    id: "building_things",
    icon: Wrench,
    title: "Building & Fixing Things",
    subtitle: "Machines, electrical wiring, engines, physical tools",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "math_logic",
    icon: Calculator,
    title: "Math, Logic & Code",
    subtitle: "Solving puzzles, computers, software, data numbers",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: "healthcare_helping",
    icon: Heart,
    title: "Healthcare & Caregiving",
    subtitle: "Helping patients, biology, nursing, clinics, medicine",
    color: "from-rose-500 to-red-600"
  },
  {
    id: "creative_design",
    icon: Palette,
    title: "Design, Art & Video",
    subtitle: "Drawing, digital graphics, photography, storytelling",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: "business_money",
    icon: Briefcase,
    title: "Business, Trade & Accounts",
    subtitle: "Buying, selling, GST accounting, managing shops & teams",
    color: "from-emerald-600 to-teal-600"
  },
  {
    id: "discipline_defense",
    icon: Shield,
    title: "Uniformed Defense & Police",
    subtitle: "Discipline, physical fitness, Army, Navy, Police, security",
    color: "from-slate-700 to-slate-900"
  },
  {
    id: "public_service",
    icon: Layers,
    title: "Public Service & Law",
    subtitle: "Government welfare, legal rights, community social work",
    color: "from-cyan-600 to-blue-700"
  }
];

const PREFERRED_PATHWAYS = [
  {
    id: "vocational_diploma",
    title: "Short-Term ITI / Polytechnic Diploma (1-2 Years)",
    desc: "Fastest route to start earning money to support family. Low tuition fees with high practical job demand."
  },
  {
    id: "degree",
    title: "Full 3-4 Year College Degree (B.Sc, B.Com, BA, B.Tech)",
    desc: "Comprehensive higher education backed by government post-matric scholarships and educational grants."
  },
  {
    id: "defense",
    title: "Armed Forces / Uniformed Services (NDA / Agniveer / Police)",
    desc: "100% covered education, free accommodation, food, and disciplined government salary with respect."
  },
  {
    id: "direct_job",
    title: "Direct Job Entry after 12th + Distance Learning",
    desc: "Immediate entry-level job (back-office/hospitality/sales) while completing graduation through IGNOU/open state university."
  },
  {
    id: "any",
    title: "Show Me All Viable Options",
    desc: "I am open to whatever best matches my marks and offers scholarship support."
  }
];

export default function AssessmentWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [profile, setProfile] = useState({
    class_level: "12",
    stream: "PCM",
    percentage: 68,
    state: "All India / Central",
    income_bracket: "1_5l_to_2_5l",
    category: "OBC",
    gender: "Female",
    interests: ["building_things", "math_logic"],
    preferred_pathway: "any"
  });

  const handleInterestToggle = (id) => {
    setProfile((prev) => {
      const exists = prev.interests.includes(id);
      if (exists) {
        // Keep at least one
        if (prev.interests.length === 1) return prev;
        return { ...prev, interests: prev.interests.filter((i) => i !== id) };
      } else {
        return { ...prev, interests: [...prev.interests, id] };
      }
    });
  };

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!profile.percentage || profile.percentage < 33 || profile.percentage > 100) {
        setErrorMsg('Please enter a valid percentage between 33% and 100%.');
        return;
      }
    }
    if (currentStep === 2) {
      if (profile.interests.length === 0) {
        setErrorMsg('Please select at least 1 interest to match your career pathways.');
        return;
      }
    }
    setCurrentStep((s) => Math.min(3, s + 1));
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.success) {
        // Cache result in localStorage for instant retrieval
        localStorage.setItem('margdarshak_results', JSON.stringify(data));
        localStorage.setItem('margdarshak_profile', JSON.stringify(profile));
        navigate('/dashboard');
      } else {
        setErrorMsg('Could not process recommendation. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('Server connection error. Please make sure the backend is active.');
    } finally {
      setSubmitting(false);
    }
  };

  const stepMilestones = [
    { num: 1, title: 'Academic Marks & Eligibility' },
    { num: 2, title: 'Your Real Interests' },
    { num: 3, title: 'Career & Family Preferences' }
  ];

  const motivationalQuotes = [
    "Step 1: Every percentage has a dignified, realistic career waiting for it.",
    "Step 2: When you work in what you naturally enjoy, you grow 3x faster.",
    "Step 3: Finding scholarships means you never have to be a financial burden on your parents."
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] py-8 sm:py-12 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Progress Header */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            <span>Assessment Wizard</span>
            <span className="text-[var(--accent-primary)] font-bold">
              Step {currentStep} of 3
            </span>
          </div>

          {/* Step Visual Progress Bar */}
          <div className="grid grid-cols-3 gap-2">
            {stepMilestones.map((st) => (
              <div key={st.num} className="space-y-1.5">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep >= st.num ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border-subtle)]'
                  }`}
                ></div>
                <p
                  className={`text-[11px] font-medium hidden sm:block ${
                    currentStep >= st.num ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {st.title}
                </p>
              </div>
            ))}
          </div>

          {/* Motivational Banner */}
          <div className="p-3.5 bg-[var(--badge-info-bg)] border border-[var(--accent-primary)]/25 rounded-xl text-xs font-medium text-[var(--accent-primary)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0" />
            <span>{motivationalQuotes[currentStep - 1]}</span>
          </div>
        </div>

        {/* Main Form Card with Framer Motion transitions */}
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] p-6 sm:p-8 shadow-soft transition-colors duration-200">
          
          {errorMsg && (
            <div className="mb-6 p-3 bg-rose-950/40 border border-rose-800/60 text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* STEP 1: Academic Profile */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1">
                    Tell Us About Your Academic Profile
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    We use your class and marks to filter out unrealistic options and locate scholarships you qualify for.
                  </p>
                </div>

                {/* Class Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                    1. Which Class Are You In (or recently completed)?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "10", label: "Class 10th Pass", sub: "ITI, Polytechnic, Agniveer & Diploma eligible" },
                      { id: "12", label: "Class 12th (Senior Sec)", sub: "Degrees, Paramedical, NDA & Post-Matric schemes" }
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setProfile({ ...profile, class_level: c.id })}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          profile.class_level === c.id
                            ? 'border-[var(--accent-primary)] bg-[var(--badge-info-bg)] ring-1 ring-[var(--accent-primary)]/40 shadow-soft'
                            : 'border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 bg-[var(--bg-card-subtle)]'
                        }`}
                      >
                        <span className="font-semibold text-sm text-[var(--text-primary)] block">
                          {c.label}
                        </span>
                        <span className="text-[11px] text-[var(--text-secondary)] block mt-0.5">
                          {c.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stream Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                    2. Academic Stream
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "PCM", label: "Science (PCM)", sub: "Maths + Physics" },
                      { id: "PCB", label: "Science (PCB)", sub: "Biology + Chemistry" },
                      { id: "Commerce", label: "Commerce", sub: "Accounts, GST, Business" },
                      { id: "Arts", label: "Arts / Humanities", sub: "History, Pol Sci, Lang" },
                      { id: "General", label: "General / Vocational", sub: "Open School / ITI" }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setProfile({ ...profile, stream: s.id })}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          profile.stream === s.id
                            ? 'border-[var(--accent-primary)] bg-[var(--badge-info-bg)] font-semibold text-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)]/40'
                            : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <span className="text-xs font-semibold block">{s.label}</span>
                        <span className="text-[10px] text-[var(--text-muted)] block">{s.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Marks / Percentage Slider + Input */}
                <div className="p-4 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                      3. Approximate Marks / Board Percentage (%)
                    </label>
                    <span className="text-xl font-bold text-[var(--accent-primary)] bg-[var(--bg-card)] px-3 py-1 rounded-lg border border-[var(--border-subtle)] shadow-sm">
                      {profile.percentage}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="40"
                    max="98"
                    value={profile.percentage}
                    onChange={(e) => setProfile({ ...profile, percentage: Number(e.target.value) })}
                    className="w-full h-2 bg-[var(--border-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
                  />

                  <div className="flex justify-between text-[11px] font-medium text-[var(--text-muted)]">
                    <span>Pass (40%)</span>
                    <span>Average (60%)</span>
                    <span>Distinction (75%+)</span>
                    <span>Merit (90%+)</span>
                  </div>
                </div>

                {/* State & Category & Gender & Income Grid for Scholarships */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* State / Domicile */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Home State / Domicile
                    </label>
                    <select
                      value={profile.state}
                      onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-lg focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] focus:outline-none font-medium text-[var(--text-primary)]"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st} className="bg-[var(--bg-card)] text-[var(--text-primary)]">
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Family Income Bracket */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Annual Family Income (For Scholarships)
                    </label>
                    <select
                      value={profile.income_bracket}
                      onChange={(e) => setProfile({ ...profile, income_bracket: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-lg focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] focus:outline-none font-medium text-[var(--text-primary)]"
                    >
                      <option value="below_1_5l" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Under ₹1,50,000 / year (Need-Based High Priority)</option>
                      <option value="1_5l_to_2_5l" className="bg-[var(--bg-card)] text-[var(--text-primary)]">₹1,50,000 - ₹2,50,000 / year (Post-Matric eligible)</option>
                      <option value="2_5l_to_4_5l" className="bg-[var(--bg-card)] text-[var(--text-primary)]">₹2,50,000 - ₹4,50,000 / year (Central Sector eligible)</option>
                      <option value="4_5l_to_6l" className="bg-[var(--bg-card)] text-[var(--text-primary)]">₹4,50,000 - ₹6,00,000 / year (Pragati / State schemes)</option>
                      <option value="above_6l" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Above ₹6,00,000 / year (Merit-only schemes)</option>
                    </select>
                  </div>

                  {/* Social Category */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Social Category
                    </label>
                    <select
                      value={profile.category}
                      onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-lg focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] focus:outline-none font-medium text-[var(--text-primary)]"
                    >
                      <option value="General" className="bg-[var(--bg-card)] text-[var(--text-primary)]">General Category</option>
                      <option value="OBC" className="bg-[var(--bg-card)] text-[var(--text-primary)]">OBC (Other Backward Class)</option>
                      <option value="SC" className="bg-[var(--bg-card)] text-[var(--text-primary)]">SC (Scheduled Caste)</option>
                      <option value="ST" className="bg-[var(--bg-card)] text-[var(--text-primary)]">ST (Scheduled Tribe)</option>
                      <option value="EWS" className="bg-[var(--bg-card)] text-[var(--text-primary)]">EWS (Economically Weaker Section)</option>
                      <option value="Minority" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Religious Minority (Muslim, Christian, Sikh, Buddhist, Jain)</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Gender (For Girls-Only Scholarships)
                    </label>
                    <div className="flex gap-2">
                      {["Female", "Male", "Other"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setProfile({ ...profile, gender: g })}
                          className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                            profile.gender === g
                              ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast)] border-[var(--accent-primary)] shadow-sm'
                              : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--badge-info-bg)] hover:text-[var(--accent-primary)]'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            )}

            {/* STEP 2: Interests & Aptitude Matrix */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1">
                    What Do You Genuinely Enjoy Doing?
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    Select at least 2 interests. We match these against real daily duties in each career.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {INTEREST_TAGS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = profile.interests.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleInterestToggle(item.id)}
                        className={`p-4 rounded-xl border text-left transition-all relative flex items-start gap-3.5 group ${
                          isSelected
                            ? 'border-[var(--accent-primary)] bg-[var(--badge-info-bg)] ring-1 ring-[var(--accent-primary)]/40 shadow-soft'
                            : 'border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 bg-[var(--bg-card-subtle)]'
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--accent-primary)] flex items-center justify-center flex-shrink-0 shadow-sm"
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 pr-4">
                          <span className="font-semibold text-sm text-[var(--text-primary)] block group-hover:text-[var(--accent-primary)] transition-colors">
                            {item.title}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)] block leading-tight mt-0.5">
                            {item.subtitle}
                          </span>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-[var(--accent-contrast)]'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-card)]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-secondary)] flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-[var(--text-primary)]">No pressure:</strong> You do not need prior experience. If you like opening radios, solving puzzles, or helping sick family members, that counts as genuine talent.
                  </span>
                </div>

              </motion.div>
            )}

            {/* STEP 3: Practical Preferences */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1">
                    Practical Reality & Preferences
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    Every family has different financial needs. Choose the learning pace that fits your situation best.
                  </p>
                </div>

                <div className="space-y-3">
                  {PREFERRED_PATHWAYS.map((pathway) => {
                    const isSelected = profile.preferred_pathway === pathway.id;
                    return (
                      <button
                        key={pathway.id}
                        type="button"
                        onClick={() => setProfile({ ...profile, preferred_pathway: pathway.id })}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'border-[var(--accent-primary)] bg-[var(--badge-info-bg)] ring-1 ring-[var(--accent-primary)]/40 shadow-soft'
                            : 'border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 bg-[var(--bg-card-subtle)]'
                        }`}
                      >
                        <div>
                          <span className="font-semibold text-sm text-[var(--text-primary)] block mb-1">
                            {pathway.title}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)] leading-relaxed block">
                            {pathway.desc}
                          </span>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-[var(--accent-contrast)]'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-card)]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 bg-[var(--badge-success-bg)] border border-[var(--badge-success-border)] rounded-xl space-y-2">
                  <span className="text-xs font-semibold text-[var(--badge-success-text)] uppercase tracking-wider block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--badge-success-text)]" />
                    <span>Ready to Calculate Compatibility</span>
                  </span>
                  <p className="text-xs text-[var(--badge-success-text)]/90 leading-relaxed">
                    We will evaluate your <strong>{profile.percentage}%</strong> marks in <strong>{profile.stream}</strong> with your selected interests against 14 career pathways and 10 verified scholarship schemes.
                  </p>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

          {/* Wizard Navigation Footer */}
          <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
            
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--text-secondary)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-lg transition-all active:scale-[0.97] shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-[var(--accent-contrast)] bg-[var(--accent-primary)] hover:opacity-95 active:scale-[0.97] rounded-lg shadow-sm transition-all"
              >
                <span>Continue to Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleFinalSubmit}
                className="inline-flex items-center gap-2 px-7 py-2.5 text-xs sm:text-sm font-semibold text-[var(--accent-contrast)] bg-[var(--accent-primary)] hover:opacity-95 active:scale-[0.97] rounded-lg shadow-sm transition-all disabled:opacity-50"
              >
                <Compass className="w-4 h-4" />
                <span>{submitting ? 'Generating Roadmaps...' : 'See My Personalized Matches'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
