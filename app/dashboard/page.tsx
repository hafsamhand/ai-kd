import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DocumentList from "./DocumentList.client";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <p>Role: {session?.user?.role}</p>
      <a href="/api/auth/signout">Logout</a>

    <DocumentList />

    </div>
  );
}
