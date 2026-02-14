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
        <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-2 sm:p-5">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-1.5">
                    Analytics Dashboard
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">System statistics and activity overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-[.5rem]">
                <div className="card bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-2 sm:p-5 border border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-700">Total Users</h2>
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-800">{totalUsers}</p>
                </div>
                
                <div className="card bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-2 sm:p-5 border border-violet-200 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-700">Total Documents</h2>
                        <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-800">{totalDocs}</p>
                </div>
                
                <div className="card bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-2 sm:p-5 border border-green-200 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-700">Published Documents</h2>
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-800">{publishedDocs}</p>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-2 sm:p-5">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                {recentLogs.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        <p>No recent activity</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {recentLogs.map((log) => (
                            <div key={log.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800 mb-1">
                                            <span className="text-blue-600 font-semibold">{log.action}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 mb-2">
                                            {new Date(log.createdAt).toLocaleString()}
                                        </p>
                                        <div className="text-xs text-gray-600">
                                            <span className="font-medium">User ID:</span> {log.userId}
                                            {log.details && (
                                                <>
                                                    <span className="mx-2">•</span>
                                                    <span className="font-medium">Details:</span> {JSON.stringify(log.details)}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}