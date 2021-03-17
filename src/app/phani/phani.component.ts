import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-phani',
  templateUrl: './phani.component.html',
  styleUrls: ['./phani.component.css']
})
export class PhaniComponent implements OnInit {
  public datas:any;
  public result:any;
  public fnlData : any;
  public eData:any;
  loading =false;
  arrData = [];
  constructor(private serv:AuthService) {
    this.loading = true;
    this.datas = this.serv.phaniData();
    this.datas.subscribe(response =>{
      this.result = response.data['children']
      // console.log(this.result)
      this.loading =false;
      this.result.forEach(element => {
           this.fnlData = element.data;
          
          this.arrData.push(this.fnlData)
          // console.log(this.arrData);
      });
      
    },errorMessage => this.eData = errorMessage);
   }

  ngOnInit() {
    
  }

}
