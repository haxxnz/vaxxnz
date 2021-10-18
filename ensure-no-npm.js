const fs = require("fs")

if (fs.existsSync("package-lock.json")) {
  console.log("\u001b[41mVaxxnz uses Yarn and not NPM. Don't commit package-lock.json\u001b[0m");
}
