@echo off
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js is not installed. Get it from https://nodejs.org then run this again. & pause & exit /b)
if not exist node_modules (echo First run: installing, please wait... & call npm install)
call npm start
