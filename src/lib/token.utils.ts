"use server";
import {cookies} from "next/headers";
import {decode} from "next-auth/jwt";

export async function getUserToken() {
    const encodedToken = (await cookies()).get("next-auth.session-token")?.value;
    const otherToken = (await cookies()).get("__Secure-next-auth.session-token")?.value;

    if (!encodedToken) {
        const preTokenOther = await decode({ token: otherToken, secret: process.env.AUTH_SECRET !});
        return preTokenOther?.token;
    }
    const preToken = await decode({ token: encodedToken, secret: process.env.AUTH_SECRET !});
    return preToken?.token;
}