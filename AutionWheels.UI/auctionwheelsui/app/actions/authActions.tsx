"use server";

import { auth } from "@/auth";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

export async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session) {
      return null;
    }

    return session.user;
  } catch (error) {
    return null;
  }
}


export async function getTokenWorkaround() {
  const req = {
      headers: Object.fromEntries(headers() as Headers),
      cookies: Object.fromEntries(
          cookies()
              .getAll()
              .map(c => [c.name, c.value])
      )
  } as NextApiRequest;

  return await getToken({req});