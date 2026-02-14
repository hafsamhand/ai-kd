"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminUsersResponse, AdminUserItem } from "../../types/api";

export default function AdminPanel() {
  const [data, setData] = useState<AdminUsersResponse | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);

  async function createUser() {
    if (!newEmail.trim() || !newPassword.trim()) return;
    setLoading(true);
    await fetch("/api/admin/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: newEmail,
        password: newPassword,
        role: newRole,
      }),
    });

    setNewEmail("");
    setNewPassword("");
    setNewRole("user");
    setShowCreateUserForm(false);
    setLoading(false);
    fetchUsers();
  }

  const fetchUsers = useCallback(async () => {
    const res = await fetch(
      `/api/admin/users?page=${page}&search=${search}`
    );
    const json: AdminUsersResponse = await res.json();
    setData(json);
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function changeRole(id: string, role: string) {
    await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    fetchUsers();
  }

  async function deleteUser(id: string) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  }

  if (!data) return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-2 sm:p-6 text-center">
      <div className="text-gray-500 py-8">Loading users...</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Create User Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-2 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Users</h2>
          <button
            type="button"
            onClick={() => setShowCreateUserForm((v) => !v)}
            className="min-h-9 inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg shadow-md hover:from-violet-700 hover:to-violet-800 transition-all"
          >
            {showCreateUserForm ? "Cancel" : "Add User"}
          </button>
        </div>
        {showCreateUserForm && (
          <div className="border border-gray-200 rounded-lg p-4 mt-3 bg-gray-50/50">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <input
                  placeholder="Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full h-11 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 placeholder-gray-400 text-base"
                />
              </div>
              <div>
                <input
                  placeholder="Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-11 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 placeholder-gray-400 text-base"
                />
              </div>
              <div>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full h-11 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 text-base"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={createUser}
                  disabled={loading}
                  className="w-full min-h-11 inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg shadow-md hover:from-violet-700 hover:to-violet-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create User"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-2 sm:p-5">
        <input
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-gray-900 placeholder-gray-400 text-base"
        />
      </div>

      {/* Users List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-2 sm:p-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">User list ({data.users.length})</h2>
        
        {data.users.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>No users found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.users.map((user: AdminUserItem) => (
              <div key={user.id} className="bg-gray-50 rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{user.email}</h3>
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Role:</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin" 
                            ? "bg-violet-100 text-violet-800 border border-violet-200" 
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Documents:</span>
                        <span className="font-semibold text-gray-800">{user.documents.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => changeRole(user.id, "admin")}
                      className="min-h-9 inline-flex items-center px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.role !== "user" && (
                    <button
                      onClick={() => changeRole(user.id, "user")}
                      className="min-h-9 inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Make User
                    </button>
                  )}
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="min-h-9 inline-flex items-center px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="min-h-9 inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 font-medium order-first w-full sm:order-none sm:w-auto text-center">
            Page {data.page} of {data.totalPages}
          </span>
          <button
            disabled={page >= data.totalPages}
            onClick={() => setPage(page + 1)}
            className="min-h-9 inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
