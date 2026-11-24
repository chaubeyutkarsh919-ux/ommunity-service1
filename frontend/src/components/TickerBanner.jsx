import React, { useEffect, useState } from 'react';
import { BellRing, Calendar, ArrowUpRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TickerBanner() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/scholarships/upcoming')
      .then((res) => res.json())
      .then((data) => {
        if (data.scholarships && data.scholarships.length > 0) {
          setScholarships(data.scholarships);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching ticker scholarships:', err);
        setLoading(false);
      });
  }, []);

  if (loading || scholarships.length === 0) {
    return (
      <div className="bg-[var(--bg-base)] text-[var(--text-secondary)] text-xs font-normal py-2.5 px-4 flex items-center justify-between overflow-hidden border-b border-[var(--border-subtle)] transition-colors duration-250">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <Flame className="w-4 h-4 text-[var(--accent-primary)] animate-pulse flex-shrink-0" />
          <span className="font-semibold text-[var(--text-primary)]">Live Scholarship Alert:</span>
          <span>Central Sector Scheme & AICTE Pragati applications closing soon. Discover your eligibility today!</span>
        </div>
      </div>
    );
  }

  // Duplicate list to achieve continuous seamless loop
  const displayList = [...scholarships, ...scholarships];

  return (
    <div className="bg-[var(--bg-base)] text-[var(--text-primary)] border-b border-[var(--border-subtle)] relative overflow-hidden py-2.5 transition-colors duration-250">
      <div className="flex items-center">
        
        {/* Sticky Label Tag */}
        <div className="z-10 bg-[var(--accent-primary)] text-[var(--accent-contrast)] font-semibold text-xs px-3 py-1 ml-4 rounded-md shadow-sm flex items-center gap-1.5 flex-shrink-0">
          <BellRing className="w-3.5 h-3.5 text-[var(--accent-contrast)]" />
          <span>Active Grants</span>
        </div>

        {/* Marquee Ticker Track */}
        <div className="overflow-hidden whitespace-nowrap ml-4 flex items-center w-full">
          <div className="animate-ticker flex items-center gap-8 text-xs sm:text-sm font-normal">
            {displayList.map((item, idx) => {
              return (
                <Link
                  key={`${item.slug}-${idx}`}
                  to="/dashboard"
                  className="inline-flex items-center gap-2.5 hover:text-[var(--accent-primary)] transition-colors group cursor-pointer"
                >
                  <span className="font-semibold text-[var(--text-primary)] group-hover:underline">
                    {item.title}
                  </span>
                  <span className="bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] px-2 py-0.5 rounded text-xs font-semibold">
                    {item.benefit_amount.split('(')[0]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[var(--text-muted)] text-xs">
                    <Calendar className="w-3 h-3 text-[var(--accent-primary)]" />
                    <span>Deadline: {item.deadline_date}</span>
                  </span>
                  <span className="text-[var(--border-subtle)]">•</span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
