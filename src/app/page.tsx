import { LeetCode } from "leetcode-query";
import Profile from "@/components/Profile";

export default async function Home() {
  const users = ["rishabh467", "vivek5001", "ayushvekariya", "chyyuvraj21", "anand016", "Ashutosh_1030"];
  const leetcode = new LeetCode();
  const totalData = {
    difficulty: "All",
    count: 0,
  }; 
  for (let i = 0; i < users.length; i++) {
    const user = await leetcode.user(users[i]);
    const data = user.matchedUser?.submitStats.acSubmissionNum;
    for (let j = 0; j < data!.length; j++) {
      if(totalData.difficulty == data![j].difficulty) {
        totalData.count += data![j].count;
      }
    }
  }
  return (
    <div className="h-screen md:grid md:grid-cols-2 gap-3">
      <Profile username="rishabh467"/>
      <Profile username="vivek5001"/>
      <Profile username="ayushvekariya"/>
      <Profile username="chyyuvraj21"/>
      <Profile username="anand016"/>
      <Profile username="Ashutosh_1030"/>
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">Total</h1>
        <div className="flex justify-around">
          <div className="text-center w-96">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
              {totalData.count}
            </div>
            <h2 className="mt-2 text-lg font-semibold">All</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
