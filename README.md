# PGROU-HCERES
Projet de groupe (PGROU) de Centrale Nantes en INFOSI.

# Installation

Vous devez au préalable installez **NodeJS** et **Maven** sur votre ordinateur<br>
Clonez le repository.<br>
Changez si nécessaire la connexion au serveur dans les fichier *application.properties* dans "*hceres Version 1/src/main/ressources/*"<br>

## Prérequis
Allez dans le dossier *hceres Version 1* et exécutez:
``` bash
mvn -N wrapper:wrapper
```

Puis aller dans le dossier *Front* et exécutez:
``` bash
npm install
```

# Compilation et exécution

Il faut ouvrir 2 terminaux:
- un pour le back-end
- un pour le front-end

## Front-end

Exécutez directement:
``` bash
npm start
```

Pour l'arrêt faites Ctrl+C

## Back-end

Pour la compilation:
``` bash
mvn compile
mvn clean package
```

Pour l'exécution
``` bash
mvn spring-boot:run
```
