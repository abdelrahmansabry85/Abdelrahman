import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { handleChatRequest, handleQuizRequest } from "./server/aiService";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

export const app = express();

app.use(express.json({ limit: "5mb" }));

// Enable CORS for API requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Health check
app.get(["/api/health", "/health"], (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Chat Assistant endpoint
app.post(["/api/ai/chat", "/ai/chat"], async (req, res) => {
  const result = await handleChatRequest(req.body);
  return res.json(result);
});

// Quiz Generator endpoint
app.post(["/api/ai/quiz", "/ai/quiz"], async (req, res) => {
  const result = await handleQuizRequest(req.body);
  return res.json(result);
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

