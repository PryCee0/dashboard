'use client';

import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader({ title, description, children, breadcrumbs }: PageHeaderProps) {
    return (
        <div className="mb-8">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-2 mb-4 text-xs text-[#F5F0EB]/30">
                    {breadcrumbs.map((crumb, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <span className="text-[#F5F0EB]/15">/</span>}
                            {crumb.href ? (
                                <a href={crumb.href} className="hover:text-[#F5F0EB]/60 transition-colors">
                                    {crumb.label}
                                </a>
                            ) : (
                                <span className="text-[#F5F0EB]/50">{crumb.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            )}

            {/* Title + Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-['Bebas_Neue',sans-serif] tracking-[3px] uppercase text-[#F5F0EB]">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1 text-sm text-[#F5F0EB]/40">{description}</p>
                    )}
                </div>
                {children && (
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
