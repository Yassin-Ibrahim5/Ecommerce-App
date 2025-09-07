import {cookies} from "next/headers";
import {decode} from "next-auth/jwt";

export async function getUserToken() {
    const encodedToken = (await cookies()).get("next-auth.session-token")?.value;

    const preToken = await decode({ token: encodedToken, secret: process.env.NEXTAUTH_SECRET !});
    console.log(preToken, "pre token");
    return preToken?.token;
}