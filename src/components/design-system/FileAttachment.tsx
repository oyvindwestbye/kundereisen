import React, { useRef } from 'react';
import { Paperclip, X, FileText, Image, File } from 'lucide-react';

interface FileAttachmentProps {
  files?: File[];
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
}

export function FileAttachment({ 
  files = [], 
  onFilesChange, 
  maxFiles = 5,
  accept 
}: FileAttachmentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const combinedFiles = [...files, ...newFiles].slice(0, maxFiles);
    onFilesChange?.(combinedFiles);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  
  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange?.(newFiles);
  };
  
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image size={16} />;
    if (file.type.includes('pdf') || file.type.includes('document')) return <FileText size={16} />;
    return <File size={16} />;
  };
  
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={files.length >= maxFiles}
        className="inline-flex items-center gap-2 px-4 py-2 border border-[#dde1e6] rounded-lg 
          hover:border-[#c0c4cf] hover:bg-[#f4f4f4] transition-all duration-200 bg-white
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Paperclip size={16} />
        <span className="text-sm">
          Last opp fil {files.length > 0 && `(${files.length}/${maxFiles})`}
        </span>
      </button>
      
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        multiple
        accept={accept}
      />
      
      {files.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {files.map((file, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-3 py-2 bg-[#f4f4f4] rounded-lg group"
            >
              <span className="text-[#697077]">{getFileIcon(file)}</span>
              <span className="flex-1 text-sm truncate">{file.name}</span>
              <span className="text-xs text-[#697077]">
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="opacity-0 group-hover:opacity-100 text-[#da1e28] hover:bg-[#ffd7d9] p-1 rounded transition-all"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
