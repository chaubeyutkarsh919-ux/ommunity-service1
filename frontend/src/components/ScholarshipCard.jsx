import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Calendar,
  ExternalLink,
  CheckCircle2,
  FileText,
  AlertCircle,
  IndianRupee,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

export default function ScholarshipCard({ scholarship }) {
  const [showDocs, setShowDocs] = useState(false);

  const isUrgent = scholarship.is_urgent || scholarship.days_left <= 21;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-5 sm:p-6 hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_-4px_var(--accent-glow)] transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              {scholarship.provider}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-snug">
              {scholarship.title}
            </h4>
          </div>

          <div className="flex-shrink-0">
            {isUrgent ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--danger-bg)] text-[var(--danger-text)] border border-[var(--danger-border)]">
                <Clock className="w-3 h-3 text-[var(--danger-text)]" />
                <span>Closing Soon ({scholarship.days_left}d)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]">
                <Calendar className="w-3 h-3 text-[var(--success-text)]" />
                <span>{scholarship.days_left} days left</span>
              </span>
            )}
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
          {scholarship.short_description}
        </p>

        {/* Highlighted Monetary Benefit */}
        <div className="p-3.5 bg-[var(--accent-bg)] border border-[var(--accent-border)] rounded-xl mb-4">
          <span className="text-[11px] font-semibold text-[var(--accent-text)] uppercase tracking-wider block">
            Financial Award
          </span>
          <p className="text-base sm:text-lg font-bold text-[var(--accent-text)] flex items-center gap-1 mt-0.5">
            <span>{scholarship.benefit_amount}</span>
          </p>
        </div>

        {/* Eligibility Checklist */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] font-semibold text-[var(--text-primary)] uppercase tracking-wider block">
            Eligibility Match Criteria
          </span>
          <div className="space-y-1 text-xs">
            {scholarship.eligibility_reasons?.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[var(--text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success-text)] mt-0.5 flex-shrink-0" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Drawer */}
        {scholarship.documents_needed && scholarship.documents_needed.length > 0 && (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowDocs(!showDocs)}
              className="text-xs font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] flex items-center gap-1 focus:outline-none cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showDocs ? 'Hide Required Documents' : 'View Required Documents (Aadhaar, Marks, Income)'}</span>
            </button>

            {showDocs && (
              <ul className="mt-2.5 p-3 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl text-xs space-y-1 text-[var(--text-secondary)]">
                {scholarship.documents_needed.map((doc, dIdx) => (
                  <li key={dIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
        <div className="text-[11px] text-[var(--text-muted)]">
          Last Date: <span className="font-semibold text-[var(--text-primary)]">{scholarship.deadline_date}</span>
        </div>

        <a
          href={scholarship.portal_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] rounded-lg text-xs font-semibold shadow-sm active:scale-[0.97] transition-all duration-150 cursor-pointer"
        >
          <span>Apply on Official Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </motion.div>
  );
}
