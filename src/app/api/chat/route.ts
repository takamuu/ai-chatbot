import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not set' }, { status: 500 });
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
      }),
    });
    if (!response.ok) {
      const err = await response.json();
      let errorMessage = 'OpenAI APIでエラーが発生しました。';
      if (err.error?.message?.includes('quota')) {
        errorMessage =
          'APIの利用上限に達しています。管理者に連絡してください。';
      } else if (err.error?.message) {
        errorMessage = `OpenAI APIエラー: ${err.error.message}`;
      }
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message;
    if (!aiMessage) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 500 }
      );
    }
    return NextResponse.json(aiMessage);
  } catch (e: unknown) {
    let errorMessage = 'サーバーエラーが発生しました。';
    if (
      typeof e === 'object' &&
      e !== null &&
      'message' in e &&
      typeof (e as { message: unknown }).message === 'string'
    ) {
      errorMessage = `サーバーエラー: ${(e as { message: string }).message}`;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
