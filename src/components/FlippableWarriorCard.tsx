import { motion } from 'framer-motion';
import { useState } from 'react';
import LeetCodeHeatmap from './LeetCodeHeatmap';

type FlippableWarriorCardProps = {
  player: {
    username: string;
    level: number;
    stats: {
      easy: number;
      medium: number;
      hard: number;
      all: number;
    };
    avatar: string;
  };
  submissionCalendar: Record<string, number>;
};

const FlippableWarriorCard = ({ player, submissionCalendar }: FlippableWarriorCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative h-[350px] perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 h-full">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={player.avatar} 
                alt={player.username}
                className="w-16 h-16 rounded-full ring-2 ring-purple-400"
              />
              <div>
                <h2 className="text-xl font-bold">{player.username}</h2>
                <span className="text-sm text-yellow-400">Level {player.level}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { label: "Easy", value: player.stats.easy, color: "from-green-400 to-green-600" },
                { label: "Medium", value: player.stats.medium, color: "from-yellow-400 to-yellow-600" },
                { label: "Hard", value: player.stats.hard, color: "from-red-400 to-red-600" },
                { label: "Total", value: player.stats.all, color: "from-purple-400 to-pink-600" },
              ].map((stat) => (
                <div key={stat.label} className="relative">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{stat.label}</span>
                    <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-bold`}>
                      {stat.value}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all`}
                      style={{ width: `${Math.min(100, (stat.value / (stat.label === "Total" ? 500 : 200)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 h-full">
            <h3 className="text-xl font-bold mb-4">Activity Heatmap</h3>
            <LeetCodeHeatmap submissionCalendar={submissionCalendar} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlippableWarriorCard; 