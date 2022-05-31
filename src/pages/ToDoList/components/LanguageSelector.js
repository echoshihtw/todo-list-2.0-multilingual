import { useTranslation } from "react-i18next";
import styled from "styled-components";
import i18next from "i18next";
import { useEffect } from "react";

const LanguageSelector = () => {
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  const handleLanguageChange = (e) => {
    i18next.changeLanguage(e.target.value);
  };
  return (
    <Container>
      <LanguageIconsSelector
        onChange={handleLanguageChange}
        value={localStorage.getItem("i18nextLng")}
      >
        <LanguageOption value="en">🇺🇸</LanguageOption>
        <LanguageOption value="zh-CHT">🇹🇼</LanguageOption>
        <LanguageOption value="da-DK">🇩🇰</LanguageOption>
        <LanguageOption value="de-DE">🇩🇪</LanguageOption>
        <LanguageOption value="es-ES">🇪🇸</LanguageOption>
        <LanguageOption value="fr-FR">🇫🇷</LanguageOption>
        <LanguageOption value="ja-JP">🇯🇵</LanguageOption>
        <LanguageOption value="it-IT">🇮🇹</LanguageOption>
      </LanguageIconsSelector>
    </Container>
  );
};

export default LanguageSelector;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;
const LanguageIconsSelector = styled.select`
  font-size: 1.5rem;
  height: 2rem;
  border: none;
  &:focus {
    outline: none;
  }
`;
const LanguageOption = styled.option`
  font-size: 1rem;
`;
