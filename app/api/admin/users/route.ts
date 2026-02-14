import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return null;
  }
  return session;
}

// GET with search + pagination
export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const take = 5;
  const skip = (page - 1) * take;

  const users = await prisma.user.findMany({
    where: {
      email: {
        contains: search,
        mode: "insensitive",
      },
      deletedAt: null,
    },
    include: {
      documents: true,
    },
    skip,
    take,
  });

  const total = await prisma.user.count({
    where: {
      email: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json({
    users,
    total,
    page,
    totalPages: Math.ceil(total / take),
  });
}
