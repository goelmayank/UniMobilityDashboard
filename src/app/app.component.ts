import { Component } from '@angular/core';
import {HtClientService, HtUsersService} from "ht-angular";
import { GetUrlParam } from "ht-utility";

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{

  constructor(
    private clientService: HtClientService,
    private usersService: HtUsersService,
  ) {
    const token = GetUrlParam('key');
    if (token) this.clientService.token = token;
  }
}
