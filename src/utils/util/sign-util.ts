import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export function randomString(length: number): string {
  return uuidv4().replace(/-/g, '').slice(0, length);
}

// 定义 hmacSHA256 方法
export function hmacSHA256(content: string, secret: string): Buffer {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(content);
  return hmac.digest();
}

// 定义 base64Encode 方法
export function base64Encode(buffer: Buffer): string {
  return buffer.toString('base64');
}
