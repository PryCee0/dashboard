'use client';

import { Check } from 'lucide-react';

export interface WizardStep {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface StepWizardProps {
    steps: WizardStep[];
    currentStep: string;
    onStepClick?: (stepId: string) => void;
    orientation?: 'horizontal' | 'vertical';
}

export default function StepWizard({
    steps,
    currentStep,
    onStepClick,
    orientation = 'horizontal',
}: StepWizardProps) {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);

    if (orientation === 'vertical') {
        return (
            <div className="flex flex-col gap-0">
                {steps.map((step, i) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = i < currentIndex;
                    const isClickable = isCompleted || isActive;

                    return (
                        <button
                            key={step.id}
                            onClick={isClickable && onStepClick ? () => onStepClick(step.id) : undefined}
                            disabled={!isClickable}
                            className={`flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 relative
                ${isActive
                                    ? 'bg-[#E41E2B] text-white'
                                    : isCompleted
                                        ? 'text-[#F5F0EB]/60 hover:bg-[#F5F0EB]/[0.04] cursor-pointer'
                                        : 'text-[#F5F0EB]/25 cursor-not-allowed'
                                }`}
                        >
                            {/* Step indicator */}
                            <span className={`w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0 border
                ${isActive
                                    ? 'border-white/30 bg-white/10'
                                    : isCompleted
                                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                        : 'border-[#F5F0EB]/10 bg-[#F5F0EB]/[0.04]'
                                }`}
                            >
                                {isCompleted ? <Check className="w-3.5 h-3.5" /> : i + 1}
                            </span>

                            {/* Label */}
                            <span className="text-sm font-medium truncate">{step.label}</span>
                        </button>
                    );
                })}
            </div>
        );
    }

    // Horizontal
    return (
        <div className="flex items-center gap-0">
            {steps.map((step, i) => {
                const isActive = step.id === currentStep;
                const isCompleted = i < currentIndex;
                const isClickable = isCompleted || isActive;

                return (
                    <div key={step.id} className="flex items-center">
                        <button
                            onClick={isClickable && onStepClick ? () => onStepClick(step.id) : undefined}
                            disabled={!isClickable}
                            className={`flex items-center gap-2.5 px-4 py-2 transition-colors
                ${isActive
                                    ? 'text-[#F5F0EB]'
                                    : isCompleted
                                        ? 'text-emerald-400 cursor-pointer'
                                        : 'text-[#F5F0EB]/25 cursor-not-allowed'
                                }`}
                        >
                            <span className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold border
                ${isActive
                                    ? 'border-[#E41E2B] bg-[#E41E2B]/15 text-[#E41E2B]'
                                    : isCompleted
                                        ? 'border-emerald-500/30 bg-emerald-500/10'
                                        : 'border-[#F5F0EB]/10'
                                }`}
                            >
                                {isCompleted ? <Check className="w-3 h-3" /> : i + 1}
                            </span>
                            <span className="text-sm font-medium whitespace-nowrap">{step.label}</span>
                        </button>

                        {/* Connector line */}
                        {i < steps.length - 1 && (
                            <div className={`w-8 h-[1px] ${isCompleted ? 'bg-emerald-500/30' : 'bg-[#F5F0EB]/[0.08]'}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
