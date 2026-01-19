package org.centrale.hceres.service.csv;

import org.centrale.hceres.items.Journal;
import org.centrale.hceres.repository.JournalRepository;

import java.util.HashMap;
import java.util.Map;

public class JournalCreatorCache {

    private final JournalRepository journalRepository;

    private final Map<String, Journal> journalIdMap;

    public JournalCreatorCache(JournalRepository journalRepository) {
        this.journalRepository = journalRepository;
        journalIdMap = new HashMap<>();
    }

    public Journal getOrCreateJournal(String journalName) {
        // if journal exists in the database, return its ID. Otherwise, create it and save it for future use.
        return journalIdMap.computeIfAbsent(journalName, name -> {
            Journal journal = journalRepository.findByName(name);
            if (journal == null) {
                journal = new Journal();
                journal.setJournalName(name);
                journal = journalRepository.save(journal);
            }
            return journal;
        });
    }




}
