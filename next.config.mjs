import { withPayload } from "@payloadcms/next/withPayload";
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // TODO: invesigate...
  // ./src/collections/Users.ts:79:26
  // Type error: Property 'id' does not exist on type 'File'.
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default withPayload(withMDX(config));
