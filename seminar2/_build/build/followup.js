// Post-seminar follow-up email and YouTube description for Health Bridge Seminar 2.
// Usage: node followup.js <out.docx>
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle, ShadingType,
} = require("docx");

const out = process.argv[2] || path.join(__dirname, "..", "out", "followup.docx");
const NAVY = "1F4E79", BLUE = "2E74B5", GREY = "595959";

// Text segments: plain strings, {b: "bold"}, {i: "italic"}, {fill: "[placeholder]"} (highlighted).
const seg = (s) => {
  if (typeof s === "string") return new TextRun(s);
  if (s.b) return new TextRun({ text: s.b, bold: true });
  if (s.i) return new TextRun({ text: s.i, italics: true });
  return new TextRun({ text: s.fill, shading: { type: ShadingType.CLEAR, fill: "FFE36E", color: "auto" } });
};
const p = (parts, o = {}) => new Paragraph({ children: [].concat(parts).map(seg), ...o });
const h1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const note = (t) => new Paragraph({ children: [new TextRun({ text: t, italics: true, color: GREY, size: 20 })] });

// Copyable blocks are set off with a left rule.
const block = (parts, o = {}) => p(parts, {
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: BLUE, space: 12 } },
  indent: { left: 240 },
  spacing: { after: 160 },
  ...o,
});
const line = (parts) => block(parts, { spacing: { after: 0 } });

const email = [
  block([{ b: "Subject: " }, "Thank you for joining us – recording of “From Crisis to Contribution” now available"], { spacing: { after: 280 } }),
  block("Dear participants,"),
  block([
    "Thank you for joining the second Health Bridge online seminar, ",
    { b: "“From Crisis to Contribution: Ukraine’s Role in Advancing Health Diplomacy”" },
    ", on 4 November. It was a pleasure to explore the paradox at the heart of the seminar together with you, and we are grateful to everyone who shared questions, both in advance and during the discussion.",
  ]),
  block("Our warm thanks also go to our speakers, Prof. Serhiy Dubrov, Prof. Dorit Nitzan and Natalia Pidmurniak, and to Prof. Olesya Hulchiy for moderating."),
  block([
    "The recording is now available on YouTube, so you can revisit a talk or share it with colleagues: ",
    { fill: "[link to recording]" },
    ". The chapters in the video let you jump straight to each talk and to the panel discussion.",
  ]),
  block([
    "We would be very grateful if you could take a few minutes to share your feedback. It helps us plan the next seminars in the series: ",
    { fill: "[link to form]" },
  ]),
  block("We hope to see you again at future Health Bridge events."),
  line("Kind regards,"),
  line({ fill: "[Your name]" }),
  line("on behalf of the Health Bridge team"),
  block("Karolinska Institutet · Bogomolets National Medical University · National University of Life and Environmental Sciences of Ukraine · University of Latvia"),
];

const CHAPTERS = [
  ["0:00", "Welcome and recap of Seminar 1 – Prof. Olesya Hulchiy"],
  [null, "Ukraine from the inside: the health system under pressure – Prof. Serhiy Dubrov"],
  [null, "From emergency response to health diplomacy: a regional perspective – Prof. Dorit Nitzan"],
  [null, "Looking ahead: a youth perspective – Natalia Pidmurniak"],
  [null, "Panel discussion, moderated by Prof. Olesya Hulchiy"],
  [null, "Closing and next steps"],
];

const youtube = [
  p("Paste this into the video description. YouTube turns the timestamps into clickable chapters when the first one is 0:00, there are at least three, and each chapter is at least 10 seconds long."),
  note("The times below are placeholders until they are checked against the recording."),
  line("Recording of the Health Bridge online seminar “From Crisis to Contribution: Ukraine’s Role in Advancing Health Diplomacy”, held on 4 November 2026."),
  block(""),
  ...CHAPTERS.map(([t, label]) => line([t ? t : { fill: "[mm:ss]" }, " " + label])),
  block(""),
  line("Organized by Health Bridge – a collaboration between Karolinska Institutet, Bogomolets National Medical University, the National University of Life and Environmental Sciences of Ukraine and the University of Latvia – funded by the Swedish Institute."),
  block("https://globalhealthdiplomacy.se/health-bridge"),
];

const doc = new Document({
  creator: "Health Bridge",
  title: "Seminar 2 – follow-up email and video timestamps",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 }, paragraph: { spacing: { after: 120, line: 264, lineRule: "auto" } } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Calibri", size: 30, bold: true, color: NAVY }, paragraph: { spacing: { before: 120, after: 160 }, keepNext: true, outlineLevel: 0 } },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1100, bottom: 1100, left: 1300, right: 1300 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: "Seminar 2 – follow-up email and video timestamps", bold: true, size: 36, color: NAVY, font: "Calibri" })], spacing: { after: 120 } }),
      p(["Before sending, fill in the ", { fill: "highlighted" }, " placeholders: the recording link, the form link and your name."], {
        shading: { fill: "F2F2F2", type: ShadingType.CLEAR, color: "auto" }, spacing: { after: 240 },
      }),
      h1("1. Follow-up email to participants"),
      ...email,
      new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun("2. YouTube description with timestamps")] }),
      ...youtube,
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  console.log("wrote", out);
});
