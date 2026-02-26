'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
    badge?: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    defaultOpen?: string[];
    allowMultiple?: boolean;
    numbered?: boolean;
}

export default function Accordion({
    items,
    defaultOpen = [],
    allowMultiple = false,
    numbered = false,
}: AccordionProps) {
    const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

    const toggle = (id: string) => {
        setOpenIds((prev) => {
            const next = new Set(allowMultiple ? prev : []);
            if (prev.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className="divide-y divide-[#F5F0EB]/[0.06] border border-[#F5F0EB]/[0.06]">
            {items.map((item, index) => {
                const isOpen = openIds.has(item.id);
                return (
                    <div key={item.id}>
                        {/* Header */}
                        <button
                            onClick={() => toggle(item.id)}
                            className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-[#F5F0EB]/[0.02]
                ${isOpen ? 'bg-[#F5F0EB]/[0.03]' : ''}`}
                        >
                            {numbered && (
                                <span className={`w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0
                  ${isOpen ? 'bg-[#E41E2B] text-white' : 'bg-[#F5F0EB]/[0.06] text-[#F5F0EB]/40'}`}
                                >
                                    {index + 1}
                                </span>
                            )}
                            {item.icon && (
                                <span className="text-[#F5F0EB]/40 shrink-0">{item.icon}</span>
                            )}
                            <span className={`flex-1 text-sm font-medium ${isOpen ? 'text-[#F5F0EB]' : 'text-[#F5F0EB]/60'}`}>
                                {item.label}
                            </span>
                            {item.badge && <span className="mr-2">{item.badge}</span>}
                            <ChevronDown
                                className={`w-4 h-4 text-[#F5F0EB]/25 transition-transform duration-200 shrink-0
                  ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Content */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-5 py-5 bg-[#F5F0EB]/[0.01]">{item.content}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
