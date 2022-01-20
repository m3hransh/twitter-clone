import { verify } from 'jsonwebtoken';
import { Context } from './context';

export const APP_SECRET = process.env.APP_SECRET || 'appsecret123';

interface Token {
  userId: string;
}

export function getUserId(context: Context) {
  const authHeader = context.req.get('Authorization');
  console.log(`authHeader: ${authHeader}`);
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    console.log(`user: ${verifiedToken.userId}`);
    return verifiedToken && Number(verifiedToken.userId);
  }
}
