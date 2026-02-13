"use client";

import { useEffect, useState } from "react";

export default function DocumentList() {
	const [docs, setDocs] = useState([]);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editData, setEditData] = useState({ title: "", content: "", status: "draft" });
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");

	async function fetchDocs() {
		const res = await fetch("/api/documents");
		const data = await res.json();
		setDocs(data);
	}

	useEffect(() => {
		fetchDocs();
	}, []);

	async function deleteDoc(id: string) {
		await fetch(`/api/documents/${id}`, {
			method: "DELETE",
		});
		fetchDocs();
	}

	function startEdit(doc: any) {
		setEditingId(doc.id);
		setEditData({ title: doc.title, content: doc.content, status: doc.status });
	}

	async function saveEdit(id: string) {
		await fetch(`/api/documents/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(editData),
		});

		setEditingId(null);
		fetchDocs();
	}

	async function createDoc() {
		await fetch("/api/documents", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: newTitle,
				content: newContent,
				status: "draft",
			}),
		});

		fetchDocs();
	}
	return (
		<div>
			<h3>Create Document</h3>

			<input
				placeholder="Title"
				value={newTitle}
				onChange={(e) => setNewTitle(e.target.value)}
			/>

			<textarea
				placeholder="Content"
				value={newContent}
				onChange={(e) => setNewContent(e.target.value)}
			/>

			<button onClick={createDoc}>Add</button>

			<h2>Your Documents</h2>

			<ul>
				{docs.map((doc: any) => (
					<div key={doc.id} style={{ marginBottom: 20 }}>
						{editingId === doc.id ? (
							<>
								<input
									value={editData.title}
									onChange={(e) =>
										setEditData({ ...editData, title: e.target.value })
									}
								/>
								<textarea
									value={editData.content}
									onChange={(e) =>
										setEditData({ ...editData, content: e.target.value })
									}
								/>
								<select
									value={editData.status}
									onChange={(e) =>
										setEditData({ ...editData, status: e.target.value })
									}
								>
									<option value="draft">Draft</option>
									<option value="published">Published</option>
								</select>
								<button onClick={() => saveEdit(doc.id)}>Save</button>
								<button onClick={() => setEditingId(null)}>Cancel</button>
							</>
						) : (
							<>
								<h3>{doc.title}</h3> <h5>({doc.status})</h5>
								<p>{doc.content}</p>
								<button onClick={() => startEdit(doc)}>Edit</button>
								<button onClick={() => deleteDoc(doc.id)}>Delete</button>
							</>
						)}
					</div>
				))}
			</ul>
		</div>
	);
}
