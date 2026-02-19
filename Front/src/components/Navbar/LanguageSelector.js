import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  @media screen and (max-width: 960px) {
    padding: 2rem;
    justify-content: center;
  }
`;

const LanguageButton = styled.button`
  background: ${({ active }) => active ? '#007bff' : 'transparent'};
  color: ${({ active }) => active ? 'white' : 'black'};
  border: 1px solid ${({ active }) => active ? '#007bff' : '#ccc'};
  padding: 0.3rem 0.8rem;
  margin: 0 0.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) => active ? '#0056b3' : '#f0f0f0'};
    border-color: ${({ active }) => active ? '#0056b3' : '#999'};
  }

  @media screen and (max-width: 960px) {
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
  }
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <LanguageSelectorContainer>
      <FaGlobe />
      <LanguageButton
        active={i18n.language === 'fr'}
        onClick={() => changeLanguage('fr')}
      >
        FR
      </LanguageButton>
      <LanguageButton
        active={i18n.language === 'en'}
        onClick={() => changeLanguage('en')}
      >
        EN
      </LanguageButton>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;
