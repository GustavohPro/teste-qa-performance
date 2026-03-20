# GitHub Actions Workflow

## 📋 O que é este workflow?

Este arquivo `.github/workflows/performance-tests.yml` é um **GitHub Actions** que executa os testes de performance automaticamente.

---

## 🔄 Quando o workflow é acionado?

O workflow é executado automaticamente em:

1. **Push para `main`**: Sempre que você faz push de código
2. **Pull Requests**: Quando um PR é criado ou atualizado
3. **Manual**: Clicando em "Run workflow" na aba Actions

---

## ✅ O que o workflow faz?

1. ✅ Configura a máquina com Ubuntu
2. ✅ Instala K6 automaticamente
3. ✅ Cria a pasta `results/`
4. ✅ Executa **Teste de Carga**
5. ✅ Executa **Teste de Pico**
6. ✅ Salva os resultados como artefato (30 dias)
7. ✅ Publica sumário na aba "Summary" da execução

---

## 🎯 Visualizar Resultados

### No GitHub Actions

1. Acesse seu repositório: `https://github.com/seu-usuario/teste-qa-performance`
2. Clique na aba **"Actions"**
3. Clique no workflow mais recente
4. Veja:
   - ✅ **Status**: Sucesso ou falha
   - 📊 **Summary**: Resumo dos testes
   - 📦 **Artifacts**: Download dos resultados (CSV/JSON)

---

## 📊 Artefatos Gerados

Após cada execução, os seguintes arquivos são salvos por **30 dias**:

```
results/
├── load-test-results.csv
├── load-test-results.json
├── spike-test-results.csv
└── spike-test-results.json
```

Para baixar:
1. Abra a execução do workflow
2. Scroll para baixo até "Artifacts"
3. Clique em "performance-test-results"

---

## 🔧 Configurações Opcionais

### Executar em schedule (por exemplo, diariamente)

Adicione ao `on:` section:

```yaml
  schedule:
    - cron: '0 2 * * *'  # 2 AM UTC todos os dias
```

### Executar apenas em push para main

```yaml
on:
  push:
    branches: 
      - main
```

### Executar em branch específica

```yaml
on:
  push:
    branches:
      - main
      - develop
```

---

## 📝 Visualizando no GitHub

### Tab "Actions"
Status de todas as execuções

### Tab "Summary" (dentro da execução)
Sumário dos resultados dos testes

### Seção "Artifacts"
Download dos CSVs e JSONs

---

## 🚀 Workflow Automático

**Exemplo de uso:**

1. Você faz um commit e push:
   ```bash
   git add .
   git commit -m "Update tests"
   git push origin main
   ```

2. **Automaticamente** o GitHub Actions:
   - ✅ Executa os testes
   - ✅ Gera relatórios
   - ✅ Disponibiliza para download

3. Você verifica os resultados na aba "Actions"

---

## ⚠️ Limitações

- Máquinas do GitHub Actions têm **uptime limitado** (20 min por job)
- Testes longos podem timeout
- Para testes de 9 minutos, tudo bem
- Para testes de horas, considere usar servidor próprio

---

## 💡 Próximas Etapas

1. **Fazer push** do código atual:
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push origin main
   ```

2. **Verificar na aba Actions** se tudo rodou

3. **Ajustar conforme necessário** (timeout, schedule, etc.)

---

## 📚 Mais Informações

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [K6 no GitHub Actions](https://k6.io/docs/misc/integrations/github-actions/)
- [Artifacts Upload](https://github.com/actions/upload-artifact)

---

**Workflow pronto para usar! 🚀**