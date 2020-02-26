# Bankeirble

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)]()
[![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)]()

Application décentralisée de microcrédit entre particuliers. Propulsée par Ethereum.

## Pour commencer

### Pré-requis
Il vous faudra la dernière version de Node.js.
https://nodejs.org/en/

### Installation

Pour pouvoir correctement lancer les différents modules :

* Cloner le repo :
``git clone``
* Instaler les différents modules pour le serveur Node.js :
``npm install``
* Installer Truffle pour la partie blockchain :
``npm install -g truffle``
* Installer Ganache :
``npm install -g ganache-cli``
* Installer MongoDB : 
``https://docs.mongodb.com/manual/administration/install-community/``
``npm install mongodb``


## Démarrage

* Lancer la blockchain Ganache en local :
``ganache-cli``
* Lancer la base de donées : 
``mongod --dbpath=<repertoire du git en local>Bankeirble/data/db --port <port libre>``
* Lancer le serveur :
``npm start``
* Ouvrir un navigateur et se connecter sur le port 8080.

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


## Auteurs
* **Esteban Estoc**
* **Amera Al Ktabe**
* **Angélique Lopez**
* **Maxime Jouard**
* **Moomen Abid**
* **Thomas Lorreyte**
