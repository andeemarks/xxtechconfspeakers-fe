import { Component } from "@angular/core";
import { ConfDataService } from "./confdata.service";
import { ConfData, ConfDataCollection } from "../domain/confdatacollection";

@Component({
  selector: "app-confdata",
  styleUrls: ["confdata.component.css"],
  templateUrl: "confdata.component.html",
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

  private download() {
    this.confDataService
      .getTextFile("TechConfSpeakers")
      .subscribe((results) => this.createconfData(JSON.parse(results)));
  }

  private createconfData(rawData: Object[]) {
    var confCollection = new ConfDataCollection();
    rawData.forEach((rawConfData: Object) => {
      var confData = rawConfData as ConfData;
      confCollection.add(confData);
    });

    confCollection.sortByDiversity();
    confCollection.assignRanks();

    this.confData = confCollection.confData;
    this.confDataLoaded = true;
  }
}
