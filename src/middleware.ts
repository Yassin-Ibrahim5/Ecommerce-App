import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export function middleware(request: NextRequest) {

    const token = request.cookies.get("next-auth.session-token");
    const otherToken = request.cookies.get("__Secure-next-auth.session-token");
    if (!token && !otherToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/cart", "/wishlist", "/checkout", "/allorders", "/change-data", "/change-password"],
}