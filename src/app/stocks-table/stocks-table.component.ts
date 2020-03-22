import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})

export class StocksTableComponent implements OnInit {

  myWebSocket: WebSocketSubject<any> = webSocket('ws://stocks.mnet.website');

  constructor() { }
  tableData = [];
  ngOnInit(): void {
    this.getPrice();
  }

  getPrice(): void {
    let temp = [];
    this.myWebSocket.subscribe(res => {          // Subcribe to websocket
      res.forEach(([name, price]) => {
        if (!temp.includes(name)) {              // Add new row
          temp.push(name);
          this.tableData.push({
            ticker: name,
            price,
            bgc: 'white',
            time: new Date()
          });
        } else {                                 // Update existing row
          this.tableData.find((obj, i) => {
            if (obj.ticker === name) {
              if (price > obj.price) {
                obj.bgc = '#b2fab4';
              } else if (price < obj.price) {
                obj.bgc = '#ffa4a2';
              } else if (price === obj.price) {
                obj.bgc = '#efefef';
              }
              obj.price = price;
              obj.time = new Date();
            }
          });
        }
      });
    });
  }
}
