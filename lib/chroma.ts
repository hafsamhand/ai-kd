// export function createChromaClient() {
// 	const key = process.env.CHROMA_API_KEY;
// 	if (!key) throw new Error('CHROMA_API_KEY is not set');

// 	return {
// 		async embed(text: string) {
// 			throw new Error('Chroma client not implemented — replace with real client');
// 		},
// 	};
// }

// export type ChromaClient = ReturnType<typeof createChromaClient>;

import { ChromaClient } from "chromadb";

export const chroma = new ChromaClient({
  path: "http://localhost:8000",
});
