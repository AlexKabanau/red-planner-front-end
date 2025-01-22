import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-tokent.service'

export async function middleware(request: NextRequest) {
	const { url, cookies } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const isAuthPage = url.includes('/auth')

	// Логирование для диагностики
	console.log('Refresh Token:', refreshToken)
	console.log('Is Auth Page:', isAuthPage)
	console.log('Request URL:', url)

	// Редирект, если пользователь на /auth и имеет токен
	if (isAuthPage && refreshToken) {
		console.log('Redirecting to Dashboard:', DASHBOARD_PAGES.HOME)
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
	}

	// Продолжить выполнение, если пользователь на /auth без токена
	if (isAuthPage) {
		console.log('User is on auth page without token')
		return NextResponse.next()
	}

	// Редирект на /auth, если токена нет
	if (!refreshToken) {
		console.log('No token found, redirecting to /auth')
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	// Продолжить выполнение для других маршрутов
	return NextResponse.next()
}

export const config = {
	matcher: ['/auth/:path*', '/i/:path*']
}
