import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = {
  1: {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    passwordHash: "$2b$10$example-hash"
  }
};

// Intentionally vulnerable endpoint:
// The UI only needs name and email, but the API returns the entire record.
app.get("/api/profile/:id", (req, res) => {
  const user = users[req.params.id];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Demo running at http://localhost:${port}`);
});
