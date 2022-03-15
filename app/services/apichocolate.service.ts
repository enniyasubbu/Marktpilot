import { Injectable } from '@angular/core';
import { chocolateData } from '../model/chocolate-data'

@Injectable({
  providedIn: 'root'
})
export class ApichocolateService {

  constructor() { }


  getAllChocolates(){
    return chocolateData.data
  }

  getChoclateId(id:any){
    var selected
    chocolateData.data.forEach(element => {
 
    if(element.id === id){
    selected = element;
      }
    });
    return selected
  }
}
