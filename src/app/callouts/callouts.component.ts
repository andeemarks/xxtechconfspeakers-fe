import { Component } from "@angular/core";
import { ConfDataService } from "../confdata/confdata.service";

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
  diversityPercentageNormalised: number;
}

interface ConfSummary {
  averageDiversityPercentage: number;
  mostRecentlyAdded: ConfData;
  totalConferencesTracked: number;
}

@Component({
  selector: "app-callouts",
  templateUrl: "./callouts.component.html",
  styleUrls: ["./callouts.component.css"],
})
export class CalloutsComponent {
  confSummary?: ConfSummary;
  confSummaryLoaded = false;

  constructor(private confDataService: ConfDataService) {
    this.download();
  }

  download() {
    this.confDataService
      .getTextFile("TechConfSummary")
      .subscribe((results) => this.createConfSummary(JSON.parse(results)));
  }

  createConfSummary(rawData: Object) {
    this.confSummary = rawData as ConfSummary;
    this.confSummaryLoaded = true;
  }
}
