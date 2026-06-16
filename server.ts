import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  const dbPath = path.join(process.cwd(), "posts_db.json");
  const fallbackDbPath = path.join(process.cwd(), "src", "posts_db.json");

  // Helper to read posts
  function readPosts() {
    try {
      if (fs.existsSync(dbPath)) {
        const raw = fs.readFileSync(dbPath, "utf-8");
        return JSON.parse(raw);
      } else if (fs.existsSync(fallbackDbPath)) {
        const raw = fs.readFileSync(fallbackDbPath, "utf-8");
        try {
          fs.writeFileSync(dbPath, raw, "utf-8");
        } catch (err) {
          console.error("Warning copying base database:", err);
        }
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("Error reading database file:", e);
    }
    return [];
  }

  // Helper to write posts
  function writePosts(posts: any[]) {
    try {
      fs.writeFileSync(dbPath, JSON.stringify(posts, null, 2), "utf-8");
    } catch (e) {
      console.error("Error writing database file:", e);
    }
  }

  // API Forum Endpoints
  app.get("/api/posts", (req, res) => {
    res.json(readPosts());
  });

  app.post("/api/posts", (req, res) => {
    const { id, title, content, author, category, assignedCountry, assignedLandmark } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const posts = readPosts();
    const newPost = {
      id: id || `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      content,
      author,
      createdAt: Date.now(),
      likes: 0,
      replies: [],
      category: category || "ask",
      assignedCountry: assignedCountry || undefined,
      assignedLandmark: assignedLandmark || undefined
    };
    posts.unshift(newPost);
    writePosts(posts);
    res.status(201).json(newPost);
  });

  app.post("/api/posts/:id/replies", (req, res) => {
    const { id: postId } = req.params;
    const { author, content, isLocalExpert } = req.body;
    if (!author || !content) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const posts = readPosts();
    const postIndex = posts.findIndex((p: any) => p.id === postId);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newReply = {
      id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      author,
      content,
      createdAt: Date.now(),
      isLocalExpert: !!isLocalExpert
    };

    posts[postIndex].replies.push(newReply);
    writePosts(posts);
    res.status(201).json({ reply: newReply, post: posts[postIndex] });
  });

  app.post("/api/posts/:id/like", (req, res) => {
    const { id: postId } = req.params;
    const { isLiked } = req.body;
    const posts = readPosts();
    const postIndex = posts.findIndex((p: any) => p.id === postId);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }
    const delta = isLiked ? 1 : -1;
    posts[postIndex].likes = Math.max(0, (posts[postIndex].likes || 0) + delta);
    writePosts(posts);
    res.json(posts[postIndex]);
  });

  app.delete("/api/posts", (req, res) => {
    writePosts([]);
    res.json({ success: true });
  });

  app.delete("/api/posts/:id", (req, res) => {
    const { id: postId } = req.params;
    const posts = readPosts();
    const filtered = posts.filter((p: any) => p.id !== postId);
    writePosts(filtered);
    res.json({ success: true });
  });

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
