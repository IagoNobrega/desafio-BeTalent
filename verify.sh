#!/bin/bash

# 🎯 Script de Verificação - Desafio BeTalent QA
# Este script verifica se todos os arquivos foram criados corretamente

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  🚀 VERIFICAÇÃO DE ARQUIVOS - DESAFIO BETALENT QA           ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para verificar arquivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1 (NÃO ENCONTRADO)"
        return 1
    fi
}

# Função para verificar diretório
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        return 0
    else
        echo -e "${RED}✗${NC} $1/ (NÃO ENCONTRADO)"
        return 1
    fi
}

count_pass=0
count_fail=0

# Verificar arquivos raiz
echo -e "${BLUE}📋 Arquivos Raiz:${NC}"
check_file "README.md" && ((count_pass++)) || ((count_fail++))
check_file "EXECUTIVE-SUMMARY.md" && ((count_pass++)) || ((count_fail++))
check_file "QUICK-START.md" && ((count_pass++)) || ((count_fail++))
check_file "INDEX.md" && ((count_pass++)) || ((count_fail++))
check_file "package.json" && ((count_pass++)) || ((count_fail++))
check_file "playwright.config.js" && ((count_pass++)) || ((count_fail++))
check_file ".gitignore" && ((count_pass++)) || ((count_fail++))
check_file ".env.example" && ((count_pass++)) || ((count_fail++))
echo ""

# Verificar diretórios
echo -e "${BLUE}📁 Diretórios:${NC}"
check_dir "ui-testing" && ((count_pass++)) || ((count_fail++))
check_dir "api-testing" && ((count_pass++)) || ((count_fail++))
check_dir "docs" && ((count_pass++)) || ((count_fail++))
echo ""

# Verificar testes UI
echo -e "${BLUE}🧪 Testes UI (ui-testing/specs/):${NC}"
check_file "ui-testing/specs/auth.spec.js" && ((count_pass++)) || ((count_fail++))
check_file "ui-testing/specs/products.spec.js" && ((count_pass++)) || ((count_fail++))
check_file "ui-testing/specs/cart.spec.js" && ((count_pass++)) || ((count_fail++))
check_file "ui-testing/specs/checkout.spec.js" && ((count_pass++)) || ((count_fail++))
check_file "ui-testing/specs/navigation.spec.js" && ((count_pass++)) || ((count_fail++))
echo ""

# Verificar Page Objects
echo -e "${BLUE}📄 Page Objects (ui-testing/pages/):${NC}"
check_file "ui-testing/pages/BasePage.js" && ((count_pass++)) || ((count_fail++))
check_file "ui-testing/pages/LoginPage.js" && ((count_pass++)) || ((count_fail++))
check_file "ui-testing/pages/ProductsPage.js" && ((count_pass++)) || ((count_fail++))
check_file "ui-testing/pages/CartPage.js" && ((count_pass++)) || ((count_fail++))
check_file "ui-testing/pages/CheckoutPage.js" && ((count_pass++)) || ((count_fail++))
echo ""

# Verificar testes API
echo -e "${BLUE}🔌 Testes API (api-testing/):${NC}"
check_file "api-testing/tests/api-tests.js" && ((count_pass++)) || ((count_fail++))
check_file "api-testing/tests/runner.js" && ((count_pass++)) || ((count_fail++))
check_file "api-testing/collections/Restful-Booker.postman_collection.json" && ((count_pass++)) || ((count_fail++))
check_file "api-testing/environment/Restful-Booker.postman_environment.json" && ((count_pass++)) || ((count_fail++))
echo ""

# Verificar documentação
echo -e "${BLUE}📚 Documentação (docs/):${NC}"
check_file "docs/UI-TEST-PLAN.md" && ((count_pass++)) || ((count_fail++))
check_file "docs/API-TEST-PLAN.md" && ((count_pass++)) || ((count_fail++))
check_file "docs/BUG-ANALYSIS.md" && ((count_pass++)) || ((count_fail++))
check_file "docs/RISKS-ANALYSIS.md" && ((count_pass++)) || ((count_fail++))
check_file "docs/IMPROVEMENTS.md" && ((count_pass++)) || ((count_fail++))
echo ""

# Resultado
echo "╔════════════════════════════════════════════════════════════════╗"
echo -e "║  ${GREEN}✓${NC} Arquivos OK: ${count_pass}                                        ║"
if [ $count_fail -gt 0 ]; then
    echo -e "║  ${RED}✗${NC} Arquivos Faltando: ${count_fail}                                    ║"
fi
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Próximos passos
echo -e "${BLUE}📋 Próximos Passos:${NC}"
echo "1. npm install"
echo "2. npx playwright install"
echo "3. npm run test:all"
echo "4. npm run report"
echo ""

# Dicas
echo -e "${BLUE}💡 Dicas:${NC}"
echo "• Para ver relatório: npm run report"
echo "• Para testes com visualização: npm run test:ui:headed"
echo "• Para debug: npm run test:ui:debug"
echo ""

echo "✅ Verificação concluída!"
