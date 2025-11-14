import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Call Spring Boot backend
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const data = await response.json();
        // Expecting: { token: "jwt-token", user: { id, email, name } }

        // Set httpOnly cookie
        (await cookies()).set({
            name: 'token',
            value: data.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return NextResponse.json({ user: data.user });
    } catch (error) {
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
