const ROLES = {
  1: "عميل",
  2: "مشغل",
  3: "مدير",
  4: "أدمن",
  5: "سوبر أدمن",
  7: "بائع",
};

export const getRoleName = (roleId) => {
  return ROLES[roleId] || "غير محدد";
};
