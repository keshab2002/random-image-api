// upload_images.js
import fs from "fs";
import path from "path";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const FOLDER = "../local-images"; // put your images here
const results = [];

async function main() {
  const files = fs.readdirSync(FOLDER).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  for (const file of files) {
    const filePath = path.join(FOLDER, file);
    const res = await cloudinary.v2.uploader.upload(filePath, { folder: "my-images" });
    console.log("Uploaded:", res.secure_url);
    results.push(res.secure_url);
  }
  fs.writeFileSync("images.json", JSON.stringify(results, null, 2));
  console.log("Saved images.json with", results.length, "URLs");
}
main().catch(err => console.error(err));
