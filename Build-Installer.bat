@echo off
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js is not installed. Get it from https://nodejs.org then run this again. & pause & exit /b)
call npm install
call npm run dist
echo.
echo Done. Your installer is in the "dist" folder: Folio-Setup.exe
start "" "%~dp0dist"
pause
