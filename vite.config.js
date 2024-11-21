import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "autoUpdate",
  includeAssets: [
    "logo.png",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "maskable_iconx192.png",
    "maskable_icon_x48.ico",
    "maskable_iconx384.png",
    "maskable_iconx512.png",
    "maskable_icon.png",
  ],
  manifest: {
    name: "Maintenance Ping Pipeline",
    short_name: "Maintenance",
    description: "Efficient application for reporting and tracking maintenance issues",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/maskable_icon_x48.ico",
        sizes: "48x48",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#005a9e",
    background_color: "#f4f6f8",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
  devOptions: {
    enabled: true,
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});