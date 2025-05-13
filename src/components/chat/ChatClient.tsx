'use client';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ChatInput } from './ChatInput';

interface Message {
  role: string;
  content: string;
}

export default function ChatClient({
  initialHistory,
}: {
  initialHistory: Message[];
}) {
  const [history, setHistory] = useState<Message[]>(initialHistory);

  return (
    <Card
      className="w-full max-w-2xl"
      role="region"
      aria-label="チャットエリア"
    >
      <CardHeader>
        <CardTitle>AIチャット</CardTitle>
      </CardHeader>
      <CardContent
        className="flex flex-col gap-4 max-h-80 overflow-y-auto"
        aria-live="polite"
      >
        {history.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === 'user'
                ? 'self-end bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[80%]'
                : 'self-start bg-muted-foreground/10 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 max-w-[80%]'
            }
            aria-label={msg.role === 'user' ? 'あなた' : 'AI'}
          >
            <span className="block text-xs mb-1 font-semibold">
              {msg.role === 'user' ? 'あなた' : 'AI'}
            </span>
            <span>{msg.content}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <ChatInput
          onResponse={(userMessage: Message, aiMessage: Message) =>
            setHistory((prev) => [...prev, userMessage, aiMessage])
          }
        />
      </CardFooter>
    </Card>
  );
}
