# 🧪 BeTalent QA Challenge - Teste de UI e API

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Requisitos](#requisitos)
4. [Instalação](#instalação)
5. [Execução dos Testes](#execução-dos-testes)
6. [Documentação Detalhada](#documentação-detalhada)
7. [Tecnologias Utilizadas](#tecnologias-utilizadas)
8. [Contribuição](#contribuição)

---

## 🎯 Visão Geral

Este projeto implementa uma suite completa de testes automatizados para validar duas aplicações distintas:

### Links oficiais do desafio

Os testes deste projeto devem ser executados contra estes ambientes:

| Tipo de teste | Link utilizado |
|---------------|----------------|
| API | https://restful-booker.herokuapp.com/apidoc/index.html |
| API base URL usada no código | https://restful-booker.herokuapp.com |
| UI/UX | https://www.saucedemo.com/ |

No código, a UI usa `UI_BASE_URL` com default `https://www.saucedemo.com`.
A API usa `API_BASE_URL` com default `https://restful-booker.herokuapp.com`.

### Premissas e Limitações

- Os testes validam ambientes externos públicos: SauceDemo e Restful-Booker.
- Falhas causadas por instabilidade, mudança de comportamento ou indisponibilidade desses ambientes são registradas como risco/bug quando reproduzíveis.
- Os bugs encontrados nas aplicações testadas não são corrigidos neste repositório, pois o escopo é análise e automação de testes.
- Evidências de UI são geradas em screenshots, vídeos de falha e relatório HTML do Playwright.
- Evidências de API são geradas no relatório JSON em `api-testing/evidence/api-test-report.json`.
- Pendências conhecidas estão documentadas em `docs/BUG-ANALYSIS.md`, `docs/RISKS-ANALYSIS.md` e `docs/IMPROVEMENTS.md`.

### **UI Testing - Sauce Demo**
Plataforma de e-commerce com testes de:
- ✅ Autenticação (múltiplos tipos de usuários)
- ✅ Gestão de produtos (ordenação e filtragem)
- ✅ Carrinho de compras (adicionar/remover itens)
- ✅ Fluxo de checkout completo
- ✅ Navegação e logout
- ✅ Responsividade (Desktop, Tablet, Mobile)
- ✅ Acessibilidade

### **API Testing - Restful-Booker**
Sistema de reservas com testes de:
- ✅ Autenticação e geração de tokens
- ✅ CRUD de reservas (Create, Read, Update, Delete)
- ✅ Filtros e buscas avançadas
- ✅ Validação de campos obrigatórios
- ✅ Testes de performance
- ✅ Testes de segurança
- ✅ Tratamento de erros
- ✅ Health check da API

---

## Níveis de Implementação

### UI Testing (Sauce Demo)

**Nível 1 (Obrigatório)**
- Login com diferentes tipos de usuários
- Ordenação e filtragem de produtos
- Fluxo completo de compra
- Remoção de itens do carrinho
- Navegação entre páginas
- Logout

**Nível 2 (Diferencial)**
- Testes de responsividade
- Testes de acessibilidade
- Testes automatizados

### API Testing (Restful-Booker)

**Nível 1 (Obrigatório)**
- Autenticação básica
- CRUD de reservas
- Validação de campos obrigatórios

**Nível 2 (Diferencial)**
- Testes de performance
- Testes de segurança
- Automação via scripts

---

## 📁 Estrutura do Projeto

```
desafio-BeTalent/
├── ui-testing/
│   ├── specs/                 # Testes de UI (BDD style)
│   │   ├── auth.spec.js       # Testes de autenticação
│   │   ├── products.spec.js   # Testes de produtos
│   │   ├── cart.spec.js       # Testes de carrinho
│   │   ├── checkout.spec.js   # Testes de checkout
│   │   └── navigation.spec.js # Testes de navegação
│   ├── pages/                 # Page Object Model
│   │   ├── BasePage.js        # Classe base para todas as páginas
│   │   ├── LoginPage.js       # Página de login
│   │   ├── ProductsPage.js    # Página de produtos
│   │   ├── CartPage.js        # Página de carrinho
│   │   └── CheckoutPage.js    # Página de checkout
│   ├── fixtures/              # Dados de teste
│   └── evidence/              # Screenshots e gravações
│
├── api-testing/
│   ├── collections/           # Postman Collections
│   │   └── Restful-Booker.postman_collection.json
│   ├── tests/                 # Testes de API em JavaScript
│   │   ├── api-tests.js       # Testes unitários
│   │   └── runner.js          # Executor de testes
│   ├── environment/           # Variáveis de ambiente
│   │   └── Restful-Booker.postman_environment.json
│   └── evidence/              # Resultados e relatórios
│
├── docs/                      # Documentação
│   ├── UI-TEST-PLAN.md        # Plano de testes de UI
│   ├── API-TEST-PLAN.md       # Plano de testes de API
│   ├── BUG-ANALYSIS.md        # Análise de bugs encontrados
│   ├── RISKS-ANALYSIS.md      # Análise de riscos
│   └── IMPROVEMENTS.md        # Sugestões de melhorias
│
├── playwright.config.js       # Configuração do Playwright
├── package.json               # Dependências do projeto
├── .gitignore                 # Arquivos ignorados
└── README.md                  # Este arquivo
```

---

## 📦 Requisitos

- **Node.js**: v16.0.0 ou superior
- **npm**: v8.0.0 ou superior
- **Navegadores**: Chrome, Firefox, Safari (instalados automaticamente pelo Playwright)

### Dependências Principais

```json
{
  "@playwright/test": "^1.40.0",  // Framework de testes UI
  "axios": "^1.6.0",               // Cliente HTTP para testes de API
  "dotenv": "^16.3.1"              // Gerenciamento de variáveis de ambiente
}
```

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/desafio-BeTalent.git
cd desafio-BeTalent
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Verifique a instalação

```bash
npx playwright --version
node --version
npm --version
```

---

## 🧪 Execução dos Testes

### Testes de UI (Sauce Demo)

#### Executar todos os testes de UI
```bash
npm run test:ui
```

#### Executar testes de UI com interface visual (headed mode)
```bash
npm run test:ui:headed
```

#### Executar testes de UI em modo debug
```bash
npm run test:ui:debug
```

#### Executar apenas no Chrome
```bash
npm run test:ui:chrome
```

#### Ver relatório HTML dos testes
```bash
npm run report
```

### Testes de API (Restful-Booker)

#### Executar todos os testes de API
```bash
npm run test:api
```

#### Executar com relatório JSON
```bash
node api-testing/tests/runner.js
```

### Executar Todos os Testes

```bash
npm run test:all
```

---

## 📊 Documentação Detalhada

### Estrutura da documentação

**UI Testing**
- Plano de testes: `docs/UI-TEST-PLAN.md`
- Casos de teste com resultados: `docs/UI-TEST-PLAN.md` e `test-results/ui-report/`
- Análise de bugs: `docs/BUG-ANALYSIS.md`
- Sugestões de melhorias: `docs/IMPROVEMENTS.md`
- Análise de riscos: `docs/RISKS-ANALYSIS.md`

**API Testing**
- Collection de requests: `api-testing/collections/Restful-Booker.postman_collection.json`
- Documentação dos cenários: `docs/API-TEST-PLAN.md`
- Resultados dos testes: `api-testing/evidence/api-test-report.json`
- Análise de bugs: `docs/BUG-ANALYSIS.md`
- Variáveis de ambiente: `api-testing/environment/Restful-Booker.postman_environment.json`

### 📋 [Plano de Testes de UI](./docs/UI-TEST-PLAN.md)
- Casos de teste detalhados
- Resultados esperados
- Evidências em screenshots

### 🔌 [Plano de Testes de API](./docs/API-TEST-PLAN.md)
- Endpoints testados
- Cenários de teste
- Validações implementadas

### 🐛 [Análise de Bugs](./docs/BUG-ANALYSIS.md)
- Bugs encontrados durante os testes
- Severidade e impacto
- Passos de reprodução

### ⚠️ [Análise de Riscos](./docs/RISKS-ANALYSIS.md)
- Riscos identificados
- Probabilidade e impacto
- Mitigação

### 💡 [Sugestões de Melhorias](./docs/IMPROVEMENTS.md)
- Funcionalidades sugeridas
- Melhorias de performance
- Otimizações

---

## 🛠️ Tecnologias Utilizadas

### UI Testing
- **Playwright**: Framework de testes automatizados
- **Node.js**: Runtime JavaScript
- **BDD Style**: Estrutura de testes legível

### API Testing
- **Axios**: Cliente HTTP
- **JavaScript**: Lógica de testes
- **JSON**: Formato de collection e ambiente

### Documentação
- **Markdown**: Formato de documentação

### Controle de Versão
- **Git**: Versionamento
- **GitHub**: Hospedagem

---

## 📈 Cobertura de Testes

### UI Testing - Sauce Demo

| Funcionalidade | Nível 1 | Nível 2 | Total |
|---|:---:|:---:|:---:|
| Autenticação | 6 | 4 | 10 |
| Produtos | 8 | 4 | 12 |
| Carrinho | 7 | 3 | 10 |
| Checkout | 7 | 4 | 11 |
| Navegação | 5 | 5 | 10 |
| **Total** | **33** | **20** | **53** |

### API Testing - Restful-Booker

| Funcionalidade | Testes |
|---|:---:|
| Autenticação | 1 |
| CRUD Operations | 6 |
| Validações | 3 |
| Filtros e Buscas | 3 |
| Health Check | 1 |
| Segurança | 1 |
| Performance | 1 |
| **Total** | **16** |

**Total de Testes: 69 (53 UI + 16 API)**

---

## 📝 Convenções

### Naming Convention de Testes

Todos os testes seguem o padrão:
```
TC-[MÓDULO]-[NÚMERO] | Descrição do teste
```

Exemplos:
- `TC-AUTH-001` - Autenticação com usuário padrão
- `TC-PROD-005` - Ordenação de produtos
- `TC-CART-003` - Remoção de item do carrinho
- `TC-CHECK-001` - Preenchimento de informações de checkout
- `TC-NAV-001` - Logout do usuário

### BDD Style Comments

Os testes são estruturados com comentários BDD:
```javascript
// Given - Contexto inicial
// When - Ação executada
// Then - Resultado esperado
```

---

## ✅ Checklist de Implementação

### Nível 1 (Obrigatório) - UI Testing
- [x] Login com diferentes tipos de usuários
- [x] Ordenação e filtragem de produtos
- [x] Fluxo completo de compra
- [x] Remoção de itens do carrinho
- [x] Navegação entre páginas
- [x] Logout

### Nível 2 (Diferencial) - UI Testing
- [x] Testes de responsividade
- [x] Testes de acessibilidade
- [x] Testes automatizados com Playwright

### Nível 1 (Obrigatório) - API Testing
- [x] Autenticação básica
- [x] CRUD de reservas
- [x] Validação de campos obrigatórios

### Nível 2 (Diferencial) - API Testing
- [x] Testes de performance
- [x] Testes de segurança
- [x] Automação via scripts JavaScript

### Requisitos Técnicos
- [x] Documentação em Markdown
- [x] Collection em JSON (Postman)
- [x] Evidências em capturas de tela
- [x] README detalhado

---

## � CI/CD Integration

### Configuração de Pipeline

Este projeto está pronto para integração com pipelines de CI/CD. Adicione os seguintes passos ao seu workflow:

#### GitHub Actions Exemplo

```yaml
name: BeTalent QA Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Install Playwright
        run: npx playwright install
      
      - name: Run UI Tests
        run: npm run test:ui
      
      - name: Run API Tests
        run: npm run test:api
      
      - name: Upload Reports
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-reports
          path: |
            test-results/
            api-testing/evidence/
```

#### Jenkins Pipeline Exemplo

```groovy
pipeline {
    agent any
    
    stages {
        stage('Setup') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }
        
        stage('UI Tests') {
            steps {
                sh 'npm run test:ui'
            }
        }
        
        stage('API Tests') {
            steps {
                sh 'npm run test:api'
            }
        }
        
        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: '**/test-results/**, **/evidence/**'
            }
        }
    }
}
```

### Variáveis de Ambiente para CI/CD

```bash
# Para CI/CD, configure:
CI=true
PLAYWRIGHT_HEADLESS=true
PLAYWRIGHT_WORKERS=2
API_BASE_URL=https://restful-booker.herokuapp.com
UI_BASE_URL=https://www.saucedemo.com
```

---

## 🐛 Bugs Encontrados

### Resumo de Bugs Identificados

Durante a execução dos testes foram identificados **13 bugs** nas aplicações testadas:

#### Críticos (3)
- **BUG-UI-001**: Performance degradada para usuário `performance_glitch_user`
- **BUG-UI-002**: Imagens distorcidas para usuário `problem_user`
- **BUG-API-002**: API aceita `checkout` antes de `checkin`

#### Altos (5)
- **BUG-UI-003**: Carrinho não persiste após logout
- **BUG-UI-004**: Campo de Postal Code sem validação
- **BUG-UI-005**: Sem confirmação ao remover itens
- **BUG-API-001**: Sem limite de caracteres em `additionalneeds`
- **BUG-API-003**: Sem rate limiting na API

#### Médios (4)
- **BUG-UI-006**: Ordenação não persiste ao navegar
- **BUG-UI-007**: Footer não visível em mobile
- **BUG-UI-008**: Mensagens de erro genéricas
- **BUG-API-005**: Paginação sem ordem consistente

#### Baixos (1)
- **BUG-API-004**: Token não expira

### Documentação Completa

Veja análise detalhada em:
- [📄 BUG-ANALYSIS.md](./docs/BUG-ANALYSIS.md) - Descrição completa de cada bug
- [📊 RISKS-ANALYSIS.md](./docs/RISKS-ANALYSIS.md) - Riscos associados
- [💡 IMPROVEMENTS.md](./docs/IMPROVEMENTS.md) - Sugestões de correção

### Como Reportar Novos Bugs

1. Execute o teste que reproduz o bug
2. Capture screenshot automaticamente em `ui-testing/evidence/`
3. Documente em `docs/BUG-ANALYSIS.md`
4. Inclua em issue/ticket com severidade

---

## 📖 BDD (Behavior-Driven Development)

### Estrutura BDD nos Testes

Todos os testes seguem o padrão **Given-When-Then** para máxima legibilidade:

```javascript
test('TC-AUTH-001 | Should login successfully', async ({ page }) => {
  // Given - Contexto inicial
  // O usuário está na página de login do SauceDemo
  const loginPage = new LoginPage(page);
  expect(await loginPage.isLoginPageLoaded()).toBeTruthy();

  // When - Ação executada
  // O usuário insere credenciais válidas e clica em login
  await loginPage.login('standard_user', 'secret_sauce');

  // Then - Resultado esperado
  // O usuário é redirecionado para a página de produtos
  expect(await page.isVisible('.inventory_container')).toBeTruthy();
});
```

### Benefícios do BDD Utilizado

✅ **Legibilidade**: Testes são claros e autoexplicativos  
✅ **Manutenibilidade**: Fácil entender a lógica do teste  
✅ **Documentação Viva**: Testes servem como documentação  
✅ **Alinhamento de Negócio**: Facilita comunicação com stakeholders  
✅ **Rastreabilidade**: Requisitos → Testes → Bugs  

### Comentários BDD nos Testes

Cada teste contém comentários estruturados:

```javascript
// Given - O que já existe (precondição)
// When - Que ação vamos executar (ação)
// Then - O que esperamos que aconteça (resultado)
```

### Exemplos de Testes BDD

#### Exemplo 1: Teste de Autenticação
```javascript
test('TC-AUTH-004 | Should show error for invalid password', async ({ page }) => {
  // Given: Usuário está na página de login
  const loginPage = new LoginPage(page);
  
  // When: Digita username válido e password inválido
  await loginPage.login('standard_user', 'wrong_password');
  
  // Then: Mensagem de erro é exibida
  expect(await loginPage.isErrorVisible()).toBeTruthy();
  expect(await loginPage.getErrorMessage()).toContain('do not match');
});
```

#### Exemplo 2: Teste de Ordenação
```javascript
test('TC-PROD-002 | Should sort products A to Z', async ({ page }) => {
  // Given: Usuário está na página de produtos
  const productsPage = new ProductsPage(page);
  
  // When: Seleciona ordenação A-Z
  await productsPage.sortProducts('az');
  
  // Then: Produtos aparecem em ordem alfabética
  const names = await productsPage.getProductNames();
  expect(names).toEqual([...names].sort());
});
```

#### Exemplo 3: Teste de API
```javascript
test('Create booking with valid data', async () => {
  // Given: Dados válidos de reserva
  const bookingData = {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-01-01',
      checkout: '2024-01-08'
    }
  };
  
  // When: Envia POST /booking
  const response = await axios.post(`${BASE_URL}/booking`, bookingData);
  
  // Then: Resposta contém booking ID
  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty('bookingid');
});
```

### Cenários BDD Cobertos

| Cenário | Tipo | Testes |
|---------|------|--------|
| Autenticação | BDD | 6 cenários |
| Produtos | BDD | 8 cenários |
| Carrinho | BDD | 7 cenários |
| Checkout | BDD | 7 cenários |
| Navegação | BDD | 5 cenários |
| API CRUD | BDD | 6 cenários |
| Validações | BDD | 4 cenários |

### Boas Práticas BDD Implementadas

✅ Dado-Quando-Então em cada teste  
✅ Descrições legíveis em linguagem natural  
✅ Separação clara de precondição, ação, resultado  
✅ Testes independentes sem acoplamento  
✅ Nomenclatura descritiva (TC-MODULO-NUMERO)  
✅ Comentários estruturados no código  

### Executar Testes com Saída BDD

```bash
# Modo verbose mostrando cenários BDD
npm run test:ui -- --reporter=list

# Modo debug para entender fluxo
npm run test:ui:debug
```

---

## �🔧 Troubleshooting

### Problema: Testes não encontram o elemento
**Solução**: Verifique se o seletor CSS está correto e se a página carregou completamente.

### Problema: Timeout ao executar testes
**Solução**: Aumente o timeout na configuração do Playwright ou verifique a conexão de internet.

### Problema: Erro de autenticação na API
**Solução**: Verifique se as credenciais de teste estão corretas e se a API está disponível.

### Problema: Erro de certificado SSL
**Solução**: Adicione a variável de ambiente `NODE_TLS_REJECT_UNAUTHORIZED=0` (apenas para testes locais).

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação em `docs/`
2. Consulte os comentários no código
3. Verifique os arquivos de log em `test-results/`

---

## 📄 Licença

MIT License - Veja o arquivo LICENSE para detalhes.

---

## 👤 Autor: Iago Nobrega 

**Desenvolvido para o Desafio BeTalent QA**

---

## 📅 Data da Execução

Projeto criado em: **11fit de Maio de 2026**

---

## 🎯 Métricas Iniciais

- **Total de Testes Planejados**: 69
- **Abordagem**: BDD com Playwright e JavaScript
- **Cobertura**: Nível 1 + Nível 2
- **Documentação**: Completa em Markdown
- **Status**: ✅ Pronto para Execução
