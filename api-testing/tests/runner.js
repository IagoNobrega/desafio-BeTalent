/**
 * API Test Runner
 * Executa todos os testes de API e gera relatório
 */

const APITester = require('./api-tests');
const fs = require('fs');
const path = require('path');

async function runTests() {
  const tester = new APITester();
  const results = await tester.runAllTests();

  // Generate report
  const report = {
    title: 'Restful-Booker API Test Report',
    baseUrl: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
    apiDocumentation: 'https://restful-booker.herokuapp.com/apidoc/index.html',
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    passedTests: results.filter(r => r.passed).length,
    failedTests: results.filter(r => !r.passed).length,
    passRate: `${((results.filter(r => r.passed).length / results.length) * 100).toFixed(2)}%`,
    results: results
  };

  // Save report to file
  const reportPath = path.join(__dirname, '../evidence', 'api-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Report saved to: ${reportPath}`);

  return report;
}

runTests().catch(error => {
  console.error('Error running tests:', error);
  process.exit(1);
});
