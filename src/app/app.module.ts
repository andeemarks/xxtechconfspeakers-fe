import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ConfdataComponent } from './confdata/confdata.component';
import { NgChartsModule } from 'ng2-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ConfdataComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgChartsModule, NoopAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
