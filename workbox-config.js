module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    '**/*.{html,json,js,css}'
  ],
  globIgnores: ['**/index.html'],
  "swDest": "dist/sw.js",
    // Define runtime caching rules.
    runtimeCaching: [{
      // Match any request that ends with .png, .jpg, .jpeg or .svg.
      urlPattern: /index.html$/,
  
      // Apply a stale-while-revalidate strategy.
      handler: 'StaleWhileRevalidate',
  
      options: {
          // Use a custom cache name.
          cacheName: 'html',
    
          // Only cache index.html.
          expiration: {
            maxEntries: 1,
          },
        }
      },
      {
      // Match any request that ends with .png, .jpg, .jpeg or .svg.
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
  
      // Apply a cache-first strategy.
      handler: 'CacheFirst',
  
      options: {
        // Use a custom cache name.
        cacheName: 'images',
  
        // Only cache 10 images.
        expiration: {
          maxEntries: 10,
        },
      }
    }],
};