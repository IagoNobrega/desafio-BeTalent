# 🚀 CI/CD Integration - Desafio BeTalent QA

**Data**: 11 de Maio de 2026  
**Status**: ✅ CONFIGURADO  
**Versão**: 1.0

---

## 📌 Visão Geral

Este documento descreve a integração CI/CD completa do projeto BeTalent QA com GitHub Actions, incluindo:

- ✅ Testes automatizados em cada push/PR
- ✅ Análise de segurança com CodeQL
- ✅ Geração de relatórios
- ✅ Upload de artifacts
- ✅ Notificações automáticas

---

## 🎯 Workflows Configurados

### 1️⃣ **test.yml** - Pipeline Principal

Executa todos os testes automaticamente.

#### Triggers (Quando executar)

```yaml
on:
  push:
    branches: [ main, develop ]      # Em cada push para main/develop
  pull_request:
    branches: [ main, develop ]      # Em cada PR para main/develop
  schedule:
    - cron: '0 8 * * MON-FRI'        # Seg-Sex às 8:00 AM
```

#### Jobs

```
┌─────────────────────────────────────────────────────┐
│         🧪 BeTalent QA - Automated Tests            │
└─────────────────────────────────────────────────────┘
│
├─ 🎯 UI Tests (Parallel)
│  ├─ Checkout código
│  ├─ Setup Node.js 18.x
│  ├─ Install dependencies
│  ├─ Install Playwright
│  ├─ Run UI Tests
│  ├─ Upload Results
│  └─ Upload Screenshots (if failed)
│
├─ 🔌 API Tests (Parallel)
│  ├─ Checkout código
│  ├─ Setup Node.js 18.x
│  ├─ Install dependencies
│  ├─ Run API Tests
│  └─ Upload Results
│
├─ 📈 Generate Report
│  ├─ Download artifacts
│  ├─ Create summary
│  └─ Comment on PR
│
├─ 🔍 Code Quality
│  ├─ Checkout código
│  ├─ Setup Node.js
│  └─ Check syntax
│
└─ 📢 Notification
   ├─ Success notification
   └─ Failure notification
```

#### Timeouts

| Job | Timeout |
|-----|---------|
| UI Tests | 30 min |
| API Tests | 15 min |
| Report | 10 min |
| Lint | 10 min |

### 2️⃣ **codeql.yml** - Análise de Segurança

Análise de segurança com CodeQL (GitHub).

#### Triggers

```yaml
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    - cron: '0 3 * * 0'              # Todo domingo às 3:00 AM
```

#### Features

- 🔐 Análise de segurança JavaScript
- 📊 Relatório de vulnerabilidades
- 🚨 Alertas automáticos

---

## 📁 Estrutura de Arquivos

```
.github/
├── workflows/
│   ├── test.yml                 # Pipeline principal
│   └── codeql.yml               # Análise de segurança
├── PULL_REQUEST_TEMPLATE.md     # Template para PRs
└── ISSUE_TEMPLATE/
    ├── bug_report.md            # Template para bugs
    └── test_request.md          # Template para testes

CONTRIBUTING.md                  # Guia de contribuição
```

---

## 🔧 Configuração Inicial

### 1. Push para GitHub

```bash
# Adicione origin
git remote add origin https://github.com/seu-usuario/desafio-BeTalent.git

# Push inicial
git branch -M main
git push -u origin main
```

### 2. Habilitar Workflows

1. Vá para `GitHub > Settings > Actions > General`
2. Selecione "Allow all actions and reusable workflows"
3. Clique em "Save"

### 3. Configurar Secrets (Opcional)

Se precisar de autenticação ou tokens:

1. Vá para `GitHub > Settings > Secrets and variables > Actions`
2. Clique em "New repository secret"
3. Adicione secrets necessários:

```yaml
API_TOKEN=seu_token_aqui
API_KEY=sua_chave_aqui
```

### 4. Ativar Branch Protection (Recomendado)

1. Vá para `GitHub > Settings > Branches`
2. Clique em "Add rule"
3. Configure:
   - Branch name pattern: `main`
   - Require status checks to pass: ✅
   - Require branches to be up to date: ✅
   - Dismiss stale PR approvals: ✅

---

## 📊 Monitorando Workflows

### Dashboard GitHub Actions

1. Vá para `Repository > Actions`
2. Veja histórico de execuções
3. Clique em workflow para detalhes

### Status Badge (README)

Adicione ao README.md:

```markdown
[![Tests](https://github.com/IagoNobrega/desafio-BeTalent/workflows/BeTalent%20QA%20-%20Automated%20Tests/badge.svg)](https://github.com/IagoNobrega/desafio-BeTalent/actions)
```

### Artifacts

Cada execução gera:

```
📦 Artifacts
├── ui-test-results/
│   ├── index.html              # Relatório HTML
│   ├── test-results.xml        # Relatório JUnit
│   ├── results.json            # Resultados JSON
│   └── playwright-report/      # Relatório detalhado
│
└── api-test-results/
    ├── api-test-report.json    # Resultados de API
    └── ...
```

---

## 📝 Exemplos de Uso

### ✅ Exemplo 1: Push para Main

```bash
# Faça uma mudança
echo "// teste" >> specs/auth.spec.js

# Commit e push
git add .
git commit -m "test: adiciona novo teste"
git push origin main
```

**Resultado**: Workflow dispara automaticamente ⚡

### ✅ Exemplo 2: PR com Testes

```bash
# Crie branch
git checkout -b feature/novo-teste

# Faça mudanças
# ... adicione testes ...

# Commit
git commit -m "feat: adiciona testes de responsividade"

# Push
git push origin feature/novo-teste

# Abra PR no GitHub
# (Workflow dispara automaticamente)
```

**Resultado**: Testes executam, comentário automático adicionado ✅

---

## 🔴 Debugging de Falhas

### 1. Visualizar Logs

1. Vá para `Actions > Workflow run`
2. Clique em job que falhou
3. Expanda o step que falhou
4. Veja os logs completos

### 2. Debug Local

Simule o ambiente CI localmente:

```bash
# Use environment variables do CI
export CI=true
export PLAYWRIGHT_HEADLESS=true
export PLAYWRIGHT_WORKERS=2

# Execute testes
npm run test:all
```

### 3. Re-run Workflow

1. Vá para workflow run
2. Clique em "Re-run jobs"
3. Selecione jobs a re-executar

### 4. Problemas Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `Module not found` | Dependências não instaladas | Verifique package.json |
| `Timeout` | Testes lentos | Aumentar timeout ou otimizar |
| `Browser not found` | Playwright não instalado | Rodar `npx playwright install` |
| `Port in use` | Porta ocupada | Alterar port no config |

---

## 🔐 Segurança no CI/CD

### ✅ Boas Práticas

1. **Nunca faça commit de secrets**
   ```bash
   # Use .env.example
   echo ".env" >> .gitignore
   ```

2. **Use GitHub Secrets**
   ```yaml
   - name: Use Secret
     env:
       API_TOKEN: ${{ secrets.API_TOKEN }}
   ```

3. **Proteção de Branch**
   - Require PR reviews
   - Require status checks
   - Dismiss stale reviews

4. **CodeQL Scanning**
   - Ativado automaticamente
   - Detecta vulnerabilidades
   - Gera alertas

---

## 📈 Visualizando Resultados

### 🎯 UI Test Results

```bash
# Localmente
npm run report

# No GitHub
1. Actions > Workflow run
2. Artifacts > ui-test-results
3. Download e abra index.html
```

### 🔌 API Test Results

```bash
# Ver JSON report
cat api-testing/evidence/api-test-report.json

# No GitHub
1. Artifacts > api-test-results
2. Download api-test-report.json
```

### 📊 Summary

Cada PR recebe comentário automático:

```
## 🧪 BeTalent QA Tests

✅ All tests have been executed!

- 📋 UI Tests: Check artifacts...
- 🔌 API Tests: Check artifacts...

View the full test report
```

---

## ⏱️ Agendamento (Schedule)

### Testes Diários

```yaml
schedule:
  - cron: '0 8 * * MON-FRI'  # Seg-Sex 8:00 AM
```

### Análise Semanal

```yaml
schedule:
  - cron: '0 3 * * 0'        # Domingo 3:00 AM
```

### Timezone

- Padrão: UTC
- Hora em São Paulo: UTC-3
- Ajuste conforme necessário

---

## 🎓 Variáveis de Ambiente

```yaml
# Disponíveis em workflows
- CI=true                          # Indica execução em CI
- GITHUB_SHA=${{ github.sha }}     # Commit hash
- GITHUB_REF=${{ github.ref }}     # Branch/tag
- GITHUB_WORKFLOW=${{ github.workflow }} # Nome workflow
- PLAYWRIGHT_HEADLESS=true         # Modo headless
- PLAYWRIGHT_WORKERS=2             # Workers de teste
```

---

## 📱 Notificações

### Push Notifications

1. Vá para `Repository > Actions`
2. Workflow dispara automaticamente
3. GitHub envia notificação

### Email Notifications

1. Vá para `GitHub > Settings > Notifications`
2. Selecione preferências
3. Configure email

### Slack Integration (Opcional)

```yaml
- name: Notify Slack
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 🚀 Próximos Passos

### ✅ Imediato

- [x] Criar estrutura `.github/`
- [x] Configurar workflows
- [x] Adicionar templates
- [ ] Push para GitHub
- [ ] Verificar primeira execução

### 📋 Curto Prazo

- [ ] Habilitar branch protection
- [ ] Configurar CodeQL
- [ ] Adicionar status badge
- [ ] Documentar processes

### 🎯 Futuro

- [ ] Slack integration
- [ ] Email notifications
- [ ] Dashboard customizado
- [ ] Performance metrics

---

## 📚 Referências

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [CodeQL Analysis](https://codeql.github.com/)
- [Playwright CI](https://playwright.dev/docs/ci)

---

## 💡 Dicas

1. **Cache npm packages**
   ```yaml
   cache: 'npm'  # Acelera instalação
   ```

2. **Matriz de testes**
   ```yaml
   strategy:
     matrix:
       node-version: [16.x, 18.x, 20.x]
   ```

3. **Artifacts com retenção**
   ```yaml
   retention-days: 30  # Manter por 30 dias
   ```

4. **Condicional jobs**
   ```yaml
   if: always()        # Sempre executar
   if: failure()       # Só se falhou
   if: success()       # Só se passou
   ```

---

## 🎉 Pronto!

Seu projeto agora tem CI/CD integration completo com GitHub! 

**Próximo passo**: 
```bash
git add .github/ CONTRIBUTING.md
git commit -m "ci: adiciona CI/CD com GitHub Actions"
git push origin main
```

---

**Desenvolvido para BeTalent QA Challenge**  
**CI/CD Version**: 1.0  
**Data**: 11 de Maio de 2026
