import { prisma } from "../../lib/prisma";

export default async function DashboardPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
