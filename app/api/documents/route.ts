import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { logAction } from "../../../lib/audit";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = session.user.role === "admin";

  const documents = await prisma.document.findMany({
    where: {
      deletedAt: null,
      ...(isAdmin ? {} : { userId: session.user.id, deletedAt: null }),
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(documents);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, status } = await req.json();

  const document = await prisma.document.create({
    data: {
      title,
      content,
      status:status || "draft",
      userId: session.user.id,
    },
  });

  await logAction("DOCUMENT_CREATED", session.user.id, { id: document.id, title });

  return NextResponse.json(document);
}
