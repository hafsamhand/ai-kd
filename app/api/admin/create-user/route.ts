import { prisma } from "../../../../lib/prisma";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { logAction } from "../../../../lib/audit";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, password, role } = await req.json();

  const hashed = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      role: role || "user",
    },
  });

  await logAction("USER_CREATED", session.user.id, { email });

  return NextResponse.json(user);
}
