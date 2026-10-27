// Participant email and Microsoft Forms setup for Health Bridge Seminar 2.
// Usage: node email.js <out.docx>
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, LevelFormat, ShadingType,
} = require("docx");

const out = process.argv[2] || path.join(__dirname, "..", "out", "email.docx");
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
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const note = (t) => new Paragraph({ children: [new TextRun({ text: t, italics: true, color: GREY, size: 20 })] });
const bullet = (parts) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 20 }, children: [].concat(parts).map(seg) });
const question = (n, title, type, opts = [], hint) => [
  p({ b: `${n}. ${title}` }, { spacing: { before: 120, after: 20 } }),
  note(type),
  ...(hint ? [p({ i: hint }, { spacing: { after: 40 } })] : []),
  ...opts.map((o) => bullet(o)),
];

// The email itself, set off with a left rule so it's easy to select and copy.
const emailPara = (parts, o = {}) => p(parts, {
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: BLUE, space: 12 } },
  indent: { left: 240 },
  spacing: { after: 160 },
  ...o,
});

const email = [
  emailPara([{ b: "Subject: " }, "See you on 4 November – agenda and your questions for the discussion"], { spacing: { after: 280 } }),
  emailPara("Dear participants,"),
  emailPara([
    "We are very excited to welcome you to the second Health Bridge online seminar, ",
    { b: "“From Crisis to Contribution: Ukraine’s Role in Advancing Health Diplomacy”" },
    ", on ",
    { b: "Wednesday, 4 November, 13:00–15:30 CET (14:00–16:30 EEST)" },
    " on Zoom.",
  ]),
  emailPara("Please find the agenda attached. Prof. Olesya Hulchiy, who will moderate the seminar, will open with a short recap of Seminar 1. We will then hear from Prof. Serhiy Dubrov, Prof. Dorit Nitzan and Natalia Pidmurniak. After the talks, we have set aside a longer discussion of around 45–50 minutes with all the speakers. This is the heart of the seminar."),
  emailPara([
    "The discussion will be built around the paradox at the core of this seminar: ",
    { i: "why, and how, does a country under daily attack become a security donor?" },
    " There is no single answer, and we would like to explore it together with you. We would love to hear the questions it raises for you, whether for one of the speakers or about health diplomacy, crisis response and academic partnerships more broadly. Please share them ",
    { b: "by Monday, 2 November" },
    ", using this short form: ",
    { fill: "[link to question form]" },
  ]),
  emailPara("We will bring your questions together into 2–3 focus questions for the discussion and share them with you before the seminar. There will also be time for questions from the floor on the day."),
  emailPara([{ b: "Zoom link: " }, { fill: "[Zoom link]" }]),
  emailPara("We look forward to seeing you on 4 November!"),
  emailPara("Kind regards,", { spacing: { after: 0 } }),
  emailPara({ fill: "[Your name]" }, { spacing: { after: 0 } }),
  emailPara("on behalf of the Health Bridge team", { spacing: { after: 0 } }),
  emailPara("Karolinska Institutet · Bogomolets National Medical University · National University of Life and Environmental Sciences of Ukraine · University of Latvia"),
  note("Attachment: Seminar2_Agenda.pdf"),
];

const form = [
  p("Build it in Microsoft Forms, like the registration form: New Form, then copy in the text below."),
  p({ b: "Form title" }, { spacing: { before: 160, after: 40 } }),
  p("Your questions for Seminar 2 – From Crisis to Contribution"),
  p({ b: "Form description" }, { spacing: { before: 160, after: 40 } }),
  p("On 4 November, around 45–50 minutes of the online seminar are set aside for an open discussion with the speakers: Prof. Serhiy Dubrov, Prof. Dorit Nitzan and Natalia Pidmurniak. Help us shape it by sharing the questions you would most like to discuss. We will group them into 2–3 focus questions for the panel. Please respond by Monday, 2 November."),
  h2("Questions"),
  ...question(1, "What question(s) would you like to raise in the discussion?", "Text – Long answer – Required",
    [], "Subtitle: You can ask more than one question. Questions to a specific speaker and broader questions are both welcome."),
  ...question(2, "Who is your question mainly for?", "Choice – Multiple answers on – Optional", [
    "Prof. Serhiy Dubrov – Ukraine from the inside: the health system under pressure",
    "Prof. Dorit Nitzan – From emergency response to health diplomacy",
    "Natalia Pidmurniak – A youth perspective on international cooperation",
    "All speakers / the panel as a whole",
  ]),
  ...question(3, "The seminar is built around a paradox. Which side would you most like to explore?", "Choice – Optional", [
    "Why does a country under daily attack choose to become a security donor?",
    "How can a country in acute need contribute anything to others at all?",
    "Both",
    "My question is about something else",
  ]),
  ...question(4, "If we select your question, may we mention your name when it is raised?", "Choice – Required", [
    "Yes, you may mention my name and organisation",
    "No, please keep my question anonymous",
  ]),
  ...question(5, "Your name and organisation (optional)", "Text – Short answer – Optional"),
  h2("Settings (… menu → Settings)"),
  bullet([{ b: "Who can fill out this form: " }, "Anyone can respond. Participants are outside your organisation, so they must not be asked to sign in."]),
  bullet([{ b: "Accept responses: " }, "on. Optionally set an end date of 2 November, 23:59."]),
  bullet([{ b: "Email notification of each response: " }, "optional, handy if you want to see questions as they arrive."]),
  bullet(["When the form is ready, click ", { b: "Collect responses" }, ", then ", { b: "Copy link" }, ", and paste the link into the email."]),
  bullet([{ b: "After the deadline: " }, "open Responses and click Open results in Excel. Questions 2 and 3 let you sort by speaker and by side of the paradox, which makes it quick to cluster the submissions into the 2–3 focus questions for Prof. Hulchiy as moderator."]),
];

const doc = new Document({
  creator: "Health Bridge",
  title: "Seminar 2 – participant email and question form",
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 260 } } } }] }] },
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 }, paragraph: { spacing: { after: 120, line: 264, lineRule: "auto" } } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Calibri", size: 30, bold: true, color: NAVY }, paragraph: { spacing: { before: 120, after: 160 }, keepNext: true, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Calibri", size: 25, bold: true, color: BLUE }, paragraph: { spacing: { before: 220, after: 80 }, keepNext: true, outlineLevel: 1 } },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1100, bottom: 1100, left: 1300, right: 1300 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: "Seminar 2 – participant email and question form", bold: true, size: 36, color: NAVY, font: "Calibri" })], spacing: { after: 120 } }),
      p(["Before sending, fill in the ", { fill: "highlighted" }, " placeholders: the form link, the Zoom link and your name."], {
        shading: { fill: "F2F2F2", type: ShadingType.CLEAR, color: "auto" }, spacing: { after: 240 },
      }),
      h1("1. Email to participants"),
      ...email,
      new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Question form (Microsoft Forms)")] }),
      ...form,
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  console.log("wrote", out);
});
