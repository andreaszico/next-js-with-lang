import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    // Verify token with Spring Boot
    const response = await fetch('http://localhost:8080/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      (await cookies()).delete('token');
      return NextResponse.json({ user: null });
    }

    const user = await response.json();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
