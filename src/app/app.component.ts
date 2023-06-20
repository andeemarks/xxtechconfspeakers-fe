import { Component } from "@angular/core";
import { ConfDataService } from "./confdata/confdata.service";
import { BubbleDataPoint, ChartConfiguration } from "chart.js";
import "chartjs-adapter-date-fns";

class ConfData {
  confDate: Date = new Date();
  year: number = 0;
  totalSpeakers: number = 0;
  diversityPercentage: number = 0;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [ConfDataService],
})
export class AppComponent {
  title = "xxtechconfspeakers-fe";
  chartPoints: BubbleDataPoint[] = [];
  confDataLoaded = false;

  constructor(private confDataService: ConfDataService) {
    this.download();
  }

  createChartPoints(rawData: Object[]) {
    rawData.forEach((confData: Object, _i: number) => {
      this.chartPoints.push({
        x: new Date((confData as ConfData).confDate).getTime(),
        y: Math.round((confData as ConfData).diversityPercentage * 100),
        r: 5,
      });
    });

    this.confDataLoaded = true;
  }

  download() {
    this.confDataService
      .getTextFile("TechConfSpeakers")
      .subscribe((results) => this.createChartPoints(JSON.parse(results)));
  }

  public bubbleChartOptions: ChartConfiguration<"bubble">["options"] = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          displayFormats: {
            year: "YYYY",
          },
        },
      },
    },
  };

  public bubbleChartDatasets: ChartConfiguration<"bubble">["data"]["datasets"] =
    [
      {
        data: this.chartPoints,
        label: "Conference",
      },
    ];
}
