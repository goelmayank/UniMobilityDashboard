import { Component, OnInit } from '@angular/core';
import { usersClientFactory } from "ht-client";
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core/';

declare var google: any;
import * as _ from "underscore";
import 'rxjs/add/observable/of';
import {HtUsersService} from "ht-angular";
import { concatMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Page, IUser, IUserAnalytics} from "ht-models";

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'table-cmp',
  templateUrl: 'table.component.html',
  moduleId: module.id,
  styleUrls: ['./table.component.less']
})

export class TableComponent implements OnInit {
 results: Array<any>;
 data$;
 geocoder;
 loading$;
 constructor(
   private wrapper: MapsAPILoader,
   private usersClient: HtUsersService
 ) {
    this.wrapper.load().then(() => {
        this.geocoder = new google.maps.Geocoder();

        // TESTING THE API : UNCOMMENT TO CHECK
        /*
        const geo = {
          location: {lat: 21.221, lng: 28.222}
        };
        this.geocoder.geocode(geo, (results, status) => {
          console.log("API TEST FROM INSIDE CONSTRUCTOR\n");
          console.log(results);
        };
        */
        //
    });
  }

 ngOnInit() {
   this.usersClient.list.dateRange.setDateRange({});
   this.loading$ = this.usersClient.list.loading$;
   // this.usersClient = usersClientFactory({dateRange$: Observable.of(null)});
   this.data$ = this.usersClient.list.data$;
   this.usersClient.list.getApiQuery$().pipe(
     take(1),
     concatMap((query) => {
       this.usersClient.list.setActive();
       return this.usersClient.api.index(query).pipe(
         take(1),
         concatMap((usersIndex: Page<IUser>) => {
           return this.data$.pipe(
             map((users: Page<IUserAnalytics>) => {
               if (!users) return users;
                const usersEntity = _.indexBy(usersIndex.results, 'id');
                const results = users.results.map((user) => {
                  return {...usersEntity[user.id], ...user};
                });
               return {...users, results};
             })
           );
         })
       );
     })
   ).subscribe(data => {
     console.log("  data", data);
     this.update(data);
   });

  //  this.data$.subscribe(data => {
  //    console.log("  data", data);
  //    this.update(data);
  //  });
 }

 update(data) {
  if (data && data.count) {
    this.results = [];
    for (const user of data.results){
      if (user.last_location.geojson) {
        const loc = user.last_location.geojson.coordinates;
        const geo = {'location' : {'lat': loc[0], 'lng' : loc[1]}};
        console.log(geo);
        this.geocoder.geocode(geo, (results, status) => {
          console.log(results);
          if (status === 'OK') {
            user.address = results[0].formatted_address;
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    }
    this.results = data.results;
  }
 }
}
