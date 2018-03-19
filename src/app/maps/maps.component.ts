import { Component, OnInit } from '@angular/core';
import { HtUsersService } from 'ht-angular';

@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html',
    styleUrls: ['./maps.component.less']
})

export class MapsComponent implements OnInit {
  constructor(private userClientService: HtUsersService) { }

  ngOnInit() {
  this.userClientService.listAll.setActive();
  }
}
