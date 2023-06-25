import { Component, ViewChild } from "@angular/core";
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
  diversityPercentageNormalised: number;
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
      confData.diversityPercentageNormalised = Math.round(
        confData.diversityPercentage * 100
      );
      this.confData.push(confData);
    });

    this.confData.sort((a, b) => {
      return b.diversityPercentage - a.diversityPercentage;
    });
    this.confDataLoaded = true;
  }
}
