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
    // const IST_OFFSET = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds

    for (let i = 0; i < username.length; i++) {
        const userdata = await leetcode.user(username[i]);
        const data = userdata.matchedUser?.submissionCalendar;

        if (!data) {
            userData.push({ username: username[i], value: 0 });
            continue;
        }

        // Calculate today's start and end timestamps in IST
        const nowUTC = new Date();
        const startOfDayUTC = new Date(nowUTC.getTime()); // Convert UTC to IST
        startOfDayUTC.setUTCHours(0, 0, 0, 0); // Reset to 12:00 a.m. IST
        const startOfDayISTTimestamp = Math.floor(startOfDayUTC.getTime() / 1000); // IST start in seconds

        const endOfDayUTC = new Date(startOfDayUTC.getTime());
        endOfDayUTC.setUTCHours(23, 59, 59, 999); // 11:59:59 p.m. IST
        //const endOfDayISTTimestamp = Math.floor(endOfDayUTC.getTime() / 1000); // IST end in seconds

        // Parse the submission calendar to get submissions for today
        const submissionCalendar = JSON.parse(data);
        const totalSubmissionsToday = submissionCalendar[startOfDayISTTimestamp] || 0;
        console.log(totalSubmissionsToday);
        // Filter today's submissions from the recent submission list
        const submissions = userdata.recentSubmissionList || [];
        let acceptedSubmissionsToday = 0;
        let submissionsCounted = totalSubmissionsToday;
        let prevQue = "";

        for (let j = 0; j < submissions.length; j++) {
            if(submissionsCounted === 0){
                break;
            }
            const currQue = submissions[j].title;
            if(currQue === prevQue) {
                submissionsCounted -= 1;
                continue;
            }
            if(submissions[j].statusDisplay === "Accepted") {
                acceptedSubmissionsToday += 1;
            }
            submissionsCounted -= 1;
            prevQue = currQue;
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

export async function getArenaStats({ username }: { username: string }) {
    const leetcode = new LeetCode();
    const user = await leetcode.user(username);
    const submitStats = user.matchedUser?.submitStats.acSubmissionNum || [];
    
    // Get the correct stats from submitStats array
    const stats = {
        easy: submitStats.find(s => s.difficulty === "Easy")?.count || 0,
        medium: submitStats.find(s => s.difficulty === "Medium")?.count || 0,
        hard: submitStats.find(s => s.difficulty === "Hard")?.count || 0,
        all: submitStats.find(s => s.difficulty === "All")?.count || 0
    };

    // Calculate level and other RPG stats
    const level = Math.floor(stats.all / 50) + 1;
    const powerLevel = {
        strength: stats.hard * 3,
        speed: stats.all,
        wisdom: stats.medium * 2,
        agility: stats.easy
    };

    // Special abilities based on achievements
    const abilities = [];
    if (stats.hard > 15) abilities.push("🔥 Dragon's Breath");
    if (stats.all > 100) abilities.push("⚡ Lightning Strike");
    if (stats.medium > 50) abilities.push("🌟 Mystic Shield");
    if (stats.easy > 100) abilities.push("🌪️ Wind Walker");

    // Calculate character class based on solving patterns
    const characterClass = 
        stats.hard > stats.medium ? "Warrior" :
        stats.medium > stats.easy ? "Mage" :
        stats.all > 200 ? "Rogue" : "Paladin";

    return {
        username,
        level,
        powerLevel,
        abilities,
        characterClass,
        avatar: `https://robohash.org/${username}?set=set2&size=200x200`,
        stats  // Include the stats in the return object
    };
}

