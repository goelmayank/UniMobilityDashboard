import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import {SharedModule} from "ht-angular";

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import {UsersMapContainerModule, UsersContainerModule, MapContainerModule} from "ht-angular";
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HtModule} from "ht-angular";
import {HttpClientModule} from "@angular/common/http";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4eicpfiGhpVnJc6iDwqVNQh4rJizcH_0'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    HtModule.forRoot({token: 'sk_test_d82656ada82f4b5c2133e1789328330721a47454', mapType: 'google'}),
    CommonModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    MapContainerModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyB4eicpfiGhpVnJc6iDwqVNQh4rJizcH_0'}),
    UsersMapContainerModule,
    UsersContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
