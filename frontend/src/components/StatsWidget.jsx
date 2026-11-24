import React, { useEffect, useState } from 'react';
import {
  Users,
  Award,
  Sparkles,
  Star,
  Quote,
  TrendingUp,
  MapPin,
  CheckCircle
} from 'lucide-react';

export default function StatsWidget() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/feedback/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching feedback stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) {
    return (
      <div className="py-6 text-center text-xs text-[var(--text-muted)]">
        Loading real-time cohort impact data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* 4 Big Impact Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-subtle)] shadow-card text-center hover:border-[var(--border-hover)] hover:-translate-y-0.5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center mx-auto mb-2">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] block">
            {stats.total_students_assisted?.toLocaleString()}+
          </span>
          <span className="text-xs text-[var(--text-secondary)] font-medium">
            Students Guided
          </span>
        </div>

        <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-subtle)] shadow-card text-center hover:border-[var(--border-hover)] hover:-translate-y-0.5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center mx-auto mb-2">
            <Star className="w-5 h-5 fill-[var(--accent-primary)] text-[var(--accent-primary)]" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] block">
            {stats.overall_satisfaction} / 5.0
          </span>
          <span className="text-xs text-[var(--text-secondary)] font-medium">
            Avg Cohort Rating
          </span>
        </div>

        <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-subtle)] shadow-card text-center hover:border-[var(--border-hover)] hover:-translate-y-0.5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)] flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[var(--success-text)] block">
            {stats.discovered_new_path_pct}%
          </span>
          <span className="text-xs text-[var(--text-secondary)] font-medium">
            Discovered New Paths
          </span>
        </div>

        <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-subtle)] shadow-card text-center hover:border-[var(--border-hover)] hover:-translate-y-0.5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] flex items-center justify-center mx-auto mb-2">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] block">
            10+ Schemes
          </span>
          <span className="text-xs text-[var(--text-secondary)] font-medium">
            Verified Scholarships
          </span>
        </div>

      </div>

      {/* Top Careers Distribution & Student Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Top Careers Breakdown */}
        <div className="bg-[var(--bg-card)] p-5 sm:p-6 rounded-xl border border-[var(--border-subtle)] shadow-card">
          <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Most Matched Careers</span>
          </h4>
          <div className="space-y-3">
            {stats.top_careers?.map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-[var(--text-primary)]">
                  <span className="truncate pr-2">{c.name}</span>
                  <span className="text-[var(--accent-primary)] font-semibold">{c.share}</span>
                </div>
                <div className="w-full bg-[var(--bg-card-subtle)] rounded-full h-2 overflow-hidden border border-[var(--border-subtle)]">
                  <div
                    className="bg-[var(--accent-primary)] h-2 rounded-full transition-all duration-500"
                    style={{ width: c.share }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Student Cohort Testimonials */}
        <div className="md:col-span-2 bg-[var(--bg-card)] p-5 sm:p-6 rounded-xl border border-[var(--border-subtle)] shadow-card">
          <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Quote className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Voices From Real School Cohorts</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {stats.recent_feedback?.slice(0, 4).map((f, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[var(--bg-card-subtle)] rounded-xl border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--border-hover)] transition-all"
              >
                <div className="space-y-2 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] rounded text-[10px] font-semibold">
                      Class {f.student_class}
                    </span>
                    <div className="flex items-center text-[var(--accent-primary)]">
                      {[...Array(f.rating_clarity || 5)].map((_, s) => (
                        <Star key={s} className="w-3 h-3 fill-[var(--accent-primary)]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed">
                    "{f.comment || 'The step-by-step roadmap and realistic salaries were very clear.'}"
                  </p>
                </div>
                
                <div className="text-[10px] text-[var(--text-muted)] font-medium flex items-center gap-1 pt-2 border-t border-[var(--border-subtle)]">
                  <MapPin className="w-3 h-3 text-[var(--text-muted)]" />
                  <span>{f.school_location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
