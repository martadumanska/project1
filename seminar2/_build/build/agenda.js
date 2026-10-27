// One-page participant agenda for Health Bridge Seminar 2 (rebuilt from seminar2_agenda_v2.docx).
// Usage: node agenda.js <out.docx>
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, Footer, Header,
  AlignmentType, WidthType, BorderStyle, VerticalAlign, ShadingType, HeadingLevel,
} = require("docx");

const ROOT = path.resolve(__dirname, "..");
const out = process.argv[2] || path.join(ROOT, "out", "agenda.docx");
const img = (f) => fs.readFileSync(path.join(ROOT, f));

const NAVY = "1F4E79", BLUE = "2E74B5", GREY = "595959", BAND = "F2F2F2", BOX = "EAF1F8", RULE = "BFBFBF";
const PAGE_W = 11906, MARGIN_X = 1080;
const CONTENT_W = PAGE_W - 2 * MARGIN_X;

const run = (text, o = {}) => new TextRun({ text, ...o });
const para = (children, o = {}) => new Paragraph({ children: [].concat(children), ...o });
const heading = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 140, after: 40 },
  children: [run(text)],
});

const line = { style: BorderStyle.SINGLE, size: 4, color: RULE };
const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };
const cellMargins = { top: 45, bottom: 45, left: 100, right: 100 };

// --- The paradox: two questions side by side ---
const half = Math.floor(CONTENT_W / 2) - 60;
const gap = CONTENT_W - 2 * half;
const questionCell = (q, sub) => new TableCell({
  width: { size: half, type: WidthType.DXA },
  shading: { fill: BOX, type: ShadingType.CLEAR, color: "auto" },
  margins: { top: 90, bottom: 90, left: 140, right: 140 },
  borders: { top: none, bottom: none, right: none, left: { style: BorderStyle.SINGLE, size: 18, color: BLUE } },
  children: [
    para(run(q, { bold: true, color: NAVY }), { spacing: { after: 30 } }),
    para(run(sub, { italics: true, color: GREY, size: 20 })),
  ],
});
const paradox = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [half, gap, half],
  borders: noBorders,
  rows: [new TableRow({
    children: [
      questionCell("Why does a country under daily attack choose to become a security donor?", "(What drives a nation to give when it is under threat?)"),
      new TableCell({ width: { size: gap, type: WidthType.DXA }, borders: noBorders, children: [para([])] }),
      questionCell("How can a country in acute need contribute anything to others at all?", "(Where does the capacity come from?)"),
    ],
  })],
});

// --- Programme ---
const COLS = [1150, 6196, 2400];
const PROGRAMME = [
  ["10 min", "Recap from Seminar 1 + The Paradox", "Key findings from the first seminar and the two questions that frame the discussion ahead.", "Prof. Olesya Hulchiy"],
  ["20 min", "Ukraine from the inside: what the system looks like under pressure", "Three perspectives in one narrative: clinician, administrator, academic. What the health system goes through during war — and what that experience looks like from the outside.", "Prof. Serhiy Dubrov"],
  ["20 min", "From emergency response to health diplomacy: a regional perspective", null, "Prof. Dorit Nitzan"],
  ["10 min", "Looking ahead: questions on the horizon for academic health diplomacy", "A youth perspective — her own path into the field, the work of the Youth Council, and what international cooperation looks like from where she stands.", "Natalya Pidmurniak"],
  ["45–50 min", "Panel discussion", "Moderated discussion around 2–3 focus questions, drawn from participants’ questions submitted in advance. Speakers + floor.", "All speakers + participants"],
  ["5–10 min", "Closing", "Key takeaways. Next steps within Health Bridge.", "Moderator"],
];
const tcell = (w, children, fill) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  margins: cellMargins,
  shading: fill ? { fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
  children,
});
const headerRow = new TableRow({
  tableHeader: true,
  children: ["Time", "Block", "Who"].map((t, i) => tcell(COLS[i], [para(run(t, { bold: true, color: "FFFFFF", size: 21 }))], NAVY)),
});
const rows = PROGRAMME.map(([time, title, desc, who], i) => {
  const fill = i % 2 === 0 ? BAND : undefined;
  return new TableRow({
    cantSplit: true,
    children: [
      tcell(COLS[0], [para(run(time, { size: 21 }))], fill),
      tcell(COLS[1], [
        para(run(title, { bold: true, size: 21 }), { spacing: { after: desc ? 20 : 0 } }),
        ...(desc ? [para(run(desc, { color: "404040", size: 19 }))] : []),
      ], fill),
      tcell(COLS[2], [para(run(who, { size: 21 }))], fill),
    ],
  });
});
const programme = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: COLS,
  borders: { top: line, bottom: line, left: line, right: line, insideHorizontal: line, insideVertical: line },
  rows: [headerRow, ...rows],
});

// --- Footer: organisers + logos, as on the invitation ---
const footerLogos = [
  { file: "logos/ki_seal_hires.png", w: 44, h: 44, cell: 900 },
  { file: "logos/bogomolets.png", w: 40.6, h: 44, cell: 900 },
  { file: "logos/nubip.png", w: 44, h: 44, cell: 900 },
  { file: "logos/latvia.png", w: 100, h: 34.2, cell: 1800 },
];
const SI_CELL = 2000;
const spacer = CONTENT_W - SI_CELL - footerLogos.reduce((s, l) => s + l.cell, 0);
const logoCell = (w, children, align = AlignmentType.LEFT) => new TableCell({
  width: { size: w, type: WidthType.DXA }, borders: noBorders, verticalAlign: VerticalAlign.CENTER,
  margins: { left: 0, right: 0 },
  children: [para(children, { alignment: align, spacing: { after: 0 } })],
});
const footer = new Footer({
  children: [
    para(run("Organized by Health Bridge \u2014 a collaboration between Karolinska Institutet, Bogomolets National Medical University, the National University of Life and Environmental Sciences of Ukraine and the University of Latvia \u2014 funded by the Swedish Institute.", { size: 16, color: GREY }), {
      alignment: AlignmentType.CENTER,
      spacing: { after: 100, line: 240 },
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 6 } },
    }),
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [...footerLogos.map((l) => l.cell), spacer, SI_CELL],
      borders: noBorders,
      rows: [new TableRow({
        children: [
          ...footerLogos.map((l) => logoCell(l.cell, new ImageRun({ type: "png", data: img(l.file), transformation: { width: l.w, height: l.h } }))),
          logoCell(spacer, []),
          logoCell(SI_CELL, new ImageRun({ type: "png", data: img("logos/si_logo_trim.png"), transformation: { width: 103, height: 32 } }), AlignmentType.RIGHT),
        ],
      })],
    }),
  ],
});

const header = new Header({
  children: [para(new ImageRun({ type: "png", data: img("logos/healthbridge.png"), transformation: { width: 76, height: 51 } }), { spacing: { after: 0 } })],
});

const doc = new Document({
  creator: "Health Bridge",
  title: "Seminar 2 agenda – From Crisis to Contribution",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 }, paragraph: { spacing: { after: 60, line: 240, lineRule: "auto" } } } },
    paragraphStyles: [{
      id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { font: "Calibri", size: 26, bold: true, color: BLUE },
      paragraph: { keepNext: true, outlineLevel: 1 },
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: 16838 },
        margin: { top: 1360, bottom: 1760, left: MARGIN_X, right: MARGIN_X, header: 340, footer: 340 },
      },
    },
    headers: { default: header },
    footers: { default: footer },
    children: [
      para(run("Seminar 2. From Crisis to Contribution:", { bold: true, size: 32, color: NAVY }), { alignment: AlignmentType.CENTER, spacing: { after: 0 } }),
      para(run("Ukraine’s Role in Advancing Health Diplomacy", { bold: true, size: 32, color: NAVY }), { alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
      para(run("Wednesday, 4 November 2026  ·  13:00–15:30 CET (14:00–16:30 EEST)  ·  Online (Zoom)  ·  English", { color: GREY }), { alignment: AlignmentType.CENTER, spacing: { after: 120 } }),

      heading("Concept"),
      para(run("The first seminar established the foundations: what health diplomacy is and why it matters for the region. This seminar takes a step further — from concept to agency.")),
      para(run("Ukraine is generating knowledge that exists nowhere else: in health system resilience under pressure, crisis management, and academic continuity during conflict. The seminar aims to make this knowledge visible and legible to an international audience — and to examine the role of academic partnerships as an instrument of diplomacy.")),

      heading("The Paradox"),
      para(run("During Seminar 1, a question was raised that remained unanswered. Prof. Hulchiy will open this seminar by returning to it — as a recap of what was discussed and as a frame for what follows.")),
      para(run("This seminar is built around a paradox — or perhaps two sides of the same question:", { italics: true }), { spacing: { after: 100 } }),
      paradox,
      para(run("You don’t have to choose one. But by the end of today, we hope you’ll have your own answer.", { italics: true }), { spacing: { before: 100, after: 40 } }),

      heading("Programme"),
      programme,
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  console.log("wrote", out);
});
