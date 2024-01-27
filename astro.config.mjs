import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import shikiTheme from "./shiki.theme.json";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.typesaurus.com",
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: shikiTheme,
    },
  },
});
