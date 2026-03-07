import React, { createContext, useContext, useState, useEffect } from 'react';

const StatsContext = createContext();

const LOCAL_STORAGE_KEY = 'gvoid_user_stats';

const DEFAULT_STATS = {
    sessions: [], // array of { timestamp: number, duration: number, efficiency: number }
    milestones: {
        first50m: false,
        streak7Day: false,
    }
};

export const StatsProvider = ({ children }) => {
    const [stats, setStats] = useState(() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            return saved ? JSON.parse(saved) : DEFAULT_STATS;
        } catch (error) {
            console.error('Failed to load stats from localStorage:', error);
            return DEFAULT_STATS;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));
        } catch (error) {
            console.error('Failed to save stats to localStorage:', error);
        }
    }, [stats]);

    const recordSession = (durationMinutes, efficiency) => {
        setStats(prev => {
            const newSession = {
                timestamp: Date.now(),
                duration: durationMinutes,
                efficiency: Number(efficiency.toFixed(1))
            };

            const updatedSessions = [...prev.sessions, newSession];

            // Check milestones
            const newMilestones = { ...prev.milestones };
            if (!newMilestones.first50m && durationMinutes >= 50) {
                newMilestones.first50m = true;
            }

            // 7-Day Streak Logic
            if (!newMilestones.streak7Day) {
                // Determine if there are sessions on 7 unique consecutive days
                const uniqueDays = [...new Set(updatedSessions.map(s => new Date(s.timestamp).setHours(0, 0, 0, 0)))].sort();
                if (uniqueDays.length >= 7) {
                    let maxStreak = 1;
                    let currentStreak = 1;
                    for (let i = 1; i < uniqueDays.length; i++) {
                        const diffTime = Math.abs(uniqueDays[i] - uniqueDays[i - 1]);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        if (diffDays === 1) {
                            currentStreak++;
                            maxStreak = Math.max(maxStreak, currentStreak);
                        } else {
                            currentStreak = 1;
                        }
                    }
                    if (maxStreak >= 7) {
                        newMilestones.streak7Day = true;
                    }
                }
            }

            return {
                ...prev,
                sessions: updatedSessions,
                milestones: newMilestones
            };
        });
    };

    // Derived Metrics
    const totalFocusMinutes = stats.sessions.reduce((acc, curr) => acc + curr.duration, 0);
    const totalFocusHours = (totalFocusMinutes / 60).toFixed(1);

    // Busiest Weekday
    const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdayCounts = new Array(7).fill(0);
    // Productive Time of Day (Morning 5-12, Afternoon 12-17, Evening 17-21, Night 21-5)
    let morning = 0, afternoon = 0, evening = 0, night = 0;

    // Average Session & Focus Efficiency
    let longestSession = 0;
    let sessionsOver60 = 0;

    let perfectSessions = 0;
    // 7-day average efficiency
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    let last7DaysEfficiencySum = 0;
    let last7DaysCount = 0;

    stats.sessions.forEach(s => {
        const d = new Date(s.timestamp);
        weekdayCounts[d.getDay()] += s.duration;

        const hour = d.getHours();
        if (hour >= 5 && hour < 12) morning += s.duration;
        else if (hour >= 12 && hour < 17) afternoon += s.duration;
        else if (hour >= 17 && hour < 21) evening += s.duration;
        else night += s.duration;

        longestSession = Math.max(longestSession, s.duration);
        if (s.duration >= 60) sessionsOver60++;

        if (s.efficiency === 100) perfectSessions++;

        if (s.timestamp >= oneWeekAgo) {
            last7DaysEfficiencySum += s.efficiency;
            last7DaysCount++;
        }
    });

    const maxWeekdayDuration = Math.max(...weekdayCounts);
    const busiestWeekdayIndex = weekdayCounts.indexOf(maxWeekdayDuration);
    const busiestWeekday = maxWeekdayDuration > 0 ? daysArr[busiestWeekdayIndex] : 'N/A';

    let productiveTime = 'N/A';
    if (totalFocusMinutes > 0) {
        const maxTime = Math.max(morning, afternoon, evening, night);
        if (maxTime === morning) productiveTime = 'Morning';
        else if (maxTime === afternoon) productiveTime = 'Afternoon';
        else if (maxTime === evening) productiveTime = 'Evening';
        else productiveTime = 'Night';
    }

    const avgSessionLength = stats.sessions.length > 0
        ? Math.round(totalFocusMinutes / stats.sessions.length)
        : 0;

    const overallFocusEfficiency = stats.sessions.length > 0
        ? Math.round(stats.sessions.reduce((acc, curr) => acc + curr.efficiency, 0) / stats.sessions.length)
        : 0;

    const last7DaysAverageEfficiency = last7DaysCount > 0
        ? Math.round(last7DaysEfficiencySum / last7DaysCount) : 0;

    const detailedMetrics = {
        totalFocus: {
            busiestWeekday,
            productiveTime,
        },
        avgSession: {
            longestSession,
            totalSessions: stats.sessions.length,
            sessionsOver60
        },
        focusEfficiency: {
            perfectSessions,
            last7DaysAverageEfficiency
        }
    };

    const resetStats = () => {
        setStats(DEFAULT_STATS);
    };

    return (
        <StatsContext.Provider value={{
            stats,
            recordSession,
            resetStats,
            metrics: {
                totalFocusHours,
                avgSessionLength,
                overallFocusEfficiency,
                detailedMetrics
            }
        }}>
            {children}
        </StatsContext.Provider>
    );
};

export const useStats = () => useContext(StatsContext);
