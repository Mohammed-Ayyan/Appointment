import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key-change-in-production"
    );

    return decoded;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const response = await fetch("http://localhost:3000/api/auth/me", {
    headers: {
      Cookie: `auth_token=${session}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.user;
}
