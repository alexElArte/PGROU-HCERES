package org.centrale.hceres.service.stat;

import org.centrale.hceres.dto.stat.publication.PublicationStatDto;
import org.centrale.hceres.dto.stat.publication.PublicationStatSumDto;
import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.dto.stat.utils.ActivityStatSumDto;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.PublicationType;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import static org.centrale.hceres.items.TypeActivityId.POST_DOC;
import static org.centrale.hceres.items.TypeActivityId.RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST;
import static org.centrale.hceres.items.TypeActivityId.SEI_COMPANY_CREATION;
import static org.centrale.hceres.items.TypeActivityId.SEI_INDUSTRIAL_R_D_CONTRACT;
import static org.centrale.hceres.items.TypeActivityId.SR_AWARD;
import static org.centrale.hceres.items.TypeActivityId.TRAINING_THESIS_PUBLICATION;

@Service
public class ActivityStatService {

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private PublicationStatService publicationStatService;
    
    @Autowired
    private ResearchContractFundedCharitStatService researchContractFundedCharitService;

    @Autowired
    private BookStatService bookStatService;
    
    @Autowired
    private CompanyCreationStatService companyCreationStatService;
    
    @Autowired
    private SrAwardStatService srAwardStatService;
    
    @Autowired
    private PostDocStatService postDocStatService;
    
    @Autowired
    private SeiIndustrialRDContractStatService seiIndustrialRDContractStatService;
    
    @Autowired
    private TrainingThesisStatService trainingThesisStatService;

    public ActivityStatSumDto getStatByTypeActivity(Integer idTypeActivity) {
        ActivityStatSumDto activityStatSumDto = createStatSumActivity(idTypeActivity);

        List<ActivityStatDto> activityStatDtoList = new ArrayList<>();
        activityRepo.findByIdTypeActivity(idTypeActivity).forEach(activity ->
                activityStatDtoList.add(createStatActivity(activity)));

        activityStatSumDto.setItems(activityStatDtoList);

        return activityStatSumDto;
    }

    private ActivityStatSumDto createStatSumActivity(Integer idTypeActivity) {
        TypeActivityId typeActivityId = TypeActivityId.fromId(idTypeActivity);
        switch (typeActivityId) {
            case PUBLICATION:
                return publicationStatService.createStatSumPublication();
            case BOOK:
                
            case RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST:
                return researchContractFundedCharitService.createStatSumResearchContractFundedCharit();
            case SEI_COMPANY_CREATION:
                return companyCreationStatService.createStatSumCompanyCreation();
            case SR_AWARD:
                return srAwardStatService.createStatSumSrAward();  
            case POST_DOC:
                return postDocStatService.createStatSumPostDoc();
            case TRAINING_THESIS_PUBLICATION:
                return trainingThesisStatService.createStatSumTrainingThesis();
            case SEI_INDUSTRIAL_R_D_CONTRACT:
                return seiIndustrialRDContractStatService.createStatSumSeiIndustrialRDContract();  
                
            default:
                return new ActivityStatSumDto();
        }
    }

    private ActivityStatDto createStatActivity(Activity activity) {
        ActivityStatDto activityStatDto;
        TypeActivityId typeActivityId = TypeActivityId.fromId(activity.getIdTypeActivity());
        switch (typeActivityId) {
            case PUBLICATION:
                activityStatDto = publicationStatService.createStatPublication(activity);
                break;
            case BOOK:
                activityStatDto = bookStatService.createStatBook(activity);
                break;
                
            case RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST:
                activityStatDto = researchContractFundedCharitService.createStatResearchContractFundedCharit(activity);
                break;
                
            case SEI_COMPANY_CREATION:
                activityStatDto = companyCreationStatService.createStatCompanyCreation(activity);
                break;    
                
            case SR_AWARD:
                activityStatDto = srAwardStatService.createStatSrAward(activity);
                break;
                
            case POST_DOC:
                activityStatDto = postDocStatService.createStatPostDoc(activity);
                break;  
            case TRAINING_THESIS_PUBLICATION:
                activityStatDto = trainingThesisStatService.createStatTrainingThesis(activity);
                break;
                
            case SEI_INDUSTRIAL_R_D_CONTRACT:
                activityStatDto = seiIndustrialRDContractStatService.createStatSeiIndustrialRDContract(activity);
                break;
                
                
            default:
                activityStatDto = new ActivityStatDto();
                activityStatDto.fillDataFromActivity(activity);
                break;
        }
        return activityStatDto;
    }
}
