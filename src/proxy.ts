import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { JwtExtended } from "./pages/api/auth/[...nextauth]";
import { ISesson } from "./types/auth";
// import jwt, { Secret } from 'jsonwebtoken';
// import {jwtVerify} from 'jose'

export async function proxy(req: NextRequest) {
    const token : JwtExtended | null = await getToken({
        req: req,
        secret: process.env.AUTH_SECRET
    });
    
    const pathaname = req.nextUrl.pathname;

    if(pathaname === "/auth/login" || pathaname === "/auth/register") {
        if(token) {
            const url = new URL("/dashboard", req.url);
            return NextResponse.redirect(url)
        }
    }

    if(pathaname.startsWith("/dashboard")) {
        if(!token) {
            const url = new URL("/auth/login", req.url);
            url.searchParams.set("callbackUrl", pathaname);
            return NextResponse.redirect(url);
        }

        if(token && !(token?.user as ISesson).storeId) {
            const url = new URL("/create-store", req.url)
            return NextResponse.redirect(url)
        }
    }

    if(pathaname === "/create-store") {
        if(!token) {
            const url = new URL("/auth/login", req.url);
            return NextResponse.redirect(url);
        }

        if(token && (token?.user as ISesson).storeId) {
            const url = new URL("/dashboard", req.url);
            return NextResponse.redirect(url);
        }

        if(token && token.user?.role === "cashier") {
            const url = new URL("/dashboard", req.url);
            return NextResponse.redirect(url);
        }
    }

    if(pathaname === "/") {
        if(token) {
            const url = new URL("/dashboard", req.url);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
    
}

export const config = {
    matcher: ["/auth/login", "/auth/register", "/dashboard/:path*", "/", "/create-store"]
}