import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'senph-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss', '../app.component.scss']
})
export class DomainsComponent implements OnInit {
  
  domainsArray;
  domainsArrayFiltered;
  selectedDomain;


  constructor( private api:ApiService) { }

  ngOnInit() {
    this.api.getDomains().subscribe(res => {
      this.domainsArray=res;
      console.dir(res);
      this.assignCopy();
    });
  }

  onSelect(domain){
    this.selectedDomain = domain; 
  }

  assignCopy(){
    this.domainsArrayFiltered = Object.assign([], this.domainsArray);
 }
  filterItem(value){
      if(!value){
          this.assignCopy();
      } // when nothing has typed
      this.domainsArrayFiltered = Object.assign([], this.domainsArray).filter(
        sensors => JSON.stringify(sensors).toLowerCase().indexOf(value.toLowerCase()) > -1
      )
  }
  createRoute(i){
    return(['/domain', this.domainsArray[i].domain.value.slice(34) ]);
  }
}
