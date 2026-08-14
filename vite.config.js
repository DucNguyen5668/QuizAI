import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom Vite Plugin để tích hợp Scraper API (chỉ chạy ở local dev)
const scraperAPI = () => ({
  name: "scraper-api",
  configureServer(server) {
    // Chỉ load Puppeteer scraper khi đang chạy local (không có trên Vercel)
    server.middlewares.use(async (req, res, next) => {
      if (req.url === "/api/scrape" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
          body += chunk.toString();
        });
        req.on("end", async () => {
          try {
            const { runScraper } = await import("./scripts/api-scraper.js");
            const data = JSON.parse(body);
            const { targetUrl, folderName } = data;
            
            if (!targetUrl || !folderName) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: "Thiếu targetUrl hoặc folderName" }));
            }

            const resultFiles = await runScraper(targetUrl, folderName);
            
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true, files: resultFiles }));
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

export default defineConfig({
  plugins: [react(), scraperAPI()],
  server: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: true,
    // Required for Tesseract.js SharedArrayBuffer (OCR uses WASM threads)
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  optimizeDeps: {
    include: ["mammoth"],
    exclude: ["pdfjs-dist"],
  },
});
