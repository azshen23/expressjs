import jwt from "jsonwebtoken";
import { StringLiteral } from "typescript";
export interface User {
  id: number;
  email: string;
}

export async function decodeAndVerifyJwtToken(token: string): Promise<User> {
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as User;
  return user;
}

export async function decodeAndVerifyRefreshToken(
  token: string
): Promise<User> {
  const decodedToken = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET!
  ) as User;
  return decodedToken;
}
