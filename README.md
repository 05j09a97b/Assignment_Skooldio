# Assignment_Skooldio

This repo used for submit assignment (take home exam only)

## 📌 Architecture

```
├── pages/                  ≈ *** Variables *** (locators + basic actions)
│   └── register.page.js
├── keywords/               ≈ *** Keywords *** (test logic / template)
│   └── register.keyword.js
├── test-data/              ≈ *** Test Cases *** (data rows)
│   └── register.data.js
├── tests/                  ≈ *** Settings *** (wiring template + data)
│   └── register.spec.js
├── playwright.config.js
├── .gitignore
└── package.json
```

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Install browsers
npx playwright install chromium

# 3. Run tests
npm test

# 4. Run tests (เปิดหน้าจอ browser)
npm run test:headed

# 5. ดู HTML report
npm run report
```

## 🧪 Commands

| Command | Description |
|---|---|
| `npm test` | Run ทุก test |
| `npm run test:headed` | Run แบบเปิด browser |
| `npm run test:debug` | Run แบบ debug (step by step) |
| `npm run report` | เปิด HTML report |

## 📋 Test Cases (25 cases)
พบว่ามี bug อยู่ ในแง่ของการ register ซ้ำและพบว่าสามารถทำได้ซึ่งในความเป็นจริงไม่ควรเพราะอาจจะทำให้ database บวมได้ครับ

### Negative — ฟิลด์ว่าง (5 cases)

| # | Case | Expected |
|---|---|---|
| 1 | ชื่อเป็นค่าว่าง | Button disabled |
| 2 | นามสกุลเป็นค่าว่าง | Button disabled |
| 3 | อีเมลเป็นค่าว่าง | Button disabled |
| 4 | รหัสผ่านเป็นค่าว่าง | Button disabled |
| 5 | ยืนยันรหัสผ่านเป็นค่าว่าง | Button disabled |

### Negative — Terms & Conditions (1 case)

| # | Case | Expected |
|---|---|---|
| 6 | ไม่ยอมรับเงื่อนไข | Button disabled |

### Negative — Email (5 cases)

| # | Case | Expected |
|---|---|---|
| 7 | อีเมลผิดรูปแบบ (ไม่มี @) | Error message |
| 8 | อีเมลผิดรูปแบบ (ไม่มี domain) | Button disabled |
| 9 | อีเมลเป็นช่องว่าง (space) | Error message |
| 10 | อีเมลมี space ตรงกลาง | Error message |
| 11 | อีเมลมีจุดซ้อน (`..`) | Error message |

### Negative — Password (7 cases)

| # | Case | Expected |
|---|---|---|
| 12 | รหัสผ่านไม่ตรงกัน | Button disabled |
| 13 | รหัสผ่านมีแต่ spacebar | Button disabled |
| 14 | รหัสผ่านสั้นเกินไป (4 ตัว) | Error message |
| 15 | รหัสผ่านมีแต่ตัวเลข (8 ตัว) | Error message |
| 16 | รหัสผ่านมีแต่ตัวอักษร ไม่มีตัวเลข (8 ตัว) | Error message |
| 17 | รหัสผ่านสั้นเกินไป (7 ตัว, boundary) | Error message |
| 18 | ยืนยันรหัสผ่านไม่ตรง (กลับด้าน) | Button disabled |

### Negative — ชื่อ/นามสกุล edge cases (2 cases)

| # | Case | Expected |
|---|---|---|
| 19 | ชื่อเป็น space | Button enabled (เว็บไม่ validate) |
| 20 | นามสกุลเป็น space | Button enabled (เว็บไม่ validate) |

### Positive — Format validation (3 cases)

| # | Case | Expected |
|---|---|---|
| 21 | อีเมลถูกต้องแม้ไม่มีตัวเลข/สัญลักษณ์ | Button enabled |
| 22 | อีเมลถูกต้องแม้ไม่มีตัวพิมพ์ใหญ่ | Button enabled |
| 23 | รหัสผ่านยาวพอดี 8 ตัว (boundary valid) | Success |

### Positive — Actual Registration (1 case)

| # | Case | Expected |
|---|---|---|
| 24 | ลงทะเบียนสำเร็จ (Random Data) | Success |

### Negative — Duplicate Registration (1 case, known bug)

| # | Case | Expected |
|---|---|---|
| 25 | ลงทะเบียนซ้ำด้วย email เดิม | Error message (🐛 เว็บยอมให้ซ้ำได้) |

> 🐛 **Known Bug:** ระบบอนุญาตให้ลงทะเบียนซ้ำด้วย email เดิมได้โดยไม่แสดง error — test case นี้จะ fail จนกว่า dev จะแก้ไข

## ➕ วิธีเพิ่ม Test Case ใหม่

**ไม่ต้องแก้ไฟล์อื่น!** แค่เปิดไฟล์ `test-data/register.data.js` แล้วเพิ่ม object ใน array:

```js
{
  name: 'ชื่อ test case ของคุณ',
  firstName: 'ชื่อจริง',
  lastName: 'นามสกุล',
  email: 'email@test.com',
  password: 'รหัสผ่าน',
  confirmPassword: 'ยืนยันรหัสผ่าน',
  acceptTerms: true,           // true = ติ๊กยอมรับเงื่อนไข
  expectedError: 'error msg',  // null = คาดว่าสำเร็จ
},
```

### ค่า `expectedError` ที่รองรับ

| ค่า | ความหมาย |
|---|---|
| `null` | คาดว่า register สำเร็จ (redirect) |
| `'BUTTON_DISABLED'` | คาดว่าปุ่มลงทะเบียนจะถูก disabled |
| `'BUTTON_ENABLED'` | คาดว่าปุ่มลงทะเบียนจะ enabled (ไม่กด register) |
| `'กรุณากรอกอีเมลให้ถูกต้อง'` | คาดว่าจะเห็น error message นี้ |

### Template Variables

ใช้ `{{TIMESTAMP}}` ใน email เพื่อกัน email ซ้ำ:

```js
{ email: 'auto_{{TIMESTAMP}}@yopmail.com' }
// → auto_1711036800000@yopmail.com
```

