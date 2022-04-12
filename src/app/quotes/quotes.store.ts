import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { QuotesService } from "./quotes.service";

export interface QuotesStoreData {
  quotes: any[];
  isLoading: boolean;
}

@Injectable()
export class QuotesStore extends ComponentStore<QuotesStoreData> {
  readonly quotes$ = this.select((state) => state.quotes);
  readonly loading$ = this.select((state) => state.isLoading);
  readonly addQuotes = this.updater((state, quotes: any[]) => ({
    quotes: [...state.quotes, ...quotes],
    isLoading: false
  }));

  readonly updateLoading = (isLoading: boolean) =>
    this.patchState({ isLoading });

  readonly getQuotes = this.effect(() => {
    this.updateLoading(false);
    return this.quotesService.getQuotes().pipe(
      tapResponse(
        (quotes: any[]) => {
          this.addQuotes(quotes);
          this.updateLoading(false);
        },
        (error) => console.error(error)
      )
    );
  });
  constructor(private quotesService: QuotesService) {
    super({ quotes: [], isLoading: false });
  }
}
