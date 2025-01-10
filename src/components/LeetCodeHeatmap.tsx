import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

type HeatmapProps = {
  submissionCalendar: Record<string, number>;
};

const LeetCodeHeatmap = ({ submissionCalendar }: HeatmapProps) => {
  const [heatmapData, setHeatmapData] = useState<Array<{ date: Date; count: number }>>([]);

  useEffect(() => {
    // Get current month's date range
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    
    // Convert timestamps to dates and counts
    const submissions = Object.entries(submissionCalendar).map(([timestamp, count]) => ({
      date: new Date(parseInt(timestamp) * 1000),
      count: count as number
    }));

    // Filter submissions for current month
    const currentMonthSubmissions = submissions.filter(submission => 
      submission.date >= monthStart && submission.date <= monthEnd
    );

    // Create a map for quick lookup
    const submissionMap = new Map(
      currentMonthSubmissions.map(s => [format(s.date, 'yyyy-MM-dd'), s.count])
    );

    // Generate all days of the month
    const days = eachDayOfInterval({
      start: monthStart,
      end: today, // Only show up to today
    }).map(date => ({
      date,
      count: submissionMap.get(format(date, 'yyyy-MM-dd')) || 0
    }));

    setHeatmapData(days);
  }, [submissionCalendar]);

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-gray-800';
    if (count === 1) return 'bg-green-900';
    if (count <= 3) return 'bg-green-700';
    if (count <= 5) return 'bg-green-500';
    return 'bg-green-300';
  };

  // Group days by week for better grid layout
  const weeks = heatmapData.reduce((acc, day) => {
    const weekNum = format(day.date, 'w');
    if (!acc[weekNum]) {
      acc[weekNum] = [];
    }
    acc[weekNum].push(day);
    return acc;
  }, {} as Record<string, typeof heatmapData>);

  return (
    <div className="p-4">
      <div className="text-sm text-gray-400 mb-2">
        {format(new Date(), 'MMMM yyyy')} Activity
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs text-gray-500 text-center mb-1">
            {day}
          </div>
        ))}
        
        {Object.values(weeks).map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <motion.div
              key={day.date.toISOString()}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: (weekIndex * 7 + dayIndex) * 0.02 }}
              className="relative group"
            >
              <div 
                className={`w-4 h-4 rounded-sm ${getIntensity(day.count)} 
                         transition-all duration-200 hover:scale-150`}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                          hidden group-hover:block z-10">
                <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  {format(day.date, 'MMM d')}: {day.count} submissions
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeetCodeHeatmap; 