# 🔐 Politique de sécurité

Merci d’aider à sécuriser l’application **Baka Bus** !  
Si tu découvres une faille ou une vulnérabilité de sécurité, merci de **ne pas l’annoncer publiquement**.

## 📬 Signalement responsable

Envoie un e-mail détaillé à :

**baka-bus@proton.me**

Merci d’inclure :

- Une description claire de la vulnérabilité
- Étapes pour reproduire le bug
- Code ou preuve de concept si possible

## ⏱ Délai de réponse

Nous nous engageons à répondre **dans les 72 heures** après réception du message.

## 🔒 Bonnes pratiques du projet

- Authentification sécurisée via Firebase
- Règles de sécurité Firestore strictes
- Pas de stockage de mots de passe ou données sensibles côté client
- Suppression des données utilisateur sur demande

## 🧠 Pour les développeurs

- Ne publie jamais de clé d’API ou de config Firebase dans le dépôt
- Utilise `.env` pour toute configuration locale sensible
- Respecte les permissions utilisateur : chacun ne doit accéder qu’à ses propres données

## 📅 Dernière mise à jour

Juin 2025
