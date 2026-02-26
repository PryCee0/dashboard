'use client';

import { useState, useRef } from 'react';
import { Upload, X, File } from 'lucide-react';

interface FileUploadProps {
    accept?: string;
    maxSizeMB?: number;
    multiple?: boolean;
    onFilesSelected?: (files: File[]) => void;
    description?: string;
    recommendation?: string;
}

export default function FileUpload({
    accept,
    maxSizeMB = 36,
    multiple = false,
    onFilesSelected,
    description = 'Dosyaları buraya bırakın veya',
    recommendation,
}: FileUploadProps) {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const dropped = Array.from(e.dataTransfer.files);
        addFiles(dropped);
    };

    const addFiles = (newFiles: File[]) => {
        const valid = newFiles.filter(f => f.size <= maxSizeMB * 1024 * 1024);
        const updated = multiple ? [...files, ...valid] : valid.slice(0, 1);
        setFiles(updated);
        onFilesSelected?.(updated);
    };

    const removeFile = (index: number) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onFilesSelected?.(updated);
    };

    return (
        <div>
            {/* Drop zone */}
            <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative border-2 border-dashed transition-all duration-200 cursor-pointer
          flex flex-col items-center justify-center py-16 px-6
          ${dragActive
                        ? 'border-[#E41E2B]/50 bg-[#E41E2B]/[0.05]'
                        : 'border-[#F5F0EB]/[0.08] hover:border-[#F5F0EB]/[0.15] bg-[#F5F0EB]/[0.02]'
                    }`}
            >
                <Upload className={`w-8 h-8 mb-4 ${dragActive ? 'text-[#E41E2B]' : 'text-[#F5F0EB]/20'}`} />
                <p className="text-sm text-[#F5F0EB]/50 text-center">
                    {description}{' '}
                    <span className="text-[#E41E2B] underline underline-offset-2">dosya seçin</span>
                </p>
                {recommendation && (
                    <p className="text-xs text-[#F5F0EB]/25 mt-2">{recommendation}</p>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => addFiles(Array.from(e.target.files || []))}
                    className="hidden"
                />
            </div>

            {/* File list */}
            {files.length > 0 && (
                <div className="mt-3 space-y-2">
                    {files.map((file, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-3 py-2 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.06]"
                        >
                            <File className="w-4 h-4 text-[#F5F0EB]/30 shrink-0" />
                            <span className="text-sm text-[#F5F0EB]/70 truncate flex-1">{file.name}</span>
                            <span className="text-xs text-[#F5F0EB]/25">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                                className="text-[#F5F0EB]/25 hover:text-[#E41E2B] transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
