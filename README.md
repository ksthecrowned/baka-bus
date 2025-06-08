# 🚌 Baka Bus

**Baka Bus** est une application mobile open-source destinée aux usagers des transports en commun au **Congo-Brazzaville**. Elle permet de **signaler les abus**, **partager les alertes en temps réel** (ex. : hausse illégale des prix, absence de bus, surcharge...), et de **recevoir des notifications personnalisées** selon les lignes de transport suivies.

> ✊🏾 Notre but : encourager une auto-régulation citoyenne des transports urbains par la transparence et l'information communautaire.

---

## 📲 Fonctionnalités

- ✅ **Onboarding simplifié** (3 écrans max)
- ✅ **Authentification Firebase** (email / mot de passe)
- ✅ **Accueil avec liste filtrable** des alertes :
  - par ville
  - par ligne
  - par type de signalement
- ✅ **Signalement rapide** :
  - ville, ligne, type (tarif excessif, surcharge, etc.)
  - description facultative
  - ajout de photo
- ✅ **Profil utilisateur** :
  - lignes suivies
  - thème (clair/sombre)
  - suppression de compte
- ✅ **Notifications push** via Firebase Cloud Messaging
- ✅ **Affichage intelligent du temps écoulé** (« il y a 10 min »)
- ✅ **Statistiques par ligne** : nombre de signalements récents

---

## 🔐 Stack technique

| Technologie | Usage |
|-------------|-------|
| **React-Native** | Développement mobile cross-platform |
| **Firebase Authentication** | Gestion des utilisateurs |
| **Cloud Firestore** | Stockage des données (villes, lignes, signalements, utilisateurs) |
| **Firebase Cloud Messaging** | Notifications push |
| **Firebase Security Rules** | Sécurité et permissions des données |

---

## 🌍 Données initiales

- Liste des **villes** du Congo-Brazzaville
- Pour chaque ville : base de **lignes de transport** préremplie

---

## 🤝 Contribuer

Ce projet est **ouvert à la contribution** !

Nous accueillons les :
- 🐛 **Rapports de bugs**
- 🧠 **Suggestions d’améliorations**
- 💻 **Pull Requests** bien décrites
- 🌐 **Traductions** (français, lingala, kituba, etc.)

### Pour contribuer :
1. Forkez le repo
2. Créez une branche (`feat/ma-fonctionnalite`, `fix/mon-bug`, etc.)
3. Envoyez une Pull Request claire, **avec description, captures si possible, et lien vers l’issue si applicable**
4. Respectez les conventions de code, restez simple et lisible 🙏

---

## 📜 Licence

[MIT](LICENSE)

---

## 💬 Contact & Communauté

Tu veux aider, poser une question ou proposer une collaboration ?
- 📧 Email : [baka-bus@proton.me](mailto:baka-bus@proton.me)
- 📢 Telegram : [@BakaBusApp](https://t.me/BakaBusApp) *(exemple à créer)*
- 🌍 Site (à venir) : [baka-bus.org](https://baka-bus.org)

---

## ✨ Pourquoi ce projet ?

Les abus dans les transports en commun à Brazzaville sont fréquents et trop souvent banalisés. **Baka Bus** veut redonner du pouvoir aux usagers, en favorisant :
- une **meilleure transparence**
- un **meilleur suivi communautaire**
- une **pression citoyenne positive** sur les acteurs concernés

> Parce qu'on en a marre de crier "Baka bus te !" sans réponse.  
> Maintenant, **on signale, on alerte, on informe.**

---

## ❤️ Crédits

Développé par la communauté, initié par [Kaiser Styve](https://github.com/ksthecrowned)  
Design et prompt initial généré avec l'aide de **ChatGPT + Bolt.new**

---

## 🧭 Roadmap (v1.1+)

- [ ] Ajout de la géolocalisation facultative
- [ ] Statistiques publiques par ligne
- [ ] Modération participative

---

