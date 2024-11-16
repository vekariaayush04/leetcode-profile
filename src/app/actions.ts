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

export async function getTodaySubmissions({ username }: { username: string[] }) {
    const leetcode = new LeetCode();
    const userData:{
        username:string,
        value:number
    }[] = [];
    for (let i = 0; i < username.length; i++) {
        const userdata = await leetcode.user(username[i]);
        const data = userdata.matchedUser?.submissionCalendar;
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        const todayTimestamp = Math.floor(today.getTime() / 1000);
        const data1 = JSON.parse(data!);
        
        let submissionsToday = data1[todayTimestamp] || 0; 
        const submissions = userdata.recentSubmissionList!;
        
        let accepted = 0;
        for (let i = 0; i < submissions.length; i++) {
            if(submissionsToday === 0){
                break;
            }
            if(submissions[i].statusDisplay == "Accepted") {
                accepted += 1;
            }
            submissionsToday -= 1;
        }
        userData.push({
            username: username[i],
            value: accepted
        });
    }
    userData.sort((a, b) => b.value - a.value);
    return userData;
}
//     const user = await leetcode.user(username);
//     const data = user.matchedUser?.submissionCalendar
//     const today = new Date();
//     today.setUTCHours(0, 0, 0, 0);
//     const todayTimestamp = Math.floor(today.getTime() / 1000);
//     const data1 = JSON.parse(data!);
    
//     let submissionsToday = data1[todayTimestamp] || 0; 
//     const submissions = user.recentSubmissionList!;
    
//     let accepted = 0;
//     for (let i = 0; i < submissions.length; i++) {
//         if(submissionsToday === 0){
//             break;
//         }
//         if(submissions[i].statusDisplay == "Accepted") {
//             accepted += 1;
//         }
//         submissionsToday -= 1;
//     }
//     return accepted;
// }

