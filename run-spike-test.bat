@echo off
REM Script para executar testes de performance com K6
REM Teste de Pico (Spike Test)

echo ========================================
echo BlazeDemo Performance Testing - Spike Test
echo ========================================
echo.
echo Starting Spike Test...
echo Timestamp: %DATE% %TIME%
echo.

"C:\Program Files\k6\k6.exe" run spike-test.js --out csv=results/spike-test-results.csv --out json=results/spike-test-results.json

echo.
echo Spike Test completed!
echo.
echo Results saved to:
echo - results/spike-test-results.csv
echo - results/spike-test-results.json
echo.
pause
