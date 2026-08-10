# CS_Lab2

## Excessive Data Exposure Demo

A deliberately vulnerable JavaScript + Express website demonstrating
**Excessive Data Exposure via API**.

## Demo Video

📹 [Watch Demo Video](https://drive.google.com/file/d/1Om2nDQ34dkrHcVMnxjlh1KbEQm6A8XbR/view?usp=sharing)


## Run

```bash
pnpm install or npm install
pnpm start or npm start
```

Open:

http://localhost:3000

## What is vulnerable?

The frontend only needs:

- `name`
- `email`

But `/api/profile/1` returns additional internal fields such as:

- `phone`
- `address`
- `passwordHash`
- `internalNotes`
- `isAdmin`

The browser receives all of these fields even though the page only displays
two of them.

## Code Update to Fix Vulnerability

To fix the Excessive Data Exposure vulnerability, update the endpoint in [`server.js`](server.js#L24-L32).

### File: [`server.js`](server.js)

**Vulnerable Code (Lines 24–32):**
```javascript
app.get("/api/profile/:id", (req, res) => {
  const user = users[req.params.id];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user); // Returns full object with sensitive data
});
```

**Fixed Code:**
```javascript
app.get("/api/profile/:id", (req, res) => {
  const user = users[req.params.id];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Fix: Expose only requested/necessary properties
  const { name, email } = user;
  res.json({ name, email });
});
```

## Test it

Open the browser's DevTools and go to the Network tab, then reload the page.
Open:

`GET /api/profile/1`

You can also directly visit:

`http://localhost:3000/api/profile/1`

This project is intentionally vulnerable for local security-learning purposes.

