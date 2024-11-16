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
    const userData: { username: string; value: number }[] = [];
    const IST_OFFSET = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds

    for (let i = 0; i < username.length; i++) {
        const userdata = await leetcode.user(username[i]);
        const data = userdata.matchedUser?.submissionCalendar;

        if (!data) {
            userData.push({ username: username[i], value: 0 });
            continue;
        }

        // Calculate today's start and end timestamps in IST
        const nowUTC = new Date();
        const startOfDayUTC = new Date(nowUTC.getTime() + IST_OFFSET); // Convert UTC to IST
        startOfDayUTC.setUTCHours(0, 0, 0, 0); // Reset to 12:00 a.m. IST
        const startOfDayISTTimestamp = Math.floor(startOfDayUTC.getTime() / 1000); // IST start in seconds

        const endOfDayUTC = new Date(startOfDayUTC.getTime());
        endOfDayUTC.setUTCHours(23, 59, 59, 999); // 11:59:59 p.m. IST
        const endOfDayISTTimestamp = Math.floor(endOfDayUTC.getTime() / 1000); // IST end in seconds

        // Parse the submission calendar to get submissions for today
        const submissionCalendar = JSON.parse(data);
        const totalSubmissionsToday = submissionCalendar[startOfDayISTTimestamp] || 0;

        // Filter today's submissions from the recent submission list
        const submissions = userdata.recentSubmissionList || [];
        let acceptedSubmissionsToday = 0;
        let submissionsCounted = 0;

        for (let j = 0; j < submissions.length; j++) {
            const submissionTimestampUTC = parseInt(submissions[j].timestamp); // In seconds
            const submissionTimestampIST = submissionTimestampUTC + Math.floor(IST_OFFSET / 1000); // Convert to IST seconds

            if (
                submissionTimestampIST >= startOfDayISTTimestamp &&
                submissionTimestampIST <= endOfDayISTTimestamp &&
                submissions[j].statusDisplay === "Accepted"
            ) {
                acceptedSubmissionsToday += 1;
            }

            // Exit once we process all submissions for today
            if (++submissionsCounted >= totalSubmissionsToday) {
                break;
            }
        }

        userData.push({
            username: username[i],
            value: acceptedSubmissionsToday,
        });
    }

    // Sort the leaderboard by the number of accepted submissions
    userData.sort((a, b) => b.value - a.value);
    return userData;
}



// export async function getTodaySubmissions({ username }: { username: string[] }) {
//     const leetcode = new LeetCode();
//     const userData:{
//         username:string,
//         value:number
//     }[] = [];
//     for (let i = 0; i < username.length; i++) {
//         const userdata = await leetcode.user(username[i]);
//         const data = userdata.matchedUser?.submissionCalendar;
//         const today = new Date();
//         today.setUTCHours(0, 0, 0, 0);
//         const todayTimestamp = Math.floor(today.getTime() / 1000);
//         const data1 = JSON.parse(data!);
        
//         let submissionsToday = data1[todayTimestamp] || 0; 
//         const submissions = userdata.recentSubmissionList!;
        
//         let accepted = 0;
//         for (let i = 0; i < submissions.length; i++) {
//             if(submissionsToday === 0){
//                 break;
//             }
//             if(submissions[i].statusDisplay == "Accepted") {
//                 accepted += 1;
//             }
//             submissionsToday -= 1;
//         }
//         userData.push({
//             username: username[i],
//             value: accepted
//         });
//     }
//     userData.sort((a, b) => b.value - a.value);
//     return userData;
// }
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

