import { withPayload } from "@payloadcms/next/withPayload";
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withPayload(withMDX(config));
