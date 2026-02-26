'use client';

import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
};

export default function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size = 'md',
}: ModalProps) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`relative w-full ${sizeClasses[size]} bg-[#111110] border border-[#F5F0EB]/[0.08] shadow-2xl
          animate-in fade-in zoom-in-95 duration-200`}
            >
                {/* Header */}
                {(title || description) && (
                    <div className="flex items-start justify-between p-6 border-b border-[#F5F0EB]/[0.06]">
                        <div>
                            {title && (
                                <h2 className="text-lg font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase text-[#F5F0EB]">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="mt-1 text-sm text-[#F5F0EB]/40">{description}</p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="text-[#F5F0EB]/30 hover:text-[#F5F0EB] transition-colors p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F5F0EB]/[0.06]">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
