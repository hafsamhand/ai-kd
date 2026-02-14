"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href={session ? "/dashboard" : "/"}
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
            >
              AI Knowledge Base
            </Link>
            {status === "loading" ? (
              <div className="hidden md:block text-sm text-gray-400">Loading...</div>
            ) : session ? (
              <div className="hidden md:flex gap-1">
                <Link
                  href="/dashboard"
                  className="min-h-9 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Link>
                {session.user?.role === "admin" && (
                  <>
                    <Link
                      href="/admin"
                      className="min-h-9 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                    >
                      Admin Panel
                    </Link>
                    <Link
                      href="/admin/analytics"
                      className="min-h-9 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                    >
                      Analytics
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:flex gap-1">
                <Link
                  href="/login"
                  className="min-h-9 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="min-h-9 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            {session && (
              <>
                <div className="hidden sm:block text-sm text-gray-600">
                  <span className="font-medium">{session.user?.name}</span>
                  <span className="mx-1.5">•</span>
                  <span className="text-gray-500">{session.user?.email}</span>
                </div>
                <a
                  href="/api/auth/signout"
                  className="min-h-9 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
