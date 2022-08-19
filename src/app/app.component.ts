import { Component } from '@angular/core';
import { ContractService } from 'src/app/services/contract-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  txt1 = '';
  initialIndex = 0;
  nbAccounts = 1;
  
  constructor(
    public contractService_: ContractService 
  ){}
  
  async newMne(){
    this.txt1 = await this.contractService_.newMnemonic();
  }
  
  accounts: any[] = [];
  
  async accountInfos(){
    this.accounts = [];
    this.accounts = await this.contractService_.accountInfos(this.txt1, this.nbAccounts, this.initialIndex);
  }
  
}
