/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        flash: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        openChat: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        openChatOff: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0)", opacity: "0" },
        },
        openBoxChat: {
          "0%": { width: "0px", opacity: "0" },
          "100%": { width: "400px", opacity: "1" },
        },
        openBoxChatOff: {
          "0%": { width: "400px", opacity: "1" },
          "100%": { width: "0px", opacity: "0" },
        },
      },
      animation: {
        "active-flash": "flash 0.8s ease-in-out infinite",
        "active-openChat": "openChat 0.3s",
        "active-openChatOff": "openChatOff 0.3s",
        "active-openBoxChat": "openBoxChat 0.3s",
        "active-openBoxChatOff": "openBoxChatOff 0.3s",
      },
    },
  },
  plugins: [],
};
