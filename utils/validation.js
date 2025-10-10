// utils/validation.js
export function validatePhone(phone) {
  // Chuẩn hóa: bỏ khoảng trắng và dấu gạch
  const normalized = phone.replace(/[\s-]/g, "");

  // Regex chuẩn E.164 (quốc tế)
  const internationalPattern = /^\+?[1-9]\d{7,14}$/;

  // Regex số điện thoại Việt Nam
  const vnPattern = /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/;

  if (vnPattern.test(normalized)) {
    return { valid: true, type: "vn" };
  }

  if (internationalPattern.test(normalized)) {
    return { valid: true, type: "intl" };
  }

  return { valid: false, type: "invalid" };
}
