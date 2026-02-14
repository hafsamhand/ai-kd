/** Document as returned from API (e.g. /api/documents) */
export interface DocumentItem {
  id: string;
  title: string;
  content: string;
  status: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** User with documents as returned from admin users API */
export interface AdminUserItem {
  id: string;
  email: string;
  name: string | null;
  role: string;
  documents: { id: string }[];
}

export interface AdminUsersResponse {
  users: AdminUserItem[];
  page: number;
  totalPages: number;
  total: number;
}
