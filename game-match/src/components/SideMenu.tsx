import React from 'react';

interface SideMenuProps {
    effect?: boolean;
    display?: string;
}

const SideMenu = ({ effect, display }: SideMenuProps) => {
    return (
        <div className={`${effect && 'animate-ease-slow-in'} ${display} flex w-1/2`}>SideMenu</div>
    )
}

export default SideMenu;