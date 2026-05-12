# 🤝 Guia de Contribuição - Desafio BeTalent QA

## Bem-vindo! 👋

Obrigado por ter interesse em contribuir com o projeto BeTalent QA. Este documento fornece diretrizes e instruções para colaborar.

---

## 📋 Código de Conduta

- Seja respeitoso com todos os contribuidores
- Abra issues para discutir mudanças significativas
- Teste suas alterações antes de submeter PR
- Mantenha o código limpo e documentado

---

## 🚀 Como Começar

### 1. Fork e Clone

```bash
# Faça um fork do repositório
# Clone seu fork
git clone https://github.com/seu-usuario/desafio-BeTalent.git
cd desafio-BeTalent

# Adicione upstream
git remote add upstream https://github.com/IagoNobrega/desafio-BeTalent.git
```

### 2. Configure o Ambiente

```bash
# Instale dependências
npm install

# Instale browsers
npx playwright install
```

### 3. Crie uma Branch

```bash
# Atualize main
git fetch upstream
git checkout main
git merge upstream/main

# Crie branch para sua feature
git checkout -b feature/sua-feature
# ou
git checkout -b fix/seu-fix
```

---

## 💻 Desenvolvendo

### Estrutura de Commits

```bash
# Feature nova
git commit -m "feat: adiciona novo teste para autenticação"

# Bug fix
git commit -m "fix: corrige timeout em testes de API"

# Documentação
git commit -m "docs: atualiza README com exemplos"

# Refatoração
git commit -m "refactor: melhora estrutura de page objects"

# Testes
git commit -m "test: adiciona testes de responsividade"
```

### Padrões de Código

#### JavaScript/Tests

```javascript
// Use BDD style com Given-When-Then
test('TC-MODULE-001 | Description', async ({ page }) => {
  // Given
  const page = new PageName(page);
  
  // When
  await page.doSomething();
  
  // Then
  expect(await page.isVisible('selector')).toBeTruthy();
});
```

#### Page Objects

```javascript
// Use métodos descritivos
class MyPage extends BasePage {
  async navigateTo() {
    await this.goto('https://example.com');
  }
  
  async fillForm(data) {
    await this.fill('#field', data.value);
  }
}
```

#### Nomenclatura

```
✅ Bom:
- waitForLoginForm()
- fillCheckoutInfo()
- verifyErrorMessage()

❌ Ruim:
- wait()
- fill()
- verify()
```

---

## 🧪 Testando Suas Mudanças

### Antes de fazer Push

```bash
# Execute testes localmente
npm run test:ui
npm run test:api
npm run test:all

# Verifique se passou
npm run report
```

### Teste em Multiple Browsers

```bash
# Testes em Chrome
npm run test:ui:chrome

# Testes com visualização
npm run test:ui:headed

# Modo debug
npm run test:ui:debug
```

---

## 📚 Adicionando Novos Testes

### UI Test Template

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Auth Module', () => {
  let loginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
  });
  
  test('TC-AUTH-XXX | Should do something', async ({ page }) => {
    // Given
    expect(await loginPage.isLoginPageLoaded()).toBeTruthy();
    
    // When
    await loginPage.doSomething();
    
    // Then
    expect(result).toBeTruthy();
  });
});
```

### API Test Template

```javascript
test('Create resource with valid data', async () => {
  // Given
  const data = { /* ... */ };
  
  // When
  const response = await axios.post(`${BASE_URL}/endpoint`, data);
  
  // Then
  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty('id');
});
```

---

## 📖 Documentação

### Atualize a Documentação

1. **README.md** - Alterações geral no projeto
2. **docs/UI-TEST-PLAN.md** - Novos testes de UI
3. **docs/API-TEST-PLAN.md** - Novos testes de API
4. **docs/BUG-ANALYSIS.md** - Bugs encontrados
5. **docs/IMPROVEMENTS.md** - Sugestões

### Formato de Documentação

```markdown
# Título

Descrição clara e concisa.

## Seção

- Ponto 1
- Ponto 2

## Exemplo

\`\`\`javascript
código aqui
\`\`\`
```

---

## 🔄 Processo de PR (Pull Request)

### 1. Prepare o PR

```bash
# Atualize main
git fetch upstream
git rebase upstream/main

# Push para seu fork
git push origin feature/sua-feature
```

### 2. Abra o PR

- Use o template fornecido
- Descreva as mudanças claramente
- Reference issues relacionadas
- Adicione screenshots se relevante

### 3. Checklist do PR

- [ ] Testes passaram
- [ ] Documentação atualizada
- [ ] Sem console.log
- [ ] BDD comentários presentes
- [ ] Código segue padrões

### 4. Code Review

- Responda aos comentários
- Faça ajustes conforme necessário
- Mantenha a conversa profissional

---

## 🎯 Tipos de Contribuição

### 🐛 Bug Fixes

```bash
git checkout -b fix/bug-description
# Corrija o bug
# Teste a correção
git commit -m "fix: descrição do bug"
git push origin fix/bug-description
```

### ✨ Novas Funcionalidades

```bash
git checkout -b feature/feature-name
# Implemente a feature
# Adicione testes
git commit -m "feat: descrição da feature"
git push origin feature/feature-name
```

### 📚 Documentação

```bash
git checkout -b docs/update-docs
# Atualize documentação
git commit -m "docs: descrição das mudanças"
git push origin docs/update-docs
```

---

## 🔐 Security

- Não faça commit de `.env` ou credenciais
- Use variáveis de ambiente
- Reporte vulnerabilidades em privado

---

## ✅ Checklist Final

Antes de fazer push do seu PR:

- [ ] Branch atualizada com upstream/main
- [ ] Testes locais passaram
- [ ] Documentação atualizada
- [ ] Commits estão bem descritos
- [ ] Sem código comentado
- [ ] PR template preenchido

---

## 📞 Dúvidas?

- Abra uma issue para discussão
- Veja documentação em `docs/`
- Consulte issues anteriores

---

## 🙏 Obrigado

Obrigado por contribuir com o projeto BeTalent QA! Suas contribuições ajudam a melhorar a qualidade dos testes.

---

**Desenvolvido com ❤️ para BeTalent**
