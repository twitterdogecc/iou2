pragma solidity >=  0.8.0;
pragma experimental ABIEncoderV2;
import "./interfaces/iStoreIOUs.sol";
import "./interfaces/iIOUtoken.sol";


contract StoreIOUs is iStoreIOUs {
//todo : break this brick 
    mapping (address => address[]) public listIOUs; // list of emitted IOUs from emitent
    mapping (string => address[])   listIOUsSoc; // list of emitted IOUs by social profile
    mapping (address => address[]) public listHoldersIOUs; //list of tokens by holder
    mapping (address => uint256) public isIOU; //security check is token emitted 
    mapping (address => mapping (address => bool)) isHolderthisIOU; //  check list of tokens by holder

    mapping (bytes32 => address[]) listbyKeys; //list of IOUs by keyword
    mapping (bytes32 => 
    mapping (address => uint256))  keyByList; //reverse index for listbyKeys to editing keywords
    bytes32[] public allKeywords;  //list all keywords
    address[] public allIOU; //list all emitted IOus
    address[] public allIssuers; //list all issuers of  IOus

    mapping (bytes32 =>
    mapping (string => 
    mapping (string => 
    mapping (string => address[])))) internal  listbyCity_; // (keyword => country =>state =>city) => of IOUs
    
    mapping (bytes32 =>
    mapping (string => 
    mapping (string => 
    mapping (string => 
    mapping (string => address[]))))) internal listbyStreet_; // (keyword=>country=> state => city =>street) => IOU 

    mapping (address => geoIOU ) posIOU;


    address owner;
    address makeFactory;

    constructor ()  {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }

    modifier onlyMake() {
        require (makeFactory != address(0x0), "No makeFactory address");
        require (makeFactory == msg.sender, "Only makeFactory can do this");
        _;
    }

    modifier isIOUtoken () {
        require (makeFactory == msg.sender || isIOU[msg.sender] > 0 , "Not IOU token calls" );
        _;
    }

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setFactory (address _newFact) public onlyOwner {
        makeFactory = _newFact;
    }

    modifier onlyissuer(address _addrIOU) {
        iIOUtoken.DescriptionIOU memory desc = iIOUtoken(_addrIOU).thisIOUDesc();
        require (desc.issuer == msg.sender, "Only issuer can do this");
        _;
    }

    function addIOU1 (address _addrIOU, address _emitent) public override onlyMake {
        
        allIOU.push(_addrIOU);
        isIOU[_addrIOU] = allIOU.length;

        if (listIOUs[_emitent].length == 0) {
            allIssuers.push(_emitent); 
        }
        listIOUs[_emitent].push(_addrIOU);
    }


    function addIOU2 (address _addrIOU, 
                    string memory _socialProfile,                     
                    bytes32[] memory _keywords) 
                    public override isIOUtoken   {        

        listIOUsSoc[_socialProfile].push(_addrIOU);
        _addKeys(_addrIOU, _keywords);
    }


    function addKeys (address _addrIOU, bytes32[] memory _keywords) public onlyissuer(_addrIOU) {
        _addKeys(_addrIOU, _keywords);
    }
    function delKeys (address _addrIOU, bytes32[] memory _keywords) public onlyissuer(_addrIOU) {
        _delKeys(_addrIOU, _keywords);
    }

    
    /// when changed geolocation
    function changeIOUGeoAllkeys  (address _addrIOU, 
                            iIOUtoken.geo memory _loc 
                            ) public onlyissuer(_addrIOU) {
        bytes32[] memory keys = iIOUtoken(_addrIOU).thisIOUDesc().keywords;
        for (uint8 k=0; k<keys.length; k++)  {  
            bytes32 key = keys[k];
            _delkeyIOUGeo(_addrIOU, key);
            _setIOUGeo(_addrIOU, _loc, key);          

            }
    }
    function _addKeys (address _addrIOU, bytes32[] memory _keywords) internal{

        uint lenArr = _keywords.length > 5 ? 5: _keywords.length;
        for (uint8 k=0 ; k < lenArr ; k++){
            bytes32 key = _keywords[k];
                if (key > 0 ){
                    if  (listbyKeys[key].length == 0 ) {
                        
                        allKeywords.push(key);

                    }
                    listbyKeys[key].push(_addrIOU);
                    keyByList[key][_addrIOU] = listbyKeys[key].length;
                    _setIOUGeo(_addrIOU,
                            iIOUtoken(_addrIOU).thisIOUDesc().location, 
                            key);
                }
            } 
    }


    function _delKeys (address _addrIOU, bytes32[] memory _keywords) internal{

        uint lenArr = _keywords.length > 5 ? 5: _keywords.length;
        for (uint8 k=0 ; k < lenArr ; k++){
            bytes32 key = _keywords[k];
            if (key > 0 ){
                uint keyNum = keyByList[key][_addrIOU];
                if  (keyNum > 0 ) {
                    listbyKeys[key][keyNum-1] = 
                    listbyKeys[key][
                    listbyKeys[key].length -1];
                    delete (listbyKeys[key][
                            listbyKeys[key].length -1]);
                    _delkeyIOUGeo(_addrIOU, key);
                }
 
            }
        } 
    }


    function _setIOUGeo (address _addrIOU, 
                        iIOUtoken.geo memory _loc,
                        bytes32 _key) internal { //public  onlyissuer (_addrIOU)

        listbyCity_[_key] [_loc.country][_loc.state][_loc.city].push(_addrIOU);
        posIOU[_addrIOU].inCity = listbyCity_[_key][_loc.country][_loc.state][_loc.city].length;
        listbyStreet_[_key][_loc.country][_loc.state][_loc.city][_loc.street].push(_addrIOU);
        posIOU[_addrIOU].onStreet = listbyStreet_[_key][_loc.country][_loc.state][_loc.city][_loc.street].length;

    }

    function _delkeyIOUGeo  (address _addrIOU, 
                            bytes32 key) public onlyissuer(_addrIOU) {

        geoIOU memory curr = posIOU[_addrIOU];

        uint curlen = listbyCity_[key][curr.country][curr.state][curr.city].length;
        // delete old key connection
        listbyCity_[key][curr.country][curr.state][curr.city][curr.inCity -1] = 
        listbyCity_[key][curr.country][curr.state][curr.city][curlen-1];
        delete (listbyCity_[key][curr.country][curr.state][curr.city][curlen-1]);

        curlen = listbyStreet_[key][curr.country][curr.state][curr.city][curr.street].length;
        listbyStreet_[key][curr.country][curr.state][curr.city][curr.street][curr.onStreet -1] = 
        listbyStreet_[key][curr.country][curr.state][curr.city][curr.street][curlen-1];
        delete (listbyStreet_[key][curr.country][curr.state][curr.city][curr.street][curlen-1]);
        
        }



    function addHolder(address _holder, address _IOUtoken) public override isIOUtoken {
        if (!isHolderthisIOU[_holder][_IOUtoken] ) {
            listHoldersIOUs [_holder].push(_IOUtoken);
            isHolderthisIOU[_holder][_IOUtoken] = true;
        }
    }

    function getIOUList (address _owner) public override view returns (address[] memory) {
            return listIOUs[_owner];
        }

    function getIOUListSoc (string memory _profile) public override view returns (address[] memory) {
            return listIOUsSoc[_profile];
                }

    function getIOUListKey (bytes32 _key) public override view returns (address[] memory) {
            return listbyKeys[_key];
                }


    function getIOUListHold (address _holder) public view override returns (address[] memory) {
            return listHoldersIOUs [_holder];
        }

    function getIOUstotal () public view override  returns (uint256)
    {
        return allIOU.length;
    }    

    function getKeystotal () public view override returns (bytes32[] memory) 
    {
        return allKeywords;
    }    

    function getIssuerstotal () public view override returns (uint256)
    {
        return allIssuers.length;
    }

    function getIOUsbyCity(bytes32 _key,
                            string memory _country,
                            string memory _state,
                            string memory _city) public  view returns (address[] memory) {
                return listbyCity_  [_key][_country][_state][_city];
            }

    function getIOUsbyStreet (bytes32 _key,
                        string memory _country,
                        string memory _state,
                        string memory _city,
                        string memory _street) public view returns (address[] memory) {
            return listbyStreet_[_key][_country][_state][_city][_street];
                }


    }