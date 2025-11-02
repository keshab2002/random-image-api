// // server.js
// import express from "express";
// import fs from "fs";

// const app = express();
// const PORT = process.env.PORT || 3000;
// const images = JSON.parse(fs.readFileSync(new URL('./images.json', import.meta.url), 'utf8'));

// import cors from "cors";
// app.use(cors());

// function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// // Redirect approach (fast): visiting /random will redirect the visitor to the image URL
// app.get("/random", (req, res) => {
//   const url = randomItem(images);
//   res.redirect(url);
// });

// // Optional: get count
// app.get("/count", (req, res) => res.json({ count: images.length }));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const images = JSON.parse(fs.readFileSync(new URL('./images.json', import.meta.url), 'utf8'));

app.use(cors());

app.get("/random", (req, res) => {
  const randomImages = [];
  for (let i = 0; i < 3; i++) {
    const randomUrl = images[Math.floor(Math.random() * images.length)];
    randomImages.push(randomUrl);
  }
  res.json({ images: randomImages });
});

app.get("/count", (req, res) => res.json({ count: images.length }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
