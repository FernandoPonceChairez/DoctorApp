/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/auth/**/*.{js,jsx,ts,tsx}", "./app/doctor/**/*.{js,jsx,ts,tsx}", "./app/main/**/*.{js,jsx,ts,tsx}", "./app/notifications/**/*.{js,jsx,ts,tsx}", "./app/profile/**/*.{js,jsx,ts,tsx}", "./app/settings/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}