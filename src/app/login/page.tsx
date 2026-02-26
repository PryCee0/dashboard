'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validators';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, EyeOff, ArrowRight, Disc3 } from 'lucide-react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const { t } = useLanguage();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);
        setError('');
        try {
            const success = await login(data.email, data.password);
            if (success) {
                router.push('/dashboard');
            }
        } catch {
            setError(t('loginFailed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060606] relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[140%] bg-[#E41E2B] opacity-[0.04] skew-x-[-12deg]" />
            <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-[#060606] to-transparent z-[1]" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #E41E2B 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

            {/* Language switcher top-right */}
            <div className="absolute top-6 right-6 z-20">
                <LanguageSwitcher />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="flex items-center justify-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-[#E41E2B] flex items-center justify-center">
                        <Disc3 className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-['Bebas_Neue',sans-serif] text-3xl tracking-[4px] uppercase">
                        <span className="text-[#E41E2B]">RED</span>POT
                    </span>
                </div>

                <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#E41E2B]" />

                    <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-[2px] uppercase mb-1">
                        {t('login')}
                    </h2>
                    <p className="text-[#F5F0EB]/50 text-sm mb-8">{t('loginSubtitle')}</p>

                    {error && (
                        <div className="bg-[#E41E2B]/10 border border-[#E41E2B]/30 text-[#FF2D3B] text-sm px-4 py-3 mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-[2px] text-[#F5F0EB]/60 mb-2">
                                {t('email')}
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                className="w-full bg-[#0C0A09] border border-[#F5F0EB]/10 text-[#F5F0EB] px-4 py-3 text-sm
                  focus:border-[#E41E2B]/50 focus:outline-none transition-colors placeholder:text-[#F5F0EB]/20"
                            />
                            {errors.email && (
                                <p className="text-[#FF2D3B] text-xs mt-1.5">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-[2px] text-[#F5F0EB]/60 mb-2">
                                {t('password')}
                            </label>
                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t('passwordPlaceholder')}
                                    className="w-full bg-[#0C0A09] border border-[#F5F0EB]/10 text-[#F5F0EB] px-4 py-3 text-sm pr-12
                    focus:border-[#E41E2B]/50 focus:outline-none transition-colors placeholder:text-[#F5F0EB]/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5F0EB]/30 hover:text-[#F5F0EB]/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-[#FF2D3B] text-xs mt-1.5">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#E41E2B] text-white font-['Bebas_Neue',sans-serif] text-lg tracking-[3px] uppercase
                py-3.5 flex items-center justify-center gap-2
                hover:bg-[#FF2D3B] hover:shadow-[3px_3px_0px_#B8161F] hover:translate-x-[-2px] hover:translate-y-[-2px]
                transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {t('login')}
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#F5F0EB]/40 mt-6">
                        {t('noAccount')}{' '}
                        <Link href="/signup" className="text-[#E41E2B] hover:text-[#FF2D3B] transition-colors font-medium">
                            {t('signup')}
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-[#F5F0EB]/20 mt-8 tracking-[2px] uppercase">
                    {t('copyright')}
                </p>
            </div>
        </div>
    );
}
