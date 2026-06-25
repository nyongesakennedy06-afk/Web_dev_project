import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin so we can write JSX inside .js files (not .jsx)
const transformJsxInJs = () => ({
  name: 'transform-jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.match(/.*\.js$/)) return null;
    return await transformWithOxc(code, id, { lang: 'jsx' });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), transformJsxInJs()],
})
