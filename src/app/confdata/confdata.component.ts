import { Component } from "@angular/core";
import { ConfDataService } from "./confdata.service";
import { el } from "date-fns/locale";

interface ConfData {
  confDate: Date;
  name: string;
  location: string;
  numberOfWomen: number;
  numberOfMen: number;
  dateAdded: Date;
  year: number;
  rank: number;
  displayRank: string;
  totalSpeakers: number;
  diversityPercentage: number;
  diversityPercentageNormalised: number;
}

class ConfDataCollection {
  confData: ConfData[] = [];

  add(conf: ConfData) {
    conf.diversityPercentageNormalised = Math.round(
      conf.diversityPercentage * 100
    );

    this.confData.push(conf);
  }

  sortByDiversity() {
    this.confData.sort((a, b) => {
      return b.diversityPercentage - a.diversityPercentage;
    });
  }

  assignRanks() {
    for (var i = 0, rank = 1; i < this.confData.length; i++) {
      if (
        i > 0 &&
        this.confData[i].diversityPercentage <
          this.confData[i - 1].diversityPercentage
      ) {
        rank++;
      }
      this.confData[i].rank = rank;

      if (i > 0) {
        if (this.confData[i].rank != this.confData[i - 1].rank) {
          this.confData[i].displayRank = `${rank}`;
        } else {
          this.confData[i].displayRank = "";
        }
      } else {
        this.confData[i].displayRank = "1";
      }
    }
  }
}
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
