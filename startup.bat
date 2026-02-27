@echo off
title IEEE GCET SB Website - Startup
color 0A

echo.
echo ========================================
echo   IEEE GCET Student Branch Website
echo ========================================
echo.
echo Stopping any existing servers...
taskkill /F /IM node.exe /T >nul 2>&1
timeout /t 2 /nobreak >nul

echo Starting servers...
echo.

REM Start backend in new window
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Wait 3 seconds
timeout /t 3 /nobreak >nul

REM Start frontend in new window  
start "Frontend Server" cmd /k "cd frontend && npm run dev"

REM Wait 5 seconds for servers to start
timeout /t 5 /nobreak >nul

REM Open browser
start http://localhost:5173

echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Two windows opened - DON'T CLOSE THEM!
echo Press Ctrl+C in each window to stop.
echo.
echo Website opening in browser...
echo.
pause
