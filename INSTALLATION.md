## Pour commencer

### Pré-requis
Il vous faudra la dernière version de Node.js.
https://nodejs.org/en/

### Installation

Pour pouvoir correctement lancer les différents modules :

* Cloner le repo :
``git clone``
* Installer les différents modules pour le serveur Node.js :
``npm install``
* Installer Truffle pour la partie blockchain :
``npm install -g truffle``
* Installer Ganache :
``npm install -g ganache-cli``
* Installer MongoDB :
``https://docs.mongodb.com/manual/administration/install-community/``
``npm install mongodb``
* Installer yarn :
``https://classic.yarnpkg.com/fr/docs/install/``


## Démarrage

* Lancer la blockchain Ganache en local :
``ganache-cli``
* Lancer la base de données :
``mongod -port 27018``
* Lancer le serveur dans le répertoire server:
``npm start``
* Lancer le serveur dans le répertoire client:
``yarn start``
* Ouvrir un navigateur et se connecter sur le port 3000.
``http://localhost:3000/``

## Visualiser la base de données

* Téléchargez Robo 3T :
``https://robomongo.org/download``
* Cliquez sur create.
* Remplissez le nom.
* Remplissez l'adresse IP : localhost
* Remplissez le port : port choisi lors du lancement de mongodb
* Cliquez sur Save.
* Cliquez sur la ligne de la base de donnée (elle a le nom que vous lui avez donné).
* Cliquez sur Connect.


## Versions
* **Dernière version stable :** 0.0.0
* **Dernière version :** 0.0.1
