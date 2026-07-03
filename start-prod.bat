@echo off
echo ====================================================
echo  Astikos IT Solutions - Production Mode
echo ====================================================
echo.

SET NODE_PATH=C:\Users\prasa\.gemini\antigravity\scratch\node22
SET PATH=%NODE_PATH%;%PATH%

echo [1/2] Building Frontend for Production...
call "%NODE_PATH%\npm.cmd" run build
if %ERRORLEVEL% NEQ 0 (
    echo BUILD FAILED! Please check the errors above.
    pause
    exit /b 1
)
echo Build successful!

echo.
echo [2/2] Starting Production Server (port 5000)...
echo  The server will serve both API and the built frontend.
echo  Visit: http://localhost:5000
echo.
"%NODE_PATH%\node.exe" server\server.js

pause
