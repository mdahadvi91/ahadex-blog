import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// Plugin to rewrite extensionless URLs (e.g. /about -> /about.html)
const cleanUrlsPlugin: Plugin = {
  name: 'clean-urls-plugin',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url && !req.url.includes('.') && req.url !== '/') {
        const cleanPath = req.url.split('?')[0];
        const query = req.url.includes('?') ? `?${req.url.split('?')[1]}` : '';
        const directHtml = path.resolve(__dirname, `.${cleanPath}.html`);
        const indexHtml = path.resolve(__dirname, `.${cleanPath}/index.html`);

        if (fs.existsSync(directHtml)) {
          req.url = `${cleanPath}.html${query}`;
        } else if (fs.existsSync(indexHtml)) {
          req.url = `${cleanPath}/index.html${query}`;
        }
      }
      next();
    });
  },
};

export default defineConfig(() => {
  return {
    plugins: [cleanUrlsPlugin],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          privacy: path.resolve(__dirname, 'privacy.html'),
          disclaimer: path.resolve(__dirname, 'disclaimer.html'),
          terms: path.resolve(__dirname, 'terms.html'),
          editorial: path.resolve(__dirname, 'editorial-policy.html'),
          author: path.resolve(__dirname, 'author.html'),
          authorDetail: path.resolve(__dirname, 'authors/author-name.html'),
          postsIndex: path.resolve(__dirname, 'posts/index.html'),
          top10Ai: path.resolve(__dirname, 'posts/top-10-free-ai-tools-2026.html'),
          chatgptSecretCodes: path.resolve(__dirname, 'posts/chatgpt-secret-codes.html'),
          catAiTools: path.resolve(__dirname, 'categories/ai-tools.html'),
          catWebDev: path.resolve(__dirname, 'categories/web-development.html'),
          catProductivity: path.resolve(__dirname, 'categories/productivity.html'),
          catCybersecurity: path.resolve(__dirname, 'categories/cybersecurity.html'),
          catTechnology: path.resolve(__dirname, 'categories/technology.html'),
          tagAi: path.resolve(__dirname, 'tags/ai.html'),
          tagChatgpt: path.resolve(__dirname, 'tags/chatgpt.html'),
          tagJs: path.resolve(__dirname, 'tags/javascript.html'),
          tagProductivity: path.resolve(__dirname, 'tags/productivity.html'),
          tagSecurity: path.resolve(__dirname, 'tags/cybersecurity.html'),
          searchIndex: path.resolve(__dirname, 'search/index.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
  };
});
