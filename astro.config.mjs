import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    svelte(),
    AstroPWA({
      devOptions: {
        enabled: true,
        /* other options */
      },
      includeAssets: ["favicon.svg", "logo.svg"],
      manifest: {
        name: "SunrinInt = 모바일 학생증 서비스",
        short_name: "IntPass",
        description: "My Awesome App description",
        icons: [
          {
            src: "logo.png",
            sizes: "any",
            type: "image/png",
          },
          // {
          //   src: "pwa-192x192.png",
          //   sizes: "192x192",
          //   type: "image/png",
          // },
          // {
          //   src: "pwa-512x512.png",
          //   sizes: "512x512",
          //   type: "image/png",
          // },
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
