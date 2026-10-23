@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
echo.
call npm run dev -- --open
