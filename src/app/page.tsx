"use client";
import {Profile} from "@/components/Profile";
import { getProfiles } from "./actions";
import {  useEffect, useState  } from "react";
import Link from "next/link";

export default function Home() {
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getProfiles();
      setTotalData(data!);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <header className="flex justify-center items-center p-2  bg-blue-500 shadow-lg sticky top-0 z-50">
       <Link href={"/leaderboard"}>
       <h1 className="flex items-center text-2xl font-bold mb-1 text-center bg-white rounded-lg p-2">LeaderBoard</h1></Link>
      </header>
    <div className="h-screen md:grid md:grid-cols-2 gap-3">
      <Profile username="rishabh467"/>
      <Profile username="vivek5001"/>
      <Profile username="ayushvekariya"/>
      <Profile username="chyyuvraj21"/>
      <Profile username="anand016"/>
      <Profile username="Ashutosh_1030"/>
      <Total totalData={totalData} loading={loading}/>
    </div>
    </div>
  );
}

 function Total ({totalData,loading}:{totalData:number,loading:boolean}) {
  return ( loading ? (
    <div className="flex flex-col items-center py-4">

      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-2 text-gray-600">Loading...</p>
    </div>
  ) :
  (<div>
        <h1 className="text-2xl font-bold text-center mb-4">Total</h1>
        <div className="flex justify-around">
          <div className="text-center w-96">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
              {totalData}
            </div>
            <h2 className="mt-2 text-lg font-semibold">All</h2>
          </div>
        </div>
      </div>)
  )
}
