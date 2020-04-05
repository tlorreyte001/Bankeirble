pragma solidity >=0.4.21 <0.7.0;

contract Contract {

  string public name;
  uint public contract_count = 0;

  struct Contract_user {
    uint id;
    string preteur;
    string emprunteur;
    uint taux;
    uint montant_total;
    uint echeance_totale;
    int date_reelle;
    int date_theorique;
    uint echeance_restante;
    uint montant_restant;
    bool status;
  }

  mapping(uint => mapping(uint => Contract_user)) public contract_users;
  mapping(uint => uint) public nombre_transaction;

  constructor() public{
    name = "Contrat Entre Particuliers";
     }


     function increaseContract() public{
     contract_count++;
     }

  function createContract1(uint _taux,
  uint _echeance_totale,uint _montant_total) public{
    contract_users[contract_count][0].taux = _taux;
    contract_users[contract_count][0].echeance_totale = _echeance_totale;
    contract_users[contract_count][0].montant_total = _montant_total;
  }

  function createContract2(string memory _emprunteur,
  string memory _preteur) public{
    contract_users[contract_count][0].emprunteur = _emprunteur;
    contract_users[contract_count][0].preteur = _preteur;
    nombre_transaction[contract_count] = 0;
  }

  function createContract3(int _date_reelle,uint _id) public{
    contract_users[contract_count][0].date_reelle = _date_reelle;
    contract_users[contract_count][0].id = _id;
  }

  function increaseTrans(uint _id) public{
    nombre_transaction[_id]++;
  }

  function transaction1(uint _id,uint _somme) public{
        uint numero_transaction = nombre_transaction[_id];
        if (numero_transaction==0){
          contract_users[_id][numero_transaction+1].montant_restant = contract_users[_id][0].montant_total - _somme;
          contract_users[_id][numero_transaction+1].echeance_restante = contract_users[_id][0].echeance_totale - 1;
        }
        else{
        contract_users[_id][numero_transaction+1].montant_restant = contract_users[_id][numero_transaction].montant_restant - _somme;
        contract_users[_id][numero_transaction+1].echeance_restante = contract_users[_id][numero_transaction].echeance_restante - 1;
        }
  }

  function transaction2(uint _id,int _date_reelle) public{
        uint numero_transaction = nombre_transaction[_id];
        contract_users[_id][numero_transaction+1].date_reelle = _date_reelle;
        if (numero_transaction ==0){
          contract_users[_id][numero_transaction+1].date_theorique = contract_users[_id][0].date_reelle + 100;
        }
        else{
        contract_users[_id][numero_transaction+1].date_theorique = contract_users[_id][numero_transaction].date_theorique + 100;
        }
  }


  function getCount() public view returns (uint _count){
    _count = contract_count;
    return _count;
  }

  function getNb_transaction(uint numero_contrat) public view returns (uint _nombre_transaction){
    _nombre_transaction = nombre_transaction[numero_contrat];
    return _nombre_transaction;
  }

  function getTaux(uint numero_contrat) public view returns (uint _taux){
    _taux = contract_users[numero_contrat][0].taux;
    return _taux;
  }

  function getEcheance_totale(uint numero_contrat) public view returns (uint _echeance_totale){
    _echeance_totale = contract_users[numero_contrat][0].echeance_totale;
    return _echeance_totale;
  }

  function getMontant_total(uint numero_contrat) public view returns (uint _montant_total){
    _montant_total = contract_users[numero_contrat][0].montant_total;
    return _montant_total;
  }

  function getEmprunteur(uint numero_contrat) public view returns (string memory _emprunteur){
    _emprunteur = contract_users[numero_contrat][0].emprunteur;
    return _emprunteur;
  }

  function getPreteur(uint numero_contrat) public view returns (string memory _preteur){
    _preteur = contract_users[numero_contrat][0].preteur;
    return _preteur;
  }

  function getDate_reelle(uint numero_contrat, uint numero_transaction) public view returns (int _date_reelle){
    _date_reelle = contract_users[numero_contrat][numero_transaction].date_reelle;
    return _date_reelle;
  }

  function getDate_theorique(uint numero_contrat, uint numero_transaction) public view returns (int _date_theorique){
    _date_theorique = contract_users[numero_contrat][numero_transaction].date_theorique;
    return _date_theorique;
  }

  function getEcheance_restante(uint numero_contrat, uint numero_transaction) public view returns (uint _echeance_restante){
    _echeance_restante = contract_users[numero_contrat][numero_transaction].echeance_restante;
    return _echeance_restante;
  }

  function getMontant_restant(uint numero_contrat, uint numero_transaction) public view returns (uint _montant_restant){
    _montant_restant = contract_users[numero_contrat][numero_transaction].montant_restant;
    return _montant_restant;
  }

  function getMontant_transaction(uint numero_contrat, uint numero_transaction) public view returns (uint _montant_transaction){
    if (numero_transaction == 1){
      _montant_transaction = contract_users[numero_contrat][numero_transaction-1].montant_total - contract_users[numero_contrat][numero_transaction].montant_restant;
    }
    else{
      _montant_transaction = contract_users[numero_contrat][numero_transaction-1].montant_restant - contract_users[numero_contrat][numero_transaction].montant_restant;
    }

    return _montant_transaction;
  }

  function existContract (string memory _preteur,
  string memory _emprunteur) public view returns (bool) {
    bool exist = false;
    for (uint p = 0; p<contract_count; p++){
      if ((keccak256(abi.encodePacked((contract_users[p][0].preteur))) == keccak256(abi.encodePacked((_preteur))))&&(keccak256(abi.encodePacked((contract_users[p][0].emprunteur))) == keccak256(abi.encodePacked((_emprunteur))))){
        exist = true;
        break;
      }
    }
    return exist;
  }

  function nbprets(string memory user) public view returns (uint){
      uint nb_prets = 0;
      for (uint p = 0; p<contract_count; p++){
        if (keccak256(abi.encodePacked((contract_users[p][0].preteur))) == keccak256(abi.encodePacked((user))))
          nb_prets++;
      }
      return nb_prets;
  }

  function diff_date(int date1, int date2) public view returns (int) {
    int annee1 = date1/10000;
    int mois1 = (date1 - (annee1 * 10000)) / 100;
    int jour1 = date1 - (annee1 * 10000) - (mois1 * 100);
    int annee2 = date2/10000;
    int mois2 = (date2 - (annee2 * 10000)) / 100;
    int jour2 = date2 - (annee2 * 10000) - (mois2 * 100);
    int diff_annee = annee2 - annee1;
    int diff_mois = mois2 - mois1;
    int diff_jour = jour2 - jour1;
    if (diff_jour <0){
      diff_mois--;
      diff_jour = diff_jour + 30;
      }
    if (diff_mois <0){
      diff_annee--;
      diff_mois = diff_mois + 12;
    }
    int res = diff_annee*10000  + diff_mois*100 + diff_jour;
    return res;
  }

  function reputation(string memory user) public view returns(int){
    int reput = 0;
    for (uint i = 0; i<contract_count; i++){
      if (keccak256(abi.encodePacked((contract_users[i][0].preteur))) == keccak256(abi.encodePacked((user)))){
        uint montant = contract_users[i][0].montant_total;
        if (montant > 20000){
          if (montant > 50000){
            reput = reput = 6;
          }
          else{
          reput = reput + 3;
          }
        }
        else{
          reput = reput + 1;
        }
      }
      if (keccak256(abi.encodePacked((contract_users[i][0].emprunteur))) == keccak256(abi.encodePacked((user)))){
        reput ++;
        uint transactions = nombre_transaction[i];
        for (uint j=1; j<transactions+1; j++){
          int date_r = contract_users[i][j].date_reelle;
          int date_t = contract_users[i][j].date_theorique;
          int diff = diff_date(date_t,date_r);
          if (diff>0){
            if (diff>=100){
              reput = reput - diff/10;
            }
            else{
              reput = reput - diff/3;
            }
          }
        }
      }
    }
    return reput;
  }
  function compareStrings (string memory a, string memory b) public view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }

  function testContractUser (string memory user, uint contract_id) public view returns (int _value){
    if (compareStrings(contract_users[contract_id][0].preteur, user)){
      _value = 1;
      return _value; //contrat en tant que preteur
    }
    else if (compareStrings(contract_users[contract_id][0].emprunteur, user)){
      _value = 2;
      return _value; //contrat en tant qu'emprunter
    }
    else{
      _value = 0;
      return _value; //contrat pas au user
    }
  }
}
