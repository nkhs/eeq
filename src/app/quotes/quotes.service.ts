import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class QuotesService {
  constructor(private http: HttpClient) {}

  getQuotes() {
    return this.http.get("https://api.quotable.io/quotes").pipe(
      map((data: any) => data.results),
      catchError(() => of([]))
    );
  }
}
