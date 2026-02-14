import { prisma } from "../../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { logAction } from "../../../../../lib/audit";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return null;
  }
  return session;
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const { role } = await req.json();

  const updated = await prisma.user.update({
    where: { id },
    data: { role },
  });

  await logAction("USER_UPDATED", session.user.id, { id, role, updatedAt: new Date() });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  await prisma.document.deleteMany({
    where: { userId: id },
  });

  // await prisma.user.delete({
  //   where: { id },
  // });
  await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  await logAction("USER_DELETED", session.user.id, { id });
  
  return NextResponse.json({ success: true });
}
