import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Log request details for debugging
    console.log("Middleware triggered for: ", request.url)
    const userId = request.nextUrl.searchParams.get('userId')
    console.log(userId)

    // You can manipulate the response here, for example, adding a custom header
    const response = NextResponse.next()
    response.headers.set('X-Custom-Header', 'Middleware active')

    return response
}

// Configuration to apply this middleware to specific paths
export const config = {
    matcher: [
        '/',
        '/server/:path*',
        '/home',
    ] // Matches requests to URLs starting with '/server/'
}
