// Next.js automatically loads .env files — dotenv is not needed here.

const env = process.env.NODE_ENV || 'development';

/** @type {import('next').NextConfig} */
const nextConfigProd = {
  output: 'export',
  /* Make sure to change the basePath according to the platform you are using to deploy */
  basePath: '',
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image.loader.js',
  },
};

/** @type {import('next').NextConfig} */
const nextConfigDev = {};

const nextConfig = env === 'development' ? nextConfigDev : nextConfigProd;

export default nextConfig;
