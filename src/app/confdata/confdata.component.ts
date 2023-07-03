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
    rawData.forEach((rawConfData: Object) => {
      var confData = rawConfData as ConfData;
      confData.diversityPercentageNormalised = Math.round(
        confData.diversityPercentage * 100
      );
      this.confData.push(confData);
    });

    this.confData = this.sortByDiversity(this.confData);
    this.confData = this.assignRanks(this.confData);

    this.confDataLoaded = true;
  }

  private sortByDiversity(confs: ConfData[]) {
    confs.sort((a, b) => {
      return b.diversityPercentage - a.diversityPercentage;
    });

    return confs;
  }

  private assignRanks(confs: ConfData[]) {
    for (var i = 0, rank = 1; i < confs.length; i++) {
      if (
        i > 0 &&
        confs[i].diversityPercentage < confs[i - 1].diversityPercentage
      ) {
        rank++;
      }
      confs[i].rank = rank;

      if (i > 0) {
        if (confs[i].rank != confs[i - 1].rank) {
          confs[i].displayRank = `${rank}`;
        } else {
          confs[i].displayRank = "";
        }
      } else {
        confs[i].displayRank = "1";
      }
    }

    return confs;
  }
}
