import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { BarChart3, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function RadarFitChart({ data, careerTitle }) {
  const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'table'

  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-[var(--bg-card-subtle)] rounded-lg text-xs text-[var(--text-muted)] text-center border border-[var(--border-subtle)]">
        Aptitude fit data not available for this role.
      </div>
    );
  }

  // Custom accessible tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--bg-card)] text-[var(--text-primary)] p-3 rounded-lg shadow-elevated text-xs border border-[var(--border-subtle)]">
          <p className="font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-1 mb-1.5">
            {payload[0].payload.subject}
          </p>
          <div className="space-y-1">
            <p className="text-[var(--accent-text)] flex items-center justify-between gap-4">
              <span>Your Affinity:</span>
              <span className="font-semibold">{payload[0].value} / 10</span>
            </p>
            <p className="text-[var(--success-text)] flex items-center justify-between gap-4">
              <span>Career Demand:</span>
              <span className="font-semibold">{payload[1]?.value} / 10</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[var(--bg-card-subtle)] rounded-xl p-4 sm:p-5 border border-[var(--border-subtle)]">
      
      {/* Header with accessible toggle */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Aptitude & Skill Fit Matrix</span>
          </h4>
          <p className="text-[11px] text-[var(--text-secondary)]">
            Comparing your self-identified interests with what {careerTitle} demands
          </p>
        </div>

        <button
          type="button"
          onClick={() => setViewMode(viewMode === 'chart' ? 'table' : 'chart')}
          className="text-xs px-2.5 py-1 bg-[var(--bg-card)] hover:bg-[var(--bg-card-subtle)] hover:text-[var(--accent-primary)] border border-[var(--border-subtle)] rounded-md font-medium text-[var(--text-secondary)] transition-colors shadow-sm cursor-pointer"
          aria-label="Toggle between chart and accessible table view"
        >
          {viewMode === 'chart' ? 'View as Table' : 'View as Radar'}
        </button>
      </div>

      {viewMode === 'chart' ? (
        <div className="w-full h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
              <PolarGrid stroke="#27272C" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#9A9AA0', fontSize: 11, fontWeight: 500 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#6B6B74" tick={{ fontSize: 9 }} />
              <Radar
                name="Your Profile"
                dataKey="student"
                stroke="var(--accent-primary)"
                fill="var(--accent-primary)"
                fillOpacity={0.35}
                strokeWidth={2}
              />
              <Radar
                name="Career Requirement"
                dataKey="career"
                stroke="var(--success-text)"
                fill="var(--success-text)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                iconType="circle"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* Accessible Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[var(--border-subtle)] bg-[var(--bg-card)] rounded-lg">
            <thead className="bg-[var(--bg-card-subtle)] text-[var(--text-primary)] font-semibold border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-2.5">Core Dimension</th>
                <th className="p-2.5 text-[var(--accent-text)]">Your Affinity</th>
                <th className="p-2.5 text-[var(--success-text)]">Career Demand</th>
                <th className="p-2.5">Fit Alignment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {data.map((row, idx) => {
                const diff = Math.abs(row.student - row.career);
                const isGreat = diff <= 2.0;
                return (
                  <tr key={idx} className="hover:bg-[var(--bg-card-subtle)] transition-colors">
                    <td className="p-2.5 font-medium text-[var(--text-primary)]">{row.subject}</td>
                    <td className="p-2.5 font-semibold text-[var(--accent-text)]">{row.student} / 10</td>
                    <td className="p-2.5 font-semibold text-[var(--success-text)]">{row.career} / 10</td>
                    <td className="p-2.5">
                      {isGreat ? (
                        <span className="inline-flex items-center gap-1 text-[var(--success-text)] font-medium text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> High Synergy
                        </span>
                      ) : (
                        <span className="text-[var(--text-muted)] text-[11px]">Developable skill</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Helpful Plain-Language Footnote */}
      <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
        <HelpCircle className="w-3.5 h-3.5 text-[var(--accent-primary)] flex-shrink-0" />
        <span>
          A higher overlap between your affinity area and the benchmark indicates natural day-to-day comfort in this job.
        </span>
      </div>

    </div>
  );
}
