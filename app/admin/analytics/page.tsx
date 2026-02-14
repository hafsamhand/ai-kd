import { prisma } from "../../../lib/prisma";

export default async function AnalyticsPage() {

const totalUsers = await prisma.user.count({
  where: { deletedAt: null },
});

const totalDocs = await prisma.document.count({
  where: { deletedAt: null },
});

const publishedDocs = await prisma.document.count({
  where: { status: "published" },
});

const recentLogs = await prisma.auditLog.findMany({
  take: 10,
  orderBy: { createdAt: "desc" },
});

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Users</h2>
                    <p className="text-2xl">{totalUsers}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Documents</h2>
                    <p className="text-2xl">{totalDocs}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Published Documents</h2>
                    <p className="text-2xl">{publishedDocs}</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
                <ul>
                    {recentLogs.map((log) => (
                        <li key={log.id} className="border-b py-2">
                            <p className="text-sm text-gray-500">
                                {new Date(log.createdAt).toLocaleString()} - User ID: {log.userId} - Action: {log.action} - Details: {JSON.stringify(log.details)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}