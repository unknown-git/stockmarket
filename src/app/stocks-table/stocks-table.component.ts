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

  ngOnInit(): void {
    this.getPrice();
  }

  getPrice(): void {
    this.myWebSocket
      .subscribe(dataFromServer => console.log(dataFromServer));
  }
}
