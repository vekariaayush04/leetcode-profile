import React from 'react';
import { LeetCode } from "leetcode-query";

const Profile = async ({ username }: { username: string }) => {
  const leetcode = new LeetCode();
  const user = await leetcode.user(username);
  const data = user.matchedUser?.submitStats.acSubmissionNum;

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg m-8">
      <h1 className="text-2xl font-bold text-center mb-4">{user.matchedUser?.username}</h1>
      <div className="flex justify-around">
        {data?.map((element) => {
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
    </div>
  );
}

export default Profile;
