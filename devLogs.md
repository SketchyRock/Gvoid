Start local host:

1. npm install
2. npm run dev

TODO:

- simplistic audio visualizer
- add more rpg elemnts to the game: skill tree, economy, expeditions, etc.
- integrate the task completion more into the game aspect
- add a cosmetic shop to spend void matter on

1. "Expeditions" & The Void Map (Interactive Progression)
   Instead of just working to earn numbers, let users go somewhere.

The Gameplay loop: You set a goal (e.g., "A 4-hour expedition to the Alpha Centauri sector"). You have to complete Pomodoros to advance your ship along a beautifully rendered SVG or Canvas "flight path."
Random Encounters: Between Pomodoros, an event can pop up like an FTL text event: "You encountered a stellar anomaly. Spend 50 Void Matter to gain a temporary 1.5x XP multiplier?" or "Asteroid Field: You must complete your next 25-minute Pomodoro without pausing, or your ship takes damage." This makes the breaks intensely engaging.

2. "Ghosts" / Asynchronous Multiplayer (Like Dark Souls)
   Working alone is hard. Working in the presence of others is motivating ("body doubling").

The Feature: You log focus sessions. Gvoid records your focus intensity. Then, when a different user logs on, they see faint, translucent "Ghosts" (maybe little floating orbs or ship avatars) of other users who focused on similar tasks in the past.
They see a small log: "SketchyRock focused intensely for 2 hours here yesterday." It creates a haunting but comforting sense of shared struggle without the pressure of live multiplayer.

3. Hyper-Polished Interactive Skill Trees (The "Talent" System)
   You mentioned an RPG skill tree in your TODO list. Let's make it look like a AAA game (think Destiny 2 or Path of Exile).

The Mechanic: A massive tree using Framer Motion and complex SVG lines. Nodes unlock passive abilities.
Example Skills:
Deep Breath: Your first 5-minute pause per session no longer penalizes your overall focus multiplier.
Stargazer: Grabbing +5% bonus Void Matter for sessions completed during local night time (10 PM - 5 AM).
Chain Reaction: Finishing three 25-minute Pomodoros perfectly in a row causes the fourth one to yield double rewards.
Why AI helps: I can mathematically balance the XP curve so they don't max it out in two days, and write the complex, staggered animations that run when a line of connected nodes is unlocked.
