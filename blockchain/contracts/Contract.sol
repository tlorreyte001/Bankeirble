pragma solidity >=0.4.21 <0.7.0;

contract Contract {

  string public name;
  uint public contractCount = 0;

  struct Contract_user {
    uint id;
    string lender;
    string borrower;
    uint rate;
    uint totalAmount;
    uint duration;
    int currentDate;
    int theoricalDate;
    uint remainingDuration;
    uint remainingAmount;
    bool status;
  }

  mapping(uint => mapping(uint => Contract_user)) public usersContracts;
  mapping(uint => uint) public nbTransaction;

  constructor() public{
    name = "Contrat Entre Particuliers";
  }


  function increaseContract() public{
    contractCount++;
  }

  function createContract1(uint _rate,uint _duration,uint _totalAmount) public{
    usersContracts[contractCount][0].rate = _rate;
    usersContracts[contractCount][0].duration = _duration;
    usersContracts[contractCount][0].totalAmount = _totalAmount;
  }

  function createContract2(string memory _borrower,string memory _lender) public{
    usersContracts[contractCount][0].borrower = _borrower;
    usersContracts[contractCount][0].lender = _lender;
    nbTransaction[contractCount] = 0;
  }

  function createContract3(int _currentDate,uint _id) public{
    usersContracts[contractCount][0].currentDate = _currentDate;
    usersContracts[contractCount][0].id = _id;
  }

  function increaseTrans(uint _id) public{
    nbTransaction[_id]++;
  }

  function transaction1(uint _id,uint _sum) public{
        uint transactionId = nbTransaction[_id];
        if (transactionId==0){
          usersContracts[_id][transactionId+1].remainingAmount = usersContracts[_id][0].totalAmount - _sum;
          usersContracts[_id][transactionId+1].remainingDuration = usersContracts[_id][0].duration - 1;
        }
        else{
        usersContracts[_id][transactionId+1].remainingAmount = usersContracts[_id][transactionId].remainingAmount - _sum;
        usersContracts[_id][transactionId+1].remainingDuration = usersContracts[_id][transactionId].remainingDuration - 1;
        }
  }

  function transaction2(uint _id,int _currentDate) public{
        uint transactionId = nbTransaction[_id];
        usersContracts[_id][transactionId+1].currentDate = _currentDate;
        if (transactionId ==0){
          usersContracts[_id][transactionId+1].theoricalDate = usersContracts[_id][0].currentDate + 100;
        }
        else{
        usersContracts[_id][transactionId+1].theoricalDate = usersContracts[_id][transactionId].theoricalDate + 100;
        }
  }


  function getCount() public view returns (uint _count){
    _count = contractCount;
    return _count;
  }

  function getNbTransaction(uint contratNumber) public view returns (uint _nbTransaction){
    _nbTransaction = nbTransaction[contratNumber];
    return _nbTransaction;
  }

  function getRate(uint contratNumber) public view returns (uint _rate){
    _rate = usersContracts[contratNumber][0].rate;
    return _rate;
  }

  function getId(uint contratNumber) public view returns (uint _id){
    _id = usersContracts[contratNumber][0].id;
    return _id;
  }

  function getDuration(uint contratNumber) public view returns (uint _duration){
    _duration = usersContracts[contratNumber][0].duration;
    return _duration;
  }

  function getTotalAmount(uint contratNumber) public view returns (uint _totalAmount){
    _totalAmount = usersContracts[contratNumber][0].totalAmount;
    return _totalAmount;
  }

  function getBorrower(uint contratNumber) public view returns (string memory _borrower){
    _borrower = usersContracts[contratNumber][0].borrower;
    return _borrower;
  }

  function getLender(uint contratNumber) public view returns (string memory _lender){
    _lender = usersContracts[contratNumber][0].lender;
    return _lender;
  }

  function getCurrentDate(uint contratNumber, uint transactionId) public view returns (int _currentDate){
    _currentDate = usersContracts[contratNumber][transactionId].currentDate;
    return _currentDate;
  }

  function getTheoricalDate(uint contratNumber, uint transactionId) public view returns (int _theoricalDate){
    _theoricalDate = usersContracts[contratNumber][transactionId].theoricalDate;
    return _theoricalDate;
  }

  function getRemainingDuration(uint contratNumber, uint transactionId) public view returns (uint _remainingDuration){
    _remainingDuration = usersContracts[contratNumber][transactionId].remainingDuration;
    return _remainingDuration;
  }

  function getRemainingAmount(uint contratNumber, uint transactionId) public view returns (uint _remainingAmount){
    _remainingAmount = usersContracts[contratNumber][transactionId].remainingAmount;
    return _remainingAmount;
  }

  function getTransactionAmount(uint contratNumber, uint transactionId) public view returns (uint _transactionAmount){
    if (transactionId == 1){
      _transactionAmount = usersContracts[contratNumber][transactionId-1].totalAmount - usersContracts[contratNumber][transactionId].remainingAmount;
    }
    else{
      _transactionAmount = usersContracts[contratNumber][transactionId-1].remainingAmount - usersContracts[contratNumber][transactionId].remainingAmount;
    }

    return _transactionAmount;
  }

  function existContract (string memory _lender,string memory _borrower) public view returns (bool) {
    bool exist = false;
    for (uint p = 0; p<contractCount; p++){
      if ((keccak256(abi.encodePacked((usersContracts[p][0].lender))) == keccak256(abi.encodePacked((_lender))))&&(keccak256(abi.encodePacked((usersContracts[p][0].borrower))) == keccak256(abi.encodePacked((_borrower))))){
        exist = true;
        break;
      }
    }
    return exist;
  }

  function nbLoans(string memory user) public view returns (uint){
      uint loanCount = 0;
      for (uint p = 0; p<contractCount; p++){
        if (keccak256(abi.encodePacked((usersContracts[p][0].lender))) == keccak256(abi.encodePacked((user))))
          loanCount++;
      }
      return loanCount;
  }

  function dateDiff (int date1, int date2) public view returns (int) {
    int year1 = date1/10000;
    int month1 = (date1 - (year1 * 10000)) / 100;
    int day1 = date1 - (year1 * 10000) - (month1 * 100);
    int year2 = date2/10000;
    int month2 = (date2 - (year2 * 10000)) / 100;
    int day2 = date2 - (year2 * 10000) - (month2 * 100);
    int yearDiff = year2 - year1;
    int monthDiff = month2 - month1;
    int dayDiff = day2 - day1;
    if (dayDiff <0){
      monthDiff--;
      dayDiff = dayDiff + 30;
    }
    if (monthDiff <0){
      yearDiff--;
      monthDiff = monthDiff + 12;
    }
    int res = yearDiff*10000  + monthDiff*100 + dayDiff;
    return res;
  }

  function reputation(string memory user) public view returns(int){
    int reput = 0;
    for (uint i = 0; i<contractCount; i++){
      if (keccak256(abi.encodePacked((usersContracts[i][0].lender))) == keccak256(abi.encodePacked((user)))){
        uint montant = usersContracts[i][0].totalAmount;
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
      if (keccak256(abi.encodePacked((usersContracts[i][0].borrower))) == keccak256(abi.encodePacked((user)))){
        reput ++;
        uint transactions = nbTransaction[i];
        for (uint j=1; j<transactions+1; j++){
          int date_r = usersContracts[i][j].currentDate;
          int date_t = usersContracts[i][j].theoricalDate;
          int diff = dateDiff (date_t,date_r);
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

  function testContractUser (string memory user, uint contractNumber) public view returns (int _value){
    if (compareStrings(usersContracts[contractNumber][0].lender, user)){
      _value = 1;
      return _value; //contrat en tant que lender
    }
    else if (compareStrings(usersContracts[contractNumber][0].borrower, user)){
      _value = 2;
      return _value; //contrat en tant qu'emprunter
    }
    else{
      _value = 0;
      return _value; //contrat pas au user
    }
  }
}
