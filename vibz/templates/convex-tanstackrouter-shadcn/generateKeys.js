import { exportJWK, exportPKCS8, generateKeyPair } from "jose";

// Generate keys
const keys = await generateKeyPair("RS256", { extractable: true });
const privateKey = await exportPKCS8(keys.privateKey);
const publicKey = await exportJWK(keys.publicKey);
const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

// Set JWT_PRIVATE_KEY - use base64 encoding to avoid command line issues
const privateKeyBase64 = Buffer.from(privateKey).toString('base64');
let result = Bun.spawnSync([
  "bunx",
  "convex",
  "env",
  "set",
  "JWT_PRIVATE_KEY",
  privateKeyBase64
]);
console.log(result.stdout.toString(), result.stderr.toString());

// Set JWKS
result = Bun.spawnSync([
  "bunx",
  "convex",
  "env",
  "set",
  "JWKS",
  jwks
]);
console.log(result.stdout.toString(), result.stderr.toString());