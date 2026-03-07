import React, { useState, useEffect, useRef } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import PomodoroTimer from './components/study/PomodoroTimer';
import CurrentFocus from './components/study/CurrentFocus';
import AmbientSound from './components/audio/AmbientSound';
import SettingsPage from './components/settings/SettingsPage';
import StickyWidget from './components/layout/StickyWidget';
import VoidStickyNote from './components/study/VoidStickyNote';
import { SettingsProvider } from './contexts/SettingsContext';
import { StatsProvider } from './contexts/StatsContext';
import { GameProvider } from './contexts/GameContext';
import StatsPage from './components/stats/StatsPage';
import GlobalXPBar from './components/layout/GlobalXPBar';
import SplashScreen from './components/layout/SplashScreen';

const WIDGETS = {
  timer: <PomodoroTimer />,
  audio: <AmbientSound />,
  tasks: <CurrentFocus />,
  void: <VoidStickyNote />
};

// Initial default layout for the grid
const DEFAULT_LAYOUT = [
  { i: 'timer', x: 0, y: 0, w: 1, h: 1, maxH: 2, maxW: 2 },
  { i: 'audio', x: 1, y: 0, w: 1, h: 1, maxH: 2, maxW: 2 },
  { i: 'tasks', x: 2, y: 0, w: 1, h: 1, maxH: 2, maxW: 2 },
  { i: 'void', x: 0, y: 1, w: 1, h: 1, maxH: 2, maxW: 2 },
];

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Widget layout state with LocalStorage persistence
  const [layouts, setLayouts] = useState(() => {
    const saved = localStorage.getItem('gvoid_widget_layouts');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure existing layouts respect the new max constraints
      if (parsed.lg) {
        parsed.lg = parsed.lg.map(item => ({ ...item, maxH: 2, maxW: 2 }));
      }
      return parsed;
    }
    return { lg: DEFAULT_LAYOUT };
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Explicitly measure the container to feed RGL width manually,
    // bypassing the buggy WidthProvider HOC.
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    // React Grid Layout sometimes fails to calculate its initial width
    // if rendered inside a flex/css-grid container that hasn't fully painted.
    // A quick hack is to dispatch a resize event shortly after mount.
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const onLayoutChange = (currentLayout, allLayouts) => {
    // React-grid-layout fires onLayoutChange on mount. If we immediately set state
    // without checking if it actually changed, it triggers a re-render which fires
    // onLayoutChange again, causing an infinite loop.

    setLayouts((prevLayouts) => {
      // Ensure all items in all layouts respect constraints during change
      const constrainedLayouts = {};
      Object.keys(allLayouts).forEach(breakpoint => {
        constrainedLayouts[breakpoint] = allLayouts[breakpoint].map(item => ({
          ...item,
          maxH: 2,
          maxW: 2
        }));
      });

      if (JSON.stringify(prevLayouts) === JSON.stringify(constrainedLayouts)) {
        return prevLayouts;
      }
      localStorage.setItem('gvoid_widget_layouts', JSON.stringify(constrainedLayouts));
      return constrainedLayouts;
    });
  };

  const getGridItemConfig = (key) => {
    const layoutArray = layouts.lg || DEFAULT_LAYOUT;
    const config = layoutArray.find(item => item.i === key);
    return config || { x: 0, y: 0, w: 1, h: 1, maxH: 2, maxW: 2 };
  };

  const resetLayouts = () => {
    setLayouts({ lg: DEFAULT_LAYOUT });
    localStorage.removeItem('gvoid_widget_layouts');
  };

  return (
    <StatsProvider>
      <GameProvider>
        <SettingsProvider>
          <div className="h-screen flex flex-col bg-gray-900 text-gray-100 transition-colors duration-700 ease-in-out font-sans overflow-hidden">
            <SplashScreen />

            {/* Top Header Controls */}
            <header className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-3 animate-fade-in shrink-0 relative z-50">
              <div className="flex items-center gap-3 group/brand">
                <img src="/gvoid-logo.svg" alt="Gvoid Logo" className="w-8 h-8 group-hover/brand:scale-110 transition-transform duration-500 group-hover/brand:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                <h1 className="text-2xl font-black tracking-tighter cursor-default bg-gradient-to-r from-blue-soft via-purple-soft to-blue-soft bg-[length:200%_auto] bg-left group-hover/brand:bg-right bg-clip-text text-transparent transition-all duration-500 group-hover/brand:scale-105 group-hover/brand:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  Gvoid
                </h1>
                <a
                  href="https://github.com/SketchyRock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-[9px] font-bold text-gray-500 hover:text-purple-soft transition-all tracking-[0.2em] uppercase group/link"
                >
                  by SketchyRock
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-soft transition-all duration-300 group-hover/link:w-full"></span>
                </a>
              </div>

              <GlobalXPBar />

              <div className="flex gap-6 items-center">
                <button
                  onClick={() => setIsStatsOpen(true)}
                  className="text-gray-300 hover:text-purple-soft hover:scale-110 transition-all flex items-center gap-1.5"
                  title="Mission Control Stats"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="text-gray-300 hover:text-gray-100 hover:scale-105 transition-all text-xs uppercase tracking-widest font-semibold"
                >
                  Settings
                </button>
              </div>
            </header>

            {/* Main Focus Area - Fixed Viewport, No Scrolling */}
            <main className="flex-1 w-full relative p-4 flex justify-center overflow-hidden pb-12">
              <div ref={containerRef} className="w-full max-w-7xl h-full mx-auto relative z-10 animate-fade-in">
                {containerWidth > 0 && (
                  <ResponsiveGridLayout
                    className="layout w-full h-full"
                    width={containerWidth}
                    layouts={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
                    rowHeight={200} // Further reduced to ensure 3 rows fit with safe margins
                    onLayoutChange={onLayoutChange}
                    draggableHandle=".drag-handle"
                    compactType={null}
                    verticalCompact={false}
                    preventCollision={true}
                    allowOverlap={false}     // Disabled overlap to prioritize handle visibility
                    isBounded={true}        // Strictly keep within the grid bounds
                    maxRows={3}              // Constrain to 3 rows
                    maxW={2}                 // Prevent any widget from being wider than 2 units
                    maxH={2}                 // Prevent any widget from being taller than 2 units
                  >
                    {Object.keys(WIDGETS).map(key => (
                      <StickyWidget key={key} id={key}>
                        {WIDGETS[key]}
                      </StickyWidget>
                    ))}
                  </ResponsiveGridLayout>
                )}
              </div>
            </main>

            {/* Modals */}
            <SettingsPage
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              onResetLayouts={resetLayouts}
            />
            <StatsPage
              isOpen={isStatsOpen}
              onClose={() => setIsStatsOpen(false)}
            />
          </div>
        </SettingsProvider>
      </GameProvider>
    </StatsProvider>
  );
}
