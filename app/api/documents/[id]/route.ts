import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { logAction } from "../../../../lib/audit";

export async function PUT(
  req: Request,
	context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, status } = await req.json();

  const doc = await prisma.document.findUnique({
    where: { id: id, deletedAt: null },
  });

  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isOwner = doc.userId === session.user.id;
  const isAdmin = session.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.document.update({
    where: { id: id },
    data: { title, content, status },
  });

  await logAction("DOCUMENT_UPDATED", session.user.id, { id, title, status });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const doc = await prisma.document.findUnique({
    where: { id: id, deletedAt: null },
  });

  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isOwner = doc.userId === session.user.id;
  const isAdmin = session.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.document.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  // await prisma.document.delete({
  //   where: { id: id },
  // });

  await logAction("DOCUMENT_DELETED", session.user.id, { id });

  return NextResponse.json({ success: true });
}
