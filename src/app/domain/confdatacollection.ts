export interface ConfData {
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

export class ConfDataCollection {
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
