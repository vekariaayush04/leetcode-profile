"use client";

import { getTodaySubmissions } from "@/app/actions";
import React, { useEffect, useState } from "react";

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
        // Sort the data by value in descending order
        const sortedData = fetchedData?.sort((a, b) => b.value - a.value) || [];
        setData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to get rank styles
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500 text-white"; // Gold
      case 2:
        return "bg-gray-400 text-white"; // Silver
      case 3:
        return "bg-amber-600 text-white"; // Bronze
      default:
        return "bg-transparent"; // No rank for others
    }
  };

  return !loading   ? (
    <div>
      <h1 className="text-3xl font-extrabold text-center mb-8 mt-4 text-gray-800">
        Top LeetCoders of the Day
      </h1>
      <div className="flex flex-col items-center space-y-4">
        {data?.map((element, index) => (
          <div
            key={element.username}
            className="relative flex items-center justify-between w-96 h-20 bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Rank Circle on Left Side */}
            {index < 7 && (
              <div
                className={`ml-4 w-10 h-10 rounded-full flex items-center justify-center ${getRankStyle(index + 1)} font-bold`}
              >
                {index + 1}
              </div>
            )}

            {/* Username Section */}
            <div className="flex-1 flex items-center justify-center text-xl font-medium text-gray-800">
              <span>{element.username}</span>
            </div>

            {/* Submission Value Section */}
            <div className="flex items-center justify-center w-16 h-16 bg-gray-500 text-white rounded-full mx-4">
              {element.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center py-4 justify-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-2 text-gray-600 text-2xl font-semibold">
        Top LeetCoders on the way ...
      </p>
    </div>
  );
};

export default LeaderBoard;
