import Profile from "@/components/Profile";
import { getProfiles } from "./actions";

export default async function Home() {
  const totalData = await getProfiles();
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
