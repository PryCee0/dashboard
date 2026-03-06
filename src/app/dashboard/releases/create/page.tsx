'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Upload, Disc3, Music2, ListMusic, Image, FileText,
    Check, ChevronDown, ChevronRight, Plus, Trash2, AlertTriangle,
    Save, Send, X, Sparkles, Search, Calendar, Globe, Tag, Building2,
    Copyright as CopyrightIcon, ToggleLeft, ToggleRight, Info
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { allDSPStores } from '@/lib/mock-data';

type ReleaseType = 'single' | 'ep' | 'album' | 'compilation';
type WizardStep = 'basic' | 'artwork' | 'release-info' | 'tracks';

const steps: { id: WizardStep; label: string; icon: React.ReactNode }[] = [
    { id: 'basic', label: 'Basic Information', icon: <FileText className="w-4 h-4" /> },
    { id: 'artwork', label: 'Artwork', icon: <Image className="w-4 h-4" /> },
    { id: 'release-info', label: 'Release Information', icon: <Disc3 className="w-4 h-4" /> },
    { id: 'tracks', label: 'Manage Tracks', icon: <ListMusic className="w-4 h-4" /> },
];

const releaseTypes: { id: ReleaseType; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'single', label: 'Single', desc: '1-3 tracks', icon: <Music2 className="w-8 h-8" /> },
    { id: 'ep', label: 'EP', desc: '4-6 tracks', icon: <Disc3 className="w-8 h-8" /> },
    { id: 'album', label: 'Album', desc: '7+ tracks', icon: <ListMusic className="w-8 h-8" /> },
    { id: 'compilation', label: 'Compilation', desc: 'Various artists', icon: <ListMusic className="w-8 h-8" /> },
];

function AccordionSection({ title, defaultOpen = false, children, icon }: { title: string; defaultOpen?: boolean; children: React.ReactNode; icon?: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-[#F5F0EB]/[0.06]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F5F0EB]/[0.02] transition-colors"
            >
                <div className="flex items-center gap-2">
                    {icon && <span className="text-[#F5F0EB]/20">{icon}</span>}
                    <span className="text-sm font-semibold text-[#F5F0EB]/70">{title}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#F5F0EB]/30 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="px-4 pb-4 border-t border-[#F5F0EB]/[0.04]">
                    {children}
                </div>
            )}
        </div>
    );
}

export default function CreateReleasePage() {
    const [currentStep, setCurrentStep] = useState<WizardStep>('basic');
    const [releaseType, setReleaseType] = useState<ReleaseType | null>(null);
    const [releaseTitle, setReleaseTitle] = useState('');
    const [versionLine, setVersionLine] = useState('');
    const [primaryArtist, setPrimaryArtist] = useState('');
    const [showArtistSearch, setShowArtistSearch] = useState(false);
    const [artistSearch, setArtistSearch] = useState('');

    // Release info state
    const [releaseDate, setReleaseDate] = useState('');
    const [primaryGenre, setPrimaryGenre] = useState('');
    const [secondaryGenre, setSecondaryGenre] = useState('');
    const [language, setLanguage] = useState('');
    const [noLyrics, setNoLyrics] = useState(false);
    const [labelName, setLabelName] = useState('');
    const [copyrightYear, setCopyrightYear] = useState('2026');
    const [copyrightCLine, setCopyrightCLine] = useState('');
    const [copyrightPLine, setCopyrightPLine] = useState('');
    const [manualStores, setManualStores] = useState(false);
    const [selectedStores, setSelectedStores] = useState<string[]>(allDSPStores);
    const [licensingType, setLicensingType] = useState('copyright');
    const [hasUPC, setHasUPC] = useState(false);
    const [upcCode, setUpcCode] = useState('');

    // Track state
    const [uploadedTracks, setUploadedTracks] = useState<{ id: string; name: string; size: string }[]>([]);
    const [issues, setIssues] = useState<string[]>([]);

    const currentStepIndex = steps.findIndex(s => s.id === currentStep);

    const goToStep = (step: WizardStep) => {
        setCurrentStep(step);
    };

    const nextStep = () => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < steps.length) {
            setCurrentStep(steps[nextIndex].id);
        }
    };

    const prevStep = () => {
        const prevIndex = currentStepIndex - 1;
        if (prevIndex >= 0) {
            setCurrentStep(steps[prevIndex].id);
        }
    };

    const toggleStore = (store: string) => {
        setSelectedStores(prev =>
            prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
        );
    };

    // Mock artists for search
    const mockArtists = [
        { id: 'a1', name: 'ARDA', image: '' },
        { id: 'a2', name: 'Eclipse', image: '' },
        { id: 'a3', name: 'Luna Arc', image: '' },
        { id: 'a4', name: 'Pulse Theory', image: '' },
    ];

    const filteredArtists = artistSearch
        ? mockArtists.filter(a => a.name.toLowerCase().includes(artistSearch.toLowerCase()))
        : mockArtists;

    return (
        <div className="min-h-[80vh]">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
                <Link href="/dashboard/releases" className="flex items-center gap-2 text-sm text-[#F5F0EB]/40 hover:text-[#F5F0EB]/70 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Releases
                </Link>
                <h1 className="text-xl font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase text-[#F5F0EB]">
                    Create Release
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left sidebar — Step navigation */}
                <div className="lg:w-56 shrink-0">
                    <nav className="space-y-1">
                        {steps.map((step, index) => {
                            const isActive = step.id === currentStep;
                            const isCompleted = index < currentStepIndex;

                            return (
                                <button
                                    key={step.id}
                                    onClick={() => goToStep(step.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all ${isActive
                                        ? 'bg-[#E41E2B]/10 border border-[#E41E2B]/30 text-[#F5F0EB]'
                                        : isCompleted
                                            ? 'bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] text-[#F5F0EB]/60'
                                            : 'border border-transparent text-[#F5F0EB]/30 hover:text-[#F5F0EB]/50'
                                        }`}
                                >
                                    <span className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${isCompleted
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : isActive
                                            ? 'bg-[#E41E2B]/20 text-[#E41E2B]'
                                            : 'bg-[#F5F0EB]/[0.04] text-[#F5F0EB]/20'
                                        }`}>
                                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : index + 1}
                                    </span>
                                    <span className="truncate">{step.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Issues section */}
                    {issues.length > 0 && (
                        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-2">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                Resolve Issues ({issues.length})
                            </div>
                            {issues.map((issue, i) => (
                                <p key={i} className="text-[10px] text-amber-400/60 mt-1">{issue}</p>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main content area */}
                <div className="flex-1 min-w-0">
                    {/* Step 1: Basic Information */}
                    {currentStep === 'basic' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-[#F5F0EB] mb-1">Release Type</h2>
                                <p className="text-xs text-[#F5F0EB]/30 mb-4">Choose the type of release you want to create.</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {releaseTypes.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setReleaseType(type.id)}
                                            className={`flex flex-col items-center gap-3 p-5 border transition-all ${releaseType === type.id
                                                ? 'bg-[#E41E2B]/10 border-[#E41E2B]/40 text-[#F5F0EB]'
                                                : 'bg-[#F5F0EB]/[0.03] border-[#F5F0EB]/[0.06] text-[#F5F0EB]/40 hover:border-[#F5F0EB]/15'
                                                }`}
                                        >
                                            <div className={releaseType === type.id ? 'text-[#E41E2B]' : ''}>
                                                {type.icon}
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-semibold">{type.label}</p>
                                                <p className="text-[10px] text-[#F5F0EB]/20 mt-0.5">{type.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Release Title */}
                            <div>
                                <label className="block text-xs font-semibold text-[#F5F0EB]/40 uppercase tracking-wider mb-2">Release Title *</label>
                                <input
                                    type="text"
                                    value={releaseTitle}
                                    onChange={(e) => setReleaseTitle(e.target.value)}
                                    placeholder="Enter release title..."
                                    className="w-full px-4 py-3 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/15 focus:outline-none focus:border-[#E41E2B]/40 transition-colors"
                                />
                            </div>

                            {/* Version Line */}
                            <div>
                                <label className="block text-xs font-semibold text-[#F5F0EB]/40 uppercase tracking-wider mb-2">
                                    Version Line <span className="text-[#F5F0EB]/15">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={versionLine}
                                    onChange={(e) => setVersionLine(e.target.value)}
                                    placeholder="e.g., Deluxe Edition, Remix, Acoustic..."
                                    className="w-full px-4 py-3 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/15 focus:outline-none focus:border-[#E41E2B]/40 transition-colors"
                                />
                            </div>

                            {/* Primary Artist */}
                            <div>
                                <label className="block text-xs font-semibold text-[#F5F0EB]/40 uppercase tracking-wider mb-2">Primary Artist *</label>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowArtistSearch(!showArtistSearch)}
                                        className="w-full flex items-center justify-between px-4 py-3 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm transition-colors hover:border-[#F5F0EB]/15"
                                    >
                                        <span className={primaryArtist ? 'text-[#F5F0EB]' : 'text-[#F5F0EB]/15'}>
                                            {primaryArtist || 'Select an artist...'}
                                        </span>
                                        <ChevronDown className="w-4 h-4 text-[#F5F0EB]/20" />
                                    </button>

                                    {showArtistSearch && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowArtistSearch(false)} />
                                            <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-[#1a1a1a] border border-[#F5F0EB]/10 shadow-xl">
                                                <div className="p-3 border-b border-[#F5F0EB]/[0.06]">
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F5F0EB]/20" />
                                                        <input
                                                            type="text"
                                                            placeholder="Search Artists..."
                                                            value={artistSearch}
                                                            onChange={(e) => setArtistSearch(e.target.value)}
                                                            className="w-full pl-9 pr-4 py-2 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] text-xs text-[#F5F0EB] placeholder:text-[#F5F0EB]/15 focus:outline-none"
                                                            autoFocus
                                                        />
                                                    </div>
                                                </div>
                                                <div className="max-h-48 overflow-y-auto">
                                                    {filteredArtists.map(artist => (
                                                        <button
                                                            key={artist.id}
                                                            onClick={() => {
                                                                setPrimaryArtist(artist.name);
                                                                setShowArtistSearch(false);
                                                                setArtistSearch('');
                                                            }}
                                                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F5F0EB]/5 transition-colors"
                                                        >
                                                            <div className="w-7 h-7 bg-[#E41E2B]/20 flex items-center justify-center text-[10px] font-bold text-[#E41E2B]">
                                                                {artist.name.charAt(0)}
                                                            </div>
                                                            <span className="text-sm text-[#F5F0EB]/60">{artist.name}</span>
                                                            {primaryArtist === artist.name && (
                                                                <Check className="w-3.5 h-3.5 text-emerald-400 ml-auto" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="p-3 border-t border-[#F5F0EB]/[0.06]">
                                                    <button className="flex items-center gap-2 text-xs text-[#E41E2B]/60 hover:text-[#E41E2B] transition-colors">
                                                        <Plus className="w-3.5 h-3.5" /> Create new artist
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Artwork */}
                    {currentStep === 'artwork' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-[#F5F0EB] mb-1">Artwork</h2>
                                <p className="text-xs text-[#F5F0EB]/30 mb-4">Upload or generate your release artwork.</p>
                            </div>

                            {/* Upload area */}
                            <div className="border-2 border-dashed border-[#F5F0EB]/[0.08] hover:border-[#E41E2B]/30 transition-colors p-12 text-center cursor-pointer">
                                <Upload className="w-12 h-12 text-[#F5F0EB]/15 mx-auto mb-4" />
                                <p className="text-sm text-[#F5F0EB]/40 mb-1">Drag and drop artwork here</p>
                                <p className="text-xs text-[#F5F0EB]/20">or click to browse files</p>
                                <p className="text-[10px] text-[#F5F0EB]/15 mt-3">JPG, PNG • 3000×3000 to 5000×5000 • Max 36MB</p>
                            </div>

                            {/* AI generation options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button className="flex items-center gap-3 p-4 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] hover:border-[#E41E2B]/20 transition-colors text-left">
                                    <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <Sparkles className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#F5F0EB]/70">Customize with Google Gemini</p>
                                        <p className="text-[10px] text-[#F5F0EB]/25 mt-0.5">AI-powered artwork customization</p>
                                    </div>
                                    <span className="ml-auto px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] font-bold">Generate</span>
                                </button>

                                <button className="flex items-center gap-3 p-4 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] hover:border-[#E41E2B]/20 transition-colors text-left">
                                    <div className="w-10 h-10 bg-emerald-500/10 flex items-center justify-center shrink-0">
                                        <Sparkles className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#F5F0EB]/70">Generate with OpenAI DALL·E</p>
                                        <p className="text-[10px] text-[#F5F0EB]/25 mt-0.5">Create artwork from text description</p>
                                    </div>
                                    <span className="ml-auto px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold">Generate</span>
                                </button>
                            </div>

                            {/* Apple Motion */}
                            <button className="w-full flex items-center gap-3 p-4 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] hover:border-[#F5F0EB]/15 transition-colors text-left">
                                <div className="w-10 h-10 bg-purple-500/10 flex items-center justify-center shrink-0">
                                    <Image className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#F5F0EB]/70">Add Apple Motion Artwork</p>
                                    <p className="text-[10px] text-[#F5F0EB]/25 mt-0.5">Animated artwork for Apple Music</p>
                                </div>
                            </button>

                            {/* Guidelines */}
                            <div className="bg-[#F5F0EB]/[0.02] border border-[#F5F0EB]/[0.04] p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Info className="w-3.5 h-3.5 text-[#F5F0EB]/20" />
                                    <h4 className="text-xs font-semibold text-[#F5F0EB]/30 uppercase tracking-wider">Artwork Guidelines</h4>
                                </div>
                                <ul className="space-y-1">
                                    {[
                                        'Image must be between 3000×3000 and 5000×5000 pixels',
                                        'Must be a perfect square (1:1 ratio)',
                                        'Maximum file size: 36MB',
                                        'Color mode: RGB',
                                        'No blurry images or uneven borders',
                                        'Will undergo manual review before approval',
                                    ].map((rule, i) => (
                                        <li key={i} className="text-[10px] text-[#F5F0EB]/20 flex items-center gap-2">
                                            <span className="w-1 h-1 bg-[#F5F0EB]/10 rounded-full" />
                                            {rule}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Release Information */}
                    {currentStep === 'release-info' && (
                        <div className="space-y-3">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold text-[#F5F0EB] mb-1">Release Information</h2>
                                <p className="text-xs text-[#F5F0EB]/30">Fill in the details for your release.</p>
                            </div>

                            {/* Release Date */}
                            <AccordionSection title="Release Date" defaultOpen={true} icon={<Calendar className="w-3.5 h-3.5" />}>
                                <div className="pt-3 space-y-3">
                                    <div>
                                        <label className="block text-[10px] text-[#F5F0EB]/25 uppercase tracking-wider mb-1.5">Release Date</label>
                                        <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}
                                            className="w-full px-3 py-2.5 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40 transition-colors" />
                                    </div>
                                </div>
                            </AccordionSection>

                            {/* Genre */}
                            <AccordionSection title="Genre" icon={<Tag className="w-3.5 h-3.5" />}>
                                <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] text-[#F5F0EB]/25 uppercase tracking-wider mb-1.5">Primary Genre *</label>
                                        <select value={primaryGenre} onChange={(e) => setPrimaryGenre(e.target.value)}
                                            className="w-full px-3 py-2.5 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40 transition-colors appearance-none cursor-pointer">
                                            <option value="">Select genre...</option>
                                            {['Alternative', 'Blues', 'Classical', 'Country', 'Dance', 'Electronic', 'Hip-Hop/Rap', 'Indie', 'Jazz', 'K-Pop', 'Latin', 'Metal', 'Pop', 'R&B/Soul', 'Reggae', 'Rock', 'Singer/Songwriter', 'Soundtrack', 'World'].map(g => (
                                                <option key={g} value={g}>{g}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-[#F5F0EB]/25 uppercase tracking-wider mb-1.5">Secondary Genre</label>
                                        <select value={secondaryGenre} onChange={(e) => setSecondaryGenre(e.target.value)}
                                            className="w-full px-3 py-2.5 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40 transition-colors appearance-none cursor-pointer">
                                            <option value="">Select genre (optional)...</option>
                                            {['Alternative', 'Blues', 'Classical', 'Country', 'Dance', 'Electronic', 'Hip-Hop/Rap', 'Indie', 'Jazz', 'K-Pop', 'Latin', 'Metal', 'Pop', 'R&B/Soul', 'Reggae', 'Rock', 'Singer/Songwriter', 'Soundtrack', 'World'].map(g => (
                                                <option key={g} value={g}>{g}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </AccordionSection>

                            {/* Language */}
                            <AccordionSection title="Language" icon={<Globe className="w-3.5 h-3.5" />}>
                                <div className="pt-3 space-y-3">
                                    <select value={language} onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40 transition-colors appearance-none cursor-pointer">
                                        <option value="">Select language...</option>
                                        {['Turkish', 'English', 'Spanish', 'French', 'German', 'Portuguese', 'Japanese', 'Korean', 'Chinese', 'Arabic', 'Hindi', 'Russian', 'Italian'].map(l => (
                                            <option key={l} value={l}>{l}</option>
                                        ))}
                                    </select>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={noLyrics} onChange={(e) => setNoLyrics(e.target.checked)}
                                            className="w-4 h-4 accent-[#E41E2B]" />
                                        <span className="text-xs text-[#F5F0EB]/40">No lyrics / Instrumental</span>
                                    </label>
                                </div>
                            </AccordionSection>

                            {/* Label */}
                            <AccordionSection title="Label" icon={<Building2 className="w-3.5 h-3.5" />}>
                                <div className="pt-3">
                                    <input type="text" value={labelName} onChange={(e) => setLabelName(e.target.value)} placeholder="Record Label Name"
                                        className="w-full px-3 py-2.5 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/15 focus:outline-none focus:border-[#E41E2B]/40 transition-colors" />
                                </div>
                            </AccordionSection>

                            {/* Copyright */}
                            <AccordionSection title="Copyright Line" icon={<CopyrightIcon className="w-3.5 h-3.5" />}>
                                <div className="pt-3 space-y-3">
                                    <div className="grid grid-cols-[80px_1fr] gap-2">
                                        <div>
                                            <label className="block text-[10px] text-[#F5F0EB]/20 mb-1">Year</label>
                                            <input type="text" value={copyrightYear} onChange={(e) => setCopyrightYear(e.target.value)}
                                                className="w-full px-2 py-2 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none text-center" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-[#F5F0EB]/20 mb-1">© C-Line</label>
                                            <input type="text" value={copyrightCLine} onChange={(e) => setCopyrightCLine(e.target.value)} placeholder="Copyright holder name"
                                                className="w-full px-3 py-2 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/15 focus:outline-none" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-[80px_1fr] gap-2">
                                        <div>
                                            <label className="block text-[10px] text-[#F5F0EB]/20 mb-1">Year</label>
                                            <input type="text" value={copyrightYear} readOnly
                                                className="w-full px-2 py-2 bg-[#F5F0EB]/[0.02] border border-[#F5F0EB]/[0.06] text-sm text-[#F5F0EB]/30 text-center" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-[#F5F0EB]/20 mb-1">℗ P-Line</label>
                                            <input type="text" value={copyrightPLine} onChange={(e) => setCopyrightPLine(e.target.value)} placeholder="Sound recording holder name"
                                                className="w-full px-3 py-2 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/15 focus:outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </AccordionSection>

                            {/* Stores & Services */}
                            <AccordionSection title="Stores & Services" icon={<Globe className="w-3.5 h-3.5" />}>
                                <div className="pt-3 space-y-3">
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-xs text-[#F5F0EB]/40">Manually select stores</span>
                                        <button onClick={() => setManualStores(!manualStores)}
                                            className={`w-10 h-5 rounded-full relative transition-colors ${manualStores ? 'bg-[#E41E2B]' : 'bg-[#F5F0EB]/10'}`}>
                                            <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${manualStores ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`} />
                                        </button>
                                    </label>
                                    {manualStores && (
                                        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 bg-[#F5F0EB]/[0.02] border border-[#F5F0EB]/[0.04]">
                                            {allDSPStores.map(store => (
                                                <button
                                                    key={store}
                                                    onClick={() => toggleStore(store)}
                                                    className={`px-2.5 py-1 text-[10px] font-medium border transition-colors ${selectedStores.includes(store)
                                                        ? 'bg-[#E41E2B]/10 border-[#E41E2B]/30 text-[#E41E2B]'
                                                        : 'bg-[#F5F0EB]/[0.03] border-[#F5F0EB]/[0.06] text-[#F5F0EB]/25 hover:text-[#F5F0EB]/40'
                                                        }`}
                                                >
                                                    {store}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {!manualStores && (
                                        <p className="text-[10px] text-[#F5F0EB]/20">All {allDSPStores.length} stores selected. Toggle to customize.</p>
                                    )}
                                </div>
                            </AccordionSection>

                            {/* Optional Info */}
                            <AccordionSection title="Optional Information" icon={<Info className="w-3.5 h-3.5" />}>
                                <div className="pt-3 space-y-3">
                                    <div>
                                        <label className="block text-[10px] text-[#F5F0EB]/25 uppercase tracking-wider mb-1.5">Licensing Type</label>
                                        <select value={licensingType} onChange={(e) => setLicensingType(e.target.value)}
                                            className="w-full px-3 py-2.5 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none appearance-none cursor-pointer">
                                            <option value="copyright">Copyright</option>
                                            <option value="creative-commons">Creative Commons</option>
                                        </select>
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={hasUPC} onChange={(e) => setHasUPC(e.target.checked)} className="w-4 h-4 accent-[#E41E2B]" />
                                        <span className="text-xs text-[#F5F0EB]/40">I already have a UPC code</span>
                                    </label>
                                    {hasUPC && (
                                        <input type="text" value={upcCode} onChange={(e) => setUpcCode(e.target.value)} placeholder="Enter UPC code..."
                                            className="w-full px-3 py-2.5 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/15 focus:outline-none focus:border-[#E41E2B]/40 transition-colors" />
                                    )}
                                </div>
                            </AccordionSection>
                        </div>
                    )}

                    {/* Step 4: Manage Tracks */}
                    {currentStep === 'tracks' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-[#F5F0EB] mb-1">Manage Tracks</h2>
                                <p className="text-xs text-[#F5F0EB]/30 mb-4">Upload your tracks or select from existing ones.</p>
                            </div>

                            {/* Upload / Select cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-[#F5F0EB]/[0.08] hover:border-[#E41E2B]/30 transition-colors">
                                    <Upload className="w-10 h-10 text-[#F5F0EB]/15" />
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-[#F5F0EB]/60">Upload tracks</p>
                                        <p className="text-[10px] text-[#F5F0EB]/20 mt-1">Drop files here or browse</p>
                                        <p className="text-[9px] text-[#F5F0EB]/10 mt-2">MP3, WAV, M4A, AIFF, FLAC</p>
                                    </div>
                                </button>

                                <button className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-[#F5F0EB]/[0.08] hover:border-[#E41E2B]/30 transition-colors">
                                    <ListMusic className="w-10 h-10 text-[#F5F0EB]/15" />
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-[#F5F0EB]/60">Select existing</p>
                                        <p className="text-[10px] text-[#F5F0EB]/20 mt-1">Choose from previously uploaded tracks</p>
                                    </div>
                                </button>
                            </div>

                            {/* Uploaded tracks */}
                            {uploadedTracks.length > 0 ? (
                                <div className="border border-[#F5F0EB]/[0.06]">
                                    {uploadedTracks.map((track, i) => (
                                        <div key={track.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F0EB]/[0.02] border-b border-[#F5F0EB]/[0.04] last:border-0">
                                            <span className="w-7 h-7 bg-[#E41E2B]/10 flex items-center justify-center text-xs font-bold text-[#E41E2B]">{i + 1}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-[#F5F0EB]/70 truncate">{track.name}</p>
                                                <p className="text-[10px] text-[#F5F0EB]/20">{track.size}</p>
                                            </div>
                                            <button className="text-[#F5F0EB]/20 hover:text-red-400 transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <ListMusic className="w-12 h-12 text-[#F5F0EB]/10 mx-auto mb-3" />
                                    <p className="text-sm text-[#F5F0EB]/30">Your tracks will appear here</p>
                                    <p className="text-xs text-[#F5F0EB]/15 mt-1">Edit info + re-arrange order</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right sidebar — contextual help */}
                <div className="lg:w-56 shrink-0 hidden lg:block">
                    <div className="bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] p-4 sticky top-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F5F0EB]/25 mb-3">
                            {currentStep === 'basic' ? 'Getting Started' : currentStep === 'artwork' ? 'Artwork Tips' : currentStep === 'release-info' ? 'Release Details' : 'Track Management'}
                        </h3>
                        {currentStep === 'basic' && (
                            <ul className="space-y-2 text-[10px] text-[#F5F0EB]/20">
                                <li>• Choose the correct release type based on track count</li>
                                <li>• Release title should match your artwork</li>
                                <li>• Select your primary artist from the dropdown</li>
                            </ul>
                        )}
                        {currentStep === 'artwork' && (
                            <ul className="space-y-2 text-[10px] text-[#F5F0EB]/20">
                                <li>• Upload a high-quality square image</li>
                                <li>• Avoid text that might be cut off</li>
                                <li>• AI tools can help generate unique artwork</li>
                            </ul>
                        )}
                        {currentStep === 'release-info' && (
                            <ul className="space-y-2 text-[10px] text-[#F5F0EB]/20">
                                <li>• Set release date at least 7 days ahead</li>
                                <li>• Copyright lines are required for distribution</li>
                                <li>• Default: all stores selected</li>
                            </ul>
                        )}
                        {currentStep === 'tracks' && (
                            <ul className="space-y-2 text-[10px] text-[#F5F0EB]/20">
                                <li>• WAV format recommended for best quality</li>
                                <li>• You can re-arrange track order</li>
                                <li>• Each track needs ISRC (auto-generated if blank)</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom action bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#0d0d0d]/95 backdrop-blur border-t border-[#F5F0EB]/[0.06] px-6 py-3 flex items-center justify-between z-30">
                <div className="flex items-center gap-3">
                    {currentStepIndex > 0 && (
                        <Button variant="secondary" size="sm" onClick={prevStep}>
                            Back
                        </Button>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                        Save Changes
                    </Button>
                    {currentStepIndex < steps.length - 1 ? (
                        <Button size="sm" onClick={nextStep} icon={<ChevronRight className="w-3.5 h-3.5" />}>
                            Continue
                        </Button>
                    ) : (
                        <Button size="sm" icon={<Send className="w-3.5 h-3.5" />}>
                            Publish
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
