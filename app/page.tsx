import Link from "next/link";
import Navbar from "./components/Navbar";

export default function HomePage() {
	return (
		<>
			<Navbar />
			<main className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-12">
			<div className="max-w-4xl w-full text-center space-y-10">
				<div className="space-y-4">
					<h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
						AI Knowledge Base
					</h1>
					<p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
						Welcome to your modern knowledge management system. Organize, manage, and access your documents with ease.
					</p>
				</div>
				
				<div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
					<Link 
						href="/login"
						className="min-h-11 inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
					>
						Login
					</Link>
					<Link 
						href="/register"
						className="min-h-11 inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold bg-white text-blue-600 border-2 border-blue-600 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-200"
					>
						Register
					</Link>
				</div>

				<div className="grid md:grid-cols-3 gap-5 mt-12 sm:mt-16">
					<div className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
							<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-800 mb-2">Document Management</h3>
						<p className="text-gray-600 text-sm leading-relaxed">Create, edit, and organize your documents efficiently</p>
					</div>
					
					<div className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
						<div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
							<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered</h3>
						<p className="text-gray-600 text-sm leading-relaxed">Leverage AI to enhance your knowledge base</p>
					</div>
					
					<div className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
							<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Access</h3>
						<p className="text-gray-600 text-sm leading-relaxed">Your data is protected with enterprise-grade security</p>
					</div>
				</div>
			</div>
		</main>
		</>
	);
}
