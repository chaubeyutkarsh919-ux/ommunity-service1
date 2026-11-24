import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  GraduationCap,
  Briefcase,
  Lock,
  Mail,
  User,
  School,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Zap,
  ChevronLeft,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student'); // 'student' or 'counselor'
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email_or_phone: '',
    password: '',
    school_name: '',
    class_level: '12th'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleQuickDemo = (demoType) => {
    setErrorMessage('');
    if (demoType === 'student') {
      setRole('student');
      setIsRegister(false);
      setFormData({
        name: 'Aarav Sharma',
        email_or_phone: 'student@school.edu',
        password: 'student123',
        school_name: 'Govt Senior Secondary School, Jaipur',
        class_level: '12th'
      });
    } else {
      setRole('counselor');
      setIsRegister(false);
      setFormData({
        name: 'Sunita Verma',
        email_or_phone: 'counselor@school.edu',
        password: 'counselor123',
        school_name: 'District Career Guidance Cell',
        class_level: 'Educator'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister
      ? {
          name: formData.name.trim(),
          email_or_phone: formData.email_or_phone.trim(),
          password: formData.password,
          role: role,
          school_name: formData.school_name.trim(),
          class_level: formData.class_level
        }
      : {
          email_or_phone: formData.email_or_phone.trim(),
          password: formData.password
        };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('margdarshak_token', data.token);
        localStorage.setItem('margdarshak_user', JSON.stringify(data.user));

        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });

        setSuccessMessage(data.message || 'Login successful!');

        setTimeout(() => {
          if (data.user.role === 'counselor') {
            navigate('/cohort-feedback');
          } else {
            navigate('/dashboard');
          }
        }, 1200);
      } else {
        setErrorMessage(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMessage('Server connection error. Please make sure the backend is reachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[var(--bg-base)] overflow-hidden selection:bg-[var(--badge-info-bg)] selection:text-[var(--accent-primary)] transition-colors duration-200">
      
      {/* Background SVG Grid Pattern with Radial Gradient Mask */}
      <div
        className="absolute right-0 top-0 z-0 size-[55vw] max-w-[700px] pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgba(56, 189, 248, 0.12)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(100% 100% at 100% 0%, transparent, var(--bg-base))"
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl w-full">
        
        {/* Floating Back Button */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ChevronLeft size={16} className="text-[var(--accent-primary)]" />
            <span>Back to Home</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Side: Educational Showcase Card with Unsplash Photography (5 cols) */}
          <div className="md:col-span-5 bg-[var(--bg-card)] rounded-2xl p-7 sm:p-8 text-[var(--text-primary)] flex flex-col justify-between shadow-soft relative overflow-hidden border border-[var(--border-subtle)]">
            <div className="space-y-6 relative z-10">
              
              {/* Brand Logo */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--badge-info-bg)] border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)] font-bold shadow-sm">
                  <Compass className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <span className="font-bold text-xl text-[var(--text-primary)] tracking-tight block">
                    Future<span className="text-[var(--accent-primary)]">Paths</span>
                  </span>
                  <span className="text-[10px] text-[var(--accent-primary)] tracking-wide uppercase font-semibold">
                    Career Guidance Portal
                  </span>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-[var(--accent-primary)] uppercase tracking-wider block">
                  Free Student Account
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-[var(--text-primary)] tracking-tight">
                  Never Lose Your Career Roadmap.
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Log in on any mobile phone or school computer to access your saved scholarships, cutoffs, and verified preparation steps.
                </p>
              </div>

              {/* Stock Image from Unsplash */}
              <div className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="High school students studying career roadmaps"
                  className="w-full h-32 object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/90 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[10px] text-[var(--accent-primary)] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[var(--accent-primary)]" />
                    <span>Trusted by 1,200+ Students across Delhi & Rajasthan</span>
                  </span>
                </div>
              </div>

              {/* Benefits list */}
              <div className="space-y-2.5 pt-1 text-xs font-medium text-[var(--text-secondary)]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--badge-success-text)] mt-0.5 flex-shrink-0" />
                  <span>Save 10+ government and private scholarship deadlines</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--badge-success-text)] mt-0.5 flex-shrink-0" />
                  <span>Download printable PDF guidance reports for parents</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--badge-success-text)] mt-0.5 flex-shrink-0" />
                  <span>100% Free public service — zero advertisements</span>
                </div>
              </div>
            </div>

            {/* Quick Demo Credentials Box */}
            <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] relative z-10 space-y-2.5">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>One-Click Test Login:</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('student')}
                  className="px-2.5 py-2 bg-[var(--bg-card-subtle)] hover:bg-[var(--badge-info-bg)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/40 rounded-lg text-[11px] font-semibold text-[var(--text-primary)] transition-all text-center flex flex-col items-center justify-center cursor-pointer active:scale-95"
                >
                  <GraduationCap className="w-4 h-4 text-[var(--accent-primary)] mb-0.5" />
                  <span>Demo Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('counselor')}
                  className="px-2.5 py-2 bg-[var(--bg-card-subtle)] hover:bg-[var(--badge-info-bg)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/40 rounded-lg text-[11px] font-semibold text-[var(--text-primary)] transition-all text-center flex flex-col items-center justify-center cursor-pointer active:scale-95"
                >
                  <Briefcase className="w-4 h-4 text-[var(--accent-primary)] mb-0.5" />
                  <span>Demo Counselor</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Auth Form Card (7 cols) */}
          <div className="md:col-span-7 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] p-6 sm:p-8 shadow-soft flex flex-col justify-between relative">
            <div>
              
              {/* Role Switcher Tabs */}
              <div className="flex bg-[var(--bg-card-subtle)] p-1 rounded-xl mb-6 border border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    role === 'student'
                      ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm border border-[var(--border-subtle)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>Student Portal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('counselor')}
                  className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    role === 'counselor'
                      ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm border border-[var(--border-subtle)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>Teacher / Counselor</span>
                </button>
              </div>

              {/* Title & Subheader */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                  {isRegister
                    ? `Create Free ${role === 'student' ? 'Student' : 'Counselor'} Account`
                    : `Sign in to ${role === 'student' ? 'Student Portal' : 'Educator Dashboard'}`}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                  {isRegister ? (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setIsRegister(false)}
                        className="text-[var(--accent-primary)] font-semibold hover:underline cursor-pointer"
                      >
                        Sign in here.
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setIsRegister(true)}
                        className="text-[var(--accent-primary)] font-semibold hover:underline cursor-pointer"
                      >
                        Create free account.
                      </button>
                    </>
                  )}
                </p>
              </div>

              {/* Quick Auth Social/SSO Sweep Buttons */}
              <div className="mb-5 space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo(role)}
                    className="relative z-0 flex items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all duration-500 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-95 cursor-pointer"
                  >
                    <Zap size={14} className="text-[var(--accent-primary)]" />
                    <span>Quick {role === 'student' ? 'Student' : 'Counselor'} Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo(role === 'student' ? 'counselor' : 'student')}
                    className="relative z-0 flex items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all duration-500 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-95 cursor-pointer"
                  >
                    <ShieldCheck size={14} className="text-[var(--accent-primary)]" />
                    <span>Switch to {role === 'student' ? 'Counselor' : 'Student'}</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-[1px] w-full bg-[var(--border-subtle)]" />
                <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  OR USE CREDENTIALS
                </span>
                <div className="h-[1px] w-full bg-[var(--border-subtle)]" />
              </div>

              {/* Error / Success Alerts */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800/60 text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-[var(--badge-success-bg)] border border-[var(--badge-success-border)] text-[var(--badge-success-text)] rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[var(--badge-success-text)]" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Registration: Name Field */}
                {isRegister && (
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Aarav Sharma"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-lg focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                      />
                    </div>
                  </div>
                )}

                {/* Email / Mobile Field */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    Email Address or Mobile Number
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
                    <input
                      type="text"
                      name="email_or_phone"
                      required
                      placeholder="student@school.edu or 9876543210"
                      value={formData.email_or_phone}
                      onChange={handleChange}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-lg focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-[var(--text-secondary)]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('For test accounts: student123 or counselor123')}
                      className="text-[11px] text-[var(--accent-primary)] hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      placeholder="Enter password (e.g. student123)"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full text-xs pl-9 pr-10 py-2.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-lg focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Registration Specific: School Name & Class */}
                {isRegister && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                        School / Institution
                      </label>
                      <input
                        type="text"
                        name="school_name"
                        placeholder="e.g. Govt Girls HSS"
                        value={formData.school_name}
                        onChange={handleChange}
                        className="w-full text-xs px-3 py-2.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-lg focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                      />
                    </div>

                    {role === 'student' && (
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                          Current Class
                        </label>
                        <select
                          name="class_level"
                          value={formData.class_level}
                          onChange={handleChange}
                          className="w-full text-xs px-3 py-2.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-lg focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] focus:outline-none font-medium text-[var(--text-primary)]"
                        >
                          <option value="10th" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Class 10th</option>
                          <option value="11th" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Class 11th</option>
                          <option value="12th" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Class 12th</option>
                          <option value="Passed" className="bg-[var(--bg-card)] text-[var(--text-primary)]">12th Passed</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-[var(--accent-primary)] hover:opacity-95 text-[var(--accent-contrast)] rounded-xl text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.97] ring-1 ring-[var(--accent-primary)]/30 disabled:opacity-50 cursor-pointer"
                >
                  <span>{loading ? 'Authenticating...' : isRegister ? 'Create My Free Account' : 'Sign in to Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            </div>

            {/* Terms and Conditions & Skip Link */}
            <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <p className="text-[11px] text-[var(--text-muted)]">
                By signing in, you agree to our{' '}
                <a href="#" className="text-[var(--accent-primary)] hover:underline font-medium">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-[var(--accent-primary)] hover:underline font-medium">
                  Privacy Policy.
                </a>
              </p>

              <Link
                to="/assessment"
                className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] flex-shrink-0 transition-colors"
              >
                Skip & Continue as Guest →
              </Link>
            </div>

          </div>

        </motion.div>
      </div>

    </div>
  );
}
