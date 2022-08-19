import { Injectable } from '@angular/core';

// https://stackoverflow.com/questions/55021263/buffer-is-not-defined-error-after-migrating-to-angular-7
//import Web3 from "web3";

import { ethers } from "ethers";
import { contract_address, contract_abi } from 'src/app/abis'

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  provider: any;
  contract: any;
  signer: any;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.contract = new ethers.Contract(contract_address, contract_abi, this.provider);
  }

  async connectAccount() {
    // ask metamask to connect
    await this.provider.send("eth_requestAccounts", []);
    this.signer = this.provider.getSigner();
    // connect returns a new contract connected to the signer
    this.contract = this.contract.connect(this.signer);
    
    // the connected address
    return await this.signer.getAddress();
    
    // get
    // console.log(await this.contract.greet());
    // set
    // console.log(await this.contract.setGreeting("ok"));
  }
  
  async getGreet(): Promise<string> {
    return await this.contract.greet();
  }
  
  async setGreet(newVal: string) {
    await this.contract.setGreeting(newVal);
  }

}

