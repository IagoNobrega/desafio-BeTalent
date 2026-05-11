/**
 * TESTES DE PRODUTOS - Sauce Demo
 * BDD Style Tests
 * 
 * Feature: Product Management
 *   As a shopper
 *   I want to view, sort and filter products
 *   So that I can find products easily
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');

test.describe('🛍️ Products Tests', () => {
  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    
    // Login before each test
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  // ===== NÍVEL 1: OBRIGATÓRIO =====

  test('TC-PROD-001 | Should display all products', async ({ page }) => {
    // Scenario: View products list
    // Given I am logged in
    // Then I should see products on the page
    expect(await productsPage.isProductsPageLoaded()).toBeTruthy();

    // And there should be at least 6 products
    const count = await productsPage.getProductsCount();
    expect(count).toBeGreaterThanOrEqual(6);

    // Take screenshot
    await productsPage.takeScreenshot('products-001-all-products.png');
  });

  test('TC-PROD-002 | Should sort products A-Z', async ({ page }) => {
    // Scenario: Sort products alphabetically ascending
    // Given I am on products page
    // When I select "Name (A to Z)" sorting option
    await productsPage.sortProducts('az');

    // Then products should be sorted A-Z
    const names = await productsPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);

    // Take screenshot
    await productsPage.takeScreenshot('products-002-sort-az.png');
  });

  test('TC-PROD-003 | Should sort products Z-A', async ({ page }) => {
    // Scenario: Sort products alphabetically descending
    // Given I am on products page
    // When I select "Name (Z to A)" sorting option
    await productsPage.sortProducts('za');

    // Then products should be sorted Z-A
    const names = await productsPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);

    // Take screenshot
    await productsPage.takeScreenshot('products-003-sort-za.png');
  });

  test('TC-PROD-004 | Should sort products by price low to high', async ({ page }) => {
    // Scenario: Sort products by price ascending
    // When I select "Price (low to high)" sorting option
    await productsPage.sortProducts('lohi');

    // Then products should be sorted by price ascending
    const prices = await productsPage.getProductPrices();
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...priceValues].sort((a, b) => a - b);
    expect(priceValues).toEqual(sorted);

    // Take screenshot
    await productsPage.takeScreenshot('products-004-sort-lohi.png');
  });

  test('TC-PROD-005 | Should sort products by price high to low', async ({ page }) => {
    // Scenario: Sort products by price descending
    // When I select "Price (high to low)" sorting option
    await productsPage.sortProducts('hilo');

    // Then products should be sorted by price descending
    const prices = await productsPage.getProductPrices();
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...priceValues].sort((a, b) => b - a);
    expect(priceValues).toEqual(sorted);

    // Take screenshot
    await productsPage.takeScreenshot('products-005-sort-hilo.png');
  });

  test('TC-PROD-006 | Should add product to cart', async ({ page }) => {
    // Scenario: Add single product to cart
    // Given I am on products page
    // When I click "Add to cart" button on first product
    await productsPage.addProductToCart(0);

    // Then cart should show 1 item
    const count = await productsPage.getCartCount();
    expect(count).toBe(1);

    // Take screenshot
    await productsPage.takeScreenshot('products-006-add-to-cart.png');
  });

  test('TC-PROD-007 | Should remove product from cart', async ({ page }) => {
    // Scenario: Remove product from cart
    // Given I added a product to cart
    await productsPage.addProductToCart(0);
    expect(await productsPage.getCartCount()).toBe(1);

    // When I click "Remove" button
    await productsPage.removeProductFromCart(0);

    // Then cart should be empty
    const count = await productsPage.getCartCount();
    expect(count).toBe(0);

    // Take screenshot
    await productsPage.takeScreenshot('products-007-remove-from-cart.png');
  });

  test('TC-PROD-008 | Should navigate to cart', async ({ page }) => {
    // Scenario: Navigate to shopping cart
    // Given I added a product to cart
    await productsPage.addProductToCart(0);

    // When I click cart button
    await productsPage.goToCart();

    // Then I should be on cart page
    expect(page.url()).toContain('cart');

    // Take screenshot
    await productsPage.takeScreenshot('products-008-navigate-cart.png');
  });

  // ===== NÍVEL 2: DIFERENCIAL =====

  test('TC-PROD-009 | Should display correct product prices', async ({ page }) => {
    // Scenario: Verify product prices are displayed correctly
    // Given I am on products page
    // When I retrieve all product prices
    const prices = await productsPage.getProductPrices();

    // Then all prices should have dollar sign
    prices.forEach(price => {
      expect(price).toMatch(/^\$/);
    });

    // And all prices should be valid numbers
    prices.forEach(price => {
      const numValue = parseFloat(price.replace('$', ''));
      expect(numValue).toBeGreaterThan(0);
    });

    // Take screenshot
    await productsPage.takeScreenshot('products-009-verify-prices.png');
  });

  test('TC-PROD-010 | Should add multiple products to cart', async ({ page }) => {
    // Scenario: Add multiple products
    // Given I am on products page
    // When I add 3 products to cart
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.addProductToCart(2);

    // Then cart should show 3 items
    const count = await productsPage.getCartCount();
    expect(count).toBe(3);

    // Take screenshot
    await productsPage.takeScreenshot('products-010-multiple-items.png');
  });

  test('TC-PROD-011 | Should be responsive on mobile', async ({ page }) => {
    // Scenario: Product page should be responsive
    // Given I set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // When products page is displayed
    // Then products should be visible
    expect(await productsPage.isProductsPageLoaded()).toBeTruthy();

    // And product list should be scrollable
    const count = await productsPage.getProductsCount();
    expect(count).toBeGreaterThan(0);

    // Take screenshot
    await productsPage.takeScreenshot('products-011-mobile-responsive.png');
  });

  test('TC-PROD-012 | Should display product images', async ({ page }) => {
    // Scenario: Product images should load
    // Given I am on products page
    // When I look for product images
    const images = await page.$$('.inventory_item_img');

    // Then images should be present
    expect(images.length).toBeGreaterThan(0);

    // Take screenshot
    await productsPage.takeScreenshot('products-012-product-images.png');
  });
});
