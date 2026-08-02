import { createContext, useContext, useEffect, useState } from "react";

import en from "../locales/en";
import hi from "../locales/hi";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translations = language === "Hindi" ? hi : en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);