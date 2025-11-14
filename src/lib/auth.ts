import { cookies } from 'next/headers';

export async function getServerSession() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch('http://localhost:8080/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    return null;
  }
}