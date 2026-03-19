@echo off
REM Script para executar testes de performance com K6
REM Teste de Carga

echo ========================================
echo BlazeDemo Performance Testing - Load Test
echo ========================================
echo.
echo Starting Load Test...
echo Timestamp: %DATE% %TIME%
echo.

"C:\Program Files\k6\k6.exe" run load-test.js --out csv=results/load-test-results.csv --out json=results/load-test-results.json

echo.
echo Load Test completed!
echo.
echo Results saved to:
echo - results/load-test-results.csv
echo - results/load-test-results.json
echo.
pause
