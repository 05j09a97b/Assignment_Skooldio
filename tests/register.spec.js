const { test } = require('@playwright/test');
const { RegisterPage } = require('../pages/register.page');
const { verifyRegistrationForm } = require('../keywords/register.keyword');
const testCases = require('../test-data/register.data');

/**
 * ≈ *** Settings ***
 * Test Template    Verify registration form with all input field
 * Test Setup       Open Skooldio register website
 * Test Teardown    (Playwright handles automatically)
 */
test.describe('Skooldio Registration Form', () => {
  /**
   * ≈ Test Template directive ใน Robot Framework
   * Loop ผ่านทุก test case → เรียก keyword template
   */
  for (const tc of testCases) {
    test(tc.name, async ({ page }) => {
      // ≈ Test Setup: Open Skooldio register website
      const registerPage = new RegisterPage(page);
      await registerPage.goto();

      // ≈ Test Template: Verify registration form with all input field
      await verifyRegistrationForm(registerPage, tc);
    });
  }
});
