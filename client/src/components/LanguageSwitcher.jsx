import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <select
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      value={i18n.language}
    >
      <option value="en">English</option>
      <option value="vi">Tiếng Việt</option>
    </select>
  );
};

export default LanguageSwitcher;
