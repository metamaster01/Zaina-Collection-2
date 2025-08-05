
import React from 'react';
import { ZainaColor } from '../../../types';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.FC<{ className?: string }>;
  change?: string; 
  changeType?: 'positive' | 'negative' | 'neutral';
  onClick?: () => void;
  children?: React.ReactNode; 
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  onClick,
  children,
  className = ''
}) => {
  let changeColorClass = 'text-admin-text-secondary dark:text-dark-admin-text-secondary';
  if (changeType === 'positive') changeColorClass = 'text-green-500';
  if (changeType === 'negative') changeColorClass = 'text-zaina-deep-red-accent';

  const cardBaseClasses = `bg-admin-card dark:bg-dark-admin-card p-5 rounded-2xl shadow-admin-soft transition-all duration-300 ease-in-out ${className}`;
  const clickableClasses = onClick ? 'hover:shadow-lg hover:scale-[1.03] cursor-pointer' : '';

  return (
    <div
      className={`${cardBaseClasses} ${clickableClasses}`}
      onClick={onClick}
      role={onClick ? "button" : "region"}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
      aria-label={`${title}: ${value}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-admin-text-secondary dark:text-dark-admin-text-secondary uppercase tracking-wider">{title}</h3>
        {Icon && (
          <div className="p-2 bg-admin-primary/10 dark:bg-dark-admin-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-admin-primary dark:text-dark-admin-primary" />
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-admin-text-primary dark:text-dark-admin-text-primary mb-1">{value}</p>
      {change && (
        <p className={`text-xs font-medium ${changeColorClass}`}>{change}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default DashboardCard;