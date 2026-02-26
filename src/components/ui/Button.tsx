'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-[#E41E2B] text-white hover:bg-[#B8161F] active:bg-[#8F0F17]',
    secondary: 'bg-[#F5F0EB]/[0.08] text-[#F5F0EB] border border-[#F5F0EB]/[0.1] hover:bg-[#F5F0EB]/[0.12]',
    ghost: 'text-[#F5F0EB]/50 hover:text-[#F5F0EB] hover:bg-[#F5F0EB]/[0.06]',
    danger: 'bg-red-600/15 text-red-400 border border-red-500/20 hover:bg-red-600/25',
    outline: 'border border-[#E41E2B]/30 text-[#E41E2B] hover:bg-[#E41E2B]/10',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-sm gap-2.5',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
    loading?: boolean;
    fullWidth?: boolean;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    loading,
    fullWidth,
    children,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center font-semibold uppercase tracking-[1px] transition-all duration-150
        ${variantClasses[variant]} ${sizeClasses[size]}
        ${disabled || loading ? 'opacity-40 cursor-not-allowed' : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : icon ? (
                <span className="shrink-0">{icon}</span>
            ) : null}
            {children}
            {iconRight && <span className="shrink-0">{iconRight}</span>}
        </button>
    );
}
