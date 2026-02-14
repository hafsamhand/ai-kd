import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DocumentList from "./DocumentList.client";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-2 sm:p-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 sm:p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1.5">Name</p>
            <p className="text-base sm:text-lg font-semibold text-gray-800">{session?.user?.name || "N/A"}</p>
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg p-2 sm:p-4 border border-violet-200">
            <p className="text-sm text-gray-600 mb-1.5">Email</p>
            <p className="text-base sm:text-lg font-semibold text-gray-800">{session?.user?.email || "N/A"}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 sm:p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1.5">Role</p>
            <p className="text-base sm:text-lg font-semibold text-gray-800 capitalize">{session?.user?.role || "N/A"}</p>
          </div>
        </div>
      </div>

      <DocumentList />
    </div>
  );
}
