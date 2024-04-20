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
  extend: {
    backgroundImage: {
      hero: "url('https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=600')",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
