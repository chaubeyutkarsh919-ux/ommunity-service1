import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Sparkles,
  CheckCircle2,
  MessageSquareHeart,
  Send,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FeedbackModal({ isOpen, onClose, onFeedbackSubmitted }) {
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

  if (!isOpen) return null;

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
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setSubmitted(true);
        if (onFeedbackSubmitted) onFeedbackSubmitted();
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2200);
      }
    } catch (err) {
      console.error('Error sending feedback:', err);
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
            className="p-1 text-[var(--accent-primary)] hover:scale-110 transition-transform focus:outline-none cursor-pointer"
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[var(--bg-card)] rounded-xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-[var(--border-subtle)] text-[var(--text-primary)]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1.5 rounded-lg hover:bg-[var(--bg-card-subtle)] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              Shukriya! Thank You For Your Voice!
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              Your feedback directly improves career roadmaps and scholarship matching for thousands of high school students.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] mb-2">
                <MessageSquareHeart className="w-3.5 h-3.5" />
                <span>Student Cohort Voice</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                How Useful Was This Guidance For You?
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Help us know if this information was clear, realistic, and genuinely helpful.
              </p>
            </div>

            {/* Class & School */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                  Your Class
                </label>
                <div className="flex gap-2">
                  {['10th', '12th'].map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setStudentClass(cls)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        studentClass === cls
                          ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast)] border-[var(--accent-primary)] shadow-sm'
                          : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)]'
                      }`}
                    >
                      Class {cls}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                  School / City (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Govt HSS, Patna"
                  value={schoolLocation}
                  onChange={(e) => setSchoolLocation(e.target.value)}
                  className="w-full text-xs py-1.5 px-3 rounded-lg bg-[var(--bg-card-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>
            </div>

            {/* Star Ratings */}
            <div className="bg-[var(--bg-card-subtle)] p-3 rounded-xl border border-[var(--border-subtle)] space-y-1">
              <StarRating
                label="Clarity (Easy to understand)"
                value={ratingClarity}
                onChange={setRatingClarity}
              />
              <StarRating
                label="Relevance (Matches my life reality)"
                value={ratingRelevance}
                onChange={setRatingRelevance}
              />
              <StarRating
                label="Novelty (Discovered new pathways)"
                value={ratingNovelty}
                onChange={setRatingNovelty}
              />
            </div>

            {/* Discovery Question */}
            <div className="p-3 bg-[var(--accent-bg)] rounded-xl border border-[var(--accent-border)]">
              <label className="block text-xs font-semibold text-[var(--accent-text)] mb-2">
                Did you discover a career or scholarship you didn't know about?
              </label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)] cursor-pointer">
                  <input
                    type="radio"
                    name="discovered"
                    checked={discoveredNew === true}
                    onChange={() => setDiscoveredNew(true)}
                    className="accent-[var(--accent-primary)]"
                  />
                  <span>Yes, I learned new options!</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)] cursor-pointer">
                  <input
                    type="radio"
                    name="discovered"
                    checked={discoveredNew === false}
                    onChange={() => setDiscoveredNew(false)}
                    className="accent-[var(--accent-primary)]"
                  />
                  <span>No, I already knew them</span>
                </label>
              </div>
            </div>

            {/* Feature Tag */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                What helped you the most?
              </label>
              <select
                value={topFeature}
                onChange={(e) => setTopFeature(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-[var(--bg-card-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:border-[var(--accent-primary)]"
              >
                <option value="Realistic Salaries & Roadmap">Step-by-step roadmap & realistic salaries</option>
                <option value="Scholarship deadlines & grants">Upcoming scholarship alerts with direct links</option>
                <option value="Radar chart comparing aptitude">Radar chart comparing my skills to jobs</option>
                <option value="Simple language without jargon">Simple explanations without confusing jargon</option>
                <option value="Vocational / ITI fast earning options">Short-term vocational & ITI diploma routes</option>
              </select>
            </div>

            {/* Open Feedback Field */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                Any suggestions for your school friends?
              </label>
              <textarea
                rows={2}
                placeholder="Write your honest opinion or thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg bg-[var(--bg-card-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)]"
              ></textarea>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] rounded-lg text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Feedback...' : 'Submit My Feedback'}</span>
              </button>
            </div>

          </form>
        )}

      </motion.div>
    </div>
  );
}
