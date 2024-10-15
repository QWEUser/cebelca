import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        // caches the assets/icons mentioned (assets/* includes all the assets present in your src/ directory)
        includeAssets: ["cebelica.svg", "assets/*"],
        name: "Bučela",
        short_name: "Bučela",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "##ffffff",
        display: "standalone",
        description:
          "Bučela je brezplačna, neprofitna igra namenjena nabiranju znanja slovenskega jezika.",

        // icons: [
        //   {
        //     src: "cebelica.svg",
        //     sizes: "192x192",
        //     type: "svg",
        //   },
        //   {
        //     src: "cebelica.svg",
        //     sizes: "512x512",
        //     type: "svg",
        //   },
        // ],
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // defining cached files formats
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      },
    }),
  ],
  base: "/",
  // base: "/cebelca/",
});
