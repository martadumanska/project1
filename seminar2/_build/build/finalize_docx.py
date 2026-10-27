"""Turn on Word's 'Embed fonts in the file' so embedded fonts survive a re-save,
and write font keys as uppercase GUIDs (ST_Guid); the key bytes are unchanged."""
import re, sys, zipfile, shutil

src = sys.argv[1]
tmp = src + ".tmp"
with zipfile.ZipFile(src) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == "word/settings.xml":
            s = data.decode("utf-8")
            if "<w:embedTrueTypeFonts/>" not in s:
                s = s.replace("<w:displayBackgroundShape/>", "<w:displayBackgroundShape/><w:embedTrueTypeFonts/>", 1)
            data = s.encode("utf-8")
        elif item.filename == "word/fontTable.xml":
            s = re.sub(r'w:fontKey="(\{[^}]+\})"', lambda m: 'w:fontKey="%s"' % m.group(1).upper(), data.decode("utf-8"))
            data = s.encode("utf-8")
        zout.writestr(item, data)
shutil.move(tmp, src)
