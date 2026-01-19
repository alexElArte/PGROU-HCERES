/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.service.stat;

import org.centrale.hceres.dto.stat.items.SrAwardStatItemDto;
import org.centrale.hceres.dto.stat.utils.ActivityStatSumDto;
import org.centrale.hceres.items.Activity;
import org.springframework.stereotype.Service;

/**
 *
 * @author Max
 */
@Service
public class SrAwardStatService {
    
    /**
     * Crée un item de statistique pour une activité ResearchContractFundedCharit.
     */
    public SrAwardStatItemDto createStatSrAward(Activity activity) {
        SrAwardStatItemDto dto = new SrAwardStatItemDto();
        dto.fillDataFromActivity(activity);
        return dto;
    }

    /**
     * Crée un objet "sum" (métadonnées statistiques) pour ce type d’activité.
     * Pour le moment il est vide, mais tu peux ajouter des agrégats plus tard.
     */
    public ActivityStatSumDto createStatSumSrAward() {
        return new ActivityStatSumDto();
    }
    
}
