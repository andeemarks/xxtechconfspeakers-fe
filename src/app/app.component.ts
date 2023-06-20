import { Component } from "@angular/core";
import { ConfDataService } from "./confdata/confdata.service";

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
}
