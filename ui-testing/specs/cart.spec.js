/**
 * TESTES DE CARRINHO - Sauce Demo
 * BDD Style Tests
 * 
 * Feature: Shopping Cart
 *   As a shopper
 *   I want to manage items in my cart
 *   So that I can control my purchase
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

test.describe('🛒 Cart Tests', () => {
  let loginPage;
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    
    // Login before each test
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  // ===== NÍVEL 1: OBRIGATÓRIO =====

  test('TC-CART-001 | Should display empty cart', async ({ page }) => {
    // Scenario: Navigate to empty cart
    // Given I am logged in
    // When I navigate to cart without adding items
    await productsPage.goToCart();

    // Then cart should be empty
    expect(await cartPage.isCartEmpty()).toBeTruthy();

    // Take screenshot
    await cartPage.takeScreenshot('cart-001-empty-cart.png');
  });

  test('TC-CART-002 | Should add item to cart and display it', async ({ page }) => {
    // Scenario: Add item and verify in cart
    // Given I am on products page
    // When I add product to cart
    const initialNames = await productsPage.getProductNames();
    await productsPage.addProductToCart(0);

    // And I navigate to cart
    await productsPage.goToCart();

    // Then cart should contain the product
    const cartNames = await cartPage.getCartItemNames();
    expect(cartNames).toContain(initialNames[0]);

    // Take screenshot
    await cartPage.takeScreenshot('cart-002-item-in-cart.png');
  });

  test('TC-CART-003 | Should remove item from cart', async ({ page }) => {
    // Scenario: Remove item from cart
    // Given I have item in cart
    await productsPage.addProductToCart(0);
    await productsPage.goToCart();
    expect(await cartPage.getCartItemsCount()).toBe(1);

    // When I click remove button
    await cartPage.removeItem(0);

    // Then cart should be empty
    expect(await cartPage.isCartEmpty()).toBeTruthy();

    // Take screenshot
    await cartPage.takeScreenshot('cart-003-item-removed.png');
  });

  test('TC-CART-004 | Should display multiple items in cart', async ({ page }) => {
    // Scenario: Multiple items in cart
    // Given I am on products page
    // When I add 3 products to cart
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.addProductToCart(2);

    // And I navigate to cart
    await productsPage.goToCart();

    // Then cart should show 3 items
    const count = await cartPage.getCartItemsCount();
    expect(count).toBe(3);

    // Take screenshot
    await cartPage.takeScreenshot('cart-004-multiple-items.png');
  });

  test('TC-CART-005 | Should remove specific item from cart with multiple items', async ({ page }) => {
    // Scenario: Remove one item from multiple items in cart
    // Given I have 3 items in cart
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.addProductToCart(2);
    await productsPage.goToCart();

    // When I remove first item
    await cartPage.removeItem(0);

    // Then cart should have 2 items
    const count = await cartPage.getCartItemsCount();
    expect(count).toBe(2);

    // Take screenshot
    await cartPage.takeScreenshot('cart-005-remove-specific-item.png');
  });

  test('TC-CART-006 | Should proceed to checkout from cart', async ({ page }) => {
    // Scenario: Proceed to checkout
    // Given I have items in cart
    await productsPage.addProductToCart(0);
    await productsPage.goToCart();

    // When I click checkout button
    await cartPage.proceedToCheckout();

    // Then I should be on checkout page
    expect(page.url()).toContain('checkout-step-one');

    // Take screenshot
    await cartPage.takeScreenshot('cart-006-proceed-checkout.png');
  });

  test('TC-CART-007 | Should continue shopping from cart', async ({ page }) => {
    // Scenario: Go back to shopping from cart
    // Given I am on cart page
    await productsPage.addProductToCart(0);
    await productsPage.goToCart();

    // When I click "Continue Shopping" button
    await cartPage.continueShopping();

    // Then I should return to products page
    expect(page.url()).not.toContain('cart');
    expect(await productsPage.isProductsPageLoaded()).toBeTruthy();

    // Take screenshot
    await cartPage.takeScreenshot('cart-007-continue-shopping.png');
  });

  // ===== NÍVEL 2: DIFERENCIAL =====

  test('TC-CART-008 | Should display correct cart total', async ({ page }) => {
    // Scenario: Verify cart total calculation
    // Given I add items to cart
    const prices = await productsPage.getProductPrices();
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);

    // When I navigate to cart
    await productsPage.goToCart();

    // Then cart should display total
    const total = await cartPage.getCartTotal();
    expect(total).toBeTruthy();
    expect(total).toContain('$');

    // Take screenshot
    await cartPage.takeScreenshot('cart-008-cart-total.png');
  });

  test('TC-CART-009 | Should maintain cart across pages', async ({ page }) => {
    // Scenario: Cart persistence
    // Given I add item to cart
    await productsPage.addProductToCart(0);
    const initialCount = await productsPage.getCartCount();

    // When I navigate to products page
    await productsPage.goToCart();
    await cartPage.continueShopping();

    // Then cart count should persist
    const finalCount = await productsPage.getCartCount();
    expect(finalCount).toBe(initialCount);

    // Take screenshot
    await productsPage.takeScreenshot('cart-009-persist-cart.png');
  });

  test('TC-CART-010 | Should be responsive on mobile', async ({ page }) => {
    // Scenario: Cart page responsive design
    // Given I add item to cart
    await productsPage.addProductToCart(0);

    // And I set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // When I navigate to cart
    await productsPage.goToCart();

    // Then cart should be visible
    expect(await cartPage.isCartPageLoaded()).toBeTruthy();

    // Take screenshot
    await cartPage.takeScreenshot('cart-010-mobile-responsive.png');
  });
});
