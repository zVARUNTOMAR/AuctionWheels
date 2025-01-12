"use server";

import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

export async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session) {
      return null;
    }

    return session.user;
  } catch {
    return null;
  }
}

export async function getTokenWorkaround() {
  const req = {
    headers: Object.fromEntries((await headers()) as Headers),
    cookies: Object.fromEntries(
      (await cookies()).getAll().map((c: any) => [c.name, c.value])
    ),
  };

  return await getToken({ req: req as any });
}
