// Certificate for Health Bridge Seminar 2, rebuilt from the Seminar 1 draft layout.
// Usage: node certificate.js <out.docx> [participantName]
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, Footer,
  AlignmentType, WidthType, BorderStyle, VerticalAlign, PageOrientation, CharacterSet,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom, TextWrappingType,
} = require("docx");

const ROOT = path.resolve(__dirname, "..");
const out = process.argv[2] || path.join(ROOT, "out", "certificate.docx");
const participant = process.argv[3] || "Name Surname";

const BLUE = "356CA0";
const F_TITLE = "Poppins Medium";
const F_TEXT = "Poppins Light";
const F_NAME = "Barlow Semi Condensed SemiBold";

const SEMINAR_LINE_1 = "For participation in the online seminar «From Crisis to Contribution:";
const SEMINAR_LINE_2 = "Ukraine’s Role in Advancing Health Diplomacy»";
const DATE_LINE = "4 November 2026, 2 hours";

const SIGNATORIES = [
  { name: "Marie HASSELBERG", lines: ["Head of Department", "Department of Global Public Health", "Karolinska Institutet"] },
  { name: "Serhiy DUBROV", lines: ["Director General", "Kyiv City Clinical Hospital No. 12"] },
  { name: "Dorit NITZAN", lines: ["Director, School of Public Health", "Ben-Gurion University of the Negev"] },
  { name: "Natalia PIDMURNIAK", lines: ["Member, Youth Council", "Ministry of Health of Ukraine"] },
];

const img = (f) => fs.readFileSync(path.join(ROOT, f));
const font = (f) => fs.readFileSync(path.join(ROOT, "fonts", f));
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder };

// A4 landscape in DXA; logo sizes are px at 96 dpi, matching the draft (logos ~1.1in tall).
const PAGE_W = 16838, MARGIN_X = 1080;
const CONTENT_W = PAGE_W - 2 * MARGIN_X;

const logos = [
  { file: "logos/ki_seal_hires.png", w: 105.6, h: 106, cell: 2909 },
  { file: "logos/bogomolets.png", w: 97.8, h: 106, cell: 2794 },
  { file: "logos/nubip.png", w: 106, h: 106, cell: 2918 },
  { file: "logos/latvia.png", w: 204, h: 69.7, cell: 4368 },
];
const logoTableW = logos.reduce((s, l) => s + l.cell, 0);

const logoRow = new Table({
  width: { size: logoTableW, type: WidthType.DXA },
  columnWidths: logos.map((l) => l.cell),
  alignment: AlignmentType.CENTER,
  borders: noBorders,
  rows: [new TableRow({
    children: logos.map((l) => new TableCell({
      width: { size: l.cell, type: WidthType.DXA },
      borders: noBorders,
      verticalAlign: VerticalAlign.CENTER,
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new ImageRun({ type: "png", data: img(l.file), transformation: { width: l.w, height: l.h } })],
      })],
    })),
  })],
});

const centered = (text, { font: f = F_TEXT, size, before = 0, after = 0, line }) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before, after, line: line || Math.round(size * 13), lineRule: "exact" },
  children: [new TextRun({ text, font: f, size, color: BLUE })],
});

const sigColW = Math.floor(CONTENT_W / SIGNATORIES.length);
const signatures = new Table({
  width: { size: sigColW * SIGNATORIES.length, type: WidthType.DXA },
  columnWidths: SIGNATORIES.map(() => sigColW),
  alignment: AlignmentType.CENTER,
  borders: noBorders,
  rows: [new TableRow({
    children: SIGNATORIES.map((s) => new TableCell({
      width: { size: sigColW, type: WidthType.DXA },
      borders: noBorders,
      verticalAlign: VerticalAlign.TOP,
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40, line: 340, lineRule: "exact" },
          children: [new TextRun({ text: s.name, font: F_NAME, size: 27, color: BLUE })],
        }),
        ...s.lines.map((t) => new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { line: 260, lineRule: "exact" },
          children: [new TextRun({ text: t, font: F_TEXT, size: 19, color: BLUE })],
        })),
      ],
    })),
  })],
});

// Footer: full-bleed magenta/blue stripes, then the date centred with the funder logo at right.
const stripes = new ImageRun({
  type: "png",
  data: img("build/stripes.png"),
  transformation: { width: 1122.5, height: 17.3 },
  floating: {
    horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 },
    verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: Math.round(545 * 12700) },
    wrap: { type: TextWrappingType.NONE },
    behindDocument: true,
    allowOverlap: true,
  },
});

const sideW = 3800;
const footerRow = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [sideW, CONTENT_W - 2 * sideW, sideW],
  borders: noBorders,
  rows: [new TableRow({
    children: [
      new TableCell({ width: { size: sideW, type: WidthType.DXA }, borders: noBorders, children: [new Paragraph({ children: [] })] }),
      new TableCell({
        width: { size: CONTENT_W - 2 * sideW, type: WidthType.DXA }, borders: noBorders, verticalAlign: VerticalAlign.CENTER,
        children: [centered(DATE_LINE, { size: 22 })],
      }),
      new TableCell({
        width: { size: sideW, type: WidthType.DXA }, borders: noBorders, verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new ImageRun({ type: "png", data: img("logos/si_logo_trim.png"), transformation: { width: 95, height: 29.5 } })],
        })],
      }),
    ],
  })],
});

const doc = new Document({
  creator: "Health Bridge",
  title: "Certificate – Seminar 2: From Crisis to Contribution",
  fonts: [
    { name: F_TITLE, data: font("Poppins-Medium.ttf"), characterSet: CharacterSet.ANSI },
    { name: F_TEXT, data: font("Poppins-Light.ttf"), characterSet: CharacterSet.ANSI },
    { name: F_NAME, data: font("BarlowSemiCondensed-SemiBold.ttf"), characterSet: CharacterSet.ANSI },
  ],
  styles: { default: { document: { run: { font: F_TEXT, size: 22, color: BLUE } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838, orientation: PageOrientation.LANDSCAPE },
        margin: { top: 840, bottom: 1240, left: MARGIN_X, right: MARGIN_X, header: 360, footer: 240 },
      },
    },
    footers: { default: new Footer({ children: [
      new Paragraph({ spacing: { before: 0, after: 0, line: 20, lineRule: "exact" }, children: [stripes] }),
      footerRow,
    ] }) },
    children: [
      logoRow,
      centered("CERTIFICATE", { font: F_TITLE, size: 100, before: 1200, line: 1240 }),
      centered(SEMINAR_LINE_1, { size: 24, before: 760, line: 420 }),
      centered(SEMINAR_LINE_2, { size: 24, line: 420 }),
      centered(participant, { font: F_NAME, size: 52, before: 700, line: 720 }),
      new Paragraph({ spacing: { before: 0, line: 1350, lineRule: "exact" }, children: [] }),
      signatures,
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  console.log("wrote", out);
});
