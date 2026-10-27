# Build sources for the Seminar 2 documents

Regenerate the documents from this folder (Node with the `docx` package, plus Python 3):

```bash
node build/agenda.js ../Seminar2_Agenda.docx
node build/certificate.js ../Seminar2_Certificate_template.docx
python3 build/finalize_docx.py ../Seminar2_Certificate_template.docx
```

`certificate.js` also takes a participant name and certificate number, for example
`node build/certificate.js out/Jane_Doe.docx "Jane Doe" 2026/20001`. Run `finalize_docx.py` on each output.

The certificate embeds Poppins and Barlow Semi Condensed (SIL Open Font License, see `fonts/`),
so it renders the same on computers that don't have those fonts installed.
Logos are taken from the Seminar 1 certificate draft, the invitation, and the KI and Swedish Institute logo files.
