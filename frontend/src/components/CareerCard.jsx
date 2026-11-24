import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Briefcase,
  IndianRupee,
  Clock,
  GraduationCap,
  Sparkles,
  CheckCircle,
  TrendingUp,
  MapPin,
  ExternalLink,
  Layers,
  Wrench
} from 'lucide-react';
import RadarFitChart from './RadarFitChart';

export default function CareerCard({ career, rank }) {
  const [isExpanded, setIsExpanded] = useState(rank === 1); // Expand top rank by default

  const matchBadgeClass =
    career.match_score >= 85
      ? 'bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]'
      : career.match_score >= 70
      ? 'bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)]'
      : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: rank * 0.08, ease: "easeOut" }}
      className={`bg-[var(--bg-card)] rounded-xl border transition-all duration-200 ${
        rank === 1
          ? 'border-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)]/30 shadow-[0_4px_24px_-4px_var(--accent-glow)]'
          : 'border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_-4px_var(--accent-glow)]'
      }`}
    >
      <div className="p-5 sm:p-6">
        
        {/* Top Header with Badges */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] text-xs font-bold">
              #{rank}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
              {career.category}
            </span>
            {career.is_vocational && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)]">
                <Wrench className="w-3 h-3 text-[var(--accent-primary)]" />
                <span>Quick-To-Earn / ITI Route</span>
              </span>
            )}
          </div>

          {/* Compatibility Match Badge */}
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-1.5 ${matchBadgeClass}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{career.match_score}% Match</span>
            </div>
          </div>
        </div>

        {/* Title & Short Description */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5">
            {career.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {career.short_description}
          </p>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-[var(--bg-card-subtle)] rounded-xl border border-[var(--border-subtle)] text-xs mb-4">
          <div className="space-y-0.5">
            <span className="text-[var(--text-muted)] font-medium flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Entry Salary
            </span>
            <p className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">
              {career.entry_salary_range}
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[var(--text-muted)] font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Duration
            </span>
            <p className="font-semibold text-[var(--text-primary)]">
              {career.duration_years}
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 space-y-0.5">
            <span className="text-[var(--text-muted)] font-medium flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Eligibility
            </span>
            <p className="font-semibold text-[var(--text-primary)]">
              Class {career.min_class}+ ({career.min_percentage}% marks)
            </p>
          </div>
        </div>

        {/* Step-by-Step Practical Roadmap with Pulse Animation */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Recommended Milestone Roadmap</span>
          </h4>
          
          <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border-subtle)]">
            {career.roadmap_steps?.map((step, sIdx) => (
              <div key={sIdx} className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: sIdx * 0.05 }}
                  className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[var(--accent-primary)] text-[var(--accent-contrast)] flex items-center justify-center text-[9px] font-bold ring-4 ring-[var(--accent-bg)] shadow-[0_0_8px_var(--accent-glow)]"
                >
                  {sIdx + 1}
                </motion.div>
                <div>
                  <span className="font-semibold text-xs text-[var(--text-primary)]">
                    {step.phase}:
                  </span>{' '}
                  <span className="text-xs text-[var(--text-secondary)]">
                    {step.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why this matches you checklist */}
        {career.eligibility_reasons && career.eligibility_reasons.length > 0 && (
          <div className="bg-[var(--success-bg)] border border-[var(--success-border)] rounded-xl p-3.5 mb-4">
            <h5 className="text-xs font-semibold text-[var(--success-text)] mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[var(--success-text)]" />
              <span>Why This Matches Your Profile</span>
            </h5>
            <ul className="space-y-1.5 text-xs text-[var(--success-text)]">
              {career.eligibility_reasons.map((reason, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2">
                  <span className="text-[var(--success-text)] font-bold">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Skills Tags */}
        {career.key_skills && career.key_skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <span className="text-xs font-medium text-[var(--text-muted)] mr-1">Skills needed:</span>
            {career.key_skills.map((skill, skIdx) => (
              <span
                key={skIdx}
                className="px-2 py-0.5 bg-[var(--bg-card-subtle)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)] text-[var(--text-secondary)] text-[11px] font-medium rounded-md border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Expandable Section for Radar Chart & Work Environment */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-4 border-t border-[var(--border-subtle)] space-y-4 overflow-hidden"
            >
              <RadarFitChart
                data={career.radar_chart_data}
                careerTitle={career.title}
              />

              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] bg-[var(--bg-card-subtle)] p-3 rounded-xl border border-[var(--border-subtle)]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  <strong className="text-[var(--text-primary)]">Workplace:</strong> {career.work_environment}
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[var(--success-text)]" />
                  <strong className="text-[var(--text-primary)]">Demand:</strong> {career.job_growth}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Footer Toggle Button */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between mt-3">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition-colors focus:outline-none cursor-pointer"
          >
            <span>{isExpanded ? 'Hide Fit Analysis & Radar Chart' : 'Show Fit Analysis & Radar Chart'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <span className="text-[11px] text-[var(--text-muted)]">
            Path #{rank} of 5
          </span>
        </div>

      </div>
    </motion.div>
  );
}
