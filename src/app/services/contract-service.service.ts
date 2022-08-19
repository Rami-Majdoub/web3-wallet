import { Injectable } from '@angular/core';

// https://stackoverflow.com/questions/55021263/buffer-is-not-defined-error-after-migrating-to-angular-7
//import Web3 from "web3";

import { ethers } from "ethers";
import { createIcon } from '@download/blockies';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor() {}

  async newMnemonic(): Promise<string> {
    const { mnemonic: { phrase: mnemonicPhrase } } = ethers.Wallet.createRandom()
    return mnemonicPhrase;
  }
  
  async accountInfos(
    mnemonic: string,
    count: number = 3,
    initialIndex: number = 0,
    path: string = "m/44'/60'/0'/0/",
    passphrase: string = ""
  ){
  	let result: any[] = []
    Array(count).fill(0).map((_, i) => {
      const PATH = path + (i + initialIndex).toString()
      const wallet = ethers.Wallet.fromMnemonic(mnemonic, PATH)

      result.push({
      	address: wallet.address,
		privateKey: wallet.privateKey,
		imgUrl: createIcon({ seed: wallet.address.toLowerCase() }).toDataURL(),
	  })
    })
    return result;
  }
  
}

