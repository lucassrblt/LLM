import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isAi: boolean;
  timestamp: string;
}

export default function ChatMessage({ message, isAi, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
        isAi ? 'bg-purple-100' : 'bg-blue-100'
      }`}>
        {isAi ? (
          <Bot className="h-6 w-6 text-purple-600" />
        ) : (
          <User className="h-6 w-6 text-blue-600" />
        )}
      </div>
      <div className={`flex flex-col max-w-[80%] ${isAi ? 'items-start' : 'items-end'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isAi ? 'bg-purple-50 text-purple-900' : 'bg-blue-50 text-blue-900'
        }`}>
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
      </div>
    </div>
  );
}