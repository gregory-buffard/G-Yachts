import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
                hostname: "beta.g-yachts.com",
                port: "",
                pathname: "/media/**"
            },
            {
                protocol: "http",
                hostname: "g-yachts.com",
                port: "",
                pathname: "/media/**"
            },
        ]
    }
};

export default withNextIntl(nextConfig);