const upgradeFlag= true; // change to true when upgrading

const StoreIOUs = artifacts.require("StoreIOUs");

const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

var instanceStore;

module.exports = async function (deployer, _network, addresses) {
  var Curaddresses = require ("../addresses.json");
  const networkId = await web3.eth.net.getId();     
  if (!upgradeFlag) {
     instanceStore = await deployProxy(StoreIOUs, { deployer });
    }
  else {
    const newStoreIOUs = artifacts.require("newStoreIOUs");

    instanceStore = await upgradeProxy(Curaddresses[networkId].StoreIOUs, newStoreIOUs, {deployer} );
    console.log("New instanceStore: ", instanceStore.address)
  }
  
  Curaddresses[networkId].StoreIOUs = instanceStore.address;
    let fs = require('fs');
    fs.writeFileSync("./addresses.json", JSON.stringify(Curaddresses), function(err) {
          if (err) {
              console.log(err);
          }
    });
};
