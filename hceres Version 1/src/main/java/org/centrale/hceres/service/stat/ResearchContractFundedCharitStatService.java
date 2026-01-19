package org.centrale.hceres.service.stat;

import org.centrale.hceres.dto.stat.items.ResearchContractFundedCharitStatItemDto;
import org.centrale.hceres.dto.stat.utils.ActivityStatSumDto;
import org.centrale.hceres.items.Activity;
import org.springframework.stereotype.Service;

@Service
public class ResearchContractFundedCharitStatService {

    /**
     * Crée un item de statistique pour une activité ResearchContractFundedCharit.
     */
    public ResearchContractFundedCharitStatItemDto createStatResearchContractFundedCharit(Activity activity) {
        ResearchContractFundedCharitStatItemDto dto = new ResearchContractFundedCharitStatItemDto();
        dto.fillDataFromActivity(activity);
        return dto;
    }

    /**
     * Crée un objet "sum" (métadonnées statistiques) pour ce type d’activité.
     * Pour le moment il est vide, mais tu peux ajouter des agrégats plus tard.
     */
    public ActivityStatSumDto createStatSumResearchContractFundedCharit() {
        return new ActivityStatSumDto();
    }
}
