import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteCompression from 'vite-plugin-compression';
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    viteCompression({ algorithm: 'brotliCompress', threshold: 10240, ext: '.br' }),
    viteCompression({ algorithm: 'gzip', threshold: 10240, ext: '.gz' }),
    // mode === 'development' &&
    // componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        // Obfuscate chunk names for production
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js', 
        assetFileNames: 'assets/[hash].[ext]',
        manualChunks: {
          // Separate Three.js and R3F into their own chunk
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
          // Separate UI libraries
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip'],
          // Separate React Router
          'vendor-router': ['react-router-dom'],
        },
      },
    },
    // Increase chunk size warning limit for large assets
    chunkSizeWarningLimit: 1000,
    // Optimize asset handling
    assetsInlineLimit: 0, // Don't inline any assets to keep them separate for better caching
  },
}));
