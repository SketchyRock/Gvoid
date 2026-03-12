Start local host:

1. npm install
2. npm run dev

TODO:

- add more rpg elemnts to the game: skill tree, economy, expeditions, etc.
- integrate the task completion more into the game aspect

1. "Expeditions" & The Void Map (Interactive Progression)
   Instead of just working to earn numbers, let users go somewhere.

The Gameplay loop: You set a goal (e.g., "A 4-hour expedition to the Alpha Centauri sector"). You have to complete Pomodoros to advance your ship along a beautifully rendered SVG or Canvas "flight path."
Random Encounters: Between Pomodoros, an event can pop up like an FTL text event: "You encountered a stellar anomaly. Spend 50 Void Matter to gain a temporary 1.5x XP multiplier?" or "Asteroid Field: You must complete your next 25-minute Pomodoro without pausing, or your ship takes damage." This makes the breaks intensely engaging.

2. Hyper-Polished Interactive Skill Trees (The "Talent" System)
   You mentioned an RPG skill tree in your TODO list. Let's make it look like a AAA game (think Destiny 2 or Path of Exile).

The Mechanic: A massive tree using Framer Motion and complex SVG lines. Nodes unlock passive abilities.
Example Skills:
Deep Breath: Your first 5-minute pause per session no longer penalizes your overall focus multiplier.
Stargazer: Grabbing +5% bonus Void Matter for sessions completed during local night time (10 PM - 5 AM).
Chain Reaction: Finishing three 25-minute Pomodoros perfectly in a row causes the fourth one to yield double rewards.
Why AI helps: I can mathematically balance the XP curve so they don't max it out in two days, and write the complex, staggered animations that run when a line of connected nodes is unlocked.
