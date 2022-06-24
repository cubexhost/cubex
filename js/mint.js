"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;
const contractAddress='0xce3bC429b47fBE0e9c51102d294D56d733a675d2';
let walletAddress;
let abiData;
// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;

/**
 * Setup the orchestra
 */
function init() {

  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);


  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "717a09e0c5d14ad28de2b2a18ed2e232",
      }
    },

    fortmatic: {
      package: Fortmatic,
      options: {
        key: "pk_live_B542FF0814272DFE"
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  const chainData = evmChains.getChain(chainId);
  document.querySelector("#network-name").textContent = chainData.name;

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  document.querySelector("#selected-account").textContent = selectedAccount;

  // Get a handl
  const template = document.querySelector("#template-balance");
  const accountContainer = document.querySelector("#accounts");

  // Purge UI elements any previously loaded accounts
  accountContainer.innerHTML = '';

  // Go through all accounts and get their ETH balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await web3.eth.getBalance(address);
    // ethBalance is a BigNumber instance
    // https://github.com/indutny/bn.js/
    const ethBalance = web3.utils.fromWei(balance, "ether");
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
    // Fill in the templated row and put in the document
    const clone = template.content.cloneNode(true);
    clone.querySelector(".address").textContent = address;
    clone.querySelector(".balance").textContent = humanFriendlyBalance;
    accountContainer.appendChild(clone);
  });

  // Because rendering account does its own RPC commucation
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  await Promise.all(rowResolvers);

  // Display fully loaded UI for wallet data
  document.querySelector("#prepare").style.display = "none";
  document.querySelector("#connected").style.display = "block";
}

async function notLive() {
  $(".mint-information").html("<div class='btn-not-live'>Mint is not yet live.</div>");  
}

async function mintNFT(){
  // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
// alert(nonce);

  const web3 = new Web3(provider);
  const nonce = await web3.eth.getTransactionCount(selectedAccount,'latest')
  // console.log('provider', nonce)
  const nftContract = new web3.eth.Contract(abiData, contractAddress);
  
  const data = await nftContract.methods.payWhitelist(1).encodeABI();

  
  setTimeout(function() {
    $(".mint-information").animate({
      opacity: 0,
    }, 600, function() {
      // Animation complete.
      // $(".mint-information").html("<div class='btn-success-mint'>You successfully claimed a CubeX NFT.</div>");
    });    
    $(".mint-information").animate({
      opacity: 1,
    }, 600, function() {
      $("#voucherLeft").html("0")
      // Animation complete.
    });
  }, 12000);
  
  const tx = {
    'from': selectedAccount,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    // 'maxPriorityFeePerGas': 2999999987,
    'value': 250000000,
    'data': data
  };
  try{
    let txR= await web3.eth.sendTransaction(tx);
    console.log(txR);
  
  }
  catch(err)
  {
    console.log('err',err)
  }
  
}

async function mintNFT(){
  // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
// alert(nonce);

  const web3 = new Web3(provider);
  
  const nonce = await web3.eth.getTransactionCount(selectedAccount,'latest')
  // console.log('provider', nonce)
// console.log(abiData)
  const nftContract = new web3.eth.Contract(abiData, contractAddress);
  
  
  
  const data = await nftContract.methods.payWhitelist(1).encodeABI();
  console.log('data',nftContract.methods)
  
  const tx = {
    'from': selectedAccount,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    value:250000000000000000,
    // 'maxPriorityFeePerGas': 2999999987,
    'data': data
  };
  try{
    let txR= await web3.eth.sendTransaction(tx);
    console.log(txR);
  
  }
  catch(err)
  {
    console.log('err',err)
  }
  
}

async function mintNFT2(){
  // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
// alert(nonce);

  const web3 = new Web3(provider);
  
  const nonce = await web3.eth.getTransactionCount(selectedAccount,'latest')
  // console.log('provider', nonce)
// console.log(abiData)
  const nftContract = new web3.eth.Contract(abiData, contractAddress);
  
  
  
  const data = await nftContract.methods.payWhitelist(2).encodeABI();
  console.log('data',nftContract.methods)
  
  const tx = {
    'from': selectedAccount,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 720000,
    value:500000000000000000,
    // 'maxPriorityFeePerGas': 2999999987,
    'data': data
  };
  try{
    let txR= await web3.eth.sendTransaction(tx);
    console.log(txR);
  
  }
  catch(err)
  {
    console.log('err',err)
  }
  
}


const web3 = new Web3(provider);
  const nftContract = new web3.eth.Contract(abiData, contractAddress);
  let data = await nftContract.methods.getmyData()



  async function getNftData(){
    const web3 = new Web3(provider);
    const nftContract = new web3.eth.Contract(abiData, contractAddress);
    let data = await nftContract.methods.getmyData();
    console.log(data)
  }
  setInterval(()=>{
    getNftData()
  },5000)
  
async function refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  document.querySelector("#connected").style.display = "none";
  document.querySelector("#no-wallet-connected").style.display = "none";
  
  document.querySelector("#prepare").style.display = "block";

  document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  await fetchAccountData(provider);
  document.querySelector("#btn-connect").removeAttribute("disabled")
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  // console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
    // console.log('provider', provider)
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  $("#WEB3_CONNECT_MODAL_ID").css("display","none");

  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  document.querySelector("#prepare").style.display = "block";
  document.querySelector("#connected").style.display = "none";
}
async function loadABI(){
  $.getJSON('artifacts/abi.json', function(data) {
    // console.log('abi.data', data.abi)
    console.log("loaded abi")
    abiData=data;
    
});
}

/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  loadABI();
  
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
  // document.querySelector("#btn-mint").addEventListener("click", mintNFT);
  document.querySelector("#btn-mint-none").addEventListener("click", mintNFT);
  document.querySelector("#btn-mint-none-2").addEventListener("click", mintNFT2);  

  $("#btn-connect").click(function() {
    $("#WEB3_CONNECT_MODAL_ID").css("display","block")
  });
  
});
