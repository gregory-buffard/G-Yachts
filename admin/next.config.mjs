import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		// Add MonacoWebpackPlugin to the list of plugins
		config.plugins.push(
			new MonacoWebpackPlugin({
				languages: ["javascript", "html", "css", "json"], // Specify the languages you need
				filename: "static/[name].worker.js", // Specify the output filename for workers
			}),
		);

		// Provide fallbacks for node modules that are not available in the browser
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				path: false,
			};
		}

		return config;
	},
	// Ensure that Next.js serves the worker files with the correct MIME type
	async headers() {
		return [
			{
				source: "/static/:path*",
				headers: [
					{
						key: "Content-Type",
						value: "application/javascript",
					},
				],
			},
		];
	},
};

export default nextConfig;
