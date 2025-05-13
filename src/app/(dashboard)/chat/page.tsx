import { auth } from '@clerk/nextjs/server';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ChatInput } from '@/components/chat/ChatInput';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const initialHistory = [
  { role: 'user', content: 'こんにちは！' },
  { role: 'assistant', content: 'こんにちは。ご用件をどうぞ。' },
  { role: 'user', content: 'AIチャットボットのMVPを作りたいです。' },
  { role: 'assistant', content: '承知しました。どんな機能が必要ですか？' },
];

const ChatClient = dynamic<any>(
  () => import('../../../components/chat/ChatClient'),
  {
    ssr: false,
  }
);

export default async function ChatPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        認証が必要です
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mb-4 flex justify-start">
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: 'outline' })}
          aria-label="ダッシュボードへ戻る"
        >
          ダッシュボードへ戻る
        </Link>
      </div>
      <ChatClient initialHistory={initialHistory} />
    </div>
  );
}
