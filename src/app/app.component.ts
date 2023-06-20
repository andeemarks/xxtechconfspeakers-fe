import { Component } from "@angular/core";
import { ConfDataService } from "./confdata/confdata.service";
import { ChartConfiguration } from "chart.js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [ConfDataService],
})
export class AppComponent {
  title = "xxtechconfspeakers-fe";
  contents: string | undefined;
  constructor(private confDataService: ConfDataService) {}

  clear() {
    this.contents = undefined;
  }

  download() {
    this.confDataService
      .getTextFile("TechConfSpeakers")
      .subscribe((results) => (this.contents = results));
  }

  public bubbleChartOptions: ChartConfiguration<"bubble">["options"] = {
    responsive: false,
    scales: {
      x: {
        min: 0,
        max: 30,
      },
      y: {
        min: 0,
        max: 30,
      },
    },
  };
  public bubbleChartLegend = true;

  public bubbleChartDatasets: ChartConfiguration<"bubble">["data"]["datasets"] =
    [
      {
        data: [
          { x: 10, y: 10, r: 10 },
          { x: 15, y: 5, r: 15 },
          { x: 26, y: 12, r: 23 },
          { x: 7, y: 8, r: 8 },
        ],
        label: "Series A",
      },
    ];
}
