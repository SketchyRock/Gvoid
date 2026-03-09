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
import Terminal from './components/layout/Terminal';
import NavMenu from './components/layout/NavMenu';
import ModulesModal from './components/layout/ModulesModal';

const WIDGETS = {
  timer: <PomodoroTimer />,
  audio: <AmbientSound />,
  tasks: <CurrentFocus />,
  void: <VoidStickyNote />
};

// Initial default layout for the grid - constrained to 3 columns and 2 rows (6 total spots)
const DEFAULT_LAYOUT = [
  { i: 'timer', x: 0, y: 0, w: 1, h: 1, maxH: 2, maxW: 2 },
  { i: 'audio', x: 1, y: 0, w: 1, h: 1, maxH: 2, maxW: 2 },
  { i: 'tasks', x: 2, y: 0, w: 1, h: 1, maxH: 2, maxW: 2 },
  { i: 'void', x: 0, y: 1, w: 1, h: 1, maxH: 2, maxW: 2 },
];

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Widget active state persistence
  const [activeModules, setActiveModules] = useState(() => {
    const saved = localStorage.getItem('gvoid_active_modules');
    if (saved) {
      return JSON.parse(saved);
    }
    return { timer: true, audio: true, tasks: true, void: true };
  });
  const toggleModule = (key) => {
    setActiveModules(prev => {
      const isEnabling = !prev[key];
      const activeCount = Object.values(prev).filter(Boolean).length;

      if (isEnabling && activeCount >= 6) {
        return prev;
      }

      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('gvoid_active_modules', JSON.stringify(next));

      if (isEnabling) {
        setLayouts(prevLayouts => {
          const nextLayouts = { ...prevLayouts };
          const breakpoints = ['lg', 'md', 'sm', 'xs', 'xxs'];
          const colsMap = { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 };

          breakpoints.forEach(bp => {
            const currentBpLayout = prevLayouts[bp] || [];
            const cols = colsMap[bp];
            const maxRows = (bp === 'lg' || bp === 'md') ? 2 : 6;

            // Get all active keys for this breakpoint
            const activeKeys = Object.keys(next).filter(k => next[k]);

            // To be super safe and ensure no single-column stacking,
            // we will re-derive positions for all active modules in a tight grid.
            const newBpLayout = activeKeys.map((itemKey, index) => {
              // Try to find if this item already has a valid position in currentBpLayout
              const existing = currentBpLayout.find(i => i.i === itemKey);
              if (existing && existing.x < cols && existing.y < maxRows) {
                return { ...existing, maxW: 2, maxH: 2 };
              }
              // Otherwise find a new automatic spot
              return {
                i: itemKey,
                x: index % cols,
                y: Math.floor(index / cols),
                w: 1,
                h: 1,
                maxW: 2,
                maxH: 2
              };
            });

            nextLayouts[bp] = newBpLayout;
          });

          localStorage.setItem('gvoid_widget_layouts', JSON.stringify(nextLayouts));
          return nextLayouts;
        });
      }

      return next;
    });
  };

  // Widget layout state with LocalStorage persistence
  const [layouts, setLayouts] = useState(() => {
    const saved = localStorage.getItem('gvoid_widget_layouts');
    const bps = ['lg', 'md', 'sm', 'xs', 'xxs'];

    if (saved) {
      const parsed = JSON.parse(saved);
      const updated = {};
      bps.forEach(bp => {
        // Ensure all items in all breakpoints are constrained to 2x2 max
        const layout = parsed[bp] || DEFAULT_LAYOUT;
        updated[bp] = layout.map(item => ({ ...item, maxH: 2, maxW: 2 }));
      });
      return updated;
    }

    const initial = {};
    bps.forEach(bp => {
      initial[bp] = DEFAULT_LAYOUT.map(item => ({ ...item, maxH: 2, maxW: 2 }));
    });
    return initial;
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
              <div className="flex items-center gap-3 group/brand cursor-pointer" onClick={() => setIsTerminalOpen(prev => !prev)}>
                <img src="/gvoid-logo.svg" alt="Gvoid Logo" className="w-8 h-8 group-hover/brand:scale-110 transition-transform duration-500 group-hover/brand:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-soft via-purple-soft to-blue-soft bg-[length:200%_auto] bg-left group-hover/brand:bg-right bg-clip-text text-transparent transition-all duration-500 group-hover/brand:scale-105 group-hover/brand:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
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

              <NavMenu
                onOpenStats={() => setIsStatsOpen(true)}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenModules={() => setIsModulesOpen(true)}
              />
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
                    rowHeight={160} // Reduced height to ensure 2 rows fit comfortably
                    onLayoutChange={onLayoutChange}
                    draggableHandle=".drag-handle"
                    compactType="vertical"
                    verticalCompact={true}
                    preventCollision={false}
                    margin={[20, 20]} // Increased margin for cleaner look
                    isBounded={true}
                    maxRows={2}
                  >
                    {Object.keys(WIDGETS).filter(key => activeModules[key]).map(key => (
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
            <ModulesModal
              isOpen={isModulesOpen}
              onClose={() => setIsModulesOpen(false)}
              activeModules={activeModules}
              onToggleModule={toggleModule}
            />
            <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
          </div>
        </SettingsProvider>
      </GameProvider>
    </StatsProvider>
  );
}
