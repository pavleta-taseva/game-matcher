import React, { useState } from 'react';

interface RightPanelProps {
    effect?: boolean;
    display?: string;
}

const categories: string[] = [
    'Action', 'Adventure', 'Role-playing', 'Simulation', 'Strategy', 'Sports', 'Puzzle'
];

const RightPanel = ({ effect, display }: RightPanelProps) => {
    return (
        <div className={`${effect && 'animate-ease-slow-in'} ${display} flex flex-col w-full`}>
            <h2 className="text-lg font-semibold mb-2">Results</h2>
        </div>
    )
}

export default RightPanel;