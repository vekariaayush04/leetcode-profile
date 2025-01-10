"use client";
import { getArenaStats } from "./actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import FlippableWarriorCard from "../components/FlippableWarriorCard";

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
  submissionCalendar: Record<string, number>;
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
            <FlippableWarriorCard 
              key={player.username}
              player={player}
              submissionCalendar={player.submissionCalendar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
