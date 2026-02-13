"use client";

import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("user");

  async function createUser() {
    await fetch("/api/admin/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: newEmail,
        password: newPassword,
        role: newRole,
      }),
    });

    fetchUsers();
  }

  async function fetchUsers() {
    const res = await fetch(
      `/api/admin/users?page=${page}&search=${search}`
    );
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  async function changeRole(id: string, role: string) {
    await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    fetchUsers();
  }

  async function deleteUser(id: string) {
    await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  }

  if (!data) return <div>Loading...</div>;

  const divStyle = { marginBottom: 20 };
  return (
    <div>
      <h2>User Management</h2>

      <h3>Create User</h3>

      <div style={divStyle}>
        <input
          placeholder="Email"
          onChange={(e) => setNewEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <select onChange={(e) => setNewRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={createUser}>Create</button>
      </div>

      <input
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {data.users.map((user: any) => (
        <div key={user.id} style={{ marginBottom: 20 }}>
          <strong>{user.email}</strong>
          <p>Role: {user.role}</p>
          <p>Documents: {user.documents.length}</p>

          <button onClick={() => changeRole(user.id, "admin")}>
            Make Admin
          </button>

          <button onClick={() => changeRole(user.id, "user")}>
            Make User
          </button>

          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </div>
      ))}

      <div>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span> Page {data.page} of {data.totalPages} </span>

        <button
          disabled={page >= data.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
