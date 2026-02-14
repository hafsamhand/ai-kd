import "./globals.css";
import Providers from "./components/Providers";

export const metadata = {
	title: 'AI Knowledge Base',
	description: 'Modern knowledge management system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-violet-50/30 text-gray-800 antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
