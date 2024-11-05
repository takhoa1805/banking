import type { NextConfig } from "next";
require("dotenv").config({ path: '../.env'});

const nextConfig: NextConfig = {
  /* config options here */
  webpack: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config;
  },
};

export default nextConfig;
