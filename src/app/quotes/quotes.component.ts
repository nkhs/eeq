import { Component, OnInit } from "@angular/core";
import { QuotesStore } from "./quotes.store";

@Component({
  selector: "app-quotes",
  template: `
    <h3>Quotes for the day</h3>
    <ul *ngIf="!(loading$ | async); else loading">
      <li *ngFor="let item of quotes$ | async">
        <blockquote>
          {{ item?.content }}
        </blockquote>
        <p>- {{ item?.author }}</p>
      </li>
    </ul>
    <ng-template #loading> Loading</ng-template>
  `,
  styles: [
    `
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        padding: 1rem;
        border-radius: 8px;
        margin: 0.5rem;
        background: #f3f3f3;
      }
      p {
        text-align: right;
        font-size: 12px;
      }
    `
  ],
  providers: [QuotesStore]
})
export class QuotesComponent implements OnInit {
  quotes$ = this.store.quotes$;
  loading$ = this.store.loading$;
  constructor(private store: QuotesStore) {}

  ngOnInit() {
    this.store.getQuotes();
    this.quotes$.subscribe(console.log);
  }
}
