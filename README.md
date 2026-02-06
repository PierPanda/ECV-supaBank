# 🏦 Projet : Bank Admin Panel

A l'aide d'une base de données Supabase pré-conçue, créer une application d'administration de comptes bancaires avec Next.js.

## Fonctionnalités à implémenter

■ **Page d'accueil** : Une barre de recherche pour rechercher un client par son nom et son prénom. La recherche doit être persistante dans l'URL. Chaque résultat de recherche doit être cliquable et rediriger vers la page du client.

■ **Une page client** : Afficher les informations de base du client, l'argent total dont il dispose ainsi que la liste de ses comptes bancaires. Chaque compte bancaire doit être cliquable et rediriger vers la page du compte. Ajouter un formulaire pour créer un nouveau compte bancaire au client.

■ **Une page compte bancaire** : Afficher les informations du compte bancaire, la liste des transactions associées ainsi qu'un formulaire pour faire un transfert d'un compte vers un autre (pour un même client).

## Contraintes techniques

■ Utiliser le App Router de Next.js

■ Utiliser le plus de server components possible

■ Utiliser les route handlers déjà créés dans le projet pour faire les appels à la base de données Supabase

■ Gérer les états de chargement (au niveau de la page et au niveau des composants)

■ Gérer les erreurs

■ Gérer les états vides
