import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SRC_DIR = path.join(process.cwd(), "src");

// Configuration
const QUALITY = 80;
const DELETE_ORIGINALS = true;

// Helper to get all files recursively
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

// Helper to replace text in a file
function replaceInFile(filePath, searchValue, replaceValue) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    if (content.includes(searchValue)) {
      const newContent = content.replaceAll(searchValue, replaceValue);
      fs.writeFileSync(filePath, newContent, "utf8");
      return true;
    }
  } catch (err) {
    console.error(`Error updating references in ${filePath}:`, err);
  }
  return false;
}

// Helper to scan src for references and update them
function updateReferences(oldPathRelative, newPathRelative) {
  // Normalize paths to forward slashes for extensive searching (JS usually uses / even on Windows)
  const oldStr = oldPathRelative.split(path.sep).join("/");
  const newStr = newPathRelative.split(path.sep).join("/");

  // Also try with leading slash
  const oldStrAbsolute = `/${oldStr}`;
  const newStrAbsolute = `/${newStr}`;

  const srcFiles = getAllFiles(SRC_DIR, []);
  let updateCount = 0;

  srcFiles.forEach((file) => {
    // Skip non-code files if necessary, but checking all is safer for references
    // Simple extension check
    if (!file.match(/\.(tsx|ts|js|jsx|css|scss|mdx)$/)) return;

    let updated = false;

    // Try absolute path first (most common in Next.js public folder usage)
    if (replaceInFile(file, oldStrAbsolute, newStrAbsolute)) {
      updated = true;
    }
    // Try relative path (less common for public folder but possible)
    else if (replaceInFile(file, oldStr, newStr)) {
      updated = true;
    }

    if (updated) {
      console.log(
        `  Updated reference in: ${path.relative(process.cwd(), file)}`,
      );
      updateCount++;
    }
  });

  return updateCount;
}

async function main() {
  console.log("Starting image optimization...");
  console.log(`Scanning directory: ${PUBLIC_DIR}`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error("Public directory not found!");
    return;
  }

  const allFiles = getAllFiles(PUBLIC_DIR, []);
  const imageFiles = allFiles.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".png", ".jpg", ".jpeg"].includes(ext);
  });

  console.log(`Found ${imageFiles.length} images to optimize.`);

  let savedBytes = 0;

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const newFile = file.replace(ext, ".webp");

    // Skip if webp already exists
    if (fs.existsSync(newFile)) {
      console.log(`Skipping ${path.basename(file)} (WebP already exists)`);
      continue;
    }

    try {
      const originalStats = fs.statSync(file);

      await sharp(file).webp({ quality: QUALITY }).toFile(newFile);

      const newStats = fs.statSync(newFile);
      const savings = originalStats.size - newStats.size;
      savedBytes += savings;

      console.log(
        `Converted: ${path.relative(PUBLIC_DIR, file)} -> ${path.relative(PUBLIC_DIR, newFile)}`,
      );
      console.log(
        `  Size: ${(originalStats.size / 1024).toFixed(2)}KB -> ${(newStats.size / 1024).toFixed(2)}KB (Saved ${(savings / 1024).toFixed(2)}KB)`,
      );

      // Update references
      const relativeOld = path.relative(PUBLIC_DIR, file);
      const relativeNew = path.relative(PUBLIC_DIR, newFile);
      const updates = updateReferences(relativeOld, relativeNew);

      if (updates > 0) {
        console.log(`  Updated ${updates} references in code.`);
      } else {
        console.log(
          `  ⚠️ No references found in src/ for this file. Please check manually.`,
        );
      }

      if (DELETE_ORIGINALS) {
        fs.unlinkSync(file);
        console.log(`  Deleted original: ${path.basename(file)}`);
      }
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }

  console.log("--------------------------------------------------");
  console.log(`Total space saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log("Optimization complete!");
}

main();
