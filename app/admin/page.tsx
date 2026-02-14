import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminPanel from "./AdminPanel.client";

export default async function AdminPage() {
	const session = await getServerSession(authOptions);

	if (!session) redirect("/login");

	if (session.user.role !== "admin") {
		redirect("/dashboard");
	}

	return (
		<div className="space-y-6">
			<div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-2 sm:p-5">
				<h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-1.5">
					Admin Management Panel
				</h1>
				<p className="text-gray-600 text-sm sm:text-base">Manage users and system settings</p>
			</div>

			<AdminPanel />
		</div>
	);
}