import { Component } from "@angular/core";
import { ConfDataService } from "./confdata/confdata.service";
import "chartjs-adapter-date-fns";

interface ConfData {
  confDate: Date;
  name: string;
  location: string;
  numberOfWomen: number;
  numberOfMen: number;
  dateAdded: Date;
  year: number;
  totalSpeakers: number;
  diversityPercentage: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [ConfDataService],
})
export class AppComponent {}
