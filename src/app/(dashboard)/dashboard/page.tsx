import { auth } from '@clerk/nextjs/server';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        認証が必要です
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* ユーザー情報（ダミー） */}
      <Card
        className="w-full max-w-3xl mb-8 flex flex-col items-center"
        role="region"
        aria-label="ユーザー情報"
      >
        <CardHeader>
          <CardTitle>ユーザー情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-700 dark:text-gray-200 text-base">
            ユーザーID: {userId}
          </div>
        </CardContent>
      </Card>
      {/* ウィジェットグリッド */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* チャット履歴数ウィジェット */}
        <Card
          className="flex flex-col items-center text-center min-h-[180px]"
          role="region"
          aria-label="今月のチャット数"
        >
          <CardHeader>
            <CardTitle className="text-base font-medium">
              今月のチャット数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-extrabold text-primary mb-2">
              42
            </span>
          </CardContent>
        </Card>
        {/* API利用状況ウィジェット */}
        <Card
          className="flex flex-col items-center text-center min-h-[180px]"
          role="region"
          aria-label="APIリクエスト数"
        >
          <CardHeader>
            <CardTitle className="text-base font-medium">
              APIリクエスト数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-extrabold text-primary mb-2">
              128
            </span>
          </CardContent>
        </Card>
        {/* サンプルプロンプト案内ウィジェット */}
        <Card
          className="flex flex-col items-center text-center min-h-[180px]"
          role="region"
          aria-label="サンプルプロンプト"
        >
          <CardHeader>
            <CardTitle className="text-base font-medium">
              サンプルプロンプト
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm text-left">
              <li>「要約してください」</li>
              <li>「英語に翻訳して」</li>
              <li>「メール文を作成して」</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
