import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/core/api/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Use the combined API to call Spring Boot backend
    const data = await api.post<{ 
      token: string; 
      user: { id: string; email: string; name: string } 
    }>('http://localhost:8080/api/auth/login', body);

    // Set httpOnly cookie
    (await cookies()).set({
      name: 'token',
      value: data.data?.token || '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ user: data.data?.user });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    const status = errorMessage === 'Invalid credentials' ? 401 : 500;
    
    return NextResponse.json(
      { error: errorMessage },
      { status }
    );
  }
}