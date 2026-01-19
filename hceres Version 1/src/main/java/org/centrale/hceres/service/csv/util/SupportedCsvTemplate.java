package org.centrale.hceres.service.csv.util;

import lombok.Getter;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Getter
public enum SupportedCsvTemplate {
    RESEARCHER,
    INSTITUTION,
    LABORATORY(INSTITUTION),
    TEAM(LABORATORY),
    BELONG_TEAM(RESEARCHER, TEAM),
    NATIONALITY,
    TYPE_ACTIVITY,
    ACTIVITY(RESEARCHER, TYPE_ACTIVITY),
    SR_AWARD(ACTIVITY),
    BOOK(ACTIVITY),
    INVITED_ORAL_COMMUNICATION(ACTIVITY),
    ORAL_COMMUNICATION_POSTER(ACTIVITY),
    INVITED_SEMINAR(ACTIVITY),
    LANGUAGE,
    MEETING_CONGRESS_ORG(ACTIVITY),
    THESIS_TYPE,
    PUBLICATION_TYPE,
    PUBLICATION(ACTIVITY, PUBLICATION_TYPE),
    STATUS,
    SEI_CLINICAL_TRIAL(ACTIVITY),
    PLATFORM(ACTIVITY),
    SEI_INDUSTRIAL_R_D_CONTRACT(ACTIVITY),
    TOOL_PRODUCT_COHORT(ACTIVITY),
    TOOL_PRODUCT_DATABASE(ACTIVITY),
    TOOL_PRODUCT_DECISION_SUPPORT_TOOL(ACTIVITY),
    TOOL_PRODUCT_SOFTWARE(ACTIVITY),
    REVIEWING_JOURNAL_ARTICLES(ACTIVITY),
    EDITORIAL_ACTIVITY(ACTIVITY),
    EDUCATIONAL_OUTPUT(ACTIVITY),
    INVOLVEMENT_TRAINING_PEDAGOGICAL_RESPONSIBILITY(ACTIVITY),
    NATIONAL_INTERNATIONAL_COLLABORATION(ACTIVITY),
    PUBLIC_OUTREACH(ACTIVITY),
    RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST(ACTIVITY),
    SCIENTIFIC_EXPERTISE(ACTIVITY),
    SR_RESPONSIBILITY_LEARNED_SCIENTIFIC_SOCIETY(ACTIVITY),
    RESPONSIBILITY_INSTITUTIONAL_COMITEE_JURY(ACTIVITY),
    TRAINING_THESIS(ACTIVITY),
    POSTDOC(ACTIVITY),
    UNDEFINED;

    private final Set<SupportedCsvTemplate> dependencies;

    SupportedCsvTemplate(SupportedCsvTemplate... dependencies) {
        this.dependencies = new HashSet<>(Arrays.asList(dependencies));
    }

    /**
     * Compare two values of the enum SupportedCsvTemplate and return:
     * 0 if the two values are independent (neither one depends on the other)
     * > 0 if the second value is dependent on the first one (directly or indirectly)
     * < 0 if the first value is dependent on the second one (directly or indirectly)
     *
     * @param first  the first value of the enum to be compared
     * @param second the second value of the enum to be compared
     * @return int representing the comparison result
     */
    public static int compare(SupportedCsvTemplate first, SupportedCsvTemplate second) {
        // Since java doesn't allow Illegal forward reference the order definition
        // form a tree between the formats, so it is garanteed to use oridinal value as sorting value.
        return first.ordinal() - second.ordinal();
    }

    /**
     * A helper method that returns a set of all dependencies (directly or indirectly) of a given format
     *
     * @param format the format to get the dependencies for
     * @return set of all dependencies of the format
     */
    public static Set<SupportedCsvTemplate> getAllDependencies(SupportedCsvTemplate format) {
        Set<SupportedCsvTemplate> allDependencies = new HashSet<>(format.dependencies);
        for (SupportedCsvTemplate dependency : format.dependencies) {
            allDependencies.addAll(getAllDependencies(dependency));
        }
        return allDependencies;
    }
}
