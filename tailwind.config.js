/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "neon-blue": "#00f5ff",
                "neon-purple": "#bf00ff",
                "electric-blue": "#0080ff",
                "dark-bg": "#0a0a0a",
                "dark-card": "#1a1a1a",
                "glass-bg": "rgba(255, 255, 255, 0.05)",
            },
            fontFamily: {
                futura: ["Futura", "Arial", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
            boxShadow: {
                neon: "0 0 20px rgba(0, 245, 255, 0.5)",
                "neon-purple": "0 0 20px rgba(191, 0, 255, 0.5)",
                glow: "0 0 40px rgba(0, 128, 255, 0.3)",
                glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            },
            backdropBlur: {
                xs: "2px",
            },
            animation: {
                "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
                float: "float 6s ease-in-out infinite",
                "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
            },
            keyframes: {
                "pulse-glow": {
                    "0%": { boxShadow: "0 0 20px rgba(0, 245, 255, 0.5)" },
                    "100%": { boxShadow: "0 0 40px rgba(0, 245, 255, 0.8)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "glow-pulse": {
                    "0%": { textShadow: "0 0 10px rgba(0, 245, 255, 0.5)" },
                    "100%": { textShadow: "0 0 20px rgba(0, 245, 255, 1)" },
                },
            },
        },
    },
    plugins: [],
};
