// tailwind.config.js
// const { nextui } = require("@nextui-org/react");
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
// module.exports = {
export default {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()]
}