package org.centrale.hceres.service.csv;

import org.centrale.hceres.items.Language;
import org.centrale.hceres.repository.LanguageRepository;

import java.util.HashMap;
import java.util.Map;

public class LanguageCreatorCacheService {

    private final LanguageRepository languageRepository;

    private final Map<String, Language> languageIdMap;

    public LanguageCreatorCacheService(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
        languageIdMap = new HashMap<>();
    }

    public Language getOrCreateLanguage(String languageName) {
        // if language exists in the database, return its ID. Otherwise, create it and save it for future use.
        return languageIdMap.computeIfAbsent(languageName, name -> {
            Language language = languageRepository.findByName(name);
            if (language == null) {
                language = new Language();
                language.setLanguageName(name);
                language = languageRepository.save(language);
            }
            return language;
        });
    }




}
