# Admin ASBF

Admin ASBF est une application qui propose des fonctionnalités pour gérer l'effectif de l'Association des Scouts du Burkina Faso (ASBF).

Le projet est composé de deux sous projets front et back dans lesquels sont développés respectivement l'interface de l'appplication et les traitements cotés serveur.

## Backend

Pour assurer le bon fonctionnement de AdminASBF, un service est developpé en `PHP`. Ce service propose des fonctionnalités qui permettent de manipuler les resources de l'application. Afin de faciliter les developpements nous utilisons le framework `Laraval` v10. Le code source est accessible via

### Base de données

// TODO : Schema de la BDD

### Demarrer le back en LOCAL

Le back est developpé avec Laravel, on peut utiliser des images déjà configurées qui permet de demarrer le back avec un environnement contenant PHP, une base de données ou alors installer soit même les configurations necessaire pour demarrer un projet laraval

- Configuration manuelle : `php artisan serve` pour demarrer le serveur. Il faut préalablement installer les dépendances du projet grâce à `composer update`
- Configuration avec docker : `sudo docker-compose up -d` pour demarrer les conteneurs

## Interface (front)

Une interface est proposée afin de faciliter la manipulation des données de l'application. Les IHM sont developpées en ReactJS à travers le starter Create React App

Pour demarrer le projet il faut utiliser la commande `npm start` à condition d'avoir installé les dependances grâce à `npm install`.

## Déploiement

Le déploiement du front et du back se fait via github Actions
