export const env = {
	DATABASE_URL: process.env.DATABASE_URL ?? '',
	CHROMA_API_KEY: process.env.CHROMA_API_KEY ?? '',
};

export function requireEnv(name: keyof typeof env) {
	const v = env[name];
	if (!v) throw new Error(`${name} environment variable is required`);
	return v;
}
