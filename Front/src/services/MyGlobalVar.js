import {fetchListTeams} from "./Team/TeamActions";

class MyClass {
    constructor() {
        this.initializeLists();
    }

    initializeLists() {
        this.listeChercheurs = null;
        this.listeEducations = null;
        this.listeSrAwards = null;
        this.listePlatforms = null;
        this.listeOralComPosters = null;
        this.listeIndustrialContracts = null;
        this.listeInternationalCollaborations = null;
        this.listeScientificExpertises = null;
        this.listeResearchContractFundedCharit = null;
        this.listeSeiClinicalTrials = null;
        this.listeIncomingMobilities = null;
        this.listeEditorialActivities = null;
        this.listeReviewArticle = null;
        this.listePostDocs = null;
        this.listeOutgoingMobilities = null;
        this.listeCompanyCreations = null;
        this.listePatents = null;
        this.listeTeams = null;
        this.listeContracts = null;
        this.listeStatutes = null;
        this.listeContractTypes = null
        this.listePublications = null;
        this.listeLaboratories = null;
        this.listeBook = null;
        this.listeActivityStats = {};
        this.listeTrainingTheses =  null; 
    }

    deleteActivity(activityList, idActivity) {
        if (activityList) {
            activityList = activityList.filter(edu => edu.idActivity !== idActivity)
        }
        return activityList
    }

    addResearcherDataToActivity(response) {
        // returned activity does not contain researcher data but id
        // appending researcher info from researcher list if it exists
        if (this.listeChercheurs) {
            response.data.researcherList = response.data.researcherList
                .map(r => this.listeChercheurs.find(f => f.researcherId === r.researcherId))
        }
        return response
    }

    addSingleResearcherDataToEntity(entity) {
        if (this.listeChercheurs) {
            entity.researcher = this.listeChercheurs.find(f => f.researcherId === entity.researcherId)
        }
        return entity
    }

    addStatuteDataToEntity(entity) {
        if (this.listeStatutes) {
            entity.statute = this.listeStatutes.find(f => f.statusId === entity.statusId)
        }
        return entity
    }

    addContractTypeDataToEntity(entity) {
        if (this.listeContractTypes) {
            entity.contractType = this.listeContractTypes.find(f => f.contractTypeId === entity.contractTypeId)
        }
        return entity
    }

    async addTeamDataToResearchers(researcherList) {
        await fetchListTeams().then(list => {
            researcherList.forEach(r => {
                r["belongsTeamList"].forEach(t => {
                    t["team"] = list.find(f => f.teamId === t.teamId)
                })
            });
        });
    }
    /**
   * Enrichit chaque équipe avec ses membres, un compteur et une chaîne de noms,
   * utile pour un tableau “TeamList” ou un export CSV.
   */
  addTeamDataToTeams(teamList) {
    if (!Array.isArray(teamList)) return teamList;

    const researchers = Array.isArray(this.listeChercheurs) ? this.listeChercheurs : [];

    // Index rapide des chercheurs par équipe
    const membersByTeamId = new Map();
    teamList.forEach(team => membersByTeamId.set(team.teamId, []));

    researchers.forEach(r => {
      const memberships = Array.isArray(r?.belongsTeamList) ? r.belongsTeamList : [];
      memberships.forEach(m => {
        if (!m?.teamId) return;
        const arr = membersByTeamId.get(m.teamId);
        if (arr) arr.push(r);
      });
    });

    // Enrichissement des équipes
    teamList.forEach(team => {
      const teamResearchers = membersByTeamId.get(team.teamId) || [];
      team.teamResearchers = teamResearchers;
      team.memberCount = teamResearchers.length;
      team.memberNames = teamResearchers
        .map(p => [p?.researcherName, p?.researcherSurname].filter(Boolean).join(' '))
        .filter(Boolean)
        .join(', ');
    });

    return teamList;
  }

  /**
   * Helper d’affichage : retourne "Equipe A, Equipe B" pour un chercheur
   * en se basant sur belongsTeamList[].team.teamName
   */
  getTeamNamesForResearcher(researcher) {
    if (!researcher) return '';
    const memberships = Array.isArray(researcher.belongsTeamList) ? researcher.belongsTeamList : [];
    const names = memberships
      .map(bt => bt?.team?.teamName)
      .filter(Boolean);
    return names.join(', ');
  }
}


export default (new MyClass());