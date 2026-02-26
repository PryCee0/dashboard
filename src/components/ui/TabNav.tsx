'use client';

import { useState } from 'react';

export interface Tab {
    id: string;
    label: string;
    count?: number;
}

interface TabNavProps {
    tabs: Tab[];
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
}

export default function TabNav({ tabs, activeTab, onTabChange, className = '' }: TabNavProps) {
    const [internalActive, setInternalActive] = useState(tabs[0]?.id || '');
    const current = activeTab ?? internalActive;

    const handleClick = (tabId: string) => {
        setInternalActive(tabId);
        onTabChange?.(tabId);
    };

    return (
        <div className={`flex items-center gap-0 border-b border-[#F5F0EB]/[0.06] overflow-x-auto scrollbar-hide ${className}`}>
            {tabs.map((tab) => {
                const isActive = current === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => handleClick(tab.id)}
                        className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-150
              ${isActive
                                ? 'text-[#F5F0EB]'
                                : 'text-[#F5F0EB]/40 hover:text-[#F5F0EB]/70'
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 min-w-[20px] text-center
                  ${isActive
                                        ? 'bg-[#E41E2B]/15 text-[#E41E2B]'
                                        : 'bg-[#F5F0EB]/[0.06] text-[#F5F0EB]/30'
                                    }`}
                                >
                                    {tab.count}
                                </span>
                            )}
                        </span>
                        {/* Active indicator */}
                        {isActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E41E2B]" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
