import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // In-memory active visitor tracking
  const activeClients = new Map<string, number>();

  // API Heartbeat Endpoint
  app.post("/api/heartbeat", (req, res) => {
    const { clientId } = req.body;
    
    if (clientId) {
      activeClients.set(clientId, Date.now());
    }

    // Clean up inactive clients (older than 10 seconds)
    const now = Date.now();
    for (const [id, lastSeen] of activeClients.entries()) {
      if (now - lastSeen > 10000) {
        activeClients.delete(id);
      }
    }

    // Return the actual unique tabs active count
    const count = activeClients.size;
    res.json({ onlineCount: count });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite developer mode middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up production static folder delivery...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server actively running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical error starting fullstack server:", err);
});
