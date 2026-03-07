import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const commandsList = [
    { cmd: 'help / h', desc: 'List available commands' },
    { cmd: 'sudo', desc: 'Request administrative override' },
    { cmd: 'ls -a', desc: 'Reveal hidden architecture' },
    { cmd: 'cat [file]', desc: 'Output file contents' },
    { cmd: 'yield [min]', desc: 'Force state transition' },
    { cmd: 'theme [name]', desc: 'Modify photon emission (e.g. event-horizon, clean-minimalist)' },
    { cmd: 'theme --dark', desc: 'Modify photon emission to deep dark' },
    { cmd: 'coffee', desc: 'Check peripheral levels' },
    { cmd: 'clear', desc: 'Purge session history' },
    { cmd: 'rm -rf /', desc: '[DANGER] Execute total wipe' },
    { cmd: 'whoami', desc: 'Query session identity' },
    { cmd: 'play', desc: 'Resume temporal flow' },
    { cmd: 'pause', desc: 'Halt temporal flow' },
    { cmd: 'skip', desc: 'Advance temporal sequence' },
    { cmd: 'music play', desc: 'Engage auditory stimulation' },
    { cmd: 'music pause', desc: 'Suspend auditory stimulation' },
    { cmd: 'music set [id]', desc: 'Calibrate frequency (lofi, rain, brown, deep-house, breakcore, fogcore)' },
    { cmd: 'exit', desc: 'Terminate terminal session' }
];

const fakeFiles = [
    '.bash_history', '.env', 'secret_notes.txt',
    'coffee_spilled.log', 'core_dumps',
    'enzo_system_logs', 'pomodoro_state.db'
];

const fakeFilesContent = {
    '.bash_history': 'ls -a\ncd ..\nclear\ntheme --dark\nsudo rm -rf /\nls\ncat .env',
    '.env': 'POMODORO_PRIME_DIRECTIVE="STAY_FOCUSED"\nVOID_STABILITY_THRESHOLD=99.9\nDB_PASS="hunter2"\nAPI_KEY="sk-live-0xDEADBEEF"',
    'secret_notes.txt': 'Note to self: The Void is hungry. Need more coffee.\nDo NOT click the red button.\nThe pomodoro timer is sentient.',
    'coffee_spilled.log': '[ERROR] MUG_KNOCKED_OVER at 08:43:12\n[WARN] KEYBOARD_STICKY\n[INFO] CAFFEINE_LEVEL_CRITICAL_LOW',
    'core_dumps': 'cat: core_dumps: Is a directory',
    'enzo_system_logs': 'cat: enzo_system_logs: Is a directory',
    'pomodoro_state.db': 'SQLite format 3\x00\x02\x01\x01\x00\x40\x20\x20\x00\x00\x00... [BINARY DATA CORRUPTED]'
};

const coffeeArt = `
      (  )   (   )  )
       ) (   )  (  (
       ( )  (    ) )
       _____________
      <_____________> ___
      |             |/ _ \\
      |               | | |
      |               |_| |
   ___|             |\\___/
  /    \\___________/    \\
  \\_____________________/
`;

export default function Terminal({ isOpen, onClose }) {
    const { settings, updateSettings } = useSettings();
    const [lines, setLines] = useState([
        { type: 'system', text: 'Gvoid OS v1.0.0 initializing...' },
        { type: 'system', text: 'Type "help" for a list of valid commands.' }
    ]);
    const [input, setInput] = useState('');
    const [isMaximized, setIsMaximized] = useState(false);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    // Keep input focused when terminal is open
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Auto scroll to bottom
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lines, isOpen]);

    const handleContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const addLine = (text, type = 'output') => {
        setLines(prev => [...prev, { type, text }]);
    };

    const handleGlitch = () => {
        const root = document.getElementById('root');
        if (root) {
            addLine('CRITICAL ERROR: Kernel panic - not syncing: Fatal exception in interrupt', 'error');
            setTimeout(() => {
                root.classList.add('glitch-effect');
                setTimeout(() => {
                    root.classList.remove('glitch-effect');
                    root.classList.add('glitch-blackout');
                    setTimeout(() => {
                        root.classList.remove('glitch-blackout');
                        setLines(prev => [...prev, { type: 'system', text: 'System restored. Integrity compromised.' }]);
                    }, 1500);
                }, 1000);
            }, 500);
        }
    };

    const processCommand = (cmdStr) => {
        const cmd = cmdStr.trim();
        if (!cmd) return;

        addLine(`guest@pomodoro:~$ ${cmd}`, 'input');

        const args = cmd.split(' ').filter(Boolean);
        const baseCmd = args[0].toLowerCase();

        switch (baseCmd) {
            case 'help':
            case 'h':
                commandsList.forEach(c => {
                    addLine(`${c.cmd.padEnd(16)} - ${c.desc}`);
                });
                break;
            case 'sudo':
                addLine('Access denied, Enzo. This incident will be reported.', 'error');
                break;
            case 'ls':
                if (args[1] === '-a') {
                    // Group into chunks of 3 for ls formatting
                    for (let i = 0; i < fakeFiles.length; i += 3) {
                        addLine(fakeFiles.slice(i, i + 3).join('  '));
                    }
                } else {
                    addLine('core_dumps  enzo_system_logs  pomodoro_state.db');
                }
                break;
            case 'cat':
                if (args[1]) {
                    if (fakeFilesContent[args[1]]) {
                        const fileLines = fakeFilesContent[args[1]].split('\n');
                        fileLines.forEach(l => addLine(l));
                    } else if (fakeFiles.includes(args[1])) {
                        addLine(`cat: ${args[1]}: Permission denied`, 'error');
                    } else {
                        addLine(`cat: ${args[1]}: No such file or directory`, 'error');
                    }
                } else {
                    addLine('Usage: cat [file]', 'error');
                }
                break;
            case 'coffee':
                const artLines = coffeeArt.split('\n');
                artLines.forEach(l => {
                    if (l.trim() !== '') addLine(l, 'art');
                });
                break;
            case 'whoami':
                addLine('GitHub: https://github.com/SketchyRock', 'link');
                break;
            case 'exit':
                if (onClose) onClose();
                break;
            case 'clear':
                setLines([]);
                break;
            case 'rm':
                if (args[1] === '-rf' && args[2] === '/') {
                    handleGlitch();
                } else {
                    addLine('rm: cannot remove files: permission denied', 'error');
                }
                break;
            case 'theme':
                if (args[1] === '--dark') {
                    updateSettings({ theme: 'event-horizon' });
                    addLine('Photon emission: Deep dark mode activated.');
                } else if (args[1]) {
                    updateSettings({ theme: args[1] });
                    addLine(`Photon emission configured to: ${args[1]}`);
                } else {
                    addLine('Usage: theme [name] or theme --dark', 'error');
                }
                break;
            case 'yield':
                if (args[1]) {
                    const min = parseInt(args[1], 10);
                    if (!isNaN(min) && min > 0) {
                        window.dispatchEvent(new CustomEvent('terminal-yield', { detail: { minutes: min } }));
                        addLine(`State transition forced: Timer set to ${min} minutes.`);
                    } else {
                        addLine('Error: yield requires a valid positive integer.', 'error');
                    }
                } else {
                    addLine('Usage: yield [min]', 'error');
                }
                break;
            case 'music':
                if (args[1] === 'play') {
                    window.dispatchEvent(new CustomEvent('terminal-music-play'));
                    addLine('Auditory stimulation engaged.');
                } else if (args[1] === 'pause') {
                    window.dispatchEvent(new CustomEvent('terminal-music-pause'));
                    addLine('Auditory stimulation suspended.');
                } else if (args[1] === 'set' && args[2]) {
                    window.dispatchEvent(new CustomEvent('terminal-music-set', { detail: { id: args[2] } }));
                    addLine(`Frequency calibrated to: ${args[2]}`);
                } else {
                    addLine('Usage: music [play|pause|set <id>]', 'error');
                }
                break;
            case 'play':
                window.dispatchEvent(new CustomEvent('terminal-play'));
                addLine('Temporal flow resumed.');
                break;
            case 'pause':
                window.dispatchEvent(new CustomEvent('terminal-pause'));
                addLine('Temporal flow halted.');
                break;
            case 'skip':
                window.dispatchEvent(new CustomEvent('terminal-skip'));
                addLine('Temporal sequence advanced.');
                break;
            default:
                addLine(`bash: ${baseCmd}: command not found`, 'error');
                break;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            processCommand(input);
            setInput('');
        } else if (e.key === 'c' && e.ctrlKey) {
            // Simulate Ctrl+C
            addLine(`guest@pomodoro:~$ ${input}^C`, 'input');
            setInput('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 pointer-events-auto">
            {/* Click-away backdrop (invisible but catches clicks if not maximized) */}
            {!isMaximized && (
                <div className="absolute inset-0" onClick={handleContainerClick} />
            )}

            <div
                className={`relative flex flex-col font-mono text-sm sm:text-base bg-[#1e1e1e] border border-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 ${isMaximized ? 'w-full h-full rounded-none' : 'w-full max-w-4xl h-[70vh] rounded-lg'
                    }`}
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* XFCE Title Bar */}
                <div className="bg-[#2d2f3b] text-gray-300 px-3 py-2 flex justify-between items-center select-none shrink-0 border-b border-gray-900 shadow-sm cursor-default">
                    <div className="flex space-x-2">
                        <button
                            onClick={onClose}
                            className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 focus:outline-none flex items-center justify-center group"
                            title="Close"
                        />
                        <button
                            onClick={onClose}
                            className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 focus:outline-none flex items-center justify-center group"
                            title="Minimize"
                        />
                        <button
                            onClick={() => setIsMaximized(!isMaximized)}
                            className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-400 focus:outline-none flex items-center justify-center group"
                            title="Maximize"
                        />
                    </div>
                    <div className="flex-1 text-center font-sans text-xs font-semibold text-gray-400 tracking-wider">
                        Terminal
                    </div>
                    {/* Placeholder to balance the flex container so title is centered */}
                    <div className="w-[50px]"></div>
                </div>

                {/* Terminal Content Area */}
                <div
                    className="flex-1 overflow-y-auto p-4 sm:p-6 text-green-400 custom-scrollbar"
                    onClick={handleContainerClick}
                >
                    {lines.map((line, idx) => (
                        <div
                            key={idx}
                            className={`mb-1 whitespace-pre-wrap ${line.type === 'error' ? 'text-red-500' :
                                line.type === 'system' ? 'text-yellow-400 opacity-80' :
                                    line.type === 'input' ? 'text-gray-300 font-bold' :
                                        line.type === 'art' ? 'text-orange-300 whitespace-pre' :
                                            line.type === 'link' ? 'text-blue-400 hover:underline cursor-pointer' : ''
                                }`}
                            onClick={line.type === 'link' ? () => window.open(line.text.split(' ')[1], '_blank') : undefined}
                        >
                            {line.text}
                        </div>
                    ))}

                    <div className="flex select-text items-center">
                        <span className="text-gray-300 font-bold mr-2">guest@pomodoro:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent outline-none flex-1 text-green-400 caret-green-400"
                            spellCheck={false}
                            autoCapitalize="off"
                            autoComplete="off"
                        />
                    </div>
                    {/* Invisible element to scroll to */}
                    <div ref={bottomRef} className="h-4" />
                </div>
            </div>
        </div>
    );
}
