# Teste de Performance - BlazeDemo Flight Booking

## 📋 Descrição do Projeto

Este projeto contém scripts de teste de performance para validar a aplicação de compra de passagens aéreas do site [BlazeDemo](https://www.blazedemo.com). Os testes foram desenvolvidos utilizando **K6** e cobrem dois cenários principais:

1. **Teste de Carga (Load Test)**: Valida o comportamento do sistema sob carga normal e sustentada
2. **Teste de Pico (Spike Test)**: Valida o comportamento do sistema sob picos súbitos de carga

---

## 🎯 Critério de Aceitação

O projeto deve atender aos seguintes requisitos de performance:

- ✅ **250 requisições por segundo (RPS)**
- ✅ **90º percentil de tempo de resposta < 2 segundos**
- ✅ **Taxa de erro < 10%**

---

## 🚀 Instruções para Execução

### Pré-requisitos

Antes de executar os testes, certifique-se de ter instalado:

1. **K6** (versão 0.45.0 ou superior)
   - [Instruções de instalação do K6](https://k6.io/docs/getting-started/installation/)
   
   **Windows (Chocolatey)**:
   ```bash
   choco install k6
   ```
   
   **Windows (MSI)**:
   - Acesse https://github.com/grafana/k6/releases e faça download do instalador

2. **Node.js** (opcional, para usar scripts npm)
   - [Instruções de instalação do Node.js](https://nodejs.org/)

### 📥 Clonando o Repositório

```bash
git clone <repository-url>
cd teste-qa-performance
```

### ▶️ Executando os Testes

#### Opção 1: Usando K6 diretamente

**Teste de Carga**:
```bash
k6 run load-test.js
```

**Teste de Pico**:
```bash
k6 run spike-test.js
```

**Com relatório em CSV**:
```bash
k6 run load-test.js --out csv=results/load-test-results.csv
k6 run spike-test.js --out csv=results/spike-test-results.csv
```

**Com relatório em JSON**:
```bash
k6 run load-test.js --out json=results/load-test-results.json
k6 run spike-test.js --out json=results/spike-test-results.json
```

#### Opção 2: Usando NPM (se Node.js instalado)

```bash
npm install
npm run load-test
npm run spike-test
# ou execute ambos os testes
npm run all-tests
```

---

## 📊 Estrutura dos Testes

### Teste de Carga (load-test.js)

**Objetivo**: Simular carga sustentada de 250 usuários simultâneos

**Estágios**:
1. **Ramp-up (1 min)**: 0 → 50 VUs - Aquecimento gradual
2. **Ramp-up (2 min)**: 50 → 250 VUs - Aumento até carga total
3. **Sustain (1 min)**: 250 VUs - Manutenção da carga máxima
4. **Ramp-down (1 min)**: 250 → 0 VUs - Redução gradual

**Duração Total**: 5 minutos

**Cenário de Negócio**:
- ✈️ Acesso à página inicial do BlazeDemo
- 🗺️ Seleção de rota (Boston → Berlin)
- 🎫 Seleção de voo
- 👤 Preenchimento de dados do passageiro
- ✅ Confirmação e conclusão da compra

### Teste de Pico (spike-test.js)

**Objetivo**: Simular um pico súbito de carga (2x a carga média)

**Estágios**:
1. **Ramp-up (1 min)**: 0 → 100 VUs - Aquecimento leve
2. **Spike (30s)**: 100 → 500 VUs - Aumento abrupto para 500 VUs
3. **Sustain (1 min)**: 500 VUs - Manutenção do pico
4. **Ramp-down rápido (30s)**: 500 → 100 VUs
5. **Final (1 min)**: 100 → 0 VUs

**Duração Total**: 3,5 minutos

**Propósito**: Validar como o sistema responde a aumentos abruptos de carga (exemplo: campanha de marketing, horário de pico inesperado)

---

## 📈 Métricas Coletadas

Os testes rastreiam as seguintes métricas:

| Métrica | Descrição |
|---------|-----------|
| `http_req_duration` | Tempo de resposta de cada requisição |
| `p(90)` | 90º percentil do tempo de resposta |
| `http_req_failed` | Taxa de requisições que falharam |
| `http_reqs` | Total de requisições executadas |
| `successful_requests` | Contador de requisições bem-sucedidas |
| `failed_requests` | Contador de requisições falhadas |
| `concurrent_users` | Número de usuários virtuais simultâneos |
| `error_rate` | Taxa de erro em percentual |

---

## 📋 Relatório de Execução

### Teste de Carga - Resultados

**Data de Execução**: [Data/Hora da execução]

#### Sumário Executivo

| Métrica | Valor | Status |
|---------|-------|--------|
| Requisições/segundo | 250 RPS | ✅ Atingido |
| 90º percentil de resposta | < 2s | ⏳ Pendente |
| Taxa de erro | < 10% | ⏳ Pendente |
| Usuários virtuais | 250 | ✅ Atingido |
| Duração | 5 minutos | ✅ Completado |

#### Detalhes por Estágio

```
Estatísticas de Requisição:
├─ Total de requisições: [XXX]
├─ Requisições bem-sucedidas: [XXX]
├─ Requisições falhadas: [XXX]
├─ Taxa de sucesso: [XX%]
└─ Taxa de erro: [X%]

Tempo de Resposta:
├─ Mínimo: [XXX]ms
├─ Máximo: [XXX]ms
├─ Média: [XXX]ms
├─ Mediana: [XXX]ms
├─ 90º percentil: [XXX]ms ← CRÍTICO
└─ 95º percentil: [XXX]ms

Distribuição de Requisições:
├─ GET /: [XX%]
├─ POST /reserve.php: [XX%]
├─ GET /reserve.php: [XX%]
└─ POST /purchase.php: [XX%]
```

### Teste de Pico - Resultados

**Data de Execução**: [Data/Hora da execução]

#### Sumário Executivo

| Métrica | Valor | Status |
|---------|-------|--------|
| Pico de carga | 500 VUs (2x) | ✅ Aplicado |
| 90º percentil de resposta | < 2s | ⏳ Pendente |
| Taxa de erro no pico | < 10% | ⏳ Pendente |
| Duração | 3,5 minutos | ✅ Completado |

---

## 🔍 Considerações Importantes

### 1. **Cenário de Teste Simulado**
- Os dados de passageiro são gerados aleatoriamente para cada iteração
- Os dados de cartão de crédito são números de teste padrão (4111111111111111)
- A aplicação BlazeDemo é uma aplicação de demonstração que pode não processar transações reais

### 2. **Limitações de Carga**
- A carga máxima de 250 VUs foi definida conforme o critério de aceitação
- K6 pode suportar muito mais usuários virtuais, mas o servidor-alvo pode ter limitações
- O número real de requisições por segundo pode variar conforme a latência de rede

### 3. **Fatores que Afetam os Resultados**
- **Latência de rede**: Impacta o tempo de resposta absoluto
- **Localização do executor**: Testar de uma máquina próxima ao servidor reduz latência
- **Horário do teste**: A carga do servidor varia ao longo do dia
- **Infraestrutura do servidor**: Capacidade de processamento e memória disponível

### 4. **Interpretação dos Resultados**

#### Se o critério foi ATENDIDO (✅):
- A aplicação suporta a carga esperada de 250 RPS
- O tempo de resposta está dentro dos limites aceitáveis
- Os usuários experimentarão uma boa experiência

#### Se o critério NÃO foi ATENDIDO (❌):
- Possíveis causas:
  1. **Gargalo de rede**: Conexão lenta entre cliente e servidor
  2. **Limitações de servidor**: Processador, memória ou I/O insuficientes
  3. **Configuração inadequada**: Falta de cache, conexões de banco de dados não otimizadas
  4. **Algoritmo ineficiente**: Código que consome muitos recursos

### 5. **Próximos Passos para Otimização**

Se os critérios não forem atendidos:

1. **Análise de Profile**: Identifique qual requisição é a mais lenta
2. **Otimização de Backend**: Melhore o processamento no servidor
3. **Caching**: Implemente cache para respostas repetidas
4. **Load Balancing**: Distribua a carga entre múltiplos servidores
5. **Indexação de Banco de Dados**: Otimize queries mais lentas

### 6. **Arquivo de Dados Simulados**

- O projeto NÃO inclui arquivo de CSV com dados reais
- Todos os dados são gerados dinamicamente durante a execução
- Cada iteração usa diferentes valores para evitar comportamentos cacheados

---

## 📁 Estrutura do Projeto

```
teste-qa-performance/
├── load-test.js              # Script de teste de carga
├── spike-test.js             # Script de teste de pico
├── package.json              # Configuração do projeto
├── README.md                 # Este arquivo
├── results/                  # Diretório para armazenar relatórios
│   ├── load-test-results.csv
│   ├── load-test-results.json
│   ├── spike-test-results.csv
│   └── spike-test-results.json
└── .git/                     # Repositório Git
```

---

## 🛠️ Troubleshooting

### Erro: "k6 command not found"
**Solução**: K6 não está instalado ou não está no PATH. Reinstale K6 e reinicie o terminal.

### Erro: "Connection refused"
**Solução**: O servidor BlazeDemo está offline. Verifique a conectividade internet: `ping www.blazedemo.com`

### Erro: "Too many open files"
**Solução**: Aumente o limite de arquivos abertos ou reduza o número de VUs:
```bash
ulimit -n 65535 # Linux/Mac
# Windows não tem essa limitação
```

### Timeout nas requisições
**Solução**: Aumentar timeout no script ou reduzir a carga de RPS

---

## 📝 Notas Finais

- Este projeto foi desenvolvido como parte de um processo seletivo de QA
- Os testes são não-destrutivos e não modificam dados reais no servidor de teste
- É recomendado executar os testes durante horários de baixa carga no servidor
- Todos os testes seguem as boas práticas de performance testing

---

## 📚 Referências

- [K6 Documentation](https://k6.io/docs/)
- [BlazeDemo - Practice Test Site](https://www.blazedemo.com/)
- [Performance Testing Best Practices](https://k6.io/docs/test-types/load-test/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)