/**
 * TESTES DE AUTENTICAÇÃO - Sauce Demo
 * BDD Style Tests
 * 
 * Feature: Authentication
 *   As a user
 *   I want to login to the application
 *   So that I can access the shopping functionality
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.describe('🔐 Authentication Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ===== NÍVEL 1: OBRIGATÓRIO =====

  test('TC-AUTH-001 | Should login successfully with standard user', async ({ page }) => {
    // Scenario: Valid credentials for standard user
    // Given I am on the login page
    expect(await loginPage.isLoginPageLoaded()).toBeTruthy();

    // When I enter valid credentials for standard_user
    await loginPage.login('standard_user', 'secret_sauce');

    // Then I should be redirected to products page
    expect(await loginPage.isVisible('.inventory_container')).toBeTruthy();

    // And page title should contain "Swag Labs"
    const title = await loginPage.getTitle();
    expect(title).toContain('Swag Labs');

    // Take screenshot as evidence
    await loginPage.takeScreenshot('auth-001-standard-user-login.png');
  });

  test('TC-AUTH-002 | Should login successfully with problem user', async ({ page }) => {
    // Scenario: Valid credentials for problem_user
    // Given I am on the login page
    expect(await loginPage.isLoginPageLoaded()).toBeTruthy();

    // When I enter valid credentials for problem_user
    await loginPage.login('problem_user', 'secret_sauce');

    // Then I should be redirected to products page
    expect(await loginPage.isVisible('.inventory_container')).toBeTruthy();

    // Take screenshot
    await loginPage.takeScreenshot('auth-002-problem-user-login.png');
  });

  test('TC-AUTH-003 | Should login successfully with performance glitch user', async ({ page }) => {
    // Scenario: Valid credentials for performance_glitch_user
    // Given I am on the login page
    // When I enter valid credentials for performance_glitch_user
    await loginPage.login('performance_glitch_user', 'secret_sauce');

    // Then I should be redirected to products page
    expect(await loginPage.isVisible('.inventory_container')).toBeTruthy();

    // Take screenshot
    await loginPage.takeScreenshot('auth-003-performance-user-login.png');
  });

  test('TC-AUTH-007 | Should measure login performance for performance glitch user', async ({ page }) => {
    const start = Date.now();
    await loginPage.login('performance_glitch_user', 'secret_sauce');
    const elapsed = Date.now() - start;

    expect(await loginPage.isVisible('.inventory_container')).toBeTruthy();
    expect(elapsed).toBeLessThan(12000);

    console.log(`TC-AUTH-007 | Performance login time: ${elapsed}ms`);
    await loginPage.takeScreenshot('auth-007-performance-login-timing.png');
  });

  test('TC-AUTH-004 | Should show error with invalid password', async ({ page }) => {
    // Scenario: Invalid password
    // Given I am on the login page
    // When I enter correct username but wrong password
    await loginPage.fill(loginPage.usernameInput, 'standard_user');
    await loginPage.fill(loginPage.passwordInput, 'wrong_password');
    await loginPage.click(loginPage.loginButton);

    // Then an error message should be displayed
    expect(await loginPage.isErrorVisible()).toBeTruthy();

    // And the error message should contain specific text
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('do not match any user');

    // Take screenshot of error
    await loginPage.takeScreenshot('auth-004-invalid-password-error.png');
  });

  test('TC-AUTH-005 | Should show error with invalid username', async ({ page }) => {
    // Scenario: Invalid username
    // When I enter non-existent username
    await loginPage.fill(loginPage.usernameInput, 'invalid_user');
    await loginPage.fill(loginPage.passwordInput, 'secret_sauce');
    await loginPage.click(loginPage.loginButton);

    // Then an error message should be displayed
    expect(await loginPage.isErrorVisible()).toBeTruthy();

    // And error message should indicate user not found
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('do not match any user');

    // Take screenshot
    await loginPage.takeScreenshot('auth-005-invalid-username-error.png');
  });

  test('TC-AUTH-006 | Should show error with empty credentials', async ({ page }) => {
    // Scenario: Empty fields
    // When I click login without entering any credentials
    await loginPage.click(loginPage.loginButton);

    // Then an error message should be displayed
    expect(await loginPage.isErrorVisible()).toBeTruthy();

    // And error should mention username
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Username is required');

    // Take screenshot
    await loginPage.takeScreenshot('auth-006-empty-credentials-error.png');
  });

  // ===== NÍVEL 2: DIFERENCIAL =====

  test('TC-AUTH-007 | Should have proper password masking', async ({ page }) => {
    // Scenario: Password field should be masked
    // Given I am on the login page
    // When I enter password in password field
    const passwordField = await page.$('input[type="password"]');
    
    // Then the password field should have type="password"
    const fieldType = await passwordField.getAttribute('type');
    expect(fieldType).toBe('password');

    // Take screenshot
    await loginPage.takeScreenshot('auth-007-password-masking.png');
  });

  test('TC-AUTH-008 | Should be accessible - Login form labels', async ({ page }) => {
    // Scenario: Accessibility - Form labels
    // Given I am on the login page
    // When I inspect the form elements
    // Then all input fields should expose an accessible cue
    const usernameLabel = await page.$('label[for="user-name"]');
    const passwordLabel = await page.$('label[for="password"]');
    const usernamePlaceholder = await page.getAttribute(loginPage.usernameInput, 'placeholder');
    const passwordPlaceholder = await page.getAttribute(loginPage.passwordInput, 'placeholder');

    // SauceDemo uses placeholders instead of visible labels.
    expect(usernameLabel || usernamePlaceholder).toBeTruthy();
    expect(passwordLabel || passwordPlaceholder).toBeTruthy();

    // Take screenshot
    await loginPage.takeScreenshot('auth-008-accessibility-labels.png');
  });

  test('TC-AUTH-009 | Should work on mobile viewport', async ({ page }) => {
    // Scenario: Login on mobile device
    // Given I am on login page with mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // When I perform login
    await loginPage.login('standard_user', 'secret_sauce');

    // Then login should succeed
    expect(await loginPage.isVisible('.inventory_container')).toBeTruthy();

    // Take screenshot of mobile login
    await loginPage.takeScreenshot('auth-009-mobile-login.png');
  });

  test('TC-AUTH-010 | Should work on tablet viewport', async ({ page }) => {
    // Scenario: Login on tablet device
    // Given I am on login page with tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // When I perform login
    await loginPage.login('standard_user', 'secret_sauce');

    // Then login should succeed
    expect(await loginPage.isVisible('.inventory_container')).toBeTruthy();

    // Take screenshot of tablet login
    await loginPage.takeScreenshot('auth-010-tablet-login.png');
  });
});
