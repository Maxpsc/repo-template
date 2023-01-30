import path from 'path'

// export function curDir(fileUrl: string) {
// 	const __filename = url.fileURLToPath(fileUrl)
// 	return path.dirname(__filename)
// }

export function resolveRoot(p) {
	// const __dirname = curDir(import.meta.url)
	return path.resolve(__dirname, '..', p)
}
