import React, { useState, useEffect } from 'react';
import {
  MessageSquareHeart,
  Star,
  Sparkles,
  Send,
  Building2,
  CheckCircle2,
  Quote,
  TrendingUp,
  MapPin,
  HelpCircle
} from 'lucide-react';
import StatsWidget from '../components/StatsWidget';
import confetti from 'canvas-confetti';

export default function CohortReview() {
  const [studentClass, setStudentClass] = useState('12th');
  const [ratingClarity, setRatingClarity] = useState(5);
  const [ratingRelevance, setRatingRelevance] = useState(5);
  const [ratingNovelty, setRatingNovelty] = useState(5);
  const [discoveredNew, setDiscoveredNew] = useState(true);
  const [topFeature, setTopFeature] = useState('Realistic Salaries & Roadmap');
  const [comment, setComment] = useState('');
  const [schoolLocation, setSchoolLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      student_class: studentClass,
      rating_clarity: ratingClarity,
      rating_relevance: ratingRelevance,
      rating_novelty: ratingNovelty,
      discovered_new_option: discoveredNew,
      top_liked_feature: topFeature,
      comment: comment.trim(),
      school_location: schoolLocation.trim() || 'Govt / Low-Resource School'
    };

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
        setSubmitted(true);
        setComment('');
        setSchoolLocation('');
        setRefreshKey((k) => k + 1); // Refresh live stats widget
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange, label }) => (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs font-medium text-[var(--text-primary)]">{label}:</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 text-[var(--accent-primary)] hover:scale-110 transition-transform focus:outline-none"
            aria-label={`${star} Stars`}
          >
            <Star
              className={`w-4 h-4 ${
                star <= value ? 'fill-[var(--accent-primary)] text-[var(--accent-primary)]' : 'text-[var(--border-subtle)]'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] py-8 sm:py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--badge-info-bg)] px-3 py-1 rounded-full border border-[var(--accent-primary)]/20">
            Continuous Cohort Review & Impact
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
            Student Cohort Review & Impact Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Real feedback from Class 10 and 12 students in low-resource schools. See how guidance transforms decisions.
          </p>
        </div>

        {/* Main Grid: Form + Live Impact Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column (5 cols) */}
          <div className="lg:col-span-5 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] p-6 sm:p-7 shadow-soft">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-[var(--accent-primary)]" />
                <span>Submit Your Cohort Review</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Your honest assessment helps educators keep this free guidance accurate.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3 bg-[var(--badge-success-bg)] rounded-xl border border-[var(--badge-success-border)] p-6">
                <CheckCircle2 className="w-10 h-10 text-[var(--badge-success-text)] mx-auto" />
                <h4 className="text-base font-bold text-[var(--badge-success-text)]">
                  Feedback Recorded!
                </h4>
                <p className="text-xs text-[var(--badge-success-text)]/90">
                  Your response has been added to the public live cohort stats widget.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Class & Location */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Your Class
                    </label>
                    <div className="flex gap-2">
                      {['10th', '12th'].map((cls) => (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setStudentClass(cls)}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            studentClass === cls
                              ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast)] border-[var(--accent-primary)] shadow-sm'
                              : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--badge-info-bg)] hover:text-[var(--accent-primary)]'
                          }`}
                        >
                          Class {cls}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      School / District (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Govt Inter College, Meerut"
                      value={schoolLocation}
                      onChange={(e) => setSchoolLocation(e.target.value)}
                      className="w-full text-xs py-1.5 px-3 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                    />
                  </div>
                </div>

                {/* 5-Star Ratings */}
                <div className="bg-[var(--bg-card-subtle)] p-3.5 rounded-xl border border-[var(--border-subtle)] space-y-1">
                  <StarRating
                    label="Clarity (Zero English Jargon)"
                    value={ratingClarity}
                    onChange={setRatingClarity}
                  />
                  <StarRating
                    label="Relevance (Matches Financial Reality)"
                    value={ratingRelevance}
                    onChange={setRatingRelevance}
                  />
                  <StarRating
                    label="Novelty (New Options Discovered)"
                    value={ratingNovelty}
                    onChange={setRatingNovelty}
                  />
                </div>

                {/* Did you discover something new? */}
                <div className="p-3 bg-[var(--badge-info-bg)] rounded-xl border border-[var(--accent-primary)]/20">
                  <label className="block text-xs font-semibold text-[var(--accent-primary)] mb-2">
                    Did you discover a career or scholarship you didn't know about?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)] cursor-pointer">
                      <input
                        type="radio"
                        name="cohort_discovered"
                        checked={discoveredNew === true}
                        onChange={() => setDiscoveredNew(true)}
                        className="accent-[var(--accent-primary)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                      />
                      <span>Yes, discovered new paths!</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)] cursor-pointer">
                      <input
                        type="radio"
                        name="cohort_discovered"
                        checked={discoveredNew === false}
                        onChange={() => setDiscoveredNew(false)}
                        className="accent-[var(--accent-primary)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                      />
                      <span>No, already knew them</span>
                    </label>
                  </div>
                </div>

                {/* Most Helpful Feature */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    What was the most useful part for you?
                  </label>
                  <select
                    value={topFeature}
                    onChange={(e) => setTopFeature(e.target.value)}
                    className="w-full text-xs py-2 px-3 bg-[var(--bg-card-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                  >
                    <option value="Realistic Salaries & Roadmap" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Step-by-step roadmap & realistic salaries</option>
                    <option value="Scholarship deadlines & grants" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Upcoming scholarship alerts with direct links</option>
                    <option value="Radar chart comparing aptitude" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Radar chart comparing my skills to jobs</option>
                    <option value="Simple language without jargon" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Simple explanations without confusing jargon</option>
                    <option value="Vocational / ITI fast earning options" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Short-term vocational & ITI diploma routes</option>
                  </select>
                </div>

                {/* Open Feedback */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    Your Voice / Advice to Fellow High Schoolers:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you liked or what other careers/scholarships we should include..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                  ></textarea>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 bg-[var(--accent-primary)] hover:opacity-95 text-[var(--accent-contrast)] rounded-lg text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Review...' : 'Submit Cohort Review'}</span>
                </button>

              </form>
            )}
          </div>

          {/* Live Admin & Public Summary Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[var(--bg-card)] text-[var(--text-primary)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] shadow-soft space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--badge-info-bg)] border border-[var(--accent-primary)]/20 rounded-full text-xs font-semibold text-[var(--accent-primary)]">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>Live Data Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Under-Resourced Student Guidance Telemetry
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Every student interaction is aggregated to monitor guidance effectiveness, scholarship discovery rates, and career preferences across Indian districts.
              </p>
            </div>

            <StatsWidget key={refreshKey} />
          </div>

        </div>

      </div>
    </div>
  );
}
