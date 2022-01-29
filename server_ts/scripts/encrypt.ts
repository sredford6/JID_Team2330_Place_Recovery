import { createReadStream, createWriteStream } from "fs";
import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

// const key = process.argv[process.argv.length - 1];
// const key = Buffer.from("helloworldfdsafdsafdsa").slice(0, 45); //[...Buffer.from("hello world fdsafdsafsa")].slice(0, 16);
// console.log(key.byteLength);
const key = "xDScZ9ED8Sb6QXGBDhO2V5ggGBBoGLsN";
const iv1 = "wF2kRE4CQayRFc86";

const cipher = createCipheriv("aes-256-cbc", key, iv1);

const input: string = "what's my name";

let encrypted = cipher.update(input, "utf-8", "hex");

encrypted += cipher.final("hex");

console.log("Encrypted: ", encrypted);

const decipher = createDecipheriv("aes-256-cbc", key, iv1);

let decrypted = decipher.update(encrypted, "hex", "utf-8");
decrypted += decipher.final("utf-8");
console.log(decrypted);
