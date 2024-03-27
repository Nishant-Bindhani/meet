/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // Note: This is @notapatch and not the docs
      //       if you define
      //       a custom font here you are also removing the default
      //       font families sans, serif and mono.
      //
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Poppins"],
      body: ['"Open Sans"'],
      bebas: ["Bebas Neue", "sans-serif"],
      dance: ["Dancing Script", "cursive"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
