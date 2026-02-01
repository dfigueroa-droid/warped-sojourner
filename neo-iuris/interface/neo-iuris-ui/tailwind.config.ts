import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                'neo-bg': '#0f172a', // Slate 950
                'neo-panel': '#1e293b', // Slate 800
                'neo-accent': '#10b981', // Emerald 500
                'neo-text': '#f8fafc', // Slate 50
            }
        },
    },
    plugins: [],
};
export default config;
