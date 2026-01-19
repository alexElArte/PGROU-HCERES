package org.centrale.hceres.service.stat;

import org.centrale.hceres.dto.stat.publication.PublicationStatDto;
import org.centrale.hceres.dto.stat.publication.PublicationStatSumDto;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.repository.PublicationTypeRepository;
import org.centrale.hceres.service.PublicationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublicationStatService {
    @Autowired
    private PublicationTypeRepository publicationTypeRepository;

    public PublicationStatDto createStatPublication(Activity activity) {
        PublicationStatDto publicationStatDto = new PublicationStatDto();
        publicationStatDto.fillDataFromActivity(activity);
        return publicationStatDto;
    }

    public PublicationStatSumDto createStatSumPublication() {
        PublicationStatSumDto publicationStatSumDto = new PublicationStatSumDto();
        publicationStatSumDto.setPublicationTypes(publicationTypeRepository.findAll());
        return publicationStatSumDto;
    }

}
