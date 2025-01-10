"use client";
import { getArenaStats } from "./actions";
import { useEffect, useState } from "react";
import Link from "next/link";

type Player = {
  username: string;
  level: number;
  powerLevel: {
    strength: number;
    speed: number;
    wisdom: number;
    agility: number;
  };
  abilities: string[];
  characterClass: string;
  avatar: string;
  stats: {
    easy: number;
    medium: number;
    hard: number;
    all: number;
  };
};
export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  //const [totalStats, setTotalStats] = useState({ easy: 0, medium: 0, hard: 0, all: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const users = ["rishabh467", "vivek5001", "ayushvekariya", "chyyuvraj21", "anand016", "Ashutosh_1030"];
      const warriorData = await Promise.all(users.map(username => getArenaStats({ username })));
      setPlayers(warriorData);
      
      // Calculate total stats
      const totals = warriorData.reduce((acc) => ({
        easy: acc.easy,
        medium: acc.medium,
        hard: acc.hard,
        all: acc.all
      }), { easy: 0, medium: 0, hard: 0, all: 0 });
      console.log(totals)
      
      //setTotalStats(totals);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-xl">Summoning Warriors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/30 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            LeetCode Warriors
          </h1>
          <Link 
            href="/leaderboard"
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg 
                     hover:from-red-600 hover:to-purple-600 transform hover:scale-105 transition-all"
          >
            Enter Arena ⚔️
          </Link>
        </div>
      </header>

      {/* Warriors Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div key={player.username} 
                 className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={player.avatar} 
                  alt={player.username}
                  className="w-16 h-16 rounded-full ring-2 ring-purple-400"
                />
                <div>
                  <h2 className="text-xl font-bold">{player.username}</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-yellow-400">Level {player.level}</span>
                    <span className="text-sm text-purple-400">{player.characterClass}</span>
                  </div>
                </div>
              </div>

              {/* LeetCode Stats */}
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

              {/* Abilities */}
              <div className="mt-4 flex flex-wrap gap-2">
                {player.abilities.map((ability: string) => (
                  <span key={ability} 
                        className="px-2 py-1 bg-white/10 rounded-full text-sm whitespace-nowrap">
                    {ability}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
