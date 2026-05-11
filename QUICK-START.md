# 🚀 Guia Rápido de Execução

## Links do desafio

| Tipo | Link |
|------|------|
| API | https://restful-booker.herokuapp.com/apidoc/index.html |
| API base URL | https://restful-booker.herokuapp.com |
| UI/UX | https://www.saucedemo.com/ |

Os testes de UI usam o SauceDemo. Os testes de API usam a Restful-Booker.

## ⚡ Quick Start (5 minutos)

### 1️⃣ Instalação Rápida

```bash
# Entrar no diretório
cd desafio-BeTalent

# Instalar dependências
npm install

# Instalar browsers
npx playwright install
```

### 2️⃣ Executar Testes

```bash
# Opção 1: Todos os testes (recomendado)
npm run test:all

# Opção 2: Só UI
npm run test:ui

# Opção 3: Só API
npm run test:api

# Opção 4: UI com visualização
npm run test:ui:headed
```

### 3️⃣ Verificar Resultados

```bash
# Ver relatório HTML
npm run report
```

---

## 📋 Checklist de Execução

### ✅ Antes de Executar

- [ ] Node.js v16+ instalado (`node --version`)
- [ ] npm v8+ instalado (`npm --version`)
- [ ] Conexão de internet disponível
- [ ] Portas necessárias livres

### ✅ Instalação

- [ ] Executar `npm install`
- [ ] Executar `npx playwright install`
- [ ] Verificar instalação: `npx playwright --version`

### ✅ Execução de Testes

- [ ] Executar `npm run test:all`
- [ ] Aguardar conclusão (15-20 minutos)
- [ ] Verificar relatórios em `test-results/`

### ✅ Análise de Resultados

- [ ] Executar `npm run report`
- [ ] Revisar screenshots de falhas
- [ ] Consultar documentação se houver dúvidas

---

## 🧪 Executar Testes Individuais

### UI Testing

```bash
# Todos os testes UI
npm run test:ui

# Com interface visual (mais lento)
npm run test:ui:headed

# Mode debug (pause em breakpoints)
npm run test:ui:debug

# Só em Chrome
npm run test:ui:chrome

# Gerar relatório
npm run report
```

### API Testing

```bash
# Executar todos os testes API
npm run test:api

# Verifica e salva resultado em JSON
node api-testing/tests/runner.js
```

---

## 📊 Estrutura de Testes

### UI Tests (53 total)

```
auth.spec.js        (10 testes)
├── TC-AUTH-001 ✅
├── TC-AUTH-002 ✅
├── ...
└── TC-AUTH-010 ✅

products.spec.js    (12 testes)
├── TC-PROD-001 ✅
├── ...
└── TC-PROD-012 ✅

cart.spec.js        (10 testes)
├── TC-CART-001 ✅
├── ...
└── TC-CART-010 ✅

checkout.spec.js    (11 testes)
├── TC-CHECK-001 ✅
├── ...
└── TC-CHECK-011 ✅

navigation.spec.js  (10 testes)
├── TC-NAV-001 ✅
├── ...
└── TC-NAV-010 ✅
```

### API Tests (16 total)

```
api-tests.js        (16 testes)
├── TC-API-AUTH-001 ✅
├── TC-API-CRUD-001 ✅
├── TC-API-CRUD-002 ✅
├── TC-API-CRUD-003 ✅
├── TC-API-CRUD-004 ✅
├── TC-API-CRUD-005 ✅
├── TC-API-CRUD-006 ✅
├── TC-API-VALID-001 ✅
├── TC-API-VALID-002 ✅
├── TC-API-VALID-003 ✅
├── TC-API-FILTER-001 ✅
├── TC-API-FILTER-002 ✅
├── TC-API-FILTER-003 ✅
├── TC-API-HEALTH-001 ✅
├── TC-API-SEC-001 ✅
└── TC-API-PERF-001 ✅
```

---

## 🔍 Analisar Resultados

### Depois de Executar Testes

```bash
# 1. Ver relatório HTML (melhor visualização)
npm run report

# 2. Verificar arquivos de resultado
ls -la test-results/ui-testing/
ls -la api-testing/evidence/

# 3. Checar screenshots em caso de falha
open ui-testing/evidence/  # macOS
# ou
explorer ui-testing\evidence  # Windows
# ou
xdg-open ui-testing/evidence/  # Linux
```

### Interpretar Relatórios

- ✅ PASS: Teste passou
- ❌ FAIL: Teste falhou
- ⏭️  SKIP: Teste pulado
- ⏱️  TIMEOUT: Teste demorou muito

---

## 🐛 Troubleshooting Rápido

### Problema: Erro ao instalar

**Solução**:
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problema: Testes com timeout

**Solução**:
```bash
# Aumentar timeout no playwright.config.js
use: {
  actionTimeout: 30000,  // 30 segundos
  navigationTimeout: 30000
}
```

### Problema: Seleto CSS não encontrado

**Solução**:
```bash
# Abrir modo debug
npm run test:ui:debug

# Inspect elemento no navegador
# Verificar seletor CSS
```

### Problema: API indisponível

**Solução**:
```bash
# Verificar se API está online
curl https://restful-booker.herokuapp.com/ping

# Se offline, usar mock server (implementar depois)
```

---

## 📚 Documentação Completa

| Arquivo | Conteúdo |
|---------|----------|
| [README.md](README.md) | Documentação principal |
| [EXECUTIVE-SUMMARY.md](EXECUTIVE-SUMMARY.md) | Resumo executivo |
| [docs/UI-TEST-PLAN.md](docs/UI-TEST-PLAN.md) | Plano detalhado de UI |
| [docs/API-TEST-PLAN.md](docs/API-TEST-PLAN.md) | Plano detalhado de API |
| [docs/BUG-ANALYSIS.md](docs/BUG-ANALYSIS.md) | Análise de bugs |
| [docs/RISKS-ANALYSIS.md](docs/RISKS-ANALYSIS.md) | Análise de riscos |
| [docs/IMPROVEMENTS.md](docs/IMPROVEMENTS.md) | Sugestões de melhorias |

---

## 🎯 Fluxo de Execução Recomendado

```
1. SETUP
   └─→ npm install

2. INSTALAR BROWSERS
   └─→ npx playwright install

3. EXECUTAR TESTES
   ├─→ npm run test:ui     (15 min)
   └─→ npm run test:api    (3 min)

4. ANALISAR RESULTADOS
   ├─→ npm run report
   ├─→ Verificar screenshots
   └─→ Consultar documentação

5. DOCUMENTA ACHADOS
   └─→ Abrir issues/tickets
```

---

## 📊 Métricas Esperadas

Após execução bem-sucedida:

```
✅ UI Testing
   - Total: 53 testes
   - Pass: 50+ (94%+)
   - Fail: 0-3 (bugs conhecidos)
   - Tempo: 15-20 minutos

✅ API Testing
   - Total: 16 testes
   - Pass: 14+ (bugs conhecidos podem falhar)
   - Fail: 0-2
   - Tempo: 2-3 minutos

📊 TOTAL
   - Testes: 69
   - Pass Rate: 95%+
   - Tempo: 20-25 minutos
```

---

## 🚀 Próximas Etapas

Após execução e análise:

1. [ ] Revisar relatórios
2. [ ] Documentar bugs encontrados
3. [ ] Priorizar fixes
4. [ ] Implementar CI/CD
5. [ ] Compartilhar resultados com time

---

## 💡 Dicas Úteis

### Para Desenvolvedores

```bash
# Debug um teste específico
npm run test:ui:debug -- --grep "TC-AUTH-001"

# Ver logs detalhados
DEBUG=pw:api npm run test:ui

# Gerar video de falhas (útil para análise)
# (Já configurado em playwright.config.js)
```

### Para QA/Analistas

```bash
# Revisar todos os screenshots
open ui-testing/evidence/

# Abrir relatório em navegador
npm run report

# Exportar dados para Excel
# (Implementar integração posterior)
```

### Para Stakeholders

```bash
# Gerar resumo rápido
cat EXECUTIVE-SUMMARY.md

# Ver estatísticas de cobertura
# (Relatório Postman: Restful-Booker.postman_collection.json)
```

---

## 🎓 Aprendizados Principais

1. **Playwright**: Framework moderno para testes UI
2. **BDD**: Estrutura legível e mantível
3. **Page Object Model**: Abstrações reutilizáveis
4. **API Testing**: Testes com Axios e assertions
5. **Documentação**: Crítica para manutenção

---

## 📞 Suporte Rápido

**Erro ao executar?**
→ Verificar [docs/README.md](README.md#troubleshooting)

**Teste falhando?**
→ Consultar [docs/BUG-ANALYSIS.md](docs/BUG-ANALYSIS.md)

**Como melhorar?**
→ Ler [docs/IMPROVEMENTS.md](docs/IMPROVEMENTS.md)

**Entender os riscos?**
→ Revisar [docs/RISKS-ANALYSIS.md](docs/RISKS-ANALYSIS.md)

---

## ✅ Pronto para Começar?

```bash
# Execute este comando e aguarde os testes:
npm run test:all
```

Boa sorte! 🚀
