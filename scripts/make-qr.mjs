// Makes the QR code in the Back panel: public/get-the-app-qr.svg.
// It points at ballduty.com/get, which sends each phone to its own store
// (src/app/get/route.ts). Run again only if that address changes:
//
//   node scripts/make-qr.mjs
import fs from "node:fs";
import QRCode from "qrcode";

const svg = await QRCode.toString("https://ballduty.com/get", {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 2,
  color: { dark: "#1A1A1A", light: "#FFFFFF" },
});
fs.writeFileSync(new URL("../public/get-the-app-qr.svg", import.meta.url), svg);
console.log("Wrote public/get-the-app-qr.svg");
