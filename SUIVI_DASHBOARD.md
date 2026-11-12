# Suivi des tâches du dashboard

Date de création : 12 novembre 2026.

Périmètre : statistiques des organisations, effectifs et cotisations. Ce suivi reprend les constats de lecture du code ; les chiffres restent à comparer à une base de recette. Les règles métier à confirmer sont indiquées dans les tâches.

Toutes les tâches sont initialement **à faire**. Cocher une tâche lorsque ses critères de validation sont remplis. Pendant sa réalisation, ajouter si nécessaire un responsable, un statut « en cours » ou « bloqué », puis un lien vers la PR et les résultats de validation.

## P1 — Fiabiliser les statistiques

- [ ] **DASH-01 — Filtrer les cotisations scouts par année**
  - Constat : le calcul national agrège les cotisations de toutes les années, contrairement aux calculs adultes et unités.
  - À faire : appliquer une année de référence commune aux statistiques de cotisation.
  - Validation : avec plusieurs années de cotisations pour une même personne, seuls les enregistrements de l’année retenue contribuent au résultat ; les totaux national et unités concordent à périmètre identique.
  - Code : [PersonneStatService.php](app/Http/Services/PersonneStatService.php), [PersonneStatController.php](app/Http/Controllers/Api/PersonneStatController.php).

- [ ] **DASH-02 — Harmoniser la définition d’un membre actif**
  - Constat : plusieurs requêtes incluent les personnes dont `date_fin <= now()` ; les filtres diffèrent selon les statistiques.
  - À faire : confirmer la règle métier pour les membres actifs et l’appliquer aux effectifs et cotisations concernés.
  - Validation : cas couverts pour une date de fin absente, passée, future et située à la limite de la période ; les exclusions correspondent à la règle validée.
  - Code : [PersonneStatController.php](app/Http/Controllers/Api/PersonneStatController.php), [PersonneStatService.php](app/Http/Services/PersonneStatService.php).

- [ ] **DASH-03 — Remplacer l’année 2024 codée en dur et sélectionner la période**
  - Constat : la répartition par genre utilise encore 2024.
  - À faire : proposer une année sélectionnable, transmettre et valider ce paramètre dans l’API, l’inclure dans les clés de cache et définir les attributions à retenir sur la période.
  - Validation : changer d’année recalcule les résultats ; une attribution couvrant plusieurs années est traitée selon la règle métier, sans double comptage d’une personne.
  - Dépendances : règles de DASH-01 et DASH-02.
  - Code : [PersonneStatController.php](app/Http/Controllers/Api/PersonneStatController.php), [stats.ts](resources/js/api/stats.ts), [EffectifScoutGenre.tsx](resources/js/pages/stats/personnes/scouts/EffectifScoutGenre.tsx).

- [ ] **DASH-04 — Prendre en compte les personnes sans cotisation enregistrée**
  - Constat : ces personnes ne contribuent ni aux compteurs « à jour » ni aux compteurs « non à jour » dans les requêtes concernées.
  - À faire : confirmer leur classement métier et adapter les jointures et compteurs.
  - Validation : un membre sans ligne de cotisation pour l’année apparaît dans la catégorie convenue ; les écarts entre effectif et total des catégories sont expliqués.
  - Code : [PersonneStatService.php](app/Http/Services/PersonneStatService.php), [PersonneStatController.php](app/Http/Controllers/Api/PersonneStatController.php).

- [ ] **DASH-05 — Fiabiliser le graphique garçons/filles d’une unité**
  - Constat : les libellés sont fixes alors que les valeurs suivent l’ordre des résultats SQL, sans ordre garanti.
  - À faire : associer explicitement les valeurs aux codes `h` et `f`, compléter les catégories absentes avec zéro et utiliser les effectifs pour les séries.
  - Validation : libellés et valeurs restent corrects avec un ordre de réponse inversé, un seul genre présent et une unité vide.
  - Code : [EffectifScoutUnite.tsx](resources/js/pages/stats/personnes/scouts/EffectifScoutUnite.tsx).

## P2 — Terminer les fonctionnalités commencées

- [ ] **DASH-06 — Créer les dashboards région et groupe**
  - Constat : seuls les parcours national et unité sont explicitement prévus ; un message « Statistiques en construction » sert de repli.
  - À faire : définir les indicateurs attendus pour région et groupe, implémenter leurs vues et vérifier la nature de l’organisation avant de choisir le dashboard unité. Ne pas appeler l’API avec un identifiant absent.
  - Validation : chaque profil accède à une vue adaptée à son organisation et à ses droits ; les totaux correspondent à ses sous-organisations autorisées.
  - Dépendance : DASH-12 pour les contrôles de périmètre côté serveur.
  - Code : [Statistiques.tsx](resources/js/pages/stats/Statistiques.tsx), [StatPourUnite.tsx](resources/js/pages/stats/StatPourUnite.tsx).

- [ ] **DASH-07 — Brancher les boutons « Exporter »**
  - Constat : les boutons des organisations, effectifs et cotisations sont affichés sans action.
  - À faire : choisir le format attendu et implémenter les exports avec les mêmes filtres, période et autorisations que la vue.
  - Validation : chaque bouton télécharge un fichier exploitable avec des en-têtes et des totaux conformes au tableau affiché ; le cas vide est géré.
  - Code : [OrganisationDashBord.tsx](resources/js/pages/stats/organisations/OrganisationDashBord.tsx), [ScoutEffectif.tsx](resources/js/pages/stats/personnes/scouts/ScoutEffectif.tsx), [ScoutCotisation.tsx](resources/js/pages/stats/cotisations/scouts/ScoutCotisation.tsx), [CotisationAdulte.tsx](resources/js/pages/stats/cotisations/adulte/CotisationAdulte.tsx).

- [ ] **DASH-08 — Rendre accessible la répartition nationale par genre**
  - Constat : le composant existe, mais le dashboard des effectifs affiche uniquement la répartition par région.
  - À faire : intégrer la vue par genre à la navigation des effectifs.
  - Validation : un utilisateur autorisé peut ouvrir cette vue et retrouver les totaux attendus pour la période sélectionnée.
  - Dépendance : DASH-03.
  - Code : [ScoutDashbord.tsx](resources/js/pages/stats/personnes/ScoutDashbord.tsx), [EffectifScoutGenre.tsx](resources/js/pages/stats/personnes/scouts/EffectifScoutGenre.tsx).

- [ ] **DASH-09 — Réactiver les vues graphiques des effectifs et cotisations**
  - Constat : des composants graphiques existent, mais leur intégration est absente ou commentée ; le panneau graphique de la vue par genre est vide.
  - À faire : connecter les graphiques aux données adaptées et compléter la bascule tableau/graphique.
  - Validation : chaque vue proposée affiche un contenu ; valeurs, catégories et totaux concordent avec le tableau correspondant.
  - Code : [EffectifScoutChart.tsx](resources/js/pages/stats/personnes/scouts/EffectifScoutChart.tsx), [ScoutCotisationChart.tsx](resources/js/pages/stats/cotisations/scouts/ScoutCotisationChart.tsx), [EffectifScoutGenre.tsx](resources/js/pages/stats/personnes/scouts/EffectifScoutGenre.tsx).

- [ ] **DASH-10 — Gérer les états chargement, erreur et données vides**
  - Constat : plusieurs écrans retournent un contenu vide en cas d’échec ; les cotisations d’unité peuvent conserver un indicateur de chargement sans fin.
  - À faire : distinguer les états, afficher un message utile et proposer une nouvelle tentative après erreur.
  - Validation : une réponse vide, une erreur serveur et une panne réseau donnent chacune un retour explicite ; aucun chargement ne persiste après un échec définitif.
  - Code : [pages/stats](resources/js/pages/stats).

## P3 — Compléter la fiabilité et la validation

- [ ] **DASH-11 — Actualiser les statistiques après les modifications métier**
  - Constat : les mutations examinées n’invalident pas les clés de cache propres au dashboard.
  - À faire : organiser les clés de statistiques et invalider les données concernées après création, modification ou sortie d’un membre, transfert, changement d’organisation et validation/rejet de paiement.
  - Validation : après chaque opération, les indicateurs concernés se mettent à jour sans rechargement manuel du navigateur.
  - Code : [pages/stats](resources/js/pages/stats), [pages/personnes](resources/js/pages/personnes), [pages/paiements](resources/js/pages/paiements), [pages/attributions](resources/js/pages/attributions).

- [ ] **DASH-12 — Vérifier et compléter les autorisations des API de statistiques**
  - À faire : définir les accès attendus par rôle, contrôler le périmètre national et les identifiants d’unité côté serveur, puis ajouter les contrôles manquants. La visibilité d’un écran ne suffit pas à établir l’autorisation API.
  - Validation : les appels directs d’un utilisateur hors périmètre sont refusés ; les utilisateurs autorisés obtiennent uniquement les données prévues pour leur rôle.
  - Code : [api.php](routes/api.php), [PersonneStatController.php](app/Http/Controllers/Api/PersonneStatController.php), [OrganisationStatController.php](app/Http/Controllers/Api/OrganisationStatController.php).

- [ ] **DASH-13 — Ajouter des tests de calcul et une recette du dashboard**
  - À faire : créer des jeux de données déterministes sur une base MySQL de test isolée et couvrir les corrections au fur et à mesure de leur réalisation.
  - Validation : tests couvrant plusieurs années, membre sorti, absence de cotisation, unité vide, un seul genre présent, transfert et concordance des totaux ; recette des parcours national, région, groupe et unité.
  - Code : [tests](tests), [PersonneStatService.php](app/Http/Services/PersonneStatService.php), [PersonneStatController.php](app/Http/Controllers/Api/PersonneStatController.php).

- [ ] **DASH-14 — Vérifier et corriger l’affichage mobile des graphiques**
  - Constat : les graphiques d’unité configurent une largeur de 480 pixels sur les petits écrans.
  - À faire : adapter la largeur au conteneur et vérifier les légendes, cartes et tableaux sur mobile.
  - Validation : aux largeurs de 320, 375 et 768 pixels, aucun graphique ne déborde de la page ; les légendes restent lisibles et les tableaux larges défilent dans leur conteneur.
  - Code : [EffectifScoutUnite.tsx](resources/js/pages/stats/personnes/scouts/EffectifScoutUnite.tsx), [CotisationScoutUnite.tsx](resources/js/pages/stats/personnes/scouts/CotisationScoutUnite.tsx).

## Ordre de réalisation

1. Valider les règles de calcul et corriger DASH-01 à DASH-05, avec les tests de DASH-13.
2. Vérifier les autorisations DASH-12 avant d’élargir les accès avec DASH-06.
3. Terminer les vues, exports et états d’interface DASH-07 à DASH-10.
4. Finaliser l’actualisation DASH-11, la recette DASH-13 et l’affichage mobile DASH-14.
