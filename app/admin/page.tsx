import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Admin Control Center</h1>
      <p>Welcome, {session.user.name}</p>
    </div>
  );
}
