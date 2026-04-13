# iniciar pryecto de vite:
npm create vite@latest
npm install --save-dev @vitejs

# iniciar tailwind
npm install tailwindcss @tailwindcss/vite
# agregar plugin de vite en el js:
import tailwind from '@tailwindcss/vite'
export default {
    plugins [tailwind()]
}