import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/", // o '/nombre-repo/' si es GitHub Pages
  plugins: [tailwindcss()],
});
