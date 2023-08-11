const express = require("express");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const stripe_sub = require("./routes/stripe_sub.js");
const app = express();

app.use("/register", stripe_sub);

app.use((req, res, next) => {
  let requestedPath = decodeURI(path.normalize(req.path));
  const acceptedEncodings = req.headers["accept-encoding"] || "";
  const canAcceptBrotli = acceptedEncodings.includes("br");
  const canAcceptGzip = acceptedEncodings.includes("gzip");
  let resolvedBrPath_hack = path.join(
    __dirname.toString(),
    "public_br",
    `${requestedPath}.html.br`
  );
  let resolvedBrPath = path.join(
    __dirname.toString(),
    "public_br",
    `${requestedPath}.br`
  );
  let resolvedBrPath_folder = path.join(
    __dirname.toString(),
    "public_br",
    requestedPath,
    "index.html.br"
  );
  for (p of [resolvedBrPath_hack, resolvedBrPath, resolvedBrPath_folder]) {
    if (fs.existsSync(p) & canAcceptBrotli) {
      try {
        let statsObj = fs.statSync(p);
        if (!statsObj.isFile()) {
          continue;
        }
        const brReadStream = fs.createReadStream(p);
        const fileExtension2 = p.match(/\.([^.]+)\.gz$/)[1];
        res.set("Content-Encoding", "br");
        const contentType =
          mime.contentType(fileExtension2) || "application/octet-stream";
        res.set("Content-Type", contentType);
        brReadStream.pipe(res);

        return;
      } catch {}
    }
  }
  let resolvedGzipPath_hack = path.join(
    __dirname.toString(),
    "public_gzip",
    `${requestedPath}.html.gz`
  );
  let resolvedGzipPath = path.join(
    __dirname.toString(),
    "public_gzip",
    `${requestedPath}.gz`
  );
  let resolvedGzipPath_folder = path.join(
    __dirname.toString(),
    "public_gzip",
    requestedPath,
    "index.html.gz"
  );
  for (p of [
    resolvedGzipPath_hack,
    resolvedGzipPath,
    resolvedGzipPath_folder,
  ]) {
    if (fs.existsSync(p) & canAcceptGzip) {
      try {
        let statsObj = fs.statSync(p);
        if (!statsObj.isFile()) {
          continue;
        }
        const brReadStream = fs.createReadStream(p);
        const fileExtension2 = p.match(/\.([^.]+)\.gz$/)[1];
        res.set("Content-Encoding", "gzip");
        const contentType =
          mime.contentType(fileExtension2) || "application/octet-stream";
        res.set("Content-Type", contentType);
        brReadStream.pipe(res);

        return;
      } catch {}
    }
  }
  next();
});
app.use((req, res, next) => {
  const options = {
    root: path.join(__dirname, "output"),
  };
  res.status(404);
  const fileName = "404.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    }
  });
});
// app.use(express.static("output"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
