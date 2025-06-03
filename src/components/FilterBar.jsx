import React from 'react';
import '../styles/FilterBar.css';

const FILTERS = ['all', 'daily', 'weekly', 'monthly', 'yearly'];
const FILTER_LABELS = {
  all: 'All',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Year',
};

const FILTER_ICONS = {
  all: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3" y2="6"/><line x1="3" y1="12" x2="3" y2="12"/><line x1="3" y1="18" x2="3" y2="18"/></svg>
  ),
  daily: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  ),
  weekly: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="7" y1="14" x2="7" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="17" y1="14" x2="17" y2="14"/></svg>
  ),
  monthly: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="7" y="14" width="3" height="3" rx="1"/><rect x="14" y="14" width="3" height="3" rx="1"/></svg>
  ),
  yearly: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="7" y="14" width="10" height="3" rx="1"/></svg>
  ),
};

const FilterBar = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="filter-bar">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`filter-btn${activeFilter === filter ? ' active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          <span className="filter-icon">{FILTER_ICONS[filter]}</span>
          {FILTER_LABELS[filter]}
        </button>
      ))}
    </div>
  );
};

export default FilterBar; 