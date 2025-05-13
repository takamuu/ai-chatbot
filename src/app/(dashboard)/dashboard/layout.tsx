import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ReactNode } from 'react';
import { headers } from 'next/headers';

function SidebarNav({ currentPath }: { currentPath: string }) {
  const navItems = [
    { href: '/dashboard', label: 'ダッシュボード' },
    { href: '/chat', label: 'チャット' },
    { href: '/settings', label: '設定' },
  ];
  return (
    <nav
      className="flex gap-2 md:flex-col w-full"
      aria-label="メインナビゲーション"
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            'w-full' +
            (currentPath === item.href
              ? ' bg-primary text-primary-foreground font-bold'
              : ' text-gray-700 dark:text-gray-200') +
            ' rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary'
          }
          aria-current={currentPath === item.href ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // サーバーコンポーネントで現在のパスを取得
  const headersList = headers();
  const currentPath =
    headersList.get('x-invoke-path') || headersList.get('x-pathname') || '';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* サイドバー */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-4 flex md:flex-col items-center md:items-start gap-4">
        <div className="font-bold text-lg">AIチャットSaaS</div>
        <SidebarNav currentPath={currentPath} />
      </aside>
      {/* メインエリア */}
      <main className="flex-1 p-6 flex flex-col gap-6">
        {/* ヘッダー */}
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">ダッシュボード</h1>
          <UserButton afterSignOutUrl="/" />
        </header>
        {children}
      </main>
    </div>
  );
}
