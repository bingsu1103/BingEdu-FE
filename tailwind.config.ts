/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",
        primary: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
        },
        momo: "#d82d8b",
        vnpay: "#1e40af",
      },
    },
  },
  plugins: [],
};
