import admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { readFile } from "fs/promises";

const serviceAccount = JSON.parse(
  await readFile(new URL("../serviceAccountKey.json", import.meta.url)),
);
export const app = initializeApp({
  credential: cert(serviceAccount),
});
