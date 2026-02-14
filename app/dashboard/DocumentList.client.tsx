"use client";

import { useCallback, useEffect, useState } from "react";
import type { DocumentItem } from "../../types/api";

export default function DocumentList() {
	const [docs, setDocs] = useState<DocumentItem[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editData, setEditData] = useState({ title: "", content: "", status: "draft" });
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [showCreateForm, setShowCreateForm] = useState(false);

	const fetchDocs = useCallback(async () => {
		setLoading(true);
		const res = await fetch("/api/documents");
		const data: DocumentItem[] = await res.json();
		setDocs(data);
		setLoading(false);
	}, []);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		fetchDocs();
	}, [fetchDocs]);

	async function deleteDoc(id: string) {
		if (!confirm("Are you sure you want to delete this document?")) return;
		await fetch(`/api/documents/${id}`, {
			method: "DELETE",
		});
		fetchDocs();
	}

	function startEdit(doc: DocumentItem) {
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
		if (!newTitle.trim() || !newContent.trim()) return;
		await fetch("/api/documents", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: newTitle,
				content: newContent,
				status: "draft",
			}),
		});

		setNewTitle("");
		setNewContent("");
		setShowCreateForm(false);
		fetchDocs();
	}

	return (
		<div className="space-y-6">
			{/* Create Document Section */}
			<div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-2 sm:p-5">
				<div className="flex items-center justify-between mb-3">
					<h2 className="text-xl sm:text-2xl font-bold text-gray-800">Documents</h2>
					<button
						type="button"
						onClick={() => setShowCreateForm((v) => !v)}
						className="min-h-9 inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all"
					>
						{showCreateForm ? "Cancel" : "Add Document"}
					</button>
				</div>
				{showCreateForm && (
					<div className="border border-gray-200 rounded-lg p-4 mt-3 bg-gray-50/50">
						<div className="space-y-4">
							<div>
								<input
									placeholder="Document Title"
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
									className="w-full h-11 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 placeholder-gray-400 text-base"
								/>
							</div>
							<div>
								<textarea
									placeholder="Document Content"
									value={newContent}
									onChange={(e) => setNewContent(e.target.value)}
									rows={4}
									className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 placeholder-gray-400 resize-none text-base min-h-[120px]"
								/>
							</div>
							<button
								onClick={createDoc}
								className="min-h-11 inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all"
							>
								Create Document
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Documents List */}
			<div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-2 sm:p-5">
				<h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Your Documents</h2>
				
				{loading ? (
					<div className="text-center py-10 text-gray-500">Loading documents...</div>
				) : docs.length === 0 ? (
					<div className="text-center py-10 sm:py-12 text-gray-500">
						<svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						<p className="text-lg">No documents yet. Create your first document above!</p>
					</div>
				) : (
					<div className="space-y-4">
						{docs.map((doc: DocumentItem) => (
							<div key={doc.id} className="bg-gray-50 rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
								{editingId === doc.id ? (
									<div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-white">
										<div>
										<input
											value={editData.title}
											onChange={(e) => setEditData({ ...editData, title: e.target.value })}
											className="w-full h-11 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 text-base"
										/>
										</div>
										<div>
										<textarea
											value={editData.content}
											onChange={(e) => setEditData({ ...editData, content: e.target.value })}
											rows={4}
											className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 resize-none text-base min-h-[100px]"
										/>
										</div>
										<div>
										<select
											value={editData.status}
											onChange={(e) => setEditData({ ...editData, status: e.target.value })}
											className="h-11 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 text-base"
										>
											<option value="draft">Draft</option>
											<option value="published">Published</option>
										</select>
										</div>
										<div className="flex gap-2 pt-1">
											<button
												onClick={() => saveEdit(doc.id)}
												className="min-h-9 inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
											>
												Save
											</button>
											<button
												onClick={() => setEditingId(null)}
												className="min-h-9 inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
											>
												Cancel
											</button>
										</div>
									</div>
								) : (
									<>
										<div className="flex items-start justify-between mb-3">
											<div className="flex-1">
												<h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1.5">{doc.title}</h3>
												<span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
													doc.status === "published" 
														? "bg-green-100 text-green-800 border border-green-200" 
														: "bg-gray-100 text-gray-800 border border-gray-200"
												}`}>
													{doc.status}
												</span>
											</div>
										</div>
										<p className="text-gray-600 mb-4 whitespace-pre-wrap text-sm sm:text-base">{doc.content}</p>
										<div className="flex gap-2">
											<button
												onClick={() => startEdit(doc)}
												className="min-h-9 inline-flex items-center px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
											>
												Edit
											</button>
											<button
												onClick={() => deleteDoc(doc.id)}
												className="min-h-9 inline-flex items-center px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
											>
												Delete
											</button>
										</div>
									</>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
