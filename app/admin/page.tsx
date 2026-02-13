import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import AdminPanel from "./AdminPanel.client";

export default async function AdminPage() {
	const session = await getServerSession(authOptions);

	if (!session) redirect("/login");

	if (session.user.role !== "admin") {
		redirect("/dashboard");
	}

	const users = await prisma.user.findMany({
		include: {
			documents: true,
		},
	});
	return (
		<div style={{ padding: 40 }}>
			<h1>Admin Management Panel</h1>

      <AdminPanel />
			{users.map((user) => (
				<div key={user.id} style={{ marginBottom: 40 }}>
					<h2>{user.email}</h2>
					<p>Role: {user.role}</p>
					<p>Documents: {user.documents.length}</p>

					<ul>
						{user.documents.map((doc) => (
							<li key={doc.id}>
								{doc.title}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}