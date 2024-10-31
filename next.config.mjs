/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Add file-loader for .glb files
      config.module.rules.push({
        test: /\.glb$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/files/',
              outputPath: 'static/files/',
              name: '[name].[hash].[ext]', 
            },
          },
        ],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  