import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ConfdataComponent } from "./confdata/confdata.component";
import { ConfgraphComponent } from "./confgraph/confgraph.component";
import { NgChartsModule } from "ng2-charts";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { CalloutsComponent } from './callouts/callouts.component';

@NgModule({
  declarations: [AppComponent, ConfdataComponent, ConfgraphComponent, CalloutsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    NoopAnimationsModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
