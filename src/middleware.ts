// import { Cookies } from 'js-cookie';
import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-tokent.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	// console.log(refreshToken)

	// const isDashboardPage = url.includes('/i')
	const isAuthPage = url.includes('/auth')

	if (isAuthPage && refreshToken) {
		// console.log(' isAuthPage && refreshToken REDIRECT')
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
	}

	if (isAuthPage) {
		// console.log(' isAuthPage REDIRECT')

		return NextResponse.next()
	}

	if (!refreshToken) {
		// console.log(' !refreshToken REDIRECT')
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth/:path*', '/i/:path*']
	// matcher: ['/i/:path*', '/auth/:path']
}
