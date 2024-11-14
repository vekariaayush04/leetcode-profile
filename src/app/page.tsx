"use client";
import {Profile} from "@/components/Profile";
import { getProfiles } from "./actions";
import {  useEffect, useState  } from "react";

export default function Home() {
  const [totalData, setTotalData] = useState<any>({});
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
    <div className="h-screen md:grid md:grid-cols-2 gap-3">
      <Profile username="rishabh467"/>
      <Profile username="vivek5001"/>
      <Profile username="ayushvekariya"/>
      <Profile username="chyyuvraj21"/>
      <Profile username="anand016"/>
      <Profile username="Ashutosh_1030"/>
      <Total totalData={totalData} loading={loading}/>
    </div>
  );
}

 function Total ({totalData,loading}:{totalData:any,loading:boolean}) {
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
              {totalData.count}
            </div>
            <h2 className="mt-2 text-lg font-semibold">All</h2>
          </div>
        </div>
      </div>)
  )
}
