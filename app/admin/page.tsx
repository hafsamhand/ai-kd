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

	return (
		<div style={{ padding: 40 }}>
			<h1>Admin Management Panel</h1>

			<AdminPanel />

		</div>
	);
}