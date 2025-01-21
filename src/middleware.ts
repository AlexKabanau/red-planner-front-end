import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-tokent.service'

export async function middleware(request: NextRequest) {
	const { url, cookies } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const isAuthPage = url.includes('/auth')

	// Логирование
	console.log('Refresh Token:', refreshToken)
	console.log('Is Auth Page:', isAuthPage)

	if (isAuthPage && refreshToken) {
		console.log('Redirecting to dashboard...')
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url))
	}

	if (isAuthPage) {
		console.log('User is on auth page without token. Proceeding...')
		return NextResponse.next()
	}

	if (!refreshToken) {
		console.log('No token found. Redirecting to auth...')
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	console.log('Token is valid. Proceeding...')
	return NextResponse.next()
}

export const config = {
	matcher: ['/auth/:path*', '/i/:path*']
}
