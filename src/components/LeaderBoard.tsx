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
        setData(fetchedData || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    (!loading ? <div>
      <h1 className="text-2xl font-bold text-center mb-4 mt-4">Top LeetCoders of the Day</h1>
      <div className="flex flex-col justify-center items-center ">
        {data?.map((element) => (
          <div key={element.username} className="text-center w-96 grid grid-cols-2 items-center h-20 bg-gray-300 m-2 rounded-xl">
            <div className="bg-gray-500 mx-8 rounded-lg text-white h-12 flex items-center justify-center"><span>{element.username}</span></div>
            <div className="w-16 h-16 bg-gray-500 text-white rounded-full flex items-center justify-center mx-auto">
              {element.value}
            </div>
          </div>
        ))}
      </div>
    </div> : <div>
    <div className="flex flex-col items-center py-4 justify-center h-screen">

<div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
<p className="mt-2 text-gray-600 text-2xl font-semibold">Top LeetCoders on the way ...</p>
</div>
    </div>)
  );
};

export default LeaderBoard;
