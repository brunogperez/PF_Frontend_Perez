/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Agregamos Flowbite pero sin eliminar nuestros archivos
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
