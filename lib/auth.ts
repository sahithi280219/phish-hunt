import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret_change_me'
);

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'phishhunt2026';

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function generateAdminToken(): Promise<string> {
  const token = await new SignJWT({ role: 'admin', iat: Date.now() })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(JWT_SECRET);
  return token;
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function getAdminTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  return token?.value || null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminTokenFromCookies();
  if (!token) return false;
  return verifyAdminToken(token);
}
