import { defineConfig } from "astro/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      nodePolyfills({
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
    ],
  },
  integrations: [
    react(),
    svelte(),
    AstroPWA({
      registerType: "autoUpdate",
      devOptions: {
        // enabled: true,
        /* other options */
      },
      includeAssets: ["favicon.svg", "logo.svg"],
      manifest: {
        name: "SunrinInt = 모바일 학생증 서비스",
        short_name: "IntPass",
        description: "선린인터넷고등학교 모바일 학생증 서비스",
        icons: [
          {
            src: "logos/16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "logos/32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "logos/180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "logos/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logos/512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "logos/1024.png",
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
        workbox: {
          navigateFallback: "/404",
          globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
          globIgnores: ["api/**/*"],
        },
      },
    }),
  ],
});
