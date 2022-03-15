import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApichocolateService } from 'src/app/services/apichocolate.service';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { anxiety } from '@igniteui/material-icons-extended';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})



export class DetailComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions!: Partial<ChartOptions> | any;

  constructor(public activatedRoute: ActivatedRoute,
    private api: ApichocolateService) {
    this.seriedata = this.selected.id;
  }

loadchart(){

  this.chartOptions = {
    chart: {
      width: 500,
      height: 500,
      type: "pie"
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
  this.chartmaker()
}

  chartmaker(){
    var label = []
    var values = []

    label.push('carbohydrates')
    values.push(this.selected?.nutrition.carbohydrates.total)
    label.push('fat')
    values.push(this.selected?.nutrition.fat.total)
    
    label.push('protein')
    values.push(this.selected?.nutrition.protein)
    label.push('salt')
    values.push(this.selected?.nutrition.salt)
    this.chartOptions['labels'] = label
    this.chartOptions['series'] = values
  }

  selected: any = [];
  seriedata: any = [];

  loadChocolates() {
    console.log(this.api.getAllChocolates())
    
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res: any) => {
      this.selected = this.api.getChoclateId(res.id)
    })
    this.loadChocolates()
    this.loadchart()
  }

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
    var multiplygram = 1; //by default is gram
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
}
