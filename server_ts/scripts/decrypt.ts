import { createReadStream, createWriteStream } from "fs";
import { createDecipheriv } from "crypto";
import path from "path";

const configFile = path.join("./src/config/auth.json");
const encryptedfile = path.join("./src/config/auth.json.enc");
const key = process.argv[process.argv.length - 1];
const iv1 = "wF2kRE4CQayRFc86";

const input = createReadStream(encryptedfile);
const decipher = createDecipheriv("aes-256-cbc", key, iv1);
const output = createWriteStream(configFile);

input.pipe(decipher).pipe(output);

output.on("finish", function () {
  console.log("Decrypted file written to disk!");
});

// const cipher = ;

// const input: string = "what's my name";

// let encrypted = cipher.update(input, "utf-8", "hex");

// encrypted += cipher.final("hex");

// console.log("Encrypted: ", encrypted);

// const decipher = createDecipheriv("aes-256-cbc", key, iv1);

// let decrypted = decipher.update(encrypted, "hex", "utf-8");
// decrypted += decipher.final("utf-8");
// console.log(decrypted);
