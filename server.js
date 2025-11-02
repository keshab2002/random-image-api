// server.js
import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;
const images = JSON.parse(fs.readFileSync(new URL('./images.json', import.meta.url), 'utf8'));

import cors from "cors";
app.use(cors());

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Redirect approach (fast): visiting /random will redirect the visitor to the image URL
app.get("/random", (req, res) => {
  const url = randomItem(images);
  res.redirect(url);
});

// Optional: get count
app.get("/count", (req, res) => res.json({ count: images.length }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
