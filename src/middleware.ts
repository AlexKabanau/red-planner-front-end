import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-tokent.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	// const { url, cookies } = request
	// debugger
	// const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	// const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	// console.log('refreshToken', refreshToken)
	// console.log('accessToken', accessToken)

	console.log('Cookies:', request.cookies.getAll()) // Лог всех кук
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	console.log('Refresh Token:', refreshToken) // Лог токена
	const isAuthPage = request.nextUrl.pathname.includes('/auth')

	if (isAuthPage && refreshToken) {
		// console.log(isAuthPage, refreshToken)
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url))
	}

	if (isAuthPage) {
		// console.log(isAuthPage)

		return NextResponse.next()
	}

	if (!refreshToken) {
		// console.log(refreshToken)

		return NextResponse.redirect(new URL('/auth', request.url))
	}

	return NextResponse.next()
}

export const config = {
	// matcher: ['/auth/:path*', '/i/:path*']
	matcher: ['/i/:path*', '/auth/:path']
}
