import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        condensed: ["var(--font-condensed)", "sans-serif"],
      },
      maxWidth: {
        prose: "800px",
        site: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
