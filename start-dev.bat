@echo off
echo ====================================================
echo  Astikos IT Solutions - Development Mode
echo ====================================================
echo.

SET NODE_PATH=C:\Users\prasa\.gemini\antigravity\scratch\node22
SET PATH=%NODE_PATH%;%PATH%

echo [1/2] Starting Node.js Backend Server (port 5000)...
start "Astikos Backend" cmd /k "%NODE_PATH%\node.exe server\server.js"

echo Waiting for server to start...
timeout /t 3 /nobreak >nul

echo [2/2] Starting Vite Frontend Dev Server (port 5173)...
start "Astikos Frontend" cmd /k "%NODE_PATH%\npm.cmd run dev"

echo.
echo ====================================================
echo  Website is now running!
echo  Frontend: http://localhost:5173
echo  Backend:  http://localhost:5000
echo ====================================================
echo.
pause
