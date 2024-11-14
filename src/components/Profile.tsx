import { getProfile } from '@/app/actions';
import { AcSubmissionNum } from 'leetcode-query';
import React, { useState, useEffect } from 'react';

export const Profile = ({ username }: { username: string }) => {
  
  const [data, setData] = useState<AcSubmissionNum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      const data = await getProfile({ username });
      setData(data!);
      setLoading(false); 
    };
    fetchData();
  }, [username]);

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg m-8">
      <h1 className="text-2xl font-bold text-center mb-4">{username}</h1>
      {loading ? (
        <div className="flex flex-col items-center py-4">

          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="flex justify-around">
          {data?.map((element: any) => {
            let colorClass = "";
            switch (element.difficulty) {
              case "Easy":
                colorClass = "bg-green-500";
                break;
              case "Medium":
                colorClass = "bg-yellow-500";
                break;
              case "Hard":
                colorClass = "bg-red-500";
                break;
              default:
                colorClass = "bg-gray-500";
            }
            return (
              <div key={element.count} className="text-center w-96">
                <div
                  className={`w-16 h-16 ${colorClass} text-white rounded-full flex items-center justify-center mx-auto`}
                >
                  {element.count}
                </div>
                <h2 className="mt-2 text-lg font-semibold">{element.difficulty}</h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
