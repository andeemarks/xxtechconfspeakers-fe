import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { tap } from "rxjs/operators";

@Injectable()
export class ConfDataService {
  constructor(private http: HttpClient) {}

  getTextFile(filename: string) {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http
      .get(`https://xxtechconfspeakers.azurewebsites.net/${filename}`, {
        responseType: "text",
      })
      .pipe(
        tap(
          // Log the result or error
          {
            next: (data) => this.log(filename, data),
            error: (error) => this.logError(filename, error),
          }
        )
      );
  }

  private log(filename: string, data: string) {
    const message = `DownloaderService downloaded "${filename}" and got "${data}".`;
  }

  private logError(filename: string, error: any) {
    const message = `DownloaderService failed to download "${filename}"; got error "${error.message}".`;
    console.error(message);
  }
}
