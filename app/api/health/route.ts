import { NextResponse } from 'next/server';
import  prisma  from "../../../lib/db";
import { chroma } from "../../../lib/chroma";


export async function GET() {
  // the issue that prisma is not connected to the database is likely due to the fact that the DATABASE_URL environment variable is not set correctly. Make sure that the DATABASE_URL variable is set to the correct value in your .env file, and that it points to a valid PostgreSQL database. You can also try running a simple query to test the connection, such as SELECT 1, to see if it returns a result.
  await prisma.$queryRaw`SELECT 1`
 
  await chroma.heartbeat();

  return NextResponse.json({
    status: "ok",
    postgres: "connected",
    chroma: "connected",
  });
}

