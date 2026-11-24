import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Lightbulb,
  PhoneCall,
  ShieldCheck,
  ExternalLink,
  Heart,
  Code2
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-base)] text-[var(--text-secondary)] pt-16 pb-12 border-t border-[var(--border-subtle)] relative overflow-hidden transition-colors duration-250">
      
      {/* Subtle background ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--accent-glow)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand & Mission Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)] group-hover:bg-[var(--accent-primary-hover)] flex items-center justify-center text-[var(--accent-contrast)] shadow-sm transition-colors">
                <BookOpen className="w-5 h-5 text-[var(--accent-contrast)]" />
              </div>
              <div>
                <span className="font-bold text-2xl tracking-tight text-[var(--text-primary)] font-sans">
                  Future<span className="text-[var(--accent-primary)]">Paths</span>
                </span>
                <span className="ml-2 text-xs text-[var(--accent-text)] font-medium">मार्गदर्शक</span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Empowering Class 10 & 12 students from under-resourced schools with tailored career roadmaps, real-market entry salaries, and verified government and institutional scholarships.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded-full text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>100% Free Public Platform</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded-full text-xs font-medium">
                <Code2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>Open Source Initiative</span>
              </div>
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <li>
                <a href="#recommender-tool" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5">
                  <span>Recommender Tool</span>
                  <span className="px-1.5 py-0.2 bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] text-[10px] rounded font-semibold">New</span>
                </a>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-[var(--text-primary)] transition-colors">
                  5-Min Comprehensive Profiler
                </Link>
              </li>
              <li>
                <a href="#pathways" className="hover:text-[var(--text-primary)] transition-colors">
                  Explore 6 Practical Routes
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[var(--text-primary)] transition-colors">
                  Learning & Career Journey
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[var(--text-primary)] transition-colors">
                  Scholarship Finder
                </Link>
              </li>
              <li>
                <Link to="/cohort-feedback" className="hover:text-[var(--text-primary)] transition-colors">
                  Student Stories & Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Student Helplines
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-[var(--text-primary)] block">National Scholarship (NSP):</span>
                  <span className="text-[var(--text-secondary)]">0120-6619540 (Toll-Free)</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-[var(--text-primary)] block">National Career Service (NCS):</span>
                  <span className="text-[var(--text-secondary)]">1514 (Mon-Sat 8am-8pm)</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-[var(--text-primary)] block">CBSE Counselling:</span>
                  <span className="text-[var(--text-secondary)]">1800-11-8004</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Verified Official Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Verified Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors"
                >
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 text-[var(--accent-primary)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.pmkvyofficial.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors"
                >
                  <span>PMKVY Skill India</span>
                  <ExternalLink className="w-3 h-3 text-[var(--accent-primary)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://dgt.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors"
                >
                  <span>DGT Apprentice & ITI</span>
                  <ExternalLink className="w-3 h-3 text-[var(--accent-primary)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.aicte-india.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors"
                >
                  <span>AICTE Pragati & Saksham</span>
                  <ExternalLink className="w-3 h-3 text-[var(--accent-primary)]" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Open Source Note and Copyright */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} FuturePaths. Open Source Public Good.</span>
            <span className="hidden sm:inline text-[var(--border-subtle)]">•</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] underline underline-offset-2"
            >
              MIT Open Source License
            </a>
            <span className="hidden sm:inline text-[var(--border-subtle)]">•</span>
            <span>Accessible for 2G/3G & Mobile Screens</span>
          </div>

          <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
            <span>Built for high school students</span>
            <Heart className="w-3.5 h-3.5 text-[var(--accent-primary)] fill-[var(--accent-primary)]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
