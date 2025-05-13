import { auth } from '@clerk/nextjs/server';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const initialHistory: { role: string; content: string }[] = [];

const ChatClient = dynamic<{
  initialHistory: { role: string; content: string }[];
}>(() => import('../../../components/chat/ChatClient'), {
  ssr: false,
});

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
