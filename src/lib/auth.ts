import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { UserRole } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return req.cookies.get('token')?.value || null;
}

export function requireAuth(req: NextRequest): JWTPayload {
  const token = getTokenFromRequest(req);
  if (!token) throw new Error('Unauthorized');
  const payload = verifyToken(token);
  if (!payload) throw new Error('Invalid token');
  return payload;
}

export function requireRole(req: NextRequest, roles: UserRole[]): JWTPayload {
  const payload = requireAuth(req);
  if (!roles.includes(payload.role)) throw new Error('Forbidden');
  return payload;
}
