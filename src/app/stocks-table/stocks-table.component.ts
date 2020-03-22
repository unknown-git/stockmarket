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
  }

  getPrice(): void {
    let temp = [];
    this.myWebSocket.subscribe(res => {
      res.forEach(([name, price]) => {
        if (!temp.includes(`${name}`)) {
          temp.push(`${name}`);
          this.tableData.push({
            ticker: `${name}`,
            price: `${price}`
          });
        } else {
          this.tableData.find((obj, i) => {
            if (obj.ticker === `${name}`) {
              obj.price = `${price}`;
            }
          });
        }
      });
    });
  }

  stop(): void {
    this.myWebSocket.unsubscribe();
  }
}
