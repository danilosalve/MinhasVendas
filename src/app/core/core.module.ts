import { MenuModule } from './menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDatabase } from '../in-memory-database';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    MenuModule,
  ],
  exports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    MenuModule
  ]
})
export class CoreModule { }
