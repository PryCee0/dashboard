'use client';

import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    glow?: boolean;
}

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export default function Card({
    children,
    className = '',
    onClick,
    hover = false,
    padding = 'md',
    glow = false,
}: CardProps) {
    const Component = onClick ? 'button' : 'div';

    return (
        <Component
            onClick={onClick}
            className={`
                bg-[#111110] border border-[#F5F0EB]/[0.06]
                ${paddingClasses[padding]}
                stat-card
                ${hover || onClick ? 'transition-all duration-200 hover:border-[#F5F0EB]/[0.14] hover:bg-[#131211]' : ''}
                ${glow ? 'hover-glow-red' : ''}
                ${onClick ? 'cursor-pointer text-left w-full' : ''}
                ${className}
            `}
        >
            {children}
        </Component>
    );
}

/* Sub-components */
export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`mb-4 ${className}`}>{children}</div>
    );
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <h3 className={`text-base font-semibold text-[#F5F0EB] ${className}`}>{children}</h3>
    );
}

export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={`text-sm text-[#F5F0EB]/40 mt-1 ${className}`}>{children}</p>
    );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={className}>{children}</div>
    );
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`mt-4 pt-4 border-t border-[#F5F0EB]/[0.06] ${className}`}>{children}</div>
    );
}
