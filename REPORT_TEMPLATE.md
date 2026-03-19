# 📊 Template de Relatório de Execução

Use este template para documentar os resultados dos testes após executá-los.

## Teste de Carga - Relatório Completo

**Data de Execução**: [DD/MM/YYYY]  
**Hora de Início**: [HH:MM:SS]  
**Hora de Término**: [HH:MM:SS]  
**Duração Total**: 5 minutos  
**Local de Execução**: [Sua localização/máquina]  

### Configuração do Teste

```
Estágios:
├─ Aquecimento 1 (0-1 min): 0 → 50 VUs
├─ Aquecimento 2 (1-3 min): 50 → 250 VUs
├─ Sustain (3-4 min): 250 VUs (constante)
└─ Ramp-down (4-5 min): 250 → 0 VUs
```

### Resultados - Sumário Executivo

| Métrica | Valor | Meta | Status |
|---------|-------|------|--------|
| Total de Requisições | _____ | >0 | ✅/❌ |
| Requisições por Segundo (RPS) | _____ | 250 | ✅/❌ |
| Requisições Bem-sucedidas | _____ | >90% | ✅/❌ |
| Taxa de Erro | ____% | <10% | ✅/❌ |
| 90º Percentil de Resposta | _____ms | <2000ms | ✅/❌ |
| Tempo Máximo de Resposta | _____ms | N/A | N/A |
| Tempo Médio de Resposta | _____ms | N/A | N/A |

### Estatísticas Detalhadas

```
Requisições HTTP:
├─ Total executadas: _____
├─ Bem-sucedidas (2xx): _____
├─ Redirecionadas (3xx): _____
├─ Erros de cliente (4xx): _____
└─ Erros de servidor (5xx): _____

Tempo de Resposta:
├─ Mínimo: _____ms
├─ Máximo: _____ms
├─ Média: _____ms
├─ Mediana: _____ms
├─ 50º percentil (p50): _____ms
├─ 75º percentil (p75): _____ms
├─ 90º percentil (p90): _____ms ⭐ CRÍTICO
├─ 95º percentil (p95): _____ms
└─ 99º percentil (p99): _____ms

Usuários Virtuais:
├─ Mínimo: _____
├─ Máximo: _____
└─ Média: _____
```

### Resultados por Endpoint

| Endpoint | Requisições | Taxa Sucesso | p90 (ms) | Status |
|----------|-------------|--------------|----------|--------|
| GET / | _____ | ___% | _____ | ✅/❌ |
| POST /reserve.php | _____ | ___% | _____ | ✅/❌ |
| GET /reserve.php | _____ | ___% | _____ | ✅/❌ |
| POST /purchase.php | _____ | ___% | _____ | ✅/❌ |

---

## Teste de Pico - Relatório Completo

**Data de Execução**: [DD/MM/YYYY]  
**Hora de Início**: [HH:MM:SS]  
**Hora de Término**: [HH:MM:SS]  
**Duração Total**: 3,5 minutos  

### Configuração do Teste

```
Estágios:
├─ Aquecimento (0-1 min): 0 → 100 VUs
├─ Spike Abrupto (1-1.5 min): 100 → 500 VUs
├─ Sustain no Pico (1.5-2.5 min): 500 VUs (constante)
├─ Ramp-down Rápido (2.5-3 min): 500 → 100 VUs
└─ Final (3-3.5 min): 100 → 0 VUs
```

### Resultados - Sumário Executivo

| Métrica | Valor | Meta | Status |
|---------|-------|------|--------|
| Total de Requisições | _____ | >0 | ✅/❌ |
| Pico de VUs Atingido | _____ | 500 | ✅/❌ |
| Taxa de Erro no Pico | ____% | <10% | ✅/❌ |
| 90º Percentil de Resposta (Pico) | _____ms | <2000ms | ✅/❌ |
| Degradação de Performance | ___% | N/A | N/A |

### Comportamento Durante o Spike

```
Período: Sustain no Pico (500 VUs)
├─ Requisições/segundo: _____
├─ Tempo de resposta médio: _____ms
├─ Taxa de erro: ____%
└─ Recuperação após pico: [Rápida/Lenta/Não recuperou]
```

---

## ✅ Conclusão - Critério de Aceitação Atendido?

### Cenário: Teste de Carga

- [ ] ✅ **SIM** - O sistema atende aos critérios de aceitação
- [ ] ❌ **NÃO** - O sistema não atende aos critérios

**Justificativa**:
```
[Descreva os motivos pelos quais o critério foi ou não atendido]
```

### Cenário: Teste de Pico

- [ ] ✅ **SIM** - O sistema resiste bem ao pico de carga
- [ ] ❌ **NÃO** - O sistema degrada significativamente

**Justificativa**:
```
[Descreva o comportamento durante o pico]
```

---

## 📈 Análise de Resultados

### Pontos Fortes

1. _____
2. _____
3. _____

### Áreas de Melhoria

1. _____
2. _____
3. _____

### Gargalos Identificados

1. **[Endpoint/Componente]**: [Descrição do problema]
2. **[Endpoint/Componente]**: [Descrição do problema]

---

## 🔧 Recomendações

### Curto Prazo (Imediato)

1. _____
2. _____

### Médio Prazo (1-3 meses)

1. _____
2. _____

### Longo Prazo (3+ meses)

1. _____
2. _____

---

## 📎 Anexos

- [ ] Arquivo CSV com resultados completos
- [ ] Arquivo JSON com métricas detalhadas
- [ ] Gráficos/Screenshots de performance
- [ ] Logs de erro (se aplicável)

---

**Assinado por**: _________________  
**Data**: _________________  
**Revisor**: _________________  

