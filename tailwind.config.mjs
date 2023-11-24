import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
      const newUtilities = {
        ".horizontal-tb": {
          writingMode: "horizontal-tb",
        },
        ".vertical-rl": {
          writingMode: "vertical-rl",
        },
        ".vertical-lr": {
          writingMode: "vertical-lr",
        },
      };
      addUtilities(newUtilities);
    }),
    plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
      const newUtilities = {
        ".orientation-u": {
          textOrientation: "upright",
        },
        ".orientation-s": {
          textOrientation: "sideways",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
