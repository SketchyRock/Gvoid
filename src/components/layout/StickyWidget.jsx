import React, { forwardRef } from 'react';

const StickyWidget = forwardRef(({ id, children, className, style, onMouseDown, onMouseUp, onTouchStart, onTouchEnd, ...props }, ref) => {
    // react-grid-layout passes style, className, and drag handlers down.
    // We must apply them to the root DOM element.
    return (
        <div
            ref={ref}
            className={`relative group w-full h-full flex flex-col justify-start rounded-2xl transition-shadow hover:shadow-2xl ${className || ''}`}
            style={{ ...style, touchAction: 'none' }} // prevent scrolling while dragging on touch devices
            {...props}
        >
            {/* Drag Handle - react-grid-layout uses a specific class if configured,
                or the whole block can be draggable. We'll make the whole block draggable
                but add a visual indicator. */}
            <div
                className="drag-handle absolute -top-2 -left-2 z-50 p-1.5 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg hover:bg-gray-800 bg-gray-900 border border-gray-700 shadow-md"
                title="Drag to move"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6C6 4.89543 6.89543 4 8 4C9.10457 4 10 4.89543 10 6ZM10 12C10 13.1046 9.10457 14 8 14C6.89543 14 6 13.1046 6 12C6 10.8954 6.89543 10 8 10C9.10457 10 10 10.8954 10 12ZM8 20C9.10457 20 10 19.1046 10 18C10 16.8954 9.10457 16 8 16C6.89543 16 6 16.8954 6 18C6 19.1046 6.89543 20 8 20ZM16 8C17.1046 8 18 7.10457 18 6C18 4.89543 17.1046 4 16 4C14.8954 4 14 4.89543 14 6C14 7.10457 14.8954 8 16 8ZM18 12C18 13.1046 17.1046 14 16 14C14.8954 14 14 13.1046 14 12C14 10.8954 14.8954 10 16 10C17.1046 10 18 10.8954 18 12ZM16 20C17.1046 20 18 19.1046 18 18C18 16.8954 17.1046 16 16 16C14.8954 16 14 16.8954 14 18C14 19.1046 14.8954 20 16 20Z" fill="currentColor" />
                </svg>
            </div>
            {children}

            {/* Visual pin/tape for sticky note effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-yellow-600/20 rounded shadow-sm z-50 pointer-events-none transform -rotate-2 backdrop-blur-sm border border-yellow-500/10"></div>
        </div>
    );
});

StickyWidget.displayName = 'StickyWidget';
export default StickyWidget;
