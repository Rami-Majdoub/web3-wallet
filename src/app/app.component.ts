import { Component } from '@angular/core';
import { ContractService } from 'src/app/services/contract-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'greeter';
  
  constructor(
    public contractService_: ContractService 
  ){}
  
  account = 'not connected';
  async connect(){
    this.account = await this.contractService_.connectAccount();
  }
  
  async get(){
    this.currentGreetValue = await this.contractService_.getGreet();
  }
  
  currentGreetValue = '';
  newGreetValue = '';
  async set(){
    await this.contractService_.setGreet(this.newGreetValue);
  }
}
