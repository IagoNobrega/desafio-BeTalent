/**
 * TESTES DE CHECKOUT - Sauce Demo
 * BDD Style Tests
 * 
 * Feature: Checkout Process
 *   As a shopper
 *   I want to complete my purchase
 *   So that I can receive my items
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

test.describe('💳 Checkout Tests', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    // Login and add item to cart
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  // ===== NÍVEL 1: OBRIGATÓRIO =====

  test('TC-CHECK-001 | Should fill checkout info and continue', async ({ page }) => {
    // Scenario: Complete first step of checkout
    // Given I am on checkout page
    expect(page.url()).toContain('checkout-step-one');

    // When I fill in all required information
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    };
    await checkoutPage.fillCheckoutInfo(checkoutInfo);

    // And I click continue
    await checkoutPage.clickContinue();

    // Then I should proceed to review page
    expect(await checkoutPage.isReviewPageLoaded()).toBeTruthy();

    // Take screenshot
    await checkoutPage.takeScreenshot('checkout-001-info-filled.png');
  });

  test('TC-CHECK-002 | Should validate first name is required', async ({ page }) => {
    // Scenario: Missing first name
    // Given I am on checkout page
    // When I leave first name empty and try to continue
    const checkoutInfo = {
      firstName: '',
      lastName: 'Doe',
      postalCode: '12345'
    };
    await checkoutPage.fillCheckoutInfo(checkoutInfo);
    await checkoutPage.clickContinue();

    // Then error should be displayed
    expect(await checkoutPage.isErrorVisible()).toBeTruthy();

    // Take screenshot
    await checkoutPage.takeScreenshot('checkout-002-firstname-required.png');
  });

  test('TC-CHECK-003 | Should validate last name is required', async ({ page }) => {
    // Scenario: Missing last name
    // Given I am on checkout page
    // When I leave last name empty
    const checkoutInfo = {
      firstName: 'John',
      lastName: '',
      postalCode: '12345'
    };
    await checkoutPage.fillCheckoutInfo(checkoutInfo);
    await checkoutPage.clickContinue();

    // Then error should be displayed
    expect(await checkoutPage.isErrorVisible()).toBeTruthy();

    // Take screenshot
    await checkoutPage.takeScreenshot('checkout-003-lastname-required.png');
  });

  test('TC-CHECK-004 | Should validate postal code is required', async ({ page }) => {
    // Scenario: Missing postal code
    // When I leave postal code empty
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: ''
    };
    await checkoutPage.fillCheckoutInfo(checkoutInfo);
    await checkoutPage.clickContinue();

    // Then error should be displayed
    expect(await checkoutPage.isErrorVisible()).toBeTruthy();

    // Take screenshot
    await checkoutPage.takeScreenshot('checkout-004-postalcode-required.png');
  });

  test('TC-CHECK-005 | Should complete checkout successfully', async ({ page }) => {
    // Scenario: Complete full checkout flow
    // Given I am on checkout page
    // When I fill all information and continue
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    };
    await checkoutPage.fillCheckoutInfo(checkoutInfo);
    await checkoutPage.clickContinue();

    // And I click finish button
    await checkoutPage.finishCheckout();

    // Then I should see checkout complete page
    expect(await checkoutPage.isCheckoutComplete()).toBeTruthy();

    // And success message should be displayed
    const message = await checkoutPage.getCompleteMessage();
    expect(message).toBeTruthy();

    // Take screenshot
    await checkoutPage.takeScreenshot('checkout-005-complete-success.png');
  });

  test('TC-CHECK-006 | Should display order summary before completing', async ({ page }) => {
    // Scenario: Review order before completing
    // Given I filled checkout information and continue
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    };
    await checkoutPage.fillCheckoutInfo(checkoutInfo);
    await checkoutPage.clickContinue();

    // When I am on review page
    // Then finish button should be visible
    expect(await checkoutPage.isVisible(checkoutPage.finishButton)).toBeTruthy();

    // Take screenshot of order review
    await checkoutPage.takeScreenshot('checkout-006-order-review.png');
  });

  test('TC-CHECK-007 | Should allow cancelling checkout', async ({ page }) => {
    // Scenario: Cancel checkout process
    // Given I am on checkout page
    // When I click cancel button
    await checkoutPage.clickCancel();

    // Then I should return to cart
    expect(page.url()).toContain('cart');

    // Take screenshot
    await checkoutPage.takeScreenshot('checkout-007-cancel-checkout.png');
  });

  // ===== NÍVEL 2: DIFERENCIAL =====

  test('TC-CHECK-008 | Should support special characters in names', async ({ page }) => {
    // Scenario: Names with special characters
    // Given I am on checkout page
    // When I enter names with special characters
    const checkoutInfo = {
      firstName: "Jean-Pierre",
      lastName: "O'Neill",
      postalCode: '12345'
    };
    await checkoutPage.fillCheckoutInfo(checkoutInfo);
    await checkoutPage.clickContinue();

    // Then checkout should succeed
    expect(await checkoutPage.isReviewPageLoaded()).toBeTruthy();

    // Take screenshot
    await checkoutPage.takeScreenshot('checkout-008-special-characters.png');
  });

  test('TC-CHECK-009 | Should handle numeric postal codes', async ({ page }) => {
    // Scenario: Various postal code formats
    // Given I am on checkout page
    // When I enter different valid postal codes
    const postalCodes = ['12345', '90210', '00000'];
    
    for (const code of postalCodes) {
      await checkoutPage.fillCheckoutInfo({
        firstName: 'John',
        lastName: 'Doe',
        postalCode: code
      });
      await checkoutPage.clickContinue();
      expect(await checkoutPage.isReviewPageLoaded()).toBeTruthy();
      
      // Go back to previous step for next iteration
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await productsPage.addProductToCart(0);
      await productsPage.goToCart();
      await cartPage.proceedToCheckout();
    }

    // Take screenshot
    await checkoutPage.takeScreenshot('checkout-009-postal-codes.png');
  });

  test('TC-CHECK-010 | Should display correct item count in review', async ({ page }) => {
    // Scenario: Verify item in order review
    // Given I added items to cart and continue checkout
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    };
    await checkoutPage.fillCheckoutInfo(checkoutInfo);
    await checkoutPage.clickContinue();

    // When I am on review page
    // Then I should see the item
    const hasItems = await checkoutPage.isVisible('.cart_item');
    expect(hasItems).toBeTruthy();

    // Take screenshot
    await checkoutPage.takeScreenshot('checkout-010-item-review.png');
  });

  test('TC-CHECK-011 | Should be responsive on mobile checkout', async ({ page }) => {
    // Scenario: Mobile checkout
    // Given I set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // When I fill checkout info
    const checkoutInfo = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    };
    await checkoutPage.fillCheckoutInfo(checkoutInfo);
    await checkoutPage.clickContinue();

    // Then form should be accessible on mobile
    expect(await checkoutPage.isReviewPageLoaded()).toBeTruthy();

    // Take screenshot
    await checkoutPage.takeScreenshot('checkout-011-mobile-responsive.png');
  });
});
