/**
 * When NEXT_PUBLIC_ASSET_HOST is set (e.g. the PHP/Hostinger host that serves
 * /uploads via the CMS), allow next/image to optimise images from that host.
 * Empty by default → all imagery is same-origin (bundled under public/).
 */
const assetHost = process.env.NEXT_PUBLIC_ASSET_HOST;
const remotePatterns = [];
if (assetHost) {
  try {
    const u = new URL(assetHost);
    remotePatterns.push({
      protocol: u.protocol.replace(':', ''),
      hostname: u.hostname,
      ...(u.port ? { port: u.port } : {}),
    });
  } catch {
    /* ignore malformed NEXT_PUBLIC_ASSET_HOST */
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns },
  // The PHP backend lives on a different origin (shared hosting).
  // See lib/api.ts + backend .htaccess for the CORS contract.
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'https://api.paradeepparivahan.com/api',
  },
};

export default nextConfig;
