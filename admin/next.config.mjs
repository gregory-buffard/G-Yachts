import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		config.plugins.push(
			new MonacoWebpackPlugin({
				languages: ["javascript", "html", "css", "json"], // Add the languages you need
				filename: "static/[name].worker.js",
			}),
		);

		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				path: false,
			};
		}

		return config;
	},
};

export default nextConfig;
