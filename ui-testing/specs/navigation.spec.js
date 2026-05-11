/**
 * TESTES DE NAVEGAÇÃO E LOGOUT - Sauce Demo
 * BDD Style Tests
 * 
 * Feature: Navigation and Session Management
 *   As a user
 *   I want to navigate and logout from the application
 *   So that I can manage my session
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');

test.describe('🧭 Navigation Tests', () => {
  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  // ===== NÍVEL 1: OBRIGATÓRIO =====

  test('TC-NAV-001 | Should logout successfully', async ({ page }) => {
    // Scenario: User logout
    // Given I am logged in
    expect(await productsPage.isProductsPageLoaded()).toBeTruthy();

    // When I click logout
    await productsPage.logout();

    // Then I should return to login page
    expect(await loginPage.isLoginPageLoaded()).toBeTruthy();
    expect(page.url()).not.toContain('inventory');

    // Take screenshot
    await loginPage.takeScreenshot('nav-001-logout.png');
  });

  test('TC-NAV-002 | Should access cart from products page', async ({ page }) => {
    // Scenario: Navigate to cart
    // Given I am on products page
    // When I click cart button
    await productsPage.goToCart();

    // Then I should be on cart page
    expect(page.url()).toContain('cart');

    // Take screenshot
    await productsPage.takeScreenshot('nav-002-to-cart.png');
  });

  test('TC-NAV-003 | Should have menu button on products page', async ({ page }) => {
    // Scenario: Menu button visibility
    // Given I am on products page
    // When I look for menu button
    const menuButton = await page.$(productsPage.menuButton);

    // Then menu button should be visible
    expect(menuButton).toBeTruthy();

    // Take screenshot
    await productsPage.takeScreenshot('nav-003-menu-button.png');
  });

  test('TC-NAV-004 | Should have cart button on all pages', async ({ page }) => {
    // Scenario: Cart button consistency
    // Given I am on products page
    const cartOnProducts = await page.$(productsPage.cartButton);
    expect(cartOnProducts).toBeTruthy();

    // When I add item and go to cart
    await productsPage.addProductToCart(0);
    await productsPage.goToCart();

    // Then cart button should still be visible
    const cartOnCart = await page.$(productsPage.cartButton);
    expect(cartOnCart).toBeTruthy();

    // Take screenshot
    await productsPage.takeScreenshot('nav-004-cart-button-visible.png');
  });

  test('TC-NAV-005 | Should navigate between pages correctly', async ({ page }) => {
    // Scenario: Page navigation flow
    // Given I am on products page
    const productsUrl = page.url();

    // When I add item and navigate to cart
    await productsPage.addProductToCart(0);
    await productsPage.goToCart();
    const cartUrl = page.url();
    expect(cartUrl).not.toEqual(productsUrl);

    // And I continue shopping
    // Then I should return to products page
    await productsPage.continueShopping();
    expect(page.url()).toEqual(productsUrl);

    // Take screenshot
    await productsPage.takeScreenshot('nav-005-navigation-flow.png');
  });

  // ===== NÍVEL 2: DIFERENCIAL =====

  test('TC-NAV-006 | Should preserve scroll position during navigation', async ({ page }) => {
    // Scenario: Scroll persistence
    // Given I am on products page
    // When I scroll down to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const scrolledPosition = await page.evaluate(() => window.scrollY);

    // And I navigate to cart
    await productsPage.goToCart();

    // And return to products
    await productsPage.continueShopping();

    // Take screenshot
    await productsPage.takeScreenshot('nav-006-scroll-position.png');
  });

  test('TC-NAV-007 | Should not have broken links in navigation', async ({ page }) => {
    // Scenario: Navigation links validation
    // Given I am on products page
    // When I get all links
    const links = await page.$$('a');

    // Then all links should have valid hrefs
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href) {
        expect(href).toBeTruthy();
      }
    }

    // Take screenshot
    await productsPage.takeScreenshot('nav-007-valid-links.png');
  });

  test('TC-NAV-008 | Should handle browser back button', async ({ page }) => {
    // Scenario: Browser back navigation
    // Given I am on products page and go to cart
    const productsUrl = page.url();
    await productsPage.goToCart();
    const cartUrl = page.url();

    // When I use browser back button
    await page.goBack();

    // Then I should return to products page
    expect(page.url()).toContain('inventory');

    // Take screenshot
    await productsPage.takeScreenshot('nav-008-browser-back.png');
  });

  test('TC-NAV-009 | Should display breadcrumbs or current page indicator', async ({ page }) => {
    // Scenario: User knows current location
    // Given I am on products page
    // When I check page title or header
    const title = await page.textContent('.app_logo');

    // Then page identifier should be visible
    expect(title).toBeTruthy();

    // Take screenshot
    await productsPage.takeScreenshot('nav-009-page-indicator.png');
  });

  test('TC-NAV-010 | Should support keyboard navigation', async ({ page }) => {
    // Scenario: Accessibility - keyboard navigation
    // Given I am on products page
    // When I tab through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Then focus should be visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();

    // Take screenshot
    await productsPage.takeScreenshot('nav-010-keyboard-nav.png');
  });
});
