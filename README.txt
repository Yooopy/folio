FOLIO — PDF reader & editor for Windows 11
===========================================

EASIEST: get the installer from GitHub (no Node.js needed on your PC)
---------------------------------------------------------------------
1. Make a free account at github.com and click New repository (name it "folio", leave it empty).
2. On the new repo page click "uploading an existing file" and drag in EVERYTHING
   from this unzipped folder, including the hidden-looking ".github" folder. Click Commit.
   (If ".github" didn't upload: Add file > Create new file, type
   .github/workflows/build.yml as the name, and paste in the contents of that file.)
3. Click the "Actions" tab. A build starts by itself (about 3-4 minutes).
4. When it turns green, open the repo's main page and click "Releases" on the right.
   Download Folio-Setup.exe and run it. Folio appears in your Start menu.
Every time you change something and commit, a new installer is built the same way.

ALTERNATIVE: build on your own PC
---------------------------------
Install Node.js LTS (https://nodejs.org), then double-click:
  Start-Folio.bat       runs Folio right away
  Build-Installer.bat   creates dist\Folio-Setup.exe

Shortcuts: Ctrl+O open · Ctrl+S save · Ctrl+Z undo · Delete removes the selected mark.
Folio also shows up under "Open with" for .pdf files.
