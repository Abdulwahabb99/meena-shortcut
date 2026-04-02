export const colorsSelect = [
  { id: 1, label: "أحمر", value: "red" },
  { id: 2, label: "أخضر", value: "green" },
  { id: 3, label: "أزرق", value: "blue" },
  { id: 4, label: "أصفر", value: "yellow" },
  { id: 5, label: "برتقالي", value: "orange" },
  { id: 6, label: "بنفسجي", value: "purple" },
  { id: 7, label: "زهري", value: "pink" },
  { id: 8, label: "أسود", value: "black" },
  { id: 9, label: "أبيض", value: "white" },
  { id: 10, label: "رمادي", value: "gray" },
  { id: 11, label: "بني", value: "brown" },
  { id: 12, label: "سماوي", value: "cyan" },
  { id: 13, label: "فيروزي", value: "turquoise" },
  { id: 14, label: "ذهبي", value: "gold" },
  { id: 15, label: "فضي", value: "silver" },
  { id: 16, label: "كريمي", value: "beige" },
  { id: 17, label: "كحلي", value: "navy" },
  { id: 18, label: "أزرق فاتح", value: "lightblue" },
  { id: 19, label: "أخضر فاتح", value: "lightgreen" },
  { id: 20, label: "أحمر غامق", value: "darkred" },
];

export const PAYMENT_METHODS = {
  CREDIT_CARD: "بطاقة ائتمان",
  CASH: "نقدي",
  APPLE_PAY: "paypal",
  STC_PAY: "STC Pay",
  PAYPAL: "Paypal",
};
export const getPaymentMethod = (paymentMethod) => {
  return PAYMENT_METHODS[paymentMethod] || paymentMethod;
};
