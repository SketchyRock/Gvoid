Start website on local host:
- npm install (install dependecies)
- npm run *dev* (start website on local host *dev allows changes to be seen in real time*)


features to add:
- add more stimulating visuals, possibly an afk thing or game that plays in the background
    - desktop rpg that can only be progressed when study timer stops, afk while study timer is active
- study statistics created from csv file
- fix the music player, user must click twice to play music initially

---

### The "Abyssal Descent" Implementation

**System Role:** You are an expert React/Vite developer specializing in gamified web applications.

**Objective:** implement a "Pomodoro Dungeon Crawler" game that integrates into this website.

**Theme:** Dark Fantasy (Souls-like), super simple pixel art, 1,000-hour horizontal progression.

**1. Game Architecture (Two States):**

* **Focus State (1st Person):** A "Wizardry-style" dungeon crawler view.
* **Visuals:** Static pixel-art dungeon walls with simple perspective. Enemies appear in center-frame and "pulse" when defeated.
* **Logic:** Non-distracting, automated. While the Pomodoro timer runs, the character "marches." Every 20 seconds, an enemy is defeated, awarding **Souls** and a **Loot Glimmer** (Unidentified Fragment).
* **Persistence:** A "Total Floors Completed" tracker (1 Floor = 1 Focus Session).

* **Break State (3rd Person):** The "Shrine" (Safe Hub).
* **Visuals:** Side-profile pixel art of the character standing by a bonfire.
* **Mechanics:** 1. **The Crow (Corvus the Clumsy):** An NPC that "identifies" Loot Glimmers.
2. **Identification:** Reveal gear (Swords, Capes, Helmets). Progression is horizontal—items are mostly cosmetic or offer minor buffs to Soul gain.
3. **Stats:** Spend Souls to level Vigor, Strength, or Faith. High stats subtly evolve the 3rd person sprite (e.g., shinier armor, glowing eyes).

**2. Progression & Prestige Logic:**

* **Horizontal Loot:** Loot power scales with floor number, but stays balanced. Higher floors unlock "Artifacts" (permanent visual changes to the Shrine).
* **Prestige (Link the Fire):** At Floor 100, the user can reset to Floor 1 for an "Embers of Focus" buff (+5% Soul multiplier).
* **Safety:** Zero risk. No "Game Over." The game only moves forward when the user works.

**3. Technical Requirements:**

* **State Management:** Use a `gameContext` or a custom `useGame` hook. Persistent storage via `localStorage`.
* **Efficiency:** Use CSS filters for "pixel-art" lighting effects. Keep animations light (simple sprite sheets or CSS transforms).
* **UI Integration:** The game should be a toggleable section of Gvoid.

**4. Tasks for AI:**

1. Generate the `initialGameState` object (Souls, Stats, FloorCount, Inventory).
2. Create the `DungeonView` component (1st Person) and `ShrineView` component (3rd Person).
3. Implement a `lootTable` system that returns a random item based on the current Floor Level.
4. Include a funny dialogue snippet for **Corvus the Clumsy** the crow.

### A few "Artifact" ideas for your Loot Table:

Since you’re building this, here are three 1,000-hour "Chase Items" to include in your code:

* **The Silent Hourglass:** A rare artifact that makes the 1st person dungeon walls look like they are made of gold.
* **Corvus’s Lost Feather:** Increases the speed of the "Identify" animation in the Shrine.
* **The Abyssal Torch:** Changes the 1st person view from dark/gritty to a high-contrast "Void" aesthetic.

**Would you like me to generate the actual JavaScript `initialState` object and a sample `lootTable` array to get you started?**

---

### The "Scribe & Scholar" Data Integration Prompt

**System Role:** You are a Full-Stack React Developer and Data Architect.

**Objective:** Design a dual-layered statistics system for Gvoid that tracks both real-world productivity and in-game "Abyssal Descent" progress.

**1. The "Data Monolith" (Unified State):**

* **The Big Pile:** Create a central `useAnalytics` hook or Redux/Zustand store that captures every Pomodoro event.
* **Data Schema:** * `productivity`: { totalMinutes, sessionCount, dailyStreak, hourlyHeatmap, focusRatios }.
* `gameplay`: { floorsCleared, soulsGained, enemiesSlain, glimmersFound, prestigeLevel }.


* **Future-Proofing:** Ensure data is stored in a time-stamped log format (e.g., `[{ timestamp: ISO, type: 'focus', duration: 25 }]`) to allow for complex trend analysis later.

**2. UI Component: The "Scholar's Ledger" (Productivity UI):**

* **Trigger:** Add a "Statistics" icon (e.g., a simple bar chart or book icon) to the **top-right navigation**, immediately adjacent to the Settings tab. Settings on the far right and stats to the left of settings.
* **Behavior:** When clicked, it should open a slide-out panel (mimicking the Settings UI) that is clean, minimalist, and highly readable.
* **Content:** * **Top:** A sleek, modern line graph that can display different pieces of data depending on what the user wants to see.
* **Scrollable Section:** Below the graph, list "Quick Stats" (e.g., "Total Study Time," "Total Focus Sessions," "Longest Streak," "Average Session Length").



**3. UI Component: The "Tome of Souls" (Game UI):**

* **Location:** An interactive "Tome on a Stone Stand" sprite within the **3rd-person Shrine (Break Area)**.
* **Visuals:** When opened, the UI should pivot from "Minimalist Web" to "Dark Fantasy." Use a pixelated parchment background with gothic/serif fonts.
* **Content:** This view displays "flavor" stats:
* "Corvus’s Record of Slain Shadows" (Kill count).
* "The Ledger of Found Trinkets" (Inventory/Loot stats).
* "Current Soul Resonance" (Stat distribution).



**4. Technical Implementation Details:**

* **Style Isolation:** Use CSS Modules or Tailwind classes to ensure the "Minimalist Stats" and "Pixel Parchment" styles don't bleed into each other.
* **Performance:** Data should be pulled from `localStorage` on mount and memoized to prevent re-renders during the countdown timer.

**5. Tasks for AI:**

1. Provide the JSON structure for the "Unified Data Pile."
2. Write the React code for the Top-Right Statistics Modal.
3. Provide the CSS/Tailwind for the "Pixelated Parchment" effect used for the in-game Tome.

### Pro-Tip for your "Tome" Visuals

To get that authentic "Old Pixelated Parchment" look without heavy images, you can use a **CSS Border Image** or a small 64x64 tiling parchment texture.

**Generate the "Corvus the Clumsy" dialogue for when a user first interacts with the Stone Stand Tome.** (He could say something about how he "accidentally" dropped the ink on the pages).
