/**
 * Test Template Keyword สำหรับทดสอบ Registration Form
 * ≈ "Verify registration form with all input field" ใน Robot Framework
 *
 * ใช้เป็น template เดียวกันกับทุก test case
 * แต่ละ test case แค่ส่ง data เข้ามา → keyword นี้จัดการ logic ทั้งหมด
 */

const { expect } = require('@playwright/test');

/**
 * Resolve template variables ใน test data
 * เช่น {{TIMESTAMP}} → จะถูกแทนที่ด้วย timestamp จริง
 * @param {string} value
 * @returns {string}
 */
function resolveTemplate(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{\{TIMESTAMP\}\}/g, Date.now().toString());
}

/**
 * ≈ Verify registration form with all input field
 *
 * [Arguments]  ${firstName}  ${lastName}  ${email}  ${password}  ${confirmPassword}  ${acceptTerms}  ${expectedError}
 *
 * @param {import('../pages/register.page.js').RegisterPage} registerPage
 * @param {object} testCase
 * @param {string} testCase.firstName
 * @param {string} testCase.lastName
 * @param {string} testCase.email
 * @param {string} testCase.password
 * @param {string} testCase.confirmPassword
 * @param {boolean} testCase.acceptTerms
 * @param {string|null} testCase.expectedError - null = expect success
 */
async function verifyRegistrationForm(registerPage, testCase) {
  // --- Input all fields ---
  const data = {
    ...testCase,
    email: resolveTemplate(testCase.email),
  };

  await registerPage.inputFirstName(data.firstName);
  await registerPage.inputLastName(data.lastName);
  await registerPage.inputEmail(data.email);
  await registerPage.inputPassword(data.password);
  await registerPage.inputConfirmPassword(data.confirmPassword);

  // --- Accept terms (if specified) ---
  if (data.acceptTerms) {
    await registerPage.acceptTerms();
  }

  // --- Verify result ---
  if (data.expectedError === 'BUTTON_DISABLED') {
    // Case 1: ปุ่มลงทะเบียนต้อง disabled (field ว่าง / ไม่ยอมรับเงื่อนไข)
    await registerPage.verifyRegisterButtonDisabled();
  } else if (data.expectedError === 'BUTTON_ENABLED') {
    // Case 2: ปุ่มลงทะเบียนต้อง enabled (format ถูกต้อง แต่ไม่ต้อง register จริง)
    await registerPage.verifyRegisterButtonEnabled();
  } else if (data.expectedError !== null) {
    // Case 2: คาดว่า inline error message แสดง
    // สำหรับบางฟิลด์ (เช่น รหัสผ่านอ่อน) อาจะต้องกด Register ก่อนถึงจะโชว์ error
    const isBtnDisabled = await registerPage.btnRegister.isDisabled();
    if (!isBtnDisabled) {
      await registerPage.tapRegisterButton();
    }
    await registerPage.verifyErrorMessage(data.expectedError);
  } else {
    // Case 3: คาดว่า register สำเร็จ → กดปุ่ม → ดูว่า redirect
    await registerPage.tapRegisterButton();
    await registerPage.verifySuccessfulRegister();
  }
}

module.exports = { verifyRegistrationForm, resolveTemplate };
