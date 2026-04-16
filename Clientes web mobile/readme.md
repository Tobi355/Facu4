# iniciar pryecto de vite:
npm create vite@latest

# instalar vue en el proyecto:
npm install vue@latest

# iniciar tailwind
npm install tailwindcss @tailwindcss/vite

# agregar plugin de tailwind en el js:
import tailwind from '@tailwindcss/vite'
export default {
    plugins [tailwind()]
}