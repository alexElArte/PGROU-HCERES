package org.centrale.hceres.service;

import java.util.*;

import javax.transaction.Transactional;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.ResearcherRepository;
import org.centrale.hceres.repository.TypeActivityRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.Data;

//items
//repository
import org.centrale.hceres.repository.ProductionRepository;
import org.centrale.hceres.repository.ProductInvolvementRepository;
import org.centrale.hceres.repository.ProductRoleRepository;
import org.centrale.hceres.repository.ProductTypeRepository;
import org.springframework.web.bind.annotation.RequestBody;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class ProductionService {

    /**
     * Instanciation
     */
    @Autowired
    private ResearcherRepository researchRepo;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private TypeActivityRepository typeActivityLevelRepo;
    @Autowired
    private ProductionRepository prodRepo;
    @Autowired
    private ProductInvolvementRepository prodInvolRepo;
    @Autowired
    private ProductRoleRepository prodRoleRepo;
    @Autowired
    private ProductTypeRepository prodTypeRepo;

    /**
     * permet de retourner la liste
     */
    public Iterable<ToolProduct> getToolProduct() {
        return prodRepo.findAll();
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteToolProduct(final Integer id) {
        prodRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    @Transactional
    public ToolProduct saveToolProduct(@RequestBody Map<String, Object> request) throws RequestParseException {

        ToolProduct productionTosave = new ToolProduct();

        ToolProductInvolvement productInvolvementTosave = new ToolProductInvolvement();

        // toolProductName :
        productionTosave.setToolProductName(RequestParser.getAsString(request.get("toolProductNam")));

        // toolProductCreation
        productionTosave.setToolProductCreation(RequestParser.getAsDate(request.get("toolProductCreation")));

        // toolProductAuthors
        productionTosave.setToolProductAuthors(RequestParser.getAsString(request.get("toolProductAuthors")));

        // toolProductDescription
        productionTosave.setToolProductDescription(RequestParser.getAsString(request.get("toolProductDescription")));

        // ToolProductType
        ToolProductType productType = new ToolProductType();
        productType.setToolProductTypeName(RequestParser.getAsString(request.get("toolProductTypeName")));
        ToolProductType saveproductType = prodTypeRepo.save(productType);
        productionTosave.setToolProductType(saveproductType);

        // Activity :
        Activity activity = new Activity();
        TypeActivity typeActivity = typeActivityLevelRepo.getById(9);
        activity.setTypeActivity(typeActivity);


        // get list of researcher doing this activity - currently only one is sent
        Integer researcherId = RequestParser.getAsInteger(request.get("researcherId"));
        Optional<Researcher> researcherOp = researchRepo.findById(researcherId);
        Researcher researcher = researcherOp.get();

        List<Researcher> activityResearch = new ArrayList<>();
        activityResearch.add(researcher);
        activity.setResearcherList(activityResearch);

        Activity savedActivity = activityRepo.save(activity);
        productionTosave.setActivity(savedActivity);

        // Id de la production :
        Integer idProduction = activity.getIdActivity();
        productionTosave.setIdActivity(idProduction);

        //toolProductInvolvementResearchers
        productInvolvementTosave.setToolProductInvolvementResearchers(RequestParser.getAsString(request.get("toolProductInvolvementResearchers")));

        //Add id_activity of ToolProduct
        productInvolvementTosave.setToolProduct(productionTosave);

        //Add ToolProductRole
        ToolProductRole toolProductRole = new ToolProductRole();
        toolProductRole.setToolProductRoleName(RequestParser.getAsString(request.get("toolProductRoleName")));
        ToolProductRole saveToolProductRole = prodRoleRepo.save(toolProductRole);
        ToolProductInvolvementPK saveProdInvoPK = new ToolProductInvolvementPK();
        saveProdInvoPK.setToolProductRoleId(saveToolProductRole.getToolProductRoleId());
        productInvolvementTosave.setToolProductInvolvementPK(saveProdInvoPK);

        // Persist Production to database :
        ToolProduct saveProduction = prodRepo.save(productionTosave);

        return saveProduction;
    }
}












