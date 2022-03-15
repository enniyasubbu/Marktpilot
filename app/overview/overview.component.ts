import { Component, OnInit } from '@angular/core';
import { chocolateData } from '../model/chocolate-data'
import { Market } from '../model/Chocolate-model';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  chocolatedata: Array<any> = [];
  router: any;
  constructor() {
    this.chocolatedata = chocolateData.data;
  }

  displayedColumns: string[] = ['name', 'brand', 'price', 'averageprice', 'link'];
  id: any;

  getLowPrice(prices: any[]) {
    var marketlowerprice = {
      'amount': 0,
      'link': null,
      'price': 0,
      'shop': null,
      'unit': '',
      'average': 0
    }

    var averageprice = 0;
    var sumeprice = 0;
    if (prices.length > 0) {
      prices.forEach(element => {
        sumeprice = sumeprice + this.amountpriceperhundred(element.price, element.amount, element.unit)
        if (marketlowerprice.price === 0) {
          marketlowerprice = element
        }
        if (marketlowerprice) {
          if (this.amountpriceperhundred(element.price, element.amount, element.unit) < this.amountpriceperhundred(marketlowerprice.price, marketlowerprice.amount, marketlowerprice.unit)) {
            marketlowerprice = element;
          }
        }

      });
      marketlowerprice['average'] = sumeprice / prices.length
      return marketlowerprice
    }
    marketlowerprice['average'] = sumeprice / prices.length
    return marketlowerprice
  }

  amountpriceperhundred(price: number, weight: number, unit: string) {
    var multiplygram = 1; 
    if (unit === 'kg') {
      multiplygram = 1000
    }

    var grams = weight * multiplygram;
    var pricepergram = price / grams
    return pricepergram * 100
  }

  GetAveragePrice(prices: any[]) {
    var sumeprices = 0;
    if (prices.length > 0) {
      prices.forEach(element => {
        sumeprices = sumeprices + this.amountpriceperhundred(element.price, element.amount, element.unit)
      });
    }
    return sumeprices / prices.length;
    
  }
  navigate(item: any) {
    this.router.navigate(['/item'], {state: {item: item}}); 
  }
}

