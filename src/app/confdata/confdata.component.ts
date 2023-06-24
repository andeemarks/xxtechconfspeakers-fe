import { Component } from "@angular/core";
import { ConfDataService } from "./confdata.service";

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

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: "app-confdata",
  styleUrls: ["confdata.component.css"],
  templateUrl: "confdata.component.html",
  providers: [ConfDataService],
})
export class ConfdataComponent {
  displayedColumns: string[] = [
    "rank",
    "diversityPercentage",
    "name",
    "diversityPercentageBar",
  ];
  confData: ConfData[] = [];
  confDataLoaded = false;

  constructor(private confDataService: ConfDataService) {
    this.download();
  }
  download() {
    this.confDataService
      .getTextFile("TechConfSpeakers")
      .subscribe((results) => this.createconfData(JSON.parse(results)));
  }

  createconfData(rawData: Object[]) {
    rawData.forEach((rawConfData: Object) => {
      var confData = rawConfData as ConfData;
      this.confData.push(confData);
    });

    this.confDataLoaded = true;
  }
}
