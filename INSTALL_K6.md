# 🛠️ Guia de Instalação - K6

## Windows

### Opção 1: Usando Chocolatey (Recomendado)

Se você tem Chocolatey instalado:

```powershell
choco install k6
```

### Opção 2: Usando Windows Package Manager (WinGet)

```powershell
winget install -e --id grafana.k6
```

### Opção 3: Download Manual do MSI

1. Acesse: https://github.com/grafana/k6/releases
2. Baixe a versão mais recente: `k6-vX.XX.X-windows-amd64.msi`
3. Execute o instalador
4. Siga as instruções do assistente

### Opção 4: Download do Arquivo ZIP

1. Acesse: https://github.com/grafana/k6/releases
2. Baixe: `k6-vX.XX.X-windows-amd64.zip`
3. Extraia o arquivo
4. Mova `k6.exe` para um diretório no PATH (ex: `C:\Program Files\k6\`)
5. Ou adicione o diretório ao PATH manualmente

## Verificar Instalação

Após instalar, verifique com:

```powershell
k6 version
```

Você deve ver algo como:
```
k6 v0.X.X (windows/amd64)
```

## Próximos Passos

Após instalar K6, execute os testes com:

```powershell
cd c:\Users\marco\OneDrive\Desktop\Projetos\teste-qa-performance

# Teste de carga
k6 run load-test.js --out csv=results/load-test-results.csv

# Teste de pico
k6 run spike-test.js --out csv=results/spike-test-results.csv
```

## Troubleshooting

### Se o comando ainda não funcionar:

1. Abra PowerShell como **Administrador**
2. Reinicie o terminal ou VS Code
3. Se usar Chocolatey, execute: `refreshenv`

---

Para mais informações, visite: https://k6.io/docs/getting-started/installation/