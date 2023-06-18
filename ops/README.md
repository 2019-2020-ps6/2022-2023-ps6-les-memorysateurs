# **STATUT DU LIVRABLE**

* Etape 1: **Done**
* Etape 2: **Done**
* Etape 3: **Done**
* Etape 4: **Done**

# **LANCEMENT SCRIPT**

* `run.sh` : lancement avec proxy de l'application
* `run-e2e.sh` : lancement des tests. Récupération des résultats dans le volume docker `e2e`.

# **EXPLICATIONS**

## **Généralités**

### **Dockerfile**
Le Dockerfile front consiste en :
* Générer les fichiers html avec Angular en se basant sur une image de node (version 16.16.0-alpine).
* A la suite, récupérer les fichiers générés et les placer dans le serveur nginx (version unprivileged). Il se lancera avec notre application de base.

Le Dockerfile du back est basé sur une image node (version 16.16.0-alpine) et se lance.

Le Dockerfile de playwright est basé sur l'image microsoft (version 1.35.0-jammy), récupère les scénarios de test et les exécute. Les résultats sont enregistrés dans le volume docker `e2e`.

Le reverse-proxy est basé sur une image httpd (version 2.4). nous y remplaçons la configuration httpd de base par la notre et y ajoutons la configuration de notre proxy. 

## **Organisation des docker-compose**

Les docker-compose se trouvent tous dans le dossier `/ops/`, au nombre de 3.

### 1. **docker-compose-no-proxy**

Ce premier docker-compose lance le front et le back, accessible en localhost. Il représente les 2 premières étapes du déploiement. Il n'y a pas de fichier bash pour le lancer.

Utiliser les deux commandes ci-dessous si vous voulez le lancer: \
- `docker compose -f docker-compose-no-proxy.yml build`
- `docker compose -f docker-compose-no-proxy.yml up` 

Un healthcheck a été mis en place pour ne pas avoir à lancer le front sans le back.

Port d'accès front `8080`\
Port d'accès back `8000` 

### 2. **docker-compose-test**
    
Correspond au docker-compose e2e. Il est lancable avec le script `run-e2e.sh`. Récupération des résultats dans le volume nommé docker `e2e`. Utilisation d'un lancement du front spécifique avec adresse back renseignée pour playwright. Le back est lancé normalement. Récupéreation de l'image de playwright pour construire le container des tests.

Lors de la fin des tests lancés avec le script bash, les containers sont fermés automatiquement avec l'option `--abort-on-container-exit`.

L'ensemble de ces conteneurs sont isolés.

### 3. **docker-compose**

Représente l'application avec proxy. Lanceable avec le script bash `run.sh`. \
Nom du serveur : `memorysateurs.com` \
Accès front : \
`memorysateurs.com/front/` \
Accès back : \
`memorysateurs.com/back/`

Pour renommé le serveur : \
Dans `docker-compose.yml`, changer les arguments `URLBACK`. \

Si besoin d'ajouter d'autres configurations d'application dans le reverse-proxy :\
- ajouter une configuration (semblable à `proxy.conf`) dans le dossier ops ;
- renseigner son existance dans le `httpd.conf` (copier la dernière ligne du fichier et modifier le nom avec le nom du fichier) ;
- dans `Dockerfile-proxy`, ajouter la copie du fichier de configuration (comme pour `proxy.conf`);


# **HEALTHCHECK**

Un healthcheck est appliqué sur le back, une dépendance est créé pour le `front` et le `reverse-proxy`.\
Check réalisé sur lui même avec l'adresse `http://localhost:9428/api/status`. 

Un healthcheck est appliqué sur le front, une dépendance est créé pour `playwright` (tests) et le `reverse-proxy`.\
Check réalisé sur lui même à l'adresse `http://localhost` en vérifiant si il n'y a pas d'erreur à l'accès.