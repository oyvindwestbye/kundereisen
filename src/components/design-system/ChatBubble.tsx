import React from 'react';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'other';
  senderName?: string;
  timestamp?: string;
  avatar?: string;
}

export function ChatBubble({ message, sender, senderName, timestamp, avatar }: ChatBubbleProps) {
  const isUser = sender === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {avatar && (
        <div className="flex-shrink-0 w-8 h-8 bg-[#a6c8ff] rounded-full flex items-center justify-center overflow-hidden">
          {avatar.startsWith('http') ? (
            <img src={avatar} alt={senderName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#016cb7]">{avatar}</span>
          )}
        </div>
      )}
      
      <div className={`flex flex-col gap-1 max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        {senderName && (
          <span className="text-xs text-[#697077] px-2">{senderName}</span>
        )}
        <div
          className={`px-4 py-2.5 rounded-lg ${
            isUser
              ? 'bg-[#016cb7] text-white rounded-tr-none'
              : 'bg-[#f4f4f4] text-[#21272a] rounded-tl-none'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
        </div>
        {timestamp && (
          <span className="text-xs text-[#697077] px-2">{timestamp}</span>
        )}
      </div>
    </div>
  );
}
