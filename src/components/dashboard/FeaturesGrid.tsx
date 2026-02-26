'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { mockFeatures } from '@/lib/mock-data';
import { TranslationKey } from '@/lib/translations';
import {
    Target, FileText, CheckCircle, ShieldOff, Shield,
    Music, DollarSign, Link as LinkIcon, PieChart, ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    Target: <Target className="w-6 h-6" />,
    FileText: <FileText className="w-6 h-6" />,
    CheckCircle: <CheckCircle className="w-6 h-6" />,
    ShieldOff: <ShieldOff className="w-6 h-6" />,
    Shield: <Shield className="w-6 h-6" />,
    Music: <Music className="w-6 h-6" />,
    DollarSign: <DollarSign className="w-6 h-6" />,
    Link: <LinkIcon className="w-6 h-6" />,
    PieChart: <PieChart className="w-6 h-6" />,
};

// Map feature titles to translation keys for descriptions
const descriptionKeyMap: Record<string, TranslationKey> = {
    'Priority Pitch': 'featPriorityPitch',
    'Publishing': 'featPublishing',
    'Greenlist': 'featGreenlist',
    'Blocklist': 'featBlocklist',
    'Profile Defender': 'featProfileDefender',
    'Cover Song': 'featCoverSong',
    'Advance Funding': 'featAdvanceFunding',
    'Release Links': 'featReleaseLinks',
    'Royalty Splits': 'featRoyaltySplits',
};

export default function FeaturesGrid() {
    const { t } = useLanguage();

    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <h3 className="font-['Bebas_Neue',sans-serif] text-xl tracking-[2px] uppercase">{t('features')}</h3>
                <div className="h-[2px] flex-1 bg-[#E41E2B]/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockFeatures.map((feature) => (
                    <div key={feature.id}
                        className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden group
              hover:border-[#E41E2B]/20 transition-all duration-300
              hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[4px_4px_0px_#E41E2B] cursor-pointer">
                        <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-300" style={{ background: feature.color }} />
                        <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: feature.color }}>
                            <span className="text-white">{iconMap[feature.icon] || <Target className="w-6 h-6" />}</span>
                        </div>
                        <h4 className="font-['Bebas_Neue',sans-serif] text-base tracking-[2px] uppercase mb-2">{feature.title}</h4>
                        <p className="text-xs text-[#F5F0EB]/40 leading-relaxed mb-4">
                            {descriptionKeyMap[feature.title] ? t(descriptionKeyMap[feature.title]) : feature.description}
                        </p>
                        <button className="text-[10px] font-bold uppercase tracking-[2px] flex items-center gap-1
              group-hover:text-[#E41E2B] transition-colors" style={{ color: feature.color }}>
                            {t('learnMore')}
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
