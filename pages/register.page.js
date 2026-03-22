const { expect } = require('@playwright/test');
class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.timeout = 10000;

    this.txtFirstName = page.locator('input[name="firstName"]');
    this.txtLastName = page.locator('input[name="lastName"]');
    this.txtEmail = page.locator('input[name="email"]');
    this.txtPassword = page.locator('input[name="password"]');
    this.txtConfirmPassword = page.locator('input[name="passwordVerify"]');
    this.chkTerms = page.locator('input[name="acceptTerms"]');
    this.chkTermsClickable = page.locator('.MuiCheckbox-root');
    this.btnRegister = page.locator('button#signup-email');
    this.btnFacebook = page.locator('button#signup-facebook');
    this.lnkLogin = page.locator('a[href="/login"]').first();
  }

  async goto() {
    await this.page.goto('/register', { waitUntil: 'domcontentloaded' });
    await this.dismissPopups();
    await this.txtFirstName.waitFor({ state: 'visible', timeout: this.timeout });
  }

  /**
   * ≈ ปิด popup/banner ที่อาจบัง form (cookie consent, promotion popup)
   * หมายเหตุ: Promotion popup เป็น iframe จาก landingipopups.com
   *           ที่ครอบเต็มจอด้วย position:fixed z-index:999999
   */
  async dismissPopups() {
    // รอให้ page + popup iframe โหลด
    await this.page.waitForTimeout(3000);

    // ปิด cookie consent banner (ปุ่ม "ยอมรับทั้งหมด")
    try {
      const cookieBtn = this.page.getByRole('button', { name: 'ยอมรับทั้งหมด' });
      await cookieBtn.click({ timeout: 5000 });
      await this.page.waitForTimeout(1000);
    } catch {
      // ไม่มี cookie banner — ข้ามไป
    }

    // ลบ promotion popup iframe (landingipopups.com) ออกจาก DOM
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe').forEach(iframe => {
        const src = iframe.src || '';
        const style = iframe.style;
        // ลบ iframe ที่เป็น popup (จาก landingipopups.com หรือ fixed fullscreen iframe)
        if (src.includes('landingipopups') || src.includes('popup') ||
            (style.position === 'fixed' && style.zIndex > 9999)) {
          iframe.remove();
        }
      });
      document.body.style.overflow = '';
    });
    await this.page.waitForTimeout(500);
  }

  /**
   * ≈ Input text when ready
   * @param {import('@playwright/test').Locator} locator
   * @param {string} text
   */
  async inputTextWhenReady(locator, text) {
    await locator.waitFor({ state: 'visible', timeout: this.timeout });
    await locator.clear();
    if (text.length > 0) {
      await locator.fill(text);
      await this.page.waitForTimeout(200); // Playwright is too fast for React sometimes
      await locator.blur(); // Trigger validation
    }
  }

  /**
   * ≈ Input firstname
   * @param {string} firstName
   */
  async inputFirstName(firstName) {
    await this.inputTextWhenReady(this.txtFirstName, firstName);
  }

  /**
   * ≈ Input lastname
   * @param {string} lastName
   */
  async inputLastName(lastName) {
    await this.inputTextWhenReady(this.txtLastName, lastName);
  }

  /**
   * ≈ Input email
   * @param {string} email
   */
  async inputEmail(email) {
    await this.inputTextWhenReady(this.txtEmail, email);
  }

  /**
   * ≈ Input password
   * @param {string} password
   */
  async inputPassword(password) {
    await this.inputTextWhenReady(this.txtPassword, password);
  }

  /**
   * ≈ Input confirm password
   * @param {string} confirmPassword
   */
  async inputConfirmPassword(confirmPassword) {
    await this.inputTextWhenReady(this.txtConfirmPassword, confirmPassword);
  }

  /**
   * ≈ Accept terms and conditions
   * หมายเหตุ: Skooldio ใช้ Material UI Checkbox → ต้อง dispatchEvent แทน .check()
   */
  async acceptTerms() {
    await this.chkTerms.waitFor({ state: 'attached', timeout: this.timeout });
    const isChecked = await this.chkTerms.isChecked();
    if (!isChecked) {
      await this.chkTerms.dispatchEvent('click');
      // รอให้ state เปลี่ยน
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * ≈ Tap register button
   */
  async tapRegisterButton() {
    await this.btnRegister.waitFor({ state: 'visible', timeout: this.timeout });
    await this.btnRegister.click({ force: true });
  }

  /**
   * ≈ Verify error message
   * @param {string} errorMsg
   */
  async verifyErrorMessage(errorMsg) {
    const errorElement = this.page.getByText(errorMsg, { exact: false });
    await expect(errorElement.first()).toBeVisible({ timeout: this.timeout });
  }

  /**
   * ≈ Verify register button is disabled
   */
  async verifyRegisterButtonDisabled() {
    await expect(this.btnRegister).toBeDisabled({ timeout: this.timeout });
  }

  /**
   * ≈ Verify register button is enabled
   */
  async verifyRegisterButtonEnabled() {
    await expect(this.btnRegister).toBeEnabled({ timeout: this.timeout });
  }

  /**
   * ≈ Verify successfully register (URL changed away from /register)
   */
  async verifySuccessfulRegister() {
    await this.page.waitForURL(/(?!.*\/register).*/, { timeout: 15000 });
  }
}

module.exports = { RegisterPage };
