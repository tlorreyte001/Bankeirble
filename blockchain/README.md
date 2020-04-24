# Initialisation de la Blockchain
*Le dossier d'origine est le dossier du Répositorie Bankeirble*

## 1. Lancez Ganache
  ```ganache-cli -p 7545 -i 5777```
  ou lancez l'application ganache.
  
## 2. Ajouter le contrat à la blockchain
  ```cd blockchain```<br/>
  ```truffle migrate```<br/><br/>
## 3. Récupérez l'adresse du contrat créé
  ### Sur le Terminal
  **Contract Address**<br/>
  <a href="https://ibb.co/YBQ2RcV"><img src="https://i.ibb.co/yFP0f6x/term.png" alt="term" border="0"></a>
  ### Sur Ganache
  <ins>Cliquez sur</ins> `link truffle project`<br/>
  <a href="https://ibb.co/ZGQSdSj"><img src="https://i.ibb.co/HBcC7CS/ganache-1.png" alt="ganache-1" border="0"></a><br/>
  <ins>Cliquez sur</ins> `add project`<br/>
  <a href="https://ibb.co/h7T4ccZ"><img src="https://i.ibb.co/YRV1XXy/ganache2.png" alt="ganache2" border="0"></a><br/>
  <a href="https://ibb.co/KjjKtVj"><img src="https://i.ibb.co/4ZZ1b4Z/ganache-3.png" alt="ganache-3" border="0"></a><br/>
  <ins>Cliquez sur</ins> `save and restart`<br/>
  <a href="https://ibb.co/D8693k5"><img src="https://i.ibb.co/JybvX25/ganache4.png" alt="ganache4" border="0"></a><br/>
  <ins>Address en face de Contract</ins><br/>
  <a href="https://ibb.co/31hLrSg"><img src="https://i.ibb.co/WnKYxBm/ganache-5.png" alt="ganache-5" border="0"></a><br/>
## 4. Mettre l'adresse du contrat créé dans le fichier APIBlockchain
`cd client/utils`<br/><br/>
<a href="https://ibb.co/g9bVSLh"><img src="https://i.ibb.co/F3kV5LC/adresse.png" alt="adresse" border="0"></a>
