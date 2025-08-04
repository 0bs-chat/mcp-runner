import { exportJWK, exportPKCS8, generateKeyPair } from "jose";

// Generate keys
const keys = await generateKeyPair("RS256", { extractable: true });
const privateKey = await exportPKCS8(keys.privateKey);
const publicKey = await exportJWK(keys.publicKey);
const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

let result = Bun.spawnSync([
  "bunx",
  "convex",
  "env",
  "set",
  "JWT_PRIVATE_KEY",
  `"${privateKey.trimEnd().replace(/\n/g, " ")}"`
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