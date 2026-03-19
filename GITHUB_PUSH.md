# 🚀 Instruções para Push para GitHub

## Passo 1: Criar Repositório no GitHub

1. **Acesse GitHub**: https://github.com/new
2. **Preencha os dados**:
   - **Repository name**: `teste-qa-performance` (ou o nome que preferir)
   - **Description**: "Performance testing scripts for BlazeDemo using K6"
   - **Visibility**: 🔓 **Public** (conforme solicitado no desafio)
   - **Initialize this repository with**: Deixe desmarcado (já temos arquivos locais)

3. **Clique**: "Create repository"

4. **Copie a URL do repositório**:
   - Deve ser algo como: `https://github.com/seu-usuario/teste-qa-performance.git`

---

## Passo 2: Configurar Repositório Remoto Local

Execute os seguintes comandos no PowerShell **no diretório do projeto**:

```powershell
cd c:\Users\marco\OneDrive\Desktop\Projetos\teste-qa-performance

# Remover upstream antigo (se existir)
git branch --unset-upstream

# Adicionar o repositório remoto (substitua pela URL do seu repositório)
git remote add origin https://github.com/seu-usuario/teste-qa-performance.git

# Renomear branch para main (se necessário)
git branch -M main

# Fazer push para o GitHub
git push -u origin main
```

---

## Passo 3: Seu Repositório Está Online! 🎉

Após o push bem-sucedido, seu repositório estará disponível em:
```
https://github.com/seu-usuario/teste-qa-performance
```

---

## 📝 Verificar o Push

Para confirmar que o push foi bem-sucedido:

```powershell
# Verificar referência remota
git remote -v

# Verificar status
git status
```

Você deve ver algo como:
```
origin  https://github.com/seu-usuario/teste-qa-performance.git (fetch)
origin  https://github.com/seu-usuario/teste-qa-performance.git (push)

Your branch is up to date with 'origin/main'.
```

---

## 🔗 Próximos Passos

1. **Copie a URL do seu repositório**:
   ```
   https://github.com/seu-usuario/teste-qa-performance
   ```

2. **Cole a URL no formulário** do processo seletivo conforme solicitado

3. **Antes de submeter**, certifique-se de que:
   - ✅ O repositório é **público**
   - ✅ Todos os arquivos estão presentes
   - ✅ O README.md e a documentação estão completos
   - ✅ Os scripts estão corretos

---

## ⚠️ Troubleshooting

### Erro: "fatal: not a git repository"
```powershell
cd c:\Users\marco\OneDrive\Desktop\Projetos\teste-qa-performance
```

### Erro: "fatal: remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/seu-usuario/teste-qa-performance.git
```

### Erro: "Permission denied (publickey)"
- Você precisa configurar autenticação SSH ou usar HTTPS com token pessoal
- Consulte: https://docs.github.com/en/authentication

### Erro: "failed to push some refs"
```powershell
# Fazer pull primeiro se houve mudanças no remoto
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 📚 Comandos Git Úteis

```powershell
# Ver commits locais
git log --oneline

# Ver branch atual
git branch

# Ver repositórios remotos
git remote -v

# Ver status
git status

# Desfazer último commit (local apenas)
git reset --soft HEAD~1
```

---

**Pronto!** Seu projeto está no GitHub pronto para submissão! 🚀
