import React, { useState, useEffect, useRef } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import PomodoroTimer from './components/study/PomodoroTimer';
import CurrentFocus from './components/study/CurrentFocus';
import AmbientSound from './components/audio/AmbientSound';
import SettingsPage from './components/settings/SettingsPage';
import StickyWidget from './components/layout/StickyWidget';
import { SettingsProvider } from './contexts/SettingsContext';



const WIDGETS = {
  timer: <PomodoroTimer />,
  audio: <AmbientSound />,
  tasks: <CurrentFocus />
};

// Initial default layout for the 3x3 grid
const DEFAULT_LAYOUT = [
  { i: 'timer', x: 0, y: 0, w: 1, h: 1 },
  { i: 'audio', x: 1, y: 0, w: 1, h: 1 },
  { i: 'tasks', x: 2, y: 0, w: 1, h: 1 },
];

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Widget layout state with LocalStorage persistence
  const [layouts, setLayouts] = useState(() => {
    const saved = localStorage.getItem('gvoid_widget_layouts');
    return saved ? JSON.parse(saved) : { lg: DEFAULT_LAYOUT };
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
      // Simple stringify check to prevent unnecessary state updates
      if (JSON.stringify(prevLayouts) === JSON.stringify(allLayouts)) {
        return prevLayouts;
      }
      localStorage.setItem('gvoid_widget_layouts', JSON.stringify(allLayouts));
      return allLayouts;
    });
  };

  const getGridItemConfig = (key) => {
    const layoutArray = layouts.lg || DEFAULT_LAYOUT;
    const config = layoutArray.find(item => item.i === key);
    return config || { x: 0, y: 0, w: 1, h: 1 };
  };

  return (
    <SettingsProvider>
      <div className="h-screen flex flex-col bg-gray-900 text-gray-100 transition-colors duration-700 ease-in-out font-sans overflow-hidden">

        {/* Top Header Controls */}
        <header className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-3 animate-fade-in shrink-0 relative z-50">
          <div className="flex items-baseline gap-4 group/brand">
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
          <div className="flex gap-6 items-center">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-gray-300 hover:text-gray-100 hover:scale-105 transition-all text-xs uppercase tracking-widest font-semibold"
            >
              Settings
            </button>
          </div>
        </header>

        {/* Main Focus Area - No Scrolling, 3x3 Grid constraint */}
        <main className="flex-1 w-full h-full relative p-4 flex justify-center overflow-hidden">
          <div ref={containerRef} className="w-full max-w-7xl h-full mx-auto relative z-10 animate-fade-in">
            {containerWidth > 0 && (
              <ResponsiveGridLayout
                className="layout w-full h-full"
                width={containerWidth}
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
                rowHeight={260} // Slightly tighter to ensure 3 rows fit well vertically without scrolling
                onLayoutChange={onLayoutChange}
                draggableHandle=".drag-handle"
                compactType={null} // Disable auto-packing, allowing empty spaces
                preventCollision={true} // Stop widgets from pushing each other out of place when dropped on empty spots
              >
                {Object.keys(WIDGETS).map(key => (
                  <div key={key} data-grid={getGridItemConfig(key)}>
                    <StickyWidget id={key}>
                      {WIDGETS[key]}
                    </StickyWidget>
                  </div>
                ))}
              </ResponsiveGridLayout>
            )}
          </div>
        </main>

        {/* Modals */}
        <SettingsPage isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </SettingsProvider>
  );
}
