"use client";

import { getTodaySubmissions } from "@/app/actions";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const LeaderBoard = () => {
  const [data, setData] = useState<{ username: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const users = [
    "rishabh467",
    "vivek5001",
    "ayushvekariya",
    "chyyuvraj21",
    "anand016",
    "Ashutosh_1030",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getTodaySubmissions({ username: users });
        const sortedData = fetchedData?.sort((a, b) => b.value - a.value) || [];
        setData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Epic RPG rank styles with added elements
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          badge: "👑",
          title: "Supreme Champion",
          gradient: "from-yellow-400 via-amber-500 to-yellow-600",
          glow: "shadow-lg shadow-yellow-500/50",
          icon: "🌟",
          power: "Legendary",
        };
      case 2:
        return {
          badge: "⚔️",
          title: "Elite Warrior",
          gradient: "from-slate-300 via-slate-400 to-slate-500",
          glow: "shadow-lg shadow-slate-500/50",
          icon: "⚡",
          power: "Epic",
        };
      case 3:
        return {
          badge: "🛡️",
          title: "Bronze Knight",
          gradient: "from-amber-700 via-amber-800 to-amber-900",
          glow: "shadow-lg shadow-amber-800/50",
          icon: "🔥",
          power: "Rare",
        };
      default:
        return {
          badge: "⚔️",
          title: "Warrior",
          gradient: "from-purple-600 via-blue-600 to-purple-700",
          glow: "shadow-lg shadow-purple-500/50",
          icon: "✨",
          power: "Common",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <Link href="/" className="fixed top-4 left-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all text-sm">
        ← Return
      </Link>

      {!loading ? (
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
            Battle Rankings
          </h1>
          {/* <p className="text-center text-gray-400 mb-8 text-sm">Daily Challenge Champions</p> */}

          <div className="flex flex-col items-center space-y-4 max-w-xl mx-auto">
            {data?.map((element, index) => {
              const rankStyle = getRankStyle(index + 1);
              return (
                <div
                  key={element.username}
                  className={`relative w-full bg-white/5 backdrop-blur-sm rounded-lg p-4 
                    hover:bg-white/10 transition-all duration-300 hover:scale-102 
                    border border-white/10 ${rankStyle.glow} group`}
                >
                  {/* Rank Badge */}
                  <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full flex items-center justify-center text-lg
                    bg-gradient-to-r ${rankStyle.gradient} group-hover:scale-110 transition-transform">
                    {rankStyle.badge}
                  </div>

                  <div className="ml-8 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold">{element.username}</h2>
                        <span className="text-sm opacity-75">{rankStyle.icon}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                          {rankStyle.title}
                        </p>
                        {/* <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10">
                          {rankStyle.power}
                        </span> */}
                      </div>
                    </div>

                    {/* Battle Points */}
                    <div className={`flex items-center gap-2 bg-gradient-to-r 
                      ${rankStyle.gradient} rounded-md px-3 py-1.5 ${rankStyle.glow} min-w-[80px] justify-center`}>
                      <span className="text-lg font-bold">{element.value}</span>
                      <span className="text-[10px] opacity-75 text-md font-semibold">Kills</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${rankStyle.gradient} rounded-full transition-all duration-1000`}
                      style={{ width: `${Math.min(100, (element.value / 10) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-12 h-12 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Summoning Today&apos;s Warriors... ⚔️
          </p>
        </div>
      )}
      
    </div>
  );
};

export default LeaderBoard;
