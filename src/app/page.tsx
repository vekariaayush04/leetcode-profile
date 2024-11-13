
import Profile from "@/components/Profile";

export default async function Home() {
  
  return (
    <div className="h-screen md:grid md:grid-cols-2 gap-3">
      <Profile username="rishabh467"/>
      <Profile username="vivek5001"/>
      <Profile username="ayushvekariya"/>
      <Profile username="chyyuvraj21"/>
      <Profile username="anand016"/>
      <Profile username="Ashutosh_1030"/>
    </div>
  );
}
