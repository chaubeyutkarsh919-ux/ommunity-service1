import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Lightbulb,
  BookOpen,
  Globe,
  Menu,
  X,
  ArrowRight,
  User,
  LogOut,
  LogIn,
  Sparkles,
  Palette
} from 'lucide-react';
import { useThemeVariant } from '../lib/theme';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { theme, setTheme, variants } = useThemeVariant();
  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' }
  ];

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem('margdarshak_user');
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('margdarshak_user');
    localStorage.removeItem('margdarshak_token');
    setCurrentUser(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/#pathways' },
    { name: 'Recommender Tool', path: '/#recommender-tool', highlight: true },
    { name: 'Scholarships', path: '/#scholarships' },
    { name: 'Mentorship', path: '/#mentorship' },
    { name: 'Student Stories', path: '/cohort-feedback' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      if (location.pathname === '/') {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo: Stylized Emblem with 'FuturePaths' */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)] group-hover:bg-[var(--accent-primary-hover)] flex items-center justify-center text-[var(--accent-contrast)] shadow-sm transition-all duration-200">
              <BookOpen className="w-5 h-5 text-[var(--accent-contrast)]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-[var(--text-primary)]">
                  Future<span className="text-[var(--accent-primary)]">Paths</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-medium bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] rounded-full">
                  मार्गदर्शक
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] font-normal -mt-0.5">
                Career & Scholarship Guidance
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isHighlight = link.highlight;
              if (isHighlight) {
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.path)}
                    className="mx-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold text-[var(--accent-text)] bg-[var(--accent-bg)] border border-[var(--accent-border)] hover:bg-[var(--accent-bg)]/80 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                    <span>{link.name}</span>
                  </button>
                );
              }

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] transition-colors duration-150 cursor-pointer"
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Items: Theme Accent Switcher + Language Selector + Sign In / User Profile */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Theme Accent Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setThemeDropdownOpen(!themeDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-subtle)] transition-all cursor-pointer"
                title="Switch Theme Color / Variant"
                aria-label="Theme Switcher"
              >
                <Palette className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span className="capitalize text-[11px] font-semibold">{theme}</span>
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-card)] rounded-xl shadow-2xl border border-[var(--border-subtle)] py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-subtle)]">
                    Theme Variant
                  </div>
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setTheme(v.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        theme === v.id
                          ? 'text-[var(--accent-text)] font-semibold bg-[var(--accent-bg)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/20"
                          style={{ backgroundColor: v.color }}
                        />
                        <span>{v.label}</span>
                      </div>
                      {theme === v.id && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--accent-border)] text-[var(--accent-text)]">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setThemeDropdownOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-subtle)] transition-colors cursor-pointer"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>{selectedLanguage}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[var(--bg-card)] rounded-xl shadow-2xl border border-[var(--border-subtle)] py-1.5 z-50 animate-in fade-in zoom-in-95">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.label.split(' ')[0]);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        selectedLanguage === lang.label.split(' ')[0]
                          ? 'text-[var(--accent-text)] font-semibold bg-[var(--accent-bg)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile or Sign In Button */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[var(--border-subtle)]">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium text-[var(--text-primary)]">
                  <User className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span className="truncate max-w-[110px]">{currentUser.name}</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] rounded">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-[var(--text-muted)] hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                  aria-label="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[var(--accent-contrast)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] active:scale-95 transition-all duration-150 shadow-sm"
              >
                <LogIn className="w-4 h-4 text-[var(--accent-contrast)]" />
                <span>Sign In</span>
              </Link>
            )}

          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center lg:hidden gap-2">
            {!currentUser && (
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--accent-contrast)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)]"
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2">
          
          {/* Theme & Language Selectors in Mobile Drawer */}
          <div className="space-y-2 pb-3 mb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                Theme Variant:
              </span>
              <div className="flex gap-1">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setTheme(v.id)}
                    className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all ${
                      theme === v.id
                        ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast)]'
                        : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    {v.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                Language:
              </span>
              <div className="flex gap-1">
                {languages.slice(0, 3).map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setSelectedLanguage(l.label.split(' ')[0])}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium ${
                      selectedLanguage === l.label.split(' ')[0]
                        ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast)]'
                        : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    {l.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {currentUser && (
            <div className="p-3 mb-2 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[var(--accent-primary)]" />
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">{currentUser.name}</p>
                  <p className="text-[10px] text-[var(--text-secondary)] uppercase">{currentUser.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-rose-400 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}

          {navLinks.map((link) => {
            const isHighlight = link.highlight;
            if (isHighlight) {
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-[var(--accent-text)] bg-[var(--accent-bg)] border border-[var(--accent-border)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[var(--accent-text)]" />
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-[var(--accent-text)]" />
                </button>
              );
            }

            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="w-full text-left block px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] cursor-pointer"
              >
                {link.name}
              </button>
            );
          })}

          {!currentUser && (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-xs font-semibold text-[var(--accent-contrast)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-center mt-3 shadow-sm"
            >
              Sign In to Save Progress
            </Link>
          )}

        </div>
      )}
    </header>
  );
}
