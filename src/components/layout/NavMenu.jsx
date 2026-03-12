import React, { useState, useRef, useEffect } from 'react';

const NavMenu = ({ onOpenStats, onOpenSettings, onOpenModules, onOpenSkillTree }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleStatsClick = () => {
    onOpenStats();
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    onOpenSettings();
    setIsOpen(false);
  };

  const handleModulesClick = () => {
    onOpenModules();
    setIsOpen(false);
  };

  const handleSkillTreeClick = () => {
    onOpenSkillTree();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="relative w-10 h-10 flex items-center justify-center text-gray-400 hover:text-purple-soft hover:bg-gray-800/50 rounded-xl transition-all duration-300 group"
        aria-label="Toggle Menu"
      >
        <div className="w-6 h-4 relative flex items-center justify-center">
          <span
            className={`absolute w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
            }`}
          ></span>
          <span
            className={`absolute w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
              isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`absolute w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
              isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
            }`}
          ></span>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-3 w-56 origin-top-right rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 shadow-2xl transition-all duration-300 z-[100] ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="p-2 space-y-1">
          <button
            onClick={handleStatsClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-soft/10 rounded-xl transition-all group"
          >
            <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-purple-soft/20 group-hover:text-purple-soft transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span>Statistics</span>
          </button>

          <button
            onClick={handleSettingsClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-soft/10 rounded-xl transition-all group"
          >
            <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-purple-soft/20 group-hover:text-purple-soft transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span>Settings</span>
          </button>

          <button
            onClick={handleModulesClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-soft/10 rounded-xl transition-all group"
          >
            <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-purple-soft/20 group-hover:text-purple-soft transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <span>Dashboard Modules</span>
          </button>
        </div>

        <div className="p-2 border-t border-gray-800/50">
          <button
            onClick={handleSkillTreeClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-purple-300 hover:text-white hover:bg-purple-soft/10 rounded-xl transition-all group"
          >
            <div className="p-2 bg-purple-900/40 border border-purple-500/30 rounded-lg group-hover:bg-purple-soft/40 shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold tracking-widest uppercase text-xs">Skill Tree</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
