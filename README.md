# PGROU-HCERES
Projet de groupe (PGROU) de Centrale Nantes en INFOSI.

Vous avez le lien du drive avec tous les rapports en
[cliquant ici](https://drive.google.com/drive/folders/1O8_AR4zYnIGBvkB4qLaGbgRF0UobAWUb?usp=sharing)

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

Changez les informations de la base de données si nécessaire dans *hceres Version 1/src/main/resources/application.properties*. Vous avez un exemple du fichier en annexe

Pour la compilation:
``` bash
mvn compile
mvn clean package
```

Pour l'exécution
``` bash
mvn spring-boot:run
```

# Déploiement

## Build

### Back-end

Changez les informations de la base de données si nécessaire.

Compilez le projet comme si vous développiez
``` bash
mvn compile
mvn clean package
```

Votre résultat sera dans le dossier target sous un fichier *.jar*

### Front-end

Dans le dossier *Front*, exécutez
``` bash
npm run build
```
Votre résultat sera dans le dossier nommé *build*

## Exécution

### Back-end

```bash
java -jar backend.jar
```

### Front-end

-*8080* correpond au port, vous pouvez le changer si nécessaire
-*build* correspon au dossier

```bash
serve -s build -p 8080
```

# Annexe

Fichier *application.properties* dans *hceres Version 1/src/main/resources*

``` apache
# Copier ce fichier et le renommer en "application.properties"
# Puis modifier La configuration de connection a votre base de donnees convenablement

spring.application.name=hceres
server.port = 9000

logging.level.org.springframework=error

#spring.datasource.url = jdbc:postgresql://[ip address]:[port]/[database]
#spring.datasource.username = [bdd username]
#spring.datasource.password = [bdd password]

# Driver name
spring.datasource.driver-class-name=org.postgresql.Driver


# Allow creating manually entities objects and returning them as json response
spring.jackson.serialization.FAIL_ON_EMPTY_BEANS=false


spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```