package org.centrale.hceres.service.stat;

import org.centrale.hceres.dto.stat.items.PostDocStatItemDto;
import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.dto.stat.utils.ActivityStatSumDto;
import org.centrale.hceres.items.Activity;
import org.springframework.stereotype.Service;

@Service
public class PostDocStatService {

    public ActivityStatDto createStatPostDoc(Activity activity) {
        PostDocStatItemDto dto = new PostDocStatItemDto();
        dto.fillDataFromActivity(activity);
        return dto;
    }

    public ActivityStatSumDto createStatSumPostDoc() {
        // Si tu n'as pas de méta-infos à ajouter (comme les publicationTypes),
        // un simple ActivityStatSumDto vide suffit.
        return new ActivityStatSumDto();
    }
}