# Script para executar todos os testes de performance com K6
# BlazeDemo Performance Testing Suite

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "BlazeDemo Performance Testing Suite" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se K6 está instalado
Write-Host "Verificando se K6 está instalado..." -ForegroundColor Yellow
try {
    $k6Version = k6 version
    Write-Host "✅ K6 encontrado: $k6Version" -ForegroundColor Green
} catch {
    Write-Host "❌ K6 não está instalado!" -ForegroundColor Red
    Write-Host "Consulte INSTALL_K6.md para instruções de instalação." -ForegroundColor Yellow
    Exit 1
}

Write-Host ""
Write-Host "Iniciando testes de performance..." -ForegroundColor Cyan
Write-Host ""

# Teste de Carga
Write-Host "=" * 50
Write-Host "TESTE 1: Load Test (Carga Sustentada)" -ForegroundColor Yellow
Write-Host "=" * 50
Write-Host "Duração: 5 minutos"
Write-Host "VUs: 0 → 250 (progressivo)"
Write-Host "Iniciado em: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')"
Write-Host ""

$loadTestStart = Get-Date
k6 run load-test.js --out csv=results/load-test-results.csv --out json=results/load-test-results.json
$loadTestEnd = Get-Date
$loadTestDuration = $loadTestEnd - $loadTestStart

Write-Host ""
Write-Host "✅ Load Test concluído!" -ForegroundColor Green
Write-Host "Duração real: $($loadTestDuration.Minutes)m $($loadTestDuration.Seconds)s"
Write-Host "Resultados salvos em:"
Write-Host "  - results/load-test-results.csv"
Write-Host "  - results/load-test-results.json"
Write-Host ""

# Pausa entre testes
Write-Host "Aguardando antes do próximo teste..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Teste de Pico
Write-Host ""
Write-Host "=" * 50
Write-Host "TESTE 2: Spike Test (Pico de Carga)" -ForegroundColor Yellow
Write-Host "=" * 50
Write-Host "Duração: 3,5 minutos"
Write-Host "VUs: 0 → 100 → 500 (spike abrupto)"
Write-Host "Iniciado em: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')"
Write-Host ""

$spikeTestStart = Get-Date
k6 run spike-test.js --out csv=results/spike-test-results.csv --out json=results/spike-test-results.json
$spikeTestEnd = Get-Date
$spikeDuration = $spikeTestEnd - $spikeTestStart

Write-Host ""
Write-Host "✅ Spike Test concluído!" -ForegroundColor Green
Write-Host "Duração real: $($spikeDuration.Minutes)m $($spikeDuration.Seconds)s"
Write-Host "Resultados salvos em:"
Write-Host "  - results/spike-test-results.csv"
Write-Host "  - results/spike-test-results.json"
Write-Host ""

# Sumário Final
Write-Host "=" * 50
Write-Host "SUMÁRIO FINAL" -ForegroundColor Cyan
Write-Host "=" * 50
Write-Host ""
Write-Host "Testes completados com sucesso! ✅" -ForegroundColor Green
Write-Host ""
Write-Host "Resultados gerados:"
Write-Host ""
Write-Host "📁 Load Test:"
Write-Host "   📄 results/load-test-results.csv"
Write-Host "   📄 results/load-test-results.json"
Write-Host ""
Write-Host "📁 Spike Test:"
Write-Host "   📄 results/spike-test-results.csv"
Write-Host "   📄 results/spike-test-results.json"
Write-Host ""

Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Revise os arquivos de resultado (CSV/JSON)"
Write-Host "2. Preencha o REPORT_TEMPLATE.md com os resultados"
Write-Host "3. Analise se o critério de aceitação foi atendido"
Write-Host "4. Faça commit e push para GitHub"
Write-Host ""
Write-Host "Tempo total de execução: $($loadTestDuration.TotalSeconds + $spikeDuration.TotalSeconds) segundos" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para mais informações, consulte o README.md" -ForegroundColor Yellow
Write-Host ""
