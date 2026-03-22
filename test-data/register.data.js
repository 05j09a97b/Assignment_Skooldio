
module.exports = [
  {
    name: 'ชื่อเป็นค่าว่าง → ปุ่มลงทะเบียน disabled',
    firstName: '',
    lastName: 'ทดสอบ',
    email: 'test@email.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'BUTTON_DISABLED',
  },
  {
    name: 'นามสกุลเป็นค่าว่าง → ปุ่มลงทะเบียน disabled',
    firstName: 'ทดสอบ',
    lastName: '',
    email: 'test@email.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'BUTTON_DISABLED',
  },
  {
    name: 'อีเมลเป็นค่าว่าง → ปุ่มลงทะเบียน disabled',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: '',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'BUTTON_DISABLED',
  },
  {
    name: 'รหัสผ่านเป็นค่าว่าง → ปุ่มลงทะเบียน disabled',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: '',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'BUTTON_DISABLED',
  },
  {
    name: 'ยืนยันรหัสผ่านเป็นค่าว่าง → ปุ่มลงทะเบียน disabled',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: 'P@ssw0rd123',
    confirmPassword: '',
    acceptTerms: true,
    expectedError: 'BUTTON_DISABLED',
  },

  // =====================================================================
  // Negative Cases - Terms & Conditions
  // =====================================================================
  {
    name: 'ไม่ยอมรับเงื่อนไข → ปุ่มลงทะเบียน disabled',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: false,
    expectedError: 'BUTTON_DISABLED',
  },

  {
    name: 'อีเมลผิดรูปแบบ (ไม่มี @) → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'invalid-email',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'กรุณากรอกอีเมลให้ถูกต้อง',
  },
  {
    name: 'อีเมลผิดรูปแบบ (ไม่มี domain) → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'BUTTON_DISABLED',
  },

  {
    name: 'รหัสผ่านไม่ตรงกัน → ปุ่มลงทะเบียน disabled',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'WrongPassword',
    acceptTerms: true,
    expectedError: 'BUTTON_DISABLED',
  },

  {
    name: 'อีเมลเป็นช่องว่าง (space) → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: ' ',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'กรุณากรอกอีเมลให้ถูกต้อง',
  },
  {
    name: 'รหัสผ่านมีแต่ spacebar → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: '        ', 
    confirmPassword: '        ',
    acceptTerms: true,
    expectedError: 'BUTTON_DISABLED', 
  },
  {
    name: 'รหัสผ่านสั้นเกินไป (4 ตัว) → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: 'abcd',
    confirmPassword: 'abcd',
    acceptTerms: true,
    expectedError: 'กรุณากรอกรหัสผ่านตั้งแต่ 8 ตัวขึ้นไป',
  },
  {
    name: 'รหัสผ่านมีแต่ตัวเลข (8 ตัว ไม่มีสัญลักษณ์/ตัวอักษร) → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: '12345678',
    confirmPassword: '12345678',
    acceptTerms: true,
    expectedError: 'รหัสผ่านต้องประกอบด้วยตัวอักษรอย่างน้อย 1 ตัว',
  },
  // =====================================================================
  // Negative Cases - Password (เพิ่มเติม)
  // =====================================================================
  {
    name: 'รหัสผ่านมีแต่ตัวอักษร ไม่มีตัวเลข (8 ตัว) → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: 'abcdefgh',
    confirmPassword: 'abcdefgh',
    acceptTerms: true,
    expectedError: 'รหัสผ่านต้องประกอบด้วยตัวเลขอย่างน้อย 1 ตัว',
  },
  {
    name: 'รหัสผ่านสั้นเกินไป (7 ตัว) → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: 'Aa1234@',
    confirmPassword: 'Aa1234@',
    acceptTerms: true,
    expectedError: 'กรุณากรอกรหัสผ่านตั้งแต่ 8 ตัวขึ้นไป',
  },
  {
    name: 'รหัสผ่านยาวพอดี 8 ตัว (valid) → ไม่มี error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'boundary8char_{{TIMESTAMP}}@yopmail.com',
    password: 'P@ssw0rd',
    confirmPassword: 'P@ssw0rd',
    acceptTerms: true,
    expectedError: null,
  },
  {
    name: 'ยืนยันรหัสผ่านไม่ตรง (กลับด้าน) → ปุ่มลงทะเบียน disabled',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: 'WrongPassword1',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'BUTTON_DISABLED',
  },

  // =====================================================================
  // Negative Cases - Email (เพิ่มเติม)
  // =====================================================================
  {
    name: 'อีเมลมี space ตรงกลาง → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test @email.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'กรุณากรอกอีเมลให้ถูกต้อง',
  },
  {
    name: 'อีเมลมีจุดซ้อน → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'test@email..com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'กรุณากรอกอีเมลให้ถูกต้อง',
  },

  // =====================================================================
  // Negative Cases - ชื่อ/นามสกุล (เพิ่มเติม)
  // =====================================================================
  {
    name: 'ชื่อเป็น space → ปุ่มลงทะเบียนยังคง enabled (เว็บไม่ validate space)',
    firstName: ' ',
    lastName: 'ระบบ',
    email: 'test@email.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'BUTTON_ENABLED',
  },
  {
    name: 'นามสกุลเป็น space → ปุ่มลงทะเบียนยังคง enabled (เว็บไม่ validate space)',
    firstName: 'ทดสอบ',
    lastName: ' ',
    email: 'test@email.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'BUTTON_ENABLED',
  },

  // =====================================================================
  // Positive/Format Edge Cases
  // =====================================================================
  {
    name: 'รูปแบบอีเมลถูกต้องแม้ไม่มีตัวเลขและสัญลักษณ์พิเศษ → ปุ่มลงทะเบียน enabled',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'Kunanon@gmail.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'BUTTON_ENABLED',
  },
  {
    name: 'รูปแบบอีเมลถูกต้องแม้ไม่มีตัวพิมพ์ใหญ่ → ปุ่มลงทะเบียน enabled',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'kunanon1234@gmail.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'BUTTON_ENABLED',
  },

  // =====================================================================
  // Positive Cases (Actual Registration)
  // =====================================================================
  // ⚠️ อย่าลืมเปลี่ยนข้อมูล firstName, lastName, email ก่อน run test!
  //     {{TIMESTAMP}} จะถูกแทนที่ด้วย timestamp จริงเพื่อไม่ให้ email ซ้ำ
  {
    name: 'ลงทะเบียนสำเร็จ (Random Data)',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'auto_test_{{TIMESTAMP}}@yopmail.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: null,
  },

  // =====================================================================
  // Negative Cases - ลงทะเบียนซ้ำ (Duplicate Registration)
  // =====================================================================
  // ⚠️ อย่าลืมเปลี่ยน email ให้เป็น email ที่เคยลงทะเบียนสำเร็จแล้วก่อน run test!
  {
    name: 'ลงทะเบียนซ้ำด้วย email ที่เคยสมัครแล้ว → แสดง error',
    firstName: 'ทดสอบ',
    lastName: 'ระบบ',
    email: 'already_registered@yopmail.com',
    password: 'P@ssw0rd123',
    confirmPassword: 'P@ssw0rd123',
    acceptTerms: true,
    expectedError: 'อีเมลนี้ถูกใช้งานแล้ว',
  },
];
