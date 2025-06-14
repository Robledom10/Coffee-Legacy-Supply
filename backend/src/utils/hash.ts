import crypto from 'crypto';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(input: string, hash: string): boolean {
  return hashPassword(input) === hash;
}
