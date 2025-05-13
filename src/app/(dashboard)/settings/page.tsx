import { auth } from '@clerk/nextjs/server';

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        認証が必要です
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-2xl font-bold mb-4">設定ページ（仮）</h1>
      <p className="text-gray-600 dark:text-gray-300">
        ここにユーザー設定UIが入ります。
      </p>
    </div>
  );
}
