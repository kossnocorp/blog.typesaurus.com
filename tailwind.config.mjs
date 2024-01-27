import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ultramarine: {
          50: "#f0f0ff",
          100: "#e4e4ff",
          200: "#cccdff",
          300: "#a5a4ff",
          400: "#7a70ff",
          500: "#5037ff",
          600: "#3b0fff",
          700: "#2a00ff",
          800: "#2200da",
          900: "#1b00a3",
          950: "#0c007a",
        },

        waika: {
          50: "#f3f7fa",
          100: "#eaf0f5",
          200: "#d8e3ed",
          300: "#c0d1e1",
          400: "#a6b8d3",
          500: "#8fa1c5",
          600: "#7788b4",
          700: "#63719c",
          800: "#535e80",
          900: "#475068",
          950: "#2a2f3c",
        },

        cinder: {
          50: "#eef1ff",
          100: "#dce3ff",
          200: "#b2c5ff",
          300: "#6d95ff",
          400: "#205eff",
          500: "#0038ff",
          600: "#0024df",
          700: "#001bb4",
          800: "#001895",
          900: "#00147a",
          950: "#00020f",
        },
      },
    },
  },
  plugins: [typography],
};
