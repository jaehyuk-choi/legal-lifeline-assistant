
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

type Status = 'submitted' | 'in_progress' | 'reviewed' | 'decision_made';

interface StatusBarProps {
  currentStatus: Status;
  className?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ currentStatus, className }) => {
  const { t } = useLanguage();

  const statusOrder: Status[] = ['submitted', 'in_progress', 'reviewed', 'decision_made'];
  const currentIndex = statusOrder.indexOf(currentStatus);
  
  // Calculate progress percentage
  const progressPercentage = (currentIndex + 1) / statusOrder.length * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium">Status</span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>
      
      <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden mb-6">
        <div 
          className="absolute h-full bg-primary transition-all duration-500 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="relative pt-6">
        {/* Status Timeline */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-border"></div>
        
        {/* Status Markers */}
        <div className="flex justify-between relative">
          {statusOrder.map((status, index) => {
            const isActive = index <= currentIndex;
            
            return (
              <div key={status} className="flex flex-col items-center relative">
                <div 
                  className={cn(
                    "w-4 h-4 rounded-full z-10",
                    isActive ? "bg-primary" : "bg-muted border border-border"
                  )}
                />
                <div className="text-xs mt-2 whitespace-nowrap">
                  {t(`status.${status}`)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
