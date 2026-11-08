# Admin ASBF

Application de gestion de l’Association des Scouts du Burkina Faso (ASBF) : effectifs, organisations, attributions de fonctions, cotisations et paiements, transferts, envoi de courriels, cartes de membre et statistiques.

Laravel et React sont regroupés dans ce dépôt. Laravel sert l’application et l’API ; Vite compile les ressources React et assure leur rechargement pendant le développement.

## Sommaire

- [Prérequis](#prérequis)
- [Premier démarrage](#premier-démarrage)
- [Services Docker](#services-docker)
- [Repères dans le code](#repères-dans-le-code)
- [Commandes courantes](#commandes-courantes)
- [Dépannage](#dépannage)
- [Déploiement](#déploiement)

## Prérequis

| Outil | Version / usage dans le dépôt |
| --- | --- |
| PHP | 8.1 ou 8.2 avec le `composer.lock` actuel. `composer.json` déclare `^8.1`, mais `lcobucci/clock` verrouillé limite PHP à ces deux versions. |
| Composer | 2, pour les dépendances PHP |
| Node.js et npm | La CI utilise Node.js 20 ; les dépendances frontend sont verrouillées dans `package-lock.json`. |
| MySQL | 8.0, comme dans Docker Compose. Les migrations utilisent des fonctions, triggers, requêtes récursives et opérations JSON propres à MySQL. |
| Docker Compose | Facultatif : permet de démarrer MySQL et Mailpit sans les installer sur la machine. |

Prévoir les extensions PHP requises par Composer, ainsi que `pdo_mysql` pour la base et `gd` pour le traitement des images. `composer check-platform-reqs` permet de vérifier les exigences des dépendances installées.

Toutes les commandes ci-dessous s’exécutent à la racine du dépôt.

## Premier démarrage

Le parcours ci-dessous utilise PHP et Node.js sur la machine, avec MySQL et Mailpit dans Docker. Mailpit intercepte les courriels de développement et permet de les consulter dans le navigateur.

### 1. Préparer la configuration locale

Après avoir cloné le dépôt, créer un fichier `.env` à sa racine. Aucun `.env.example` n’est actuellement versionné. Si un `.env` existe déjà, adapter ses valeurs sans écraser la configuration existante.

Configuration pour ce parcours local :

```dotenv
APP_NAME="Admin ASBF"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3320
DB_DATABASE=scoutisme
DB_USERNAME=root
DB_PASSWORD=

CACHE_DRIVER=file
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_DOMAIN=null
SESSION_SECURE_COOKIE=false
SANCTUM_STATEFUL_DOMAINS=localhost:8000
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=public

MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=dev@example.test
MAIL_FROM_NAME="Admin ASBF"
```

Ces valeurs correspondent à un environnement local uniquement. Ne pas versionner `.env`. `APP_KEY` sera générée à l’étape suivante. Avec `QUEUE_CONNECTION=sync`, les tâches sont exécutées immédiatement, sans worker.

### 2. Installer les dépendances

```bash
composer install
composer check-platform-reqs
npm ci
php artisan key:generate
```

Utiliser `composer install` et `npm ci` pour respecter les versions verrouillées. Réserver les commandes de mise à jour des dépendances aux changements prévus à cet effet.

### 3. Démarrer les services et initialiser la base

```bash
docker compose up -d scoutisme_db scoutisme_mailpit
docker compose logs scoutisme_db
```

Attendre que MySQL indique qu’il accepte les connexions, puis exécuter :

```bash
php artisan migrate
php artisan storage:link
```

Les migrations créent les tables, les référentiels, les organisations nationales et régionales ainsi que le compte administrateur local. Elles lisent aussi les fichiers versionnés `storage/bf.json` et `storage/Localite_bf.json` : conserver ces fichiers.

Pour ajouter des organisations et personnes de démonstration, exécuter **une seule fois sur une base locale nouvellement initialisée** :

```bash
php artisan db:seed
```

Cette étape est facultative. `DatabaseSeeder` appelle `OrganisationSeeder` et `PersonneSeeder` ; les seeders ne sont pas conçus pour être relancés sans risque de doublons.

Pour utiliser un MySQL déjà installé, créer une base `scoutisme` vide et adapter `DB_HOST`, `DB_PORT`, `DB_USERNAME` et `DB_PASSWORD`. Les migrations exigent les droits de création de fonctions et de triggers. En environnement `local`, la migration `2023_07_29_100001_functions.php` exécute également `SET GLOBAL log_bin_trust_function_creators = 1`, qui nécessite des privilèges supplémentaires.

### 4. Lancer l’application

Dans un premier terminal :

```bash
php artisan serve --host=localhost --port=8000
```

Dans un second terminal :

```bash
npm run dev
```

Ouvrir **http://localhost:8000**. Vite utilise le port **4000** pour les ressources et le rechargement à chaud ; l’application se consulte sur le port Laravel. Les requêtes frontend utilisent des chemins relatifs, notamment `/api`.

| Service | Adresse |
| --- | --- |
| Application | http://localhost:8000 |
| Courriels Mailpit | http://localhost:8025 |
| MySQL depuis la machine | `127.0.0.1:3320` |
| SMTP Mailpit depuis la machine | `127.0.0.1:1025` |

### 5. Se connecter

Le compte suivant est créé par la migration `2023_08_17_000001_init_app_data.php`, sans avoir besoin de lancer les seeders :

- **Adresse** : `admin@asbf.bf`
- **Mot de passe** : `secret`

Ces identifiants servent au développement local. Le compte a déjà son adresse vérifiée. Après connexion, vérifier l’affichage des organisations ; si les seeders ont été exécutés, consulter également les personnes de démonstration.

## Services Docker

Le fichier [docker-compose.yaml](docker-compose.yaml) définit trois services :

| Service | Rôle | Port exposé sur la machine |
| --- | --- | --- |
| `scoutisme_db` | MySQL 8.0, base `scoutisme`, utilisateur `root` sans mot de passe | `3320` → `3306` |
| `scoutisme_mailpit` | Capture des courriels SMTP et interface de consultation | `1025` et `8025` |
| `scoutisme_server` | Serveur Laravel, PHP 8.1 | `9025` → `8000` |

Le parcours précédent utilise uniquement les services MySQL et Mailpit. Le service PHP existant demande une remise au point avant de constituer un parcours entièrement conteneurisé : le [Dockerfile](Dockerfile) définit `COMPOSER_VENDOR_DIR=/var/www/html` alors que l’application charge `vendor/autoload.php`, et le montage du dépôt masque les fichiers installés dans l’image. Node.js et Vite ne sont pas fournis par ce service.

Si vous adaptez ce service PHP, les adresses depuis le conteneur sont `DB_HOST=scoutisme_db`, `DB_PORT=3306` et `MAIL_HOST=scoutisme_mailpit`. L’URL publique devient `http://localhost:9025` ; adapter aussi `APP_URL`, `FRONTEND_URL` et `SANCTUM_STATEFUL_DOMAINS`.

Pour arrêter les services en conservant la base :

```bash
docker compose down
```

Le volume `scoutisme_db` conserve les données. L’option `down -v` le supprime.

## Repères dans le code

| Emplacement | Contenu |
| --- | --- |
| `routes/web.php` | Connexion, session, vérification d’adresse, mots de passe et page d’entrée React |
| `routes/api.php` | API métier sous `/api`, principalement protégée par `auth:sanctum` et `verified` |
| `app/Http/Controllers/Api/` | Contrôleurs des ressources métier |
| `app/Http/Services/` | Traitements métier |
| `app/Http/Requests/`, `app/Http/Resources/` | Validation des requêtes et représentation des réponses |
| `app/Models/`, `app/ModelFilters/` | Modèles Eloquent, relations et filtres |
| `app/Policies/`, `app/Providers/AuthServiceProvider.php` | Autorisations côté serveur |
| `app/Mail/`, `app/Jobs/` | Courriels et tâches |
| `database/migrations/`, `database/seeders/` | Schéma, initialisation et données de démonstration |
| `resources/views/` | Vue d’entrée de l’application et modèles Blade, notamment pour les documents |
| `resources/js/index.jsx`, `resources/js/App.tsx` | Initialisation React et application |
| `resources/js/routes/Routes.tsx` | Navigation frontend |
| `resources/js/pages/` | Écrans organisés par domaine métier |
| `resources/js/api/` | Fonctions de requête HTTP et services CRUD |
| `resources/js/components/`, `resources/js/hooks/`, `resources/js/hoc/` | Composants, hooks et comportements réutilisables |
| `resources/js/context/`, `resources/js/protections/` | Contexte utilisateur et règles d’affichage selon les droits |
| `resources/js/types/` | Types TypeScript |
| `tests/` | Tests PHPUnit |

Les principales entités sont les organisations, structurées par parent, les personnes, leurs attributions de fonctions, les cotisations et paiements. Les utilisateurs, rôles et habilitations portent les accès à l’application. Les relations détaillées sont définies dans les modèles et migrations.

Pour suivre une fonctionnalité, partir de son écran dans `resources/js/pages/`, retrouver l’appel dans `resources/js/api/`, puis la route dans `routes/api.php`, son contrôleur et son service. Par exemple, l’envoi de courriels aux personnes part de `resources/js/pages/personnes/modal/EnvoyerMailModal.tsx` et aboutit à `POST /api/personnes/mails`.

L’authentification utilisée par l’interface repose sur la session et les cookies Laravel avec Sanctum. Le client HTTP envoie les cookies avec `credentials: "include"`. Conserver le même nom d’hôte pendant la navigation (`localhost` dans ce guide). Le paquet JWT est présent dans les dépendances, mais la génération de `JWT_SECRET` n’est pas une étape du parcours de connexion actuel.

Les alias d’import frontend (`api`, `components`, `pages`, etc.) sont déclarés dans [vite.config.js](vite.config.js). Lors d’un ajout ou d’une modification d’alias, vérifier aussi la configuration TypeScript.

## Commandes courantes

| Commande | Utilité |
| --- | --- |
| `php artisan serve --host=localhost --port=8000` | Démarrer Laravel |
| `npm run dev` | Démarrer Vite sur le port 4000 |
| `npm run build` | Compiler les ressources dans `public/build` |
| `php artisan route:list` | Consulter les routes disponibles |
| `php artisan migrate:status` | Voir l’état des migrations |
| `php artisan migrate` | Appliquer les migrations en attente |
| `php artisan optimize:clear` | Vider les caches Laravel, notamment après modification de `.env` |
| `php artisan test` | Lancer les tests PHPUnit |
| `./vendor/bin/pint --test` | Vérifier le style PHP sans modifier les fichiers |
| `php artisan queue:work` | Traiter les tâches si une connexion de queue asynchrone est configurée |

Avant de proposer une modification, compiler le frontend avec `npm run build` et lancer les tests PHP. Les tests actuels sont deux tests d’exemple ; ils ne couvrent pas les parcours métier. Le build Vite ne constitue pas une vérification complète des types TypeScript.

`phpunit.xml` ne configure pas de base de test isolée. Pour des tests qui manipulent les données, préparer un `.env.testing` avec une base MySQL dédiée avant de les lancer. SQLite ne remplace pas MySQL pour les migrations actuelles.

Après récupération de changements, réinstaller les dépendances si les fichiers de verrouillage ont changé et appliquer les nouvelles migrations. Éviter `migrate:fresh` sur une base à conserver : cette commande supprime les tables.

## Dépannage

| Symptôme | Vérification / action |
| --- | --- |
| `vendor/autoload.php` introuvable | Exécuter `composer install` à la racine. |
| `No application encryption key has been specified` | Vérifier `.env`, puis lancer `php artisan key:generate` lors de l’installation initiale. |
| Connexion MySQL refusée | Vérifier `docker compose ps`, les logs MySQL et le port `3320` depuis la machine (`3306` depuis un conteneur). |
| Erreur de droits lors de la création de fonctions SQL | Vérifier les privilèges MySQL requis par la migration des fonctions, y compris le `SET GLOBAL` en local. |
| `Vite manifest not found` ou ressources absentes | Démarrer `npm run dev` ou exécuter `npm run build`. Si Vite est arrêté mais que `public/hot` subsiste, supprimer ce fichier temporaire. |
| Session perdue ou réponse `401` | Utiliser toujours `localhost:8000` et vérifier `APP_URL`, les cookies et `SANCTUM_STATEFUL_DOMAINS`. |
| Photos non accessibles | Exécuter `php artisan storage:link` et vérifier les permissions de `storage/` et `bootstrap/cache/`. |
| Courriels non visibles | Vérifier Mailpit sur le port `8025` et les variables `MAIL_*`. Avec une queue asynchrone, vérifier aussi le worker. |
| Modification de `.env` sans effet | Exécuter `php artisan optimize:clear`. |

Pour les erreurs serveur, consulter les fichiers de `storage/logs/`. Pour le frontend, consulter la console et l’onglet Réseau du navigateur.

## Déploiement

Les workflows [GitHub Actions](.github/workflows) déclenchent les déploiements suivants :

| Branche | Environnement visé | Répertoire distant |
| --- | --- | --- |
| `develop` | Recette ; déclenchement manuel également disponible | `./rec/` |
| `production` | Production | `./admin-prod/` |

Le workflow partagé `deploy-base.yml` installe les dépendances npm, compile le frontend, transfère les fichiers par FTP, puis exécute Composer, les migrations et le nettoyage des caches via SSH. Les connexions utilisent les secrets GitHub `ASBF_FTP_*` et `ASBF_SSH_*`.

Point à connaître avant de modifier les workflows : le job partagé déclare actuellement `environment: RECETTE` en dur, même lorsque le workflow appelant transmet `env: PROD`. Les workflows actuels ne lancent pas les tests avant le déploiement.
