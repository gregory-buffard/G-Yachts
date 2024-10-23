import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Due to a typing issue in the `next-intl` / `next` / `react` package, we must skip linting and type validity checking during build times temporarily.
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "51.75.16.185",
                port: "",
                pathname: "/media/**"
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3001",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "www.g-yachts.com",
                port: "",
                pathname: "/media/**"
            },
        ]
    }
};

export default withNextIntl(nextConfig);