'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ChatInput({
  onResponse,
}: {
  onResponse: (
    userMessage: { role: string; content: string },
    aiMessage: { role: string; content: string }
  ) => void;
}) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        if (err.error?.includes('利用上限')) {
          setError('APIの利用上限に達しています。管理者に連絡してください。');
        } else {
          setError(err.error || 'APIエラーが発生しました');
        }
      } else {
        const aiMessage = await res.json();
        onResponse({ role: 'user', content: message }, aiMessage);
        setMessage('');
      }
    } catch (e: unknown) {
      let errorMessage = '送信エラーが発生しました';
      if (
        typeof e === 'object' &&
        e !== null &&
        'message' in e &&
        typeof (e as { message: unknown }).message === 'string'
      ) {
        errorMessage = `送信エラー: ${(e as { message: string }).message}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex w-full gap-2"
      aria-label="チャット入力フォーム"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="メッセージを入力..."
        aria-label="メッセージを入力"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={!message.trim() || loading}>
        {loading ? '送信中...' : '送信'}
      </Button>
      {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
    </form>
  );
}
