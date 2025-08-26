Write-Host "Starting WeezGen with Socket.io..." -ForegroundColor Green
Write-Host ""

# Start Socket.io server
Write-Host "Starting Socket.io server on port 3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node socket-server.js" -WindowStyle Normal

# Wait a moment
Start-Sleep -Seconds 2

# Start Next.js development server
Write-Host "Starting Next.js development server on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Socket.io server: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Next.js app: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
