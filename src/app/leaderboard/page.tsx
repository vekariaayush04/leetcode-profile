import LeaderBoard from '@/components/LeaderBoard'
import React from 'react'

const page =async () => {  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-ip`, {
    next: { revalidate: 0 }, // Ensure fresh fetch during development
  });
  const data: { ip: string } = await res.json();
  return (
    <div>
        <h1>{data.ip}</h1>
        <LeaderBoard/>
    </div>
  )
}

export default page