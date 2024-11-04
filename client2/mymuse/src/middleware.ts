import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const isLoggedIn = await checkUserSession(request);

    const isRootPath = request.nextUrl.pathname === '/';
    const isHomePath = request.nextUrl.pathname === '/home';

    // ログインしているユーザーが"/"にアクセスした場合、"/home"にリダイレクト
    if (isLoggedIn && isRootPath) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    // ログインしていないユーザーが"/"以外にアクセスした場合、"/"にリダイレクト
    if (!isLoggedIn && !isRootPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// ユーザーセッションの確認関数
async function checkUserSession(request: NextRequest): Promise<boolean> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/check-session`, {
            headers: {
                Cookie: request.headers.get('cookie') || '',
            },
        });
        return response.ok; // レスポンスが200系であればログイン中
    } catch (error) {
        return false; // エラーが発生した場合は未ログインとみなす
    }
}

export const config = {
    matcher: ['/', '/home', '/dashboard/:path*'], // ミドルウェアを適用するルート
};
