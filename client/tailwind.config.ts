import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        "main-bg": "var(--main-bg)",
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "complementary-primary-color": "var(--complementary-primary-color)",
        "complementary-secondary-color": "var(--complementary-secondary-color)",
        "text-primary-color": "var(--text-primary-color)",
        "text-secondary-color": "var(--text-secondary-color)",
        "cancel-button-color": "var(--cancel-button-color)",
        "hover-cancel-button-color": "var(--hover-cancel-button-color)",
        "confirm-button-color": "var(--confirm-button-color)",
        "hover-confirm-button-color": "var(--hover-confirm-button-color)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
