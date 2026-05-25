import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const body = await req.json();

  const pdfPath = path.join(
    process.cwd(),
    "templates",
    "account-opening.pdf"
  );

  const existingPdfBytes = fs.readFileSync(pdfPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const page = pdfDoc.getPages()[0];

  const font = await pdfDoc.embedFont(
    StandardFonts.Helvetica
  );

  page.drawText(body.surname || "", {
    x: 170,
    y: 510,
    size: 10,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(body.firstName || "", {
    x: 170,
    y: 480,
    size: 10,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(body.bvn || "", {
    x: 160,
    y: 690,
    size: 10,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        "attachment; filename=account-opening.pdf",
    },
  });
}