'use server'

import LeetCode from "leetcode-query";

export async function getProfile({ username }: { username: string }) {
    const leetcode = new LeetCode();
    const user = await leetcode.user(username);
    const data = user.matchedUser?.submitStats.acSubmissionNum;
    return data;
}

export async function getProfiles() {
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
    return totalData.count;
}

